require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express  = require('express');
const path     = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const app    = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname)));

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
app.post('/api/chat', async (req, res) => {
  const { messages = [], stage = 'before', goal = '' } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in environment.' });
  }

  // Validate messages array
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
app.get('/api/stats', async (_req, res) => {
  try {
    // All-time totals
    const totals = await db.query(`
      SELECT
        COUNT(*)                                          AS total_sessions,
        COALESCE(SUM("durationMins"), 0)                 AS total_mins,
        COUNT(CASE WHEN completed THEN 1 END)            AS completed_sessions
      FROM "Session"
    `);

    // This week (Mon–now)
    const weekly = await db.query(`
      SELECT
        COUNT(*)                                          AS week_sessions,
        COALESCE(SUM("durationMins"), 0)                 AS week_mins
      FROM "Session"
      WHERE "createdAt" >= date_trunc('week', NOW())
    `);

    // Recent 8 sessions
    const recent = await db.query(`
      SELECT id, "vibeId", "durationMins", "taskName", completed, "createdAt"
      FROM "Session"
      ORDER BY "createdAt" DESC
      LIMIT 8
    `);

    res.json({
      allTime: totals.rows[0],
      thisWeek: weekly.rows[0],
      recent: recent.rows,
    });
  } catch (err) {
    console.error('[Stats error]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, keySet: !!process.env.ANTHROPIC_API_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n  FlowOwl server running → http://localhost:${PORT}/flowspace-app.html\n`);
});
