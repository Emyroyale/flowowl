# FlowOwl Copy System
*Microcopy for AI coaching interactions — for Claude Code implementation*

---

## Notes for implementation

- All instances of `[Name]` are dynamically replaced with the user's first name via Clerk auth
- All instances of `[what they said]` are dynamically replaced with the user's last input
- `[X min]` pulls from the session timer value
- Time-away logic is calculated from `last_login` timestamp in Neon PostgreSQL
- Avoid double dashes in all copy — use em dashes or line breaks instead
- FlowOwl should never guilt. Every message leads with empathy, closes with a question or action

---

## 1. Upgrade gate CTA

Shown when a free user hits the 15-minute session limit.

```
This is the moment most people quit.
You're not most people.
Keep going with AI coaching →
```

---

## 2. Post-upgrade confirmation

Shown immediately after a user upgrades to Pro.

```
Welcome to Pro. Seriously — welcome.
Most people stay stuck at the gate. You walked through it.
FlowOwl's got you from here. Let's build something.
```

---

## 3. First AI coaching prompt (new Pro user)

Shown the first time FlowOwl speaks after upgrade is confirmed.

```
Hey. I'm glad you're here.
A lot of people upgrade and never start their next session.
You're already different — you're still here.
What's one thing you want to finish today?
```

---

## 4. Return user messages

Triggered on login. Time-away is calculated from `last_login`. Use the appropriate variant.

### Gone 1 day

```
Welcome back, [Name].
One day away and you're already here again.
That's not a gap. That's just life.
FlowOwl's warmed up and ready.
What's on your plate today?
```

### Gone 3 to 6 days

```
We were thinking about you, [Name].
The week got busy. It always does.
But here you are — and that means something.
No catching up needed. We start fresh, right now.
What's on your plate today?
```

### Gone 1 to 2 weeks

```
[Name]. You came back.
We won't ask where you've been.
Life pulled you somewhere else for a while — and now you've pulled yourself back here.
That takes more courage than people realize.
What's on your plate today?
```

### Gone a month or more

```
[Name]. Hey.
It's been a while. We're not here to make you feel bad about that.
We're just glad you opened this.
Whatever happened, whatever didn't — it doesn't disqualify you from starting again.
You're here. That's enough.
What's on your plate today?
```

---

## 5. FlowOwl response after user answers "what's on your plate?"

Triggered after the user submits their task/goal input on return. Match to the same time-away tier.

### Gone 1 day

```
[Name], that's a great place to start.
You didn't lose any momentum. It's still right there.
Let's build your session around [what they said] and get you back into your rhythm.
FlowOwl's setting your timer now. Let's go.
```

### Gone 3 to 6 days

```
[Name], thank you for telling me that.
A few days away means your mind has had time to breathe.
Sometimes the best ideas come right after a break.
Let's channel that into [what they said] today, one focused block at a time.
Ready when you are.
```

### Gone 1 to 2 weeks

```
That took honesty, [Name]. Really.
You could have opened something easier. You chose this instead.
Let's not overwhelm today. Just [what they said], just one session.
Small and real beats big and abandoned every time.
FlowOwl's right here with you.
```

### Gone a month or more

```
[Name], that's enough to start with.
You don't need a plan. You don't need to make up for lost time.
You just need [what they said] and the next 25 minutes.
That's it. That's the whole ask.
Let's begin.
```

---

## 6. Mid-session check-ins

Triggered at intervals during an active focus session. Rotate or select based on session length.

### At 10 minutes in

```
Still with it, [Name].
Ten minutes down. You're in it now.
Don't break the thread — keep going.
```

### At halfway point

```
Halfway there, [Name].
You've already done the hardest part — starting.
The second half always moves faster. Trust it.
```

### When focus signal drops (if focus tracking is enabled)

```
Hey [Name], still here?
It's okay if your mind wandered. It happens to everyone.
Take one breath. Come back to [what they said].
We've got [X min] left. Let's finish strong.
```

### When user has been idle (no input/interaction)

```
[Name], you went quiet.
No pressure — just checking in.
If you need to step away, that's okay. If you're still in it, FlowOwl's right here.
```

---

## 7. End of session messages

Triggered when the session timer completes.

### Standard session end

```
[Name], you did it.
[X min] of real, focused work.
That's not nothing. That's everything.
How did it go with [what they said]?
```

### Short session (under 15 min)

```
[Name], even that counts.
Not every session has to be long to be real.
You showed up. You focused. That's the whole game.
Want to go again?
```

### Long session (45 min or more)

```
[Name]. That was a serious session.
[X min] of deep work doesn't happen by accident.
You built that. Now go rest — your brain earned it.
We'll be here when you're ready for round two.
```

### Session ended early by user

```
That's okay, [Name].
Stopping when you need to is also a skill.
You made progress on [what they said] today — don't let perfect be the enemy of done.
Come back when you're ready. FlowOwl will remember where you left off.
```

---

## Copy principles (for future expansion)

1. Always open with the user's name — it makes them feel seen, not processed
2. Never guilt. Reframe absence as humanity, not failure
3. Close every message with a question or a clear next action
4. Reflect the user's own words back to them using [what they said] — this is the single highest-trust move FlowOwl can make
5. Keep sentences short. One idea per line where possible
6. FlowOwl speaks like a coach who has been there — not a bot reading a script
7. Avoid double dashes. Use em dashes or line breaks instead
8. The word "just" is powerful here — it shrinks the ask and lowers resistance
