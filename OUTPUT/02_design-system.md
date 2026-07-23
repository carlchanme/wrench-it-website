# PROMPT 2 of 3 - Level 2: extract the system into CLAUDE.md + DESIGN.md

> Paste after Prompt 1 has produced a homepage you are happy with (still on
> `redesign/level3`). This makes the design survive across every page/route. Then
> run the lint + audit commands at the bottom.

---

Create two files at the repo root: `CLAUDE.md` (or update the existing one - keep
its current operational content, add the design-process section below) and a new
`DESIGN.md`.

## CLAUDE.md - the operational file
Lean. Process and project context, **not** the design system. It should cover:
- A short paragraph on the product and audience: WrenchIt, a lean KL software
  studio shipping AI-powered apps and automation for APAC founders and SMEs.
- The routes in scope: `/` (six-section homepage), `/batch` (the existing batch
  converter tool), `/faq` (if FAQ was moved off the homepage), the branded 404,
  plus the contact-form empty + error + success states.
- A "working principles" section naming the four design fundamentals -
  **Contrast, Repetition, Alignment, Proximity** - defined specifically for
  WrenchIt (not textbook), each translated into a concrete rule:
  - Contrast -> no adjacent type sizes (the scale skips steps).
  - Repetition -> the same primitives (Button, Field, Row, SpecTable, Eyebrow)
    appear on every route.
  - Alignment -> strong left edge as the default anchor; centered layouts
    forbidden except single-object empty states (e.g. the 404).
  - Proximity -> whitespace carries hierarchy, dividers do not.
- Conventions: sentence case, real typography (proper en-dashes and apostrophes),
  date formatting, no emoji in product UI, no decorative icon-set in headings,
  labels above inputs (the contact form), errors as prose rather than red banners,
  exactly one primary action visible per screen (the single CTA).
- A "before you ship" checklist that includes running each route against
  `DESIGN.md`'s anti-patterns and re-checking the two most common failure modes
  for this site: (1) the accent used more than once per section / purple
  creeping back, (2) layout drifting back to centered + carded.

## DESIGN.md - the visual system
Comprehensive and opinionated. Begin with this exact instruction at the top:

> This document is the source of truth for every visual decision. If a value is
> not here, it does not exist yet - add it, then build against it. Whenever you
> discover a new design value while building, add it to this file.

Cover:
- **Color in OKLCH only.** No hex, no HSL, no rgba anywhere in source. Direction:
  warm-paper bg, near-black warm ink, single committed **ink-blue / navy** accent.
  The full token set (this is the source of truth `app/globals.css` derives from):
  ```
  --bg:        oklch(0.94 0.012 85)
  --surface:   oklch(0.91 0.014 85)
  --ink:       oklch(0.21 0.012 60)
  --ink-soft:  oklch(0.45 0.012 60)
  --ink-faint: oklch(0.62 0.010 70)
  --line:      oklch(0.88 0.012 85)
  --accent:    oklch(0.42 0.14 265)   /* the ONLY accent - no purple */
  --danger:    oklch(0.50 0.16 25)    /* destructive confirmation ONLY */
  ```
  Contrast: body on bg >= 12:1; hairlines within 0.04 L of their surface; accent
  at most once per screen. Plus matching OKLCH dark-theme tokens, one accent only.
- **Typography with an explicit banned list** - Inter, Geist, Poppins, Montserrat,
  Roboto, DM Sans, Plus Jakarta, Open Sans, Nunito, Manrope, system-ui as a
  primary face. Display serif: **Fraunces** (optical sizing, hero + section
  openings only). Text grotesque: **Schibsted Grotesk**. Mono for metadata:
  **JetBrains Mono**. Define a type scale with specific sizes, line-heights, and
  tracking. Require non-adjacent sizes (skip steps).
- **Layout & rhythm** (12-col asymmetric, 8px baseline, 96/144/192 section
  padding, ~1240px max width, negative space as a feature), **materials** (pill +
  0-radius, no glassmorphism, no gradients, no shadow ladder, opacity/underline
  hovers only), **responsive** (375px floor), and the full **anti-pattern list**
  - port all of these from the homepage you just built so every route inherits
  them. The anti-patterns are:
  - Centered hero with two stacked CTAs over a gradient.
  - "Trusted by" strip or a three-number stats row under the hero.
  - Bento grid of icon + heading + paragraph cards.
  - Any purple/pink/rainbow gradient; more than one accent; accent twice in a
    section.
  - Hex/HSL/rgba in source.
  - Glassmorphism; noise > 3% paper grain; hover scale/translate; shadow-lift.
  - The old 6/10/16/24 radius ladder.
  - Floating photo cards with shadows.
  - Banned fonts (incl. Manrope) as a primary face.
  - Emoji bullets/markers; Lucide/Heroicons decoratively in the hero.
  - Centered, justified, or italic body copy.
  - Sticky chat bubble, cookie banner, or any first-load modal.
  - WrenchIt-specific: retired purple `#7A5AE0` anywhere; naming the fintech
    employer / specific clients / Upwork on public pages.

## After the files exist - lint and audit
1. Lint DESIGN.md against Google's template and iterate until `errors: 0`:
   ```
   npx @google/design.md lint DESIGN.md
   ```
2. Audit the built routes against Vercel's living guidelines. Fetch the rules
   first, then apply and fix what they flag:
   ```
   WebFetch https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```
