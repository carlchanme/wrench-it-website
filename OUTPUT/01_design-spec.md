# PROMPT 1 of 3 - Level 1: rebuild the WrenchIt homepage

> Paste this into Claude Code at the repo root **while on branch
> `redesign/level3`**. It rebuilds the single-page homepage crafted so it does
> not read as AI-generated. Build the page, eyeball it against the anti-patterns,
> then move to Prompt 2. Do NOT touch `master`.

---

## Intent

A single-page marketing site for **WrenchIt Software House Sdn Bhd** - a lean
software studio in Kuala Lumpur that designs, builds, and ships AI-powered web
apps, mobile apps, and automation for founders and SMEs across APAC. The page
must read like an operator's editorial portfolio, not a SaaS template. Primary
goal: convert visitors into "Talk to us" / contact-form submissions.

The signature visual is **the headline itself** - an oversized Fraunces editorial
statement, set like a magazine cover, that the whole page is staged around. There
is no physical product; type is the hero object. If the result could be reused for
a different studio just by changing the name, it has failed. Tone: **direct,
operator-led, confident, with a slight wit - no buzzwords**. Audience: **founders
and SMEs in APAC who value working software over roadmaps**.

Tech (match the existing repo exactly): **Next.js 16 (App Router) + React 19 +
TypeScript (strict)**. Styling is **hand-written CSS in `app/globals.css` using
CSS custom properties - NO Tailwind, no CSS framework, no shadcn**. Icons are
custom SVGs in `components/Icon.tsx` - **no icon library**. Fonts via `next/font`.
Contact form uses Resend + Vercel BotID (keep as-is). Work only on branch
`redesign/level3`.

## Hero composition (non-negotiable)
- The hero's visual center is one oversized **Fraunces** display statement
  occupying ~60-75% of viewport height, set at the optical center (slightly above
  geometric center). Type IS the staged object - treat it like a magazine cover.
- Headline: a single statement, 4-7 words, tight tracking (-0.02em). Use the brand
  line **"Production software. Built by operators."** or a tighter 4-7 word cut of
  it. No stacked subhead. Any secondary line goes below as a small-caps tracked
  kicker.
- Exactly one CTA: **"Start a project"** (links to `#contact`), anchored
  bottom-left or bottom-center. **No** paired "See what we've shipped" ghost
  button in the hero.
- **Remove from the hero entirely** (these are in the current build and are
  anti-patterns here): the founder card, the ship-log card, the radial glow
  gradient, and the `10K+ / 14 days / 100%` stats row. No floating cards, no
  "Trusted by" strip, no stats row in or directly under the hero.

## Color system - OKLCH only
No hex, no HSL, no rgba anywhere in source (the current `globals.css` uses hex and
rgba - convert all of it). Direction: warm-paper background, near-black warm ink,
and a **single committed navy / ink-blue accent**. The purple (`#7A5AE0`) is
**deleted** - it is the AI-default tell. The accent is the only saturated element
on the page and appears at most once per section. Token set (replace the `:root`
block in `app/globals.css`):

```
--bg:        oklch(0.94 0.012 85)     /* warm paper */
--surface:   oklch(0.91 0.014 85)     /* raised paper */
--ink:       oklch(0.21 0.012 60)     /* near-black warm ink */
--ink-soft:  oklch(0.45 0.012 60)
--ink-faint: oklch(0.62 0.010 70)
--line:      oklch(0.88 0.012 85)     /* hairline, within 0.04 L of --surface */
--accent:    oklch(0.42 0.14 265)     /* ink-blue / navy - the ONLY accent */
--danger:    oklch(0.50 0.16 25)      /* destructive confirmation ONLY */
```
Keep the existing dark-theme toggle, but re-derive the dark tokens in OKLCH from
the same family (one accent only - no purple in dark mode either).

## Contrast rules
- Body text on `--bg`: minimum 12:1 (editorial sharpness, not WCAG-minimum greys).
- The oversized hero headline must never depend on a background image for
  legibility (there is no hero photo here; it sits on `--bg`, so this is
  automatic - do not add a gradient behind it to "help").
- Hairline dividers/borders sit within 0.04 L of the surface they are on. No
  grey-on-grey shadow stacks. Remove the `--shadow-sm/md/lg` ladder.
- The accent appears at most once per section. Never on two elements in the hero.

## Typography
- **Banned** (read as AI-default): Inter, Geist, system-ui, Poppins, Montserrat,
  Roboto, DM Sans, Plus Jakarta, Open Sans, Nunito. Also remove **Manrope** (the
  current body face - generic).
- **Display** (hero + section openings only): **Fraunces** with optical sizing
  (already loaded via `next/font`). Keep it.
- **Text** (everything else): **Schibsted Grotesk** - add via `next/font/google`,
  replacing Manrope as `--font-text`.
- **Mono** (spec tables / technical callouts only - not decoration): **JetBrains
  Mono** (already loaded). Keep it.
- Type scale base 16px, with non-adjacent sizes (skip steps so hierarchy is
  obvious). Define sizes, line-heights, tracking. No justified body, no centered
  paragraphs, no italics for emphasis - use weight.

## Layout & rhythm
- 12-column feel, but the design must read **asymmetric (~7/10 editorial)**.
  Headlines start at column 2 / end at column 9, or run off-grid. No section reads
  as "centered everything."
- 8px baseline. Section vertical padding scales 96 / 144 / 192px on desktop.
- Max content width ~1240px (keep the existing `--max-w`), generous gutters. Only
  the hero goes full-bleed.
- Negative space is a feature. If a section feels dense, remove something.

## Sections (six max, each visually distinct)
The current build has eight sections (Hero, Services, Products, Process, Stack,
FAQ, Contact, Footer). Consolidate to **six**, each visually distinct:

1. **Hero** - the typographic editorial statement above, one CTA.
2. **Services** - but break the row-of-identical-cards pattern. One service is
   text-only set large, one is a short process detail, one is a single numeric
   callout (e.g. "14 days" idea -> first deploy) set in Fraunces at 200px+. No
   identical card components in a row.
3. **Shipped work** - editorial section on what WrenchIt has built. Position the
   copy to one side with imagery/negative space on the other. **Compliance: keep
   all client work generic/anonymized - never name the fintech employer, specific
   clients, or Upwork on the public site.**
4. **Spec table in mono** - the stack + how-we-work as a two-column mono table,
   hairline dividers, no icons. (Folds in the old Stack + Process sections.)
5. **One quiet proof** - a single large pull-quote or proof statement. No avatar
   grid, no logo wall, no star rating, no carousel. (FAQ moves to a secondary
   `/faq` route or folds into the spec section - it does not belong in the six.)
6. **Footer CTA** - repeat the single "Start a project" CTA surrounded by extreme
   negative space. Footer chrome is one line of mono text plus a small wordmark.
   The contact form lives here; keep Resend + BotID + honeypot wiring intact.

## Materials
- No physical product - type is the hero. Available assets: custom SVG icons
  (`components/Icon.tsx`). Real screenshots of shipped work are **held back for
  now** (compliance) - use anonymized/abstract treatments, not client UI.
- If any photography is introduced later, desaturate it 5-10%, never punched. The
  accent stays the only saturated element.
- Corner radius: **pill buttons (999px) + 0-radius surfaces** (cards, inputs,
  sections all sharp 0px). Delete the current 6/10/16/24px radius ladder. One
  language only.
- No glassmorphism. No noise overlays beyond a deliberate <3% paper grain. No
  gradients except - and there is no exception needed here, so: **no gradients at
  all** (remove the hero radial glow).
- Hover: 150ms opacity shifts or 1px underline reveals only. **Remove all
  `transform: translateY/scale` hovers** and the shadow transitions.

## Responsive
The typographic hero must survive 375px - the oversized headline reflows to a
smaller-but-still-dominant size, never collapsing into a generic centered stack.
Verify legibility and the asymmetric feel at 375px before shipping.

## Anti-patterns - reject the output if any appear
- Centered hero text with two stacked CTAs over a gradient.
- "Trusted by" logo strip directly under the hero.
- A stats row of three big numbers under the hero.
- Tilted floating product cards stacked like a reference image.
- Bento grid of icon + heading + paragraph cards, three or four across.
- Any purple-to-blue, pink-to-orange, or rainbow gradient.
- More than one accent color, or the accent used more than once per section.
- Hex, HSL, or rgba values in source (OKLCH only).
- Glassmorphism anywhere (especially a glassmorphic nav bar).
- Noise overlays heavier than a deliberate <3% paper grain.
- Hover scale/translate transforms or shadow-lift tricks.
- The default 8/12/16 (or the old 6/10/16/24) corner-radius ladder.
- Rectangular photo cards floating with drop shadows.
- Banned fonts as a primary face (incl. Manrope).
- Emoji as bullet points or section markers.
- Lucide / Heroicons used decoratively in the hero.
- Centered, justified, or italicized body copy.
- Sticky chat bubble, intrusive cookie banner, any modal on first load.

### Project-specific reject list (WrenchIt)
- The retired purple `#7A5AE0` reappearing anywhere.
- The hero founder card, ship-log card, radial glow, or stats row returning.
- The layered `--shadow-sm/md/lg` ladder returning.
- Any naming of the fintech employer, specific named clients, or Upwork on the
  public site - shipped-work references stay generic.

## Reference feel (do not visually copy)
Draw *feel* from editorial, operator-led studio sites and print magazine covers -
confident type, warm paper, one ink accent, lots of air. Do not clone any
specific site's layout.
