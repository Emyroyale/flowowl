require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express   = require('express');
const path      = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const { Pool }  = require('pg');
const { createClerkClient, verifyToken: clerkVerifyToken } = require('@clerk/backend');
const Stripe    = require('stripe');

const app    = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const clerk  = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(express.json());

// Validate required env vars at startup
for (const key of ['ANTHROPIC_API_KEY', 'CLERK_SECRET_KEY']) {
  if (!process.env[key]) console.error(`[STARTUP ERROR] Missing required env var: ${key}`);
}
// Static files served by Vercel CDN in production; served locally for dev
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname)));
}

// Allowed origins for Clerk JWT azp claim validation
const AUTHORIZED_PARTIES = [
  'https://flowspacefocus.com',
  'http://flowspacefocus.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

// ── Auth middleware — verifies Clerk session token ────────────────────────────
async function requireAuth(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
    if (!token) return res.status(401).json({ error: 'Not signed in.' });

    const payload = await clerkVerifyToken(token, {
      jwtKey: process.env.CLERK_JWT_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: AUTHORIZED_PARTIES,
    });
    req.userId = payload.sub;
    next();
  } catch (err) {
    console.error('[Auth error]', err.message, { name: err.name, errors: err.errors });
    return res.status(401).json({ error: 'Invalid session. Please sign in again.' });
  }
}

// ── Paid user check ───────────────────────────────────────────────────────────
async function requirePro(req, res, next) {
  const userId = req.userId;

  // 1. Hardcoded paid user IDs list
  const paidIds = (process.env.NEXT_PUBLIC_PAID_USER_IDS || '').split(',').map(s => s.trim());
  if (paidIds.includes(userId)) return next();

  try {
    const user = await clerk.users.getUser(userId);

    // 2. Clerk metadata: { isPro: true }
    if (user.privateMetadata?.isPro || user.publicMetadata?.isPro) return next();

    // 3. Stripe active subscription
    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) return res.status(403).json({ error: 'pro_required' });

    const customers = await stripe.customers.list({ email, limit: 1 });
    if (!customers.data.length) return res.status(403).json({ error: 'pro_required' });

    const subs = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: 'active',
      limit: 1,
    });

    if (!subs.data.length) return res.status(403).json({ error: 'pro_required' });
    next();
  } catch (err) {
    console.error('[Pro check error]', err.message);
    return res.status(403).json({ error: 'pro_required' });
  }
}

// ── GET /api/me — return current user info ────────────────────────────────────
app.get('/api/me', requireAuth, async (req, res) => {
  try {
    const user = await clerk.users.getUser(req.userId);

    // 1. Hardcoded paid user IDs (env var)
    const paidIds = (process.env.NEXT_PUBLIC_PAID_USER_IDS || '').split(',').map(s => s.trim());
    let isPro = paidIds.includes(req.userId);

    // 2. Clerk private or public metadata: { isPro: true }
    if (!isPro) {
      isPro = !!(user.privateMetadata?.isPro || user.publicMetadata?.isPro);
    }

    // 3. Stripe active subscription fallback
    if (!isPro) {
      try {
        const email = user.emailAddresses?.[0]?.emailAddress;
        if (email) {
          const customers = await stripe.customers.list({ email, limit: 1 });
          if (customers.data.length) {
            const subs = await stripe.subscriptions.list({
              customer: customers.data[0].id,
              status: 'active',
              limit: 1,
            });
            isPro = subs.data.length > 0;
          }
        }
      } catch (stripeErr) {
        console.error('[Stripe check in /api/me]', stripeErr.message);
      }
    }

    res.json({
      id:        req.userId,
      firstName: user.firstName,
      lastName:  user.lastName,
      email:     user.emailAddresses?.[0]?.emailAddress,
      imageUrl:  user.imageUrl,
      isPro,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── FlowOwl system prompt (stage-aware) ──────────────────────────────────────
function buildSystemPrompt(stage, goal) {
  const base = `You are FlowOwl, the AI accountability coach inside FlowSpaceFocus — a premium focus timer app.

Personality rules:
• Direct and warm. No filler phrases like "Great question!" or "Of course!".
• Short. 1–3 sentences maximum per reply. Never write lists.
• Honest but never harsh. Push the user forward without shaming them.
• Use plain language. No emojis, no markdown.
• Never reveal you are Claude or any underlying AI model. You are FlowOwl.

The user's session goal: "${goal || 'not specified yet'}".`;

  const stageContext = {
    before: `Context: The user has not started their focus session yet. Your job is to help them commit to one specific, concrete goal for the session — not a vague intention. If their goal is vague, push back once and ask them to make it smaller or more specific. When they have a solid goal, confirm it briefly and tell them to start. Do not motivate at length.`,

    halfway: `Context: The user is halfway through their focus session. They are checking in from inside the timer. Keep it brief. Acknowledge they are still going, give one small nudge if needed, and send them back to work immediately. Do not ask open-ended questions — they are in the middle of a session.`,

    after: `Context: The session just ended. Your job is to help the user reflect honestly. Ask one direct question about whether they hit their goal. If they did, acknowledge it without overdoing it. If they didn't, help them understand why without judgment, and ask what the next session is for.`,

    insights: `Context: The user is reviewing their weekly focus data and past sessions. Offer one sharp, specific observation based on the session summaries they share with you. Avoid generic productivity advice. If patterns are unclear, say so and ask what they noticed themselves.`,
  };

  return base + '\n\n' + (stageContext[stage] || stageContext.before);
}

// ── POST /api/chat ────────────────────────────────────────────────────────────
app.post('/api/chat', requireAuth, requirePro, async (req, res) => {
  const { messages = [], stage = 'before', goal = '' } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in environment.' });
  }

  const validMessages = messages.filter(
    m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
  );

  try {
    const response = await client.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 150,
      system:     buildSystemPrompt(stage, goal),
      messages:   validMessages,
    });

    const reply = response.content[0]?.text ?? 'Something went wrong.';
    res.json({ reply });
  } catch (err) {
    console.error('[FlowOwl API error]', err.message);
    const status = err.status ?? 500;
    res.status(status).json({ error: err.message ?? 'Coach unavailable. Try again.' });
  }
});

// ── GET /api/stats ────────────────────────────────────────────────────────────
app.get('/api/stats', requireAuth, async (req, res) => {
  const userId = req.userId;
  try {
    const totals = await db.query(`
      SELECT
        COUNT(*)                                       AS total_sessions,
        COALESCE(SUM("durationMins"), 0)              AS total_mins,
        COUNT(CASE WHEN completed THEN 1 END)         AS completed_sessions
      FROM "Session" WHERE "userId" = $1
    `, [userId]);

    const weekly = await db.query(`
      SELECT
        COUNT(*)                                       AS week_sessions,
        COALESCE(SUM("durationMins"), 0)              AS week_mins
      FROM "Session"
      WHERE "userId" = $1 AND "createdAt" >= date_trunc('week', NOW())
    `, [userId]);

    const recent = await db.query(`
      SELECT id, "vibeId", "durationMins", "taskName", completed, "createdAt"
      FROM "Session"
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC
      LIMIT 8
    `, [userId]);

    res.json({
      allTime:  totals.rows[0],
      thisWeek: weekly.rows[0],
      recent:   recent.rows,
    });
  } catch (err) {
    console.error('[Stats error]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    anthropicKey: !!process.env.ANTHROPIC_API_KEY,
    clerkSecretKey: !!process.env.CLERK_SECRET_KEY,
    clerkJwtKey: !!process.env.CLERK_JWT_KEY,
    clerkJwtKeyLen: process.env.CLERK_JWT_KEY?.length ?? 0,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n  FlowOwl server running → http://localhost:${PORT}/flowspace-app.html\n`);
});
