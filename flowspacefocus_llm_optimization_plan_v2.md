# FlowSpaceFocus LLM Optimization Implementation Plan

## Purpose

This document gives explicit implementation instructions for improving FlowSpaceFocus so it is easier for Google Search, AI Overviews, AI Mode, Gemini-adjacent search experiences, ChatGPT search, Perplexity, Claude, Bing/Copilot, and other LLM-driven systems to:

1. Crawl the site
2. Understand what the product is
3. Extract accurate product facts
4. Quote the site in answers and summaries
5. Route users from informational pages into signup and upgrade flows

This plan is written for a developer and should be implemented as a technical/content project, not as a cosmetic redesign.

---

## Important framing

Do **not** treat this as “special LLM SEO hacks.”

The current platform guidance from Google is that there are **no extra requirements** to appear in AI Overviews or AI Mode beyond strong SEO fundamentals and helpful content. The practical implication is:

- clear crawlability
- strong information architecture
- structured data
- useful original content
- visible product facts
- fast and stable rendering
- no contradiction between visible content and metadata/schema

For OpenAI, OAI-SearchBot is the crawler used for ChatGPT search surfacing. If it is blocked, the site can be excluded from ChatGPT search answers.

Perplexity documents separate crawler/user-agent behavior and gives robots.txt controls.

Anthropic publicly states it uses ClaudeBot as a web crawler for public websites, but public documentation for search-style retrieval is less explicit than Google/OpenAI/Perplexity. Because of that, the safest strategy is to build machine-readable, highly structured, crawlable pages.

---

## Current issues observed on the production site

These issues should be fixed before expanding content.

### 1. Product clarity is still too implicit
The site has strong emotional copy and a strong visual identity, but it still relies too much on inference.

Examples of current messaging that is emotionally strong but machine-ambiguous:

- “You don’t need discipline. You need accountability.”
- “Give your brain a container.”
- “You stop lying to yourself.”

This copy can stay, but it must be supported by clear plain-language product definitions near the top of the page.

### 2. The site is functioning more like a landing page than a knowledge source
The homepage explains the product through scrolling and visual storytelling. That is good for persuasion, but insufficient for retrieval systems that need direct, factual answer blocks.

### 3. The primary product identity is not yet hierarchical enough
The product currently presents as several things at once:

- ADHD focus app
- Pomodoro app
- focus music app
- AI accountability coach
- analytics/insights tool

The site needs one primary identity and clear supporting features.

### 4. Key differentiator is under-explained
The AI accountability coach appears to be the strongest differentiator, but it is not yet explained in enough plain language for search systems or skimming users.

### 5. Dedicated answer pages are missing or underdeveloped
The site needs pages that answer explicit questions such as:

- What is FlowSpaceFocus?
- Who is it for?
- How does the AI accountability coach work?
- Is it helpful for ADHD-prone users?
- What is included in the free plan?
- What is included in Pro?
- How is it different from a timer app?

---

## Primary positioning to implement across the site

Use one consistent product definition across homepage, metadata, structured data, pricing pages, blog CTAs, app store/directory submissions, and any footer/about pages.

### Canonical product definition
**FlowSpaceFocus is a web-based AI focus app for distracted and ADHD-prone minds. It combines guided focus playlists, timed work sessions, and an AI accountability coach to help users start tasks, stay engaged, and finish meaningful work.**

### Primary category
Use this as the main category language across the site:

- AI focus app
- ADHD-friendly focus app
- web-based productivity app

### Supporting mechanism language
Use this order consistently:

1. guided focus playlists
2. timed work sessions / Pomodoro sessions
3. AI accountability coach
4. focus insights / pattern tracking

Do not let “playlist app” become the accidental category.
Do not let “Pomodoro timer” become the only category.
Do not let the owl mascot become more prominent than product clarity.

---

## Implementation priorities

### Phase 1 — mandatory foundation
Implement these first:

1. Homepage copy improvements
2. Structured data
3. Metadata cleanup
4. Robots/crawl/indexing review
5. Sitemap and canonical setup
6. Dedicated FAQ page
7. Dedicated “How it works” page
8. Dedicated “AI accountability coach” page

### Phase 2 — page architecture
Implement these next:

1. `/for-adhd-minds`
2. `/focus-playlists`
3. `/pricing`
4. `/ai-focus-app`
5. `/pomodoro-for-distracted-minds`
6. `/flowspacefocus-vs-pomofocus`
7. `/flowspacefocus-vs-forest`

### Phase 3 — content ecosystem
Implement these after the core product site is fixed:

1. blog-to-app internal linking
2. problem-solution articles
3. comparison articles
4. glossary / definitions for focus-related terms
5. public trust pages and changelog if possible

---

## Homepage requirements

## Goal
The homepage must be understandable by both:

- a distracted human within 5 seconds
- an LLM retrieval system within the first visible blocks of text

## Required homepage structure

### Section 1 — Hero
Keep the emotional headline, but add an explicit factual subheading.

#### Recommended hero copy structure
**Headline**
You don’t have a focus problem.  
You have too many things pulling you away.

**Subheadline**
FlowSpaceFocus is a web-based AI focus app for distracted and ADHD-prone minds. Use guided playlists, timed work sessions, and an accountability coach to stay on task and finish what matters.

**Primary CTA**
Start focusing free

**Secondary CTA**
See how it works

### Section 2 — Direct definition block
Add a section immediately below the hero.

#### Required heading
## What is FlowSpaceFocus?

#### Required paragraph pattern
FlowSpaceFocus is a web-based productivity app designed for people who struggle to stay locked in. It combines focus music, timed work sessions, and AI accountability to help users start faster, reduce drift, and complete meaningful work.

This block is required for machine readability.

### Section 3 — Who it is for
Add a scannable section titled:

## Built for people who

Bullet list:

- start strong but get pulled away
- open too many tabs
- doom scroll before starting
- struggle with task initiation
- need structure without shame
- want more than a simple timer

### Section 4 — Feature hierarchy
Replace scattered feature explanation with four buckets.

#### Required heading
## How FlowSpaceFocus helps you focus

#### Four buckets
**1. Start faster**  
Pick a playlist that matches your brain state or task type.

**2. Stay contained**  
Use timed sessions to give your attention a clear boundary.

**3. Get pulled back in**  
Use the AI accountability coach to notice drift and recover faster.

**4. Learn your patterns**  
Review focus history and identify what helps or hurts follow-through.

### Section 5 — AI accountability section
This needs its own prominent section on the homepage.

#### Required heading
## Why the AI accountability coach matters

#### Required explanation points
The copy in this section must explicitly state:

- it is not just a timer
- it helps the user notice drift
- it prompts the user with focused questions
- it helps users re-enter work faster
- it is designed to be supportive, not judgmental

#### Example direction
Most focus apps only track time. FlowSpaceFocus helps users stay honest during the session and recover when attention slips.

### Section 6 — Playlist explanation section
The playlist section should stop sounding decorative and start sounding functional.

#### Required framing
Each playlist should be explained by:

- intended mental state
- intended task type
- whether the playlist is better for deep work, momentum, steady focus, or calm concentration

Do not overclaim medical or clinical outcomes unless verified and supportable.

### Section 7 — Pricing section
The pricing section must be rewritten to be clearer and more comparable.

#### Requirements
- state exactly what is in Free
- state exactly what is in Pro
- use parallel phrasing across both plans
- avoid vague emotional copy only
- mention whether credit card is required for free
- mention cancellation terms for Pro

#### Mandatory pricing formatting
Use a comparison table or two highly parallel cards.

Each plan must specify:

- session limits
- playlist access
- AI coach access
- focus history access
- insights access
- analytics access
- goal tracking access

### Section 8 — FAQ block on homepage
Add 5 to 8 FAQs directly on the homepage, then link to a full FAQ page.

Suggested FAQs:

- What is FlowSpaceFocus?
- Is FlowSpaceFocus good for ADHD-prone users?
- Is this just a Pomodoro timer?
- How does the AI accountability coach work?
- What is included in the free plan?
- What is included in Pro?
- Is FlowSpaceFocus available on mobile or web?
- Is this therapy or medical treatment?

### Section 9 — Footer improvement
The footer should include:

- legal name of business
- product summary in one sentence
- links to core product pages
- links to legal pages
- support/contact link
- blog link

---

## New pages that must be created

These pages are required because LLM systems are more likely to surface pages that directly answer a specific question or intent.

## 1. `/how-it-works`

### Purpose
Explain the product flow in direct, simple language.

### Required sections
- what the user does first
- how playlist selection works
- how session timing works
- how the AI coach works
- what data/history is saved
- free vs pro access
- screenshots for each step

## 2. `/ai-accountability-coach`

### Purpose
Make the strongest differentiator explicit.

### Required sections
- what the AI coach does
- when it interacts with the user
- examples of prompts
- how it helps users recover from distraction
- how it differs from a timer
- who benefits most
- what is free vs Pro

## 3. `/focus-playlists`

### Purpose
Turn playlists into a functional feature page.

### Required sections
- all playlist names
- what each playlist is intended for
- best use cases by task/energy state
- whether each playlist is free or Pro
- screenshots or audio UI previews if available

## 4. `/for-adhd-minds`

### Purpose
Target the strongest audience fit without making unsafe medical claims.

### Required sections
- who this page is for
- common problems: task initiation, drift, tab overload, doom scrolling
- how FlowSpaceFocus supports structure and re-entry
- how AI accountability helps
- what the app does not claim to do

## 5. `/pricing`

### Purpose
Provide a standalone pricing page that is indexable and easy to cite.

### Required sections
- plan comparison table
- FAQ about billing
- cancellation terms
- payment processor if relevant
- refund policy if applicable
- free trial / free plan mechanics

## 6. `/faq`

### Purpose
Give retrieval systems and users one clean place for direct answers.

### Required content
Minimum 15 FAQs, each with direct, short first-sentence answers.

## 7. Comparison pages
Create at least:

- `/flowspacefocus-vs-pomofocus`
- `/flowspacefocus-vs-forest`

### Requirements
These pages must be fair and factual. Do not make unsupported competitor claims.

Each page should include:
- who each tool is best for
- core feature differences
- timer differences
- AI accountability differences
- playlist/music differences
- best fit summary

---

## Content rules for all indexable pages

Every indexable page must follow these rules.

### 1. One clear H1
One page = one main topic.

### 2. Direct first paragraph
The first paragraph must define the page topic in plain English.

### 3. Use explicit headings
Prefer headings like:

- What is FlowSpaceFocus?
- How does the AI coach work?
- Who is this for?
- What is included in Pro?

Avoid vague headings like:

- Lock in
- Go deeper
- Stay real

These can still appear as supporting copy, but not as the main information architecture.

### 4. Short answer first, elaboration second
For FAQs and explanatory sections, the first sentence should answer the question directly.

### 5. Match visible content and structured data
Do not place claims in schema that are not visible on the page.
Do not mismatch plan details, feature counts, or product descriptions.

### 6. Use screenshots with descriptive alt text
Every major feature screenshot should have alt text that says what is visible and why it matters.

Example:
`alt="FlowSpaceFocus AI accountability coach interface showing a post-session prompt about what caused distraction"`

### 7. Do not publish scaled filler content
Do not generate low-value AI articles purely to create page count.
Each page must have a clear purpose and unique value.

---

## Structured data requirements

Use JSON-LD on relevant pages.

## Minimum schema types to implement

### Sitewide
- `Organization`
- `WebSite`

### Homepage and product pages
- `SoftwareApplication`
- `BreadcrumbList`

### FAQ page and any page with true FAQ content
- `FAQPage`

### Blog posts
- `Article`
- optionally `BreadcrumbList`

### Pricing page or plan-specific pages
- `SoftwareApplication`
- `Offer`
- `Product` only if implemented correctly and consistently

## Structured data rules

1. JSON-LD must match visible page content.
2. Do not use fake reviews or fake aggregate ratings.
3. Do not mark up content hidden from users.
4. Validate all schema before release.
5. Add separate schema blocks where appropriate instead of one overloaded block.

## Example homepage `SoftwareApplication` JSON-LD

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FlowSpaceFocus",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web",
  "description": "FlowSpaceFocus is a web-based AI focus app for distracted and ADHD-prone minds. It combines guided playlists, timed work sessions, and an AI accountability coach to help users start tasks, stay engaged, and finish meaningful work.",
  "url": "https://flowspacefocus.com/",
  "offers": {
    "@type": "Offer",
    "price": "9",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Royale Automation"
  }
}
</script>
```

## Example `Organization` JSON-LD

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Royale Automation",
  "url": "https://flowspacefocus.com/",
  "brand": {
    "@type": "Brand",
    "name": "FlowSpaceFocus"
  }
}
</script>
```

## Example FAQ schema pattern

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is FlowSpaceFocus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FlowSpaceFocus is a web-based AI focus app for distracted and ADHD-prone minds."
      }
    },
    {
      "@type": "Question",
      "name": "How does the AI accountability coach work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI coach prompts users before or after focus sessions to help them define tasks, notice distraction patterns, and re-enter work faster."
      }
    }
  ]
}
</script>
```

---

## Metadata requirements

Every indexable page must have unique metadata.

## Page title rules
- put the primary keyword/topic first
- include the brand name at the end
- keep titles concise and specific

### Examples
- `AI Focus App for Distracted Minds | FlowSpaceFocus`
- `How the AI Accountability Coach Works | FlowSpaceFocus`
- `Focus Playlists for ADHD-Friendly Work Sessions | FlowSpaceFocus`
- `FlowSpaceFocus Pricing | Free and Pro Plans`

## Meta description rules
Each page must have a unique meta description that:
- states what the page is about
- includes who it is for if relevant
- mentions one differentiator
- avoids keyword stuffing

### Example homepage meta description
`FlowSpaceFocus is a web-based AI focus app for distracted and ADHD-prone minds. Use guided playlists, timed work sessions, and accountability prompts to stay on task.`

## Open Graph / social tags
Implement per page:
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `twitter:card`

Use consistent brand visuals.

---

## Crawlability and indexing requirements

## Robots.txt
Review and update `robots.txt`.

### Goals
- allow important public pages to be crawled
- avoid blocking CSS/JS required for rendering
- disallow non-public/admin/internal areas only when necessary
- explicitly allow important user agents where appropriate

### Example pattern
```txt
User-agent: *
Allow: /

Sitemap: https://flowspacefocus.com/sitemap.xml
```

If specific bot control is needed, review and adjust for:
- Googlebot
- Bingbot
- OAI-SearchBot
- Perplexity-User
- ClaudeBot if the company wants to control training crawl behavior

Do not block important public product pages accidentally.

## Noindex review
Audit all pages for accidental noindex rules:
- HTML meta robots tags
- X-Robots-Tag headers
- framework-level defaults

## Canonical tags
Every indexable page must have a self-referencing canonical unless a different canonical is intentionally required.

## XML sitemap
Generate and submit a sitemap that includes:
- homepage
- product pages
- pricing
- FAQ
- blog posts
- comparison pages

Do not include:
- auth pages
- duplicate query variants
- test pages
- internal dashboards

## Rendering
Ensure important public page content is present in server-rendered HTML or otherwise fully crawlable without requiring authenticated app state.

Public product explanation must not rely on client-only rendering after hydration.

---

## Internal linking requirements

Internal linking must be deliberate.

## App-site links
The homepage must link prominently to:
- how it works
- AI accountability coach
- playlists
- pricing
- FAQ
- blog

## Blog-to-app links
Every blog article must include:
- one contextual inline link to a relevant product page
- one CTA near the end to signup/pricing
- one related-content block linking to another product or blog page

## Product-page links
Each product page should link to:
- pricing
- FAQ
- signup page
- relevant blog explainer(s)

---

## Blog strategy requirements

The blog is separate from the app, but it must function as part of the same discovery system.

## Blog job
The blog should:
- capture informational intent
- answer LLM-style questions
- establish topical authority
- route qualified users into the app site

## App-site job
The app site should:
- define the product
- explain features
- convert traffic
- earn signups/upgrades

## Blog content categories

### Category 1 — task initiation
Examples:
- how to start working when your brain refuses to begin
- why task initiation is harder than staying focused
- tools that help with task initiation

### Category 2 — attention drift
Examples:
- why focus breaks after 10 minutes
- how to recover after distraction without losing the session
- what causes deep work drift

### Category 3 — accountability
Examples:
- discipline vs accountability for distracted minds
- why gentle accountability works better than guilt
- how external structure improves follow-through

### Category 4 — music and mental state
Examples:
- best focus music for different work modes
- binaural beats vs instrumental focus music
- how music can support work initiation

### Category 5 — comparisons and tools
Examples:
- best focus apps for ADHD-prone users
- body doubling vs AI accountability
- timer apps vs guided focus systems

## Blog article structure
Every article should include:

1. direct answer intro
2. structured H2s
3. product-relevant insight
4. link to a matching product page
5. author/byline if available
6. article schema
7. publish/update date

---

## Copywriting rules for LLM optimization

These rules apply to all public pages.

### Keep
Keep these because they create brand differentiation:
- emotional language
- strong contrarian hooks
- memorable one-liners
- mascot-driven personality

### Add
Add these because they create machine readability:
- explicit definitions
- direct feature descriptions
- use-case language
- plan details
- audience language
- comparison language

### Avoid
Avoid:
- vague headings only
- empty startup language
- unsupported medical claims
- inconsistent product facts
- unexplained feature counts
- decorative text without explanatory support

---

## Accessibility and readability requirements

This is not optional. Better accessibility often improves machine understanding and user trust.

### Requirements
- maintain sufficient text contrast
- use semantic heading order (`h1` > `h2` > `h3`)
- ensure buttons have descriptive labels
- ensure form fields have labels
- ensure images have descriptive alt text
- ensure motion/animation does not block readability
- ensure key copy is selectable text, not image text

Low-contrast decorative text is acceptable only if the same meaning is provided in accessible readable text nearby.

---

## Performance requirements

Performance supports crawl reliability and user retention.

### Requirements
- compress and properly size images
- lazy load non-critical media
- preload critical fonts carefully
- avoid excessive JS on public marketing pages
- keep above-the-fold text render fast
- minimize layout shift

The public marketing pages should not depend on app-level JS complexity when static content would work.

---

## Trust and safety requirements

## Add a clear non-medical boundary
If targeting ADHD-prone or distracted users, add one clear statement such as:

`FlowSpaceFocus is a productivity tool. It is not therapy, diagnosis, or medical treatment.`

## Add privacy clarity
Create or improve privacy content to explain:
- what user data is stored
- what session data is stored
- whether AI prompts/responses are retained
- whether third-party AI providers are used
- billing/privacy basics

## Add support/contact clarity
Include a visible support path.

---

## Analytics and measurement requirements

Set up analytics to measure whether these changes work.

## Track
- organic sessions to product pages
- blog-to-app clickthrough rate
- signup rate by landing page
- upgrade rate by landing page
- impressions/clicks in Google Search Console
- Bing Webmaster Tools performance
- referral traffic tagged with `utm_source=chatgpt.com` if present
- referral traffic from Perplexity if identifiable
- page-level conversions from comparison pages and FAQ pages

## Add event tracking for
- primary CTA clicks
- pricing CTA clicks
- FAQ interactions
- blog CTA clicks
- “see how it works” clicks
- signup starts
- completed registrations
- upgrade starts
- successful paid conversions

---

## QA checklist before release

Use this checklist before pushing live.

### Content QA
- [ ] Homepage includes a plain-language product definition
- [ ] AI coach is clearly explained in direct language
- [ ] Free and Pro details are explicit and parallel
- [ ] No contradictory feature counts or plan details
- [ ] All major pages answer one primary question clearly

### Technical QA
- [ ] Canonicals are correct
- [ ] Sitemap is generated and accessible
- [ ] Robots.txt is correct
- [ ] No accidental noindex tags
- [ ] Public pages render meaningful content without login
- [ ] Structured data validates
- [ ] Metadata is unique page by page

### Accessibility QA
- [ ] Headings are semantic
- [ ] Alt text exists for meaningful images
- [ ] Button labels are descriptive
- [ ] Text contrast is acceptable
- [ ] Key messaging is not trapped in images

### Conversion QA
- [ ] Every informational page links to signup or pricing
- [ ] Every product page contains a clear CTA
- [ ] Blog pages route traffic into the app site

---

## Suggested delivery order for the developer

### Sprint 1
- rewrite homepage hero/subheadline
- add “What is FlowSpaceFocus?” block
- add “Built for people who” section
- restructure feature explanations into 4 buckets
- rewrite pricing cards with explicit feature comparison
- add homepage FAQ block

### Sprint 2
- implement `Organization`, `WebSite`, `SoftwareApplication`, and `FAQPage` schema
- add canonical tags
- verify sitemap generation
- audit robots.txt and noindex rules
- improve metadata across core pages

### Sprint 3
- build `/how-it-works`
- build `/ai-accountability-coach`
- build `/focus-playlists`
- build `/faq`
- build `/pricing`

### Sprint 4
- build `/for-adhd-minds`
- build comparison pages
- improve internal linking across app site and blog
- add analytics/event tracking

### Sprint 5
- expand content using blog + comparison pages
- monitor search performance and conversions
- refine pages based on actual query and conversion data

---

## Source guidance used for this plan

This plan is aligned to publicly documented guidance from the relevant platforms below.

### Google Search Central
- AI features and your website
- Structured data introduction
- Software app structured data
- Robots.txt guidance
- Robots meta tag guidance
- guidance on generative AI content and scaled abuse

### OpenAI
- Overview of OpenAI crawlers

### Perplexity
- Perplexity crawler documentation

### Anthropic
- public reference to ClaudeBot as a web crawler in Anthropic documentation/system materials

---

## Final implementation rule

The main objective is not to make the site sound more “AI.”

The main objective is to make the site:

- easier to crawl
- easier to understand
- easier to quote
- easier to trust
- easier to convert

If a proposed change improves vibe but reduces clarity, do not ship it.
If a proposed change improves clarity, crawlability, and trust, prioritize it.

# Backend and Logged-In Product Requirements for LLM Optimization

This section covers changes required inside the authenticated product experience after login. These changes are not mainly for public search indexing. They are for:
- improving machine-readable product clarity
- making the app easier to document, explain, and demo
- making feature behavior consistent with public marketing claims
- improving internal knowledge structure for future AI-powered features
- helping the product produce cleaner data for analytics, summaries, recommendations, and support content

## Why the logged-in product matters for LLM optimization

Public landing pages help discovery. The logged-in product helps:
- validate the public claims
- produce screenshots and walkthroughs that match marketing
- create structured feature definitions for docs, FAQs, and help content
- generate cleaner user event data that can later power insights, summaries, and AI personalization
- support future internal retrieval and memory systems if the product grows into deeper AI workflows

If the public website says the product offers AI accountability, focus insights, focus history, genre-based playlists, session tracking, and pattern awareness, the authenticated experience must expose those features clearly and consistently.

## High-level product architecture to support the logged-in experience

The developer should organize the authenticated app around the following core entities:

### 1. User
Fields:
- id
- email
- display_name
- created_at
- plan_tier
- timezone
- onboarding_status
- preferences_json

### 2. Focus Session
Fields:
- id
- user_id
- created_at
- started_at
- ended_at
- intended_duration_minutes
- actual_duration_minutes
- status
- selected_playlist_id
- selected_task_text
- session_goal_text
- interruption_count
- completion_state
- user_rating
- notes_text

Expected values:
- status: draft, active, paused, completed, abandoned
- completion_state: completed, partial, interrupted, skipped

### 3. Playlist / Focus Genre
Fields:
- id
- slug
- display_name
- description
- intended_use_case
- energy_type
- is_active
- sort_order

Examples:
- afrobeat
- coastal
- kompa
- study
- classics
- energy
- binaural
- brown_noise_off or noise_mode handled separately

### 4. AI Check-In
Fields:
- id
- session_id
- user_id
- stage
- prompt_text
- user_response_text
- assistant_response_text
- created_at
- metadata_json

Expected stage values:
- before
- halfway
- after
- insights

### 5. User Insight
Fields:
- id
- user_id
- generated_at
- insight_type
- title
- summary
- evidence_json
- date_range_start
- date_range_end

Insight types may include:
- best_session_length
- best_playlist
- common_interruptions
- best_time_of_day
- consistency_trend
- recovery_pattern

### 6. Session Event Log
Fields:
- id
- session_id
- user_id
- event_name
- event_timestamp
- event_metadata_json

Examples:
- session_created
- session_started
- playlist_changed
- ai_before_prompt_opened
- ai_before_response_submitted
- session_completed
- session_abandoned
- insight_viewed

## Required backend changes based on the logged-in screenshots

## A. Make the session model explicit

From the screenshots, the product flow appears to include:
- selected task input
- selected duration
- selected playlist / genre
- AI coach stages
- session start
- recent check-ins
- weekly stats
- insights

The backend must persist all of these elements instead of treating them as only UI states.

### Requirements
1. Save the task text before session start.
2. Save the intended duration before session start.
3. Save the selected playlist before session start.
4. Save each AI interaction by stage.
5. Save session completion status.
6. Save actual time spent, not only intended time.
7. Save session history for later analytics and summaries.

### Why this matters
Without structured persistence:
- insights will be weak or fake
- the product cannot support trustworthy analytics
- public marketing claims become harder to defend
- future AI summaries will lack grounding

## B. Add a real session lifecycle state machine

The logged-in product should use a defined lifecycle for every session.

### Recommended lifecycle
1. draft
2. configured
3. active
4. paused
5. completed
6. abandoned

### Rules
- A session begins as `draft` when the user enters task text or selects a duration.
- It becomes `configured` when minimum required setup is complete.
- It becomes `active` when the user clicks Start session.
- It becomes `paused` only if pause exists as a real feature.
- It becomes `completed` when the timer ends and the user completes the session flow.
- It becomes `abandoned` if the user exits or leaves without completion after a defined timeout.

### Developer note
Do not infer all outcomes only from UI render state. Persist the lifecycle state server-side.

## C. Persist AI coach flows by stage

The screenshots show a staged experience:
- Before
- Halfway
- After
- Insights

This is good product structure. The backend should mirror it exactly.

### Requirements
For each stage, save:
- the system prompt template version
- the user-visible AI prompt
- the user response
- the assistant response
- timestamp
- whether the step was skipped
- associated session id

### Additional requirement
Store prompt template versioning so the team can measure:
- which prompt style performs better
- whether users respond more at one stage than another
- whether prompt changes improve completion rate

Suggested fields:
- prompt_template_key
- prompt_template_version
- skipped_boolean

## D. Build trustworthy insights from real data

The logged-in “Insights” view should only display metrics that can be computed from real session records.

From the screenshots, examples include:
- focus streak
- average session
- completion rate
- recent check-ins
- sessions this week
- total minutes
- all-time minutes

### Rules for insight integrity
1. Every metric must have a real computation source.
2. Every card shown in UI must map to a backend query or materialized summary.
3. Avoid invented or placeholder analytics in production.
4. Show date windows clearly:
   - this week
   - last 7 days
   - all time
5. Recompute summary metrics on a defined schedule or after session completion.

### Suggested computed metrics
- total_sessions_all_time
- completed_sessions_all_time
- completed_sessions_last_7_days
- total_focus_minutes_all_time
- total_focus_minutes_last_7_days
- average_completed_session_minutes
- completion_rate
- favorite_playlist_by_completed_sessions
- best_hour_of_day
- longest_focus_streak_days

## E. Normalize playlist data

The logged-in app shows playlists or modes such as:
- Afrobeat
- Coastal
- Kompa
- Study
- Classics
- Energy
- Binaural
- Brown
- Off

These should not live only as front-end labels.

### Requirements
1. Create a canonical playlist table or configuration source.
2. Use stable slugs internally.
3. Keep label casing consistent across:
   - app
   - marketing site
   - docs
   - blog
   - analytics
4. Distinguish between playlists and noise modes if they are different concepts.
5. Ensure the public site and app do not contradict each other on total count.

### Example canonical model
- afrobeat_focus
- east_african_coastal
- kompa_flow
- study_flow
- classical_focus
- energy_mode
- binaural_beats
- brown_noise
- off_mode

## F. Store user-entered task intent

The logged-in screenshots show a field similar to:
- “What are you working on?”

This is important. The backend should treat this as structured session intent, not disposable UI text.

### Requirements
Store:
- original task text
- cleaned task text if normalization is used
- task category if inferred later
- whether task text was empty, edited, or reused from prior sessions

### Why this matters
This will later support:
- better insights
- pattern analysis
- better AI prompts
- smarter recaps
- better help content based on real use cases

## G. Create a backend layer for check-in history

The screenshots show “Recent check-ins.” This should be a first-class backend feature.

### Requirements
Each check-in record should support:
- session reference
- session date
- playlist used
- stage
- user response
- assistant response summary
- tags extracted from the interaction

Example tags:
- procrastination
- notification interruption
- unclear task
- low energy
- overplanning
- external interruption

These tags can be generated later, but the schema should allow them now.

## H. Support exportable insight summaries

The app has the beginning of a useful insight system. The backend should support generating structured summaries that can later be used for:
- weekly email recaps
- in-app summaries
- help articles
- user progress exports
- future AI-generated recommendations

### Minimum weekly summary structure
- date range
- total sessions
- total focus minutes
- completion rate
- top playlist
- most common interruption
- best focus day
- recommended next adjustment

## I. Add a developer-facing event taxonomy

The app needs stable analytics language. The event names should not drift randomly.

### Recommended event naming standard
Use lowercase snake_case.

Examples:
- landing_page_viewed
- pricing_page_viewed
- sign_up_started
- sign_up_completed
- dashboard_viewed
- session_configured
- session_started
- session_completed
- session_abandoned
- ai_checkin_before_completed
- ai_checkin_halfway_completed
- ai_checkin_after_completed
- insights_viewed
- upgrade_cta_clicked
- upgrade_completed

### Why this matters
This helps:
- analytics consistency
- funnel analysis
- product iteration
- easier debugging
- better BI dashboards later

## J. Build documentation pages from authenticated feature truth

The logged-in product now clearly shows the real app logic. The public site, help docs, FAQ, and blog should be based on the same backend-defined truth.

### Requirement
Create one internal source of truth document or config for:
- playlist names
- feature availability by plan
- AI coach stages
- insight metric definitions
- session lifecycle states

This prevents contradictions across:
- homepage
- pricing page
- app UI
- blog content
- support docs
- schema markup

## Logged-in UX/content changes that support LLM-readiness indirectly

These are not search-indexing features. They support clarity, trust, and consistent documentation.

## 1. Add visible labels and descriptions to each AI stage
Instead of only:
- Before
- Halfway
- After
- Insights

Use:
- Before: Define your target
- Halfway: Get pulled back in
- After: Review what happened
- Insights: Learn your focus pattern

This makes the feature easier to explain publicly.

## 2. Make insight cards self-explanatory
Each metric card should include:
- metric name
- exact time range
- one-sentence interpretation
- optional “how calculated” tooltip

This helps reduce ambiguity and improves trust.

## 3. Add an explainable empty state
If the user has not completed enough sessions, do not show fake insights.
Show:
- what data is missing
- how many sessions are needed
- what will unlock once enough data exists

## 4. Keep text consistent between marketing and app
If the app calls it:
- “AI Coach”
then the public site should not call it:
- “FlowOwl guidance”
in one place,
- “AI accountability”
in another,
- “assistant”
in another,
unless these are intentionally nested brand names.

## Backend priorities for the developer

## Priority 1: Data integrity
Implement durable storage for:
- users
- sessions
- playlists
- AI check-ins
- metrics inputs
- event logs

## Priority 2: Computed insights
Implement query or aggregation layer for:
- totals
- averages
- completion rate
- streak
- recent sessions
- playlist preferences
- time-based patterns

## Priority 3: Prompt and model observability
Persist:
- prompt template version
- model used
- latency
- completion status
- error status

## Priority 4: Internal docs and API consistency
Create shared contracts for:
- stage names
- playlist names
- plan limits
- metrics definitions

## API / backend endpoints the developer should plan for

Recommended endpoints or equivalent service methods:

### Session setup
- create_session_draft
- update_session_configuration
- start_session
- complete_session
- abandon_session

### AI check-ins
- create_ai_checkin
- submit_ai_checkin_response
- list_session_checkins
- list_recent_checkins

### Insights
- get_user_dashboard_summary
- get_user_weekly_insights
- get_user_playlist_breakdown
- get_user_focus_patterns

### History
- list_user_sessions
- get_session_detail
- list_user_events

### Preferences
- update_user_playlist_preferences
- update_user_focus_defaults
- update_user_coach_settings

## Direct connection to LLM optimization strategy

The developer should understand the distinction:

### Public-site LLM optimization
This affects:
- Google AI features
- Gemini understanding
- Perplexity citations
- ChatGPT search surfacing
- Claude research use when crawling/indexing public docs

### Logged-in product optimization
This affects:
- whether the product claims are trustworthy
- whether docs and help content are accurate
- whether future AI summaries are grounded in real data
- whether screenshots and demos remain consistent
- whether analytics support strong content and marketing claims

The authenticated backend does not directly create search visibility unless exposed publicly. However, it does create the structured product truth that public pages, docs, FAQs, changelogs, and support content should rely on.

## Specific instructions for the developer

1. Do not treat the logged-in AI coach flow as a front-end-only interaction.
2. Persist every meaningful session input and session outcome.
3. Version prompts and AI stage behavior.
4. Compute insights from real records only.
5. Normalize playlist taxonomy and plan limits.
6. Build a session and check-in schema that can support weekly summaries later.
7. Keep naming consistent across backend, frontend, marketing, and docs.
8. Add analytics events with stable names.
9. Design the data layer so public documentation can later reflect the product accurately.
10. Avoid placeholder metrics, fake analytics, or contradictory feature naming in production.
