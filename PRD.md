# WrenchIt Marketing Site — Product Requirements Document

This document is the source of truth for rebuilding the WrenchIt marketing site (`wrenchit.io`) from scratch. It captures every page, feature, design token, performance optimisation, and security control currently in production.

---

## 1. Product summary

| Field | Value |
|---|---|
| Product | Single-page marketing site for **WRENCH IT SOLUTIONS** (trading as WrenchIt) |
| Audience | Founders / SMEs in APAC looking for a custom software studio |
| Primary goal | Convert visitors into "Talk to us" form submissions |
| Brand promise | "Production software. Built by operators." |
| Tone | Direct, operator-led, no buzzwords, slight wit |
| Production URL | https://www.wrenchit.io |
| Hosting | Vercel (auto-deploy from `master`) |

---

## 2. Tech stack (exact)

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | `^16.2.6` |
| Bundler | Turbopack | (Next.js built-in, used for `dev` and `build`) |
| Language | TypeScript (`strict: true`) | `^6.0.3` |
| React | React + React DOM | `^19.0.0` |
| Email | Resend | `^6.12.3` |
| Bot protection | Vercel BotID | `^1.5.11` |
| Lint | ESLint + `next/core-web-vitals` + `next/typescript` | `^9.39.4` |
| Package manager | npm | `11.6.0` |
| Styling | Hand-written CSS in `app/globals.css` — **no Tailwind, no CSS framework, no shadcn** | — |
| Icons | Custom hand-rolled SVGs in `components/Icon.tsx` — **no icon library** | — |
| Fonts | Google Fonts via `next/font` — `Manrope`, `JetBrains_Mono`, `Fraunces` | — |
| Test runner | None configured | — |

`tsconfig.json` highlights: `target: ES2017`, `moduleResolution: bundler`, path alias `@/* → ./*`.

---

## 3. Repository structure

```
wrench-it-website/
├── app/
│   ├── api/
│   │   └── contact/route.ts          # POST handler: BotID + honeypot + Resend
│   ├── favicon.ico                   # Next.js convention → served at /favicon.ico
│   ├── icon.png                      # Next.js convention → served at /icon.png
│   ├── globals.css                   # All design tokens + every section's styles
│   ├── layout.tsx                    # Fonts, metadata, JSON-LD graph
│   ├── page.tsx                      # Server component; composes sections
│   ├── not-found.tsx                 # Branded 404
│   ├── opengraph-image.tsx           # Dynamic OG image (1200×630)
│   ├── robots.ts                     # MetadataRoute.Robots
│   └── sitemap.ts                    # MetadataRoute.Sitemap
├── components/
│   ├── ClientEffects.tsx             # "use client" — accent vars + IntersectionObserver
│   ├── Icon.tsx                      # SVG icon switch (server-renderable)
│   └── sections/
│       ├── Nav.tsx                   # "use client"
│       ├── Hero.tsx                  # Server
│       ├── ShipLog.tsx               # "use client" — live-log ticker
│       ├── Services.tsx              # Server
│       ├── Products.tsx              # "use client"
│       ├── Process.tsx               # Server
│       ├── Stack.tsx                 # Server
│       ├── FAQ.tsx                   # Server (also exports `faqs` for JSON-LD)
│       ├── Contact.tsx               # "use client" — form
│       └── Footer.tsx                # Server
├── public/
│   ├── carl-portrait.png             # Founder portrait (Hero + OG image)
│   ├── wrench-icon.png               # Brand mark (asset, not the favicon)
│   └── wrench-logo-horizontal.png    # Horizontal logo (Nav + Footer)
├── instrumentation-client.ts         # initBotId() — registers /api/contact
├── next.config.ts                    # withBotId() wrap
├── vercel.json                       # Region, security headers, cache, redirects
├── eslint.config.mjs                 # Flat config
├── tsconfig.json
├── package.json
├── README.md
└── PRD.md                            # this file
```

**Path alias:** `@/*` resolves to repo root. Used as `@/components/...`.

---

## 4. Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on `http://localhost:3000` via Turbopack |
| `npm run build` | Production build via Turbopack |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint .`) |

There is a committed `package-lock.json` and no `yarn.lock` — **always use npm**.

---

## 5. Routes

| Route | Type | Notes |
|---|---|---|
| `/` | Static (prerendered) | Single landing page |
| `/_not-found` | Static | Custom 404 |
| `/api/contact` | Function (Node.js runtime, `maxDuration: 10`) | Contact form POST |
| `/favicon.ico` | Static | From `app/favicon.ico` (Next.js convention) |
| `/icon.png` | Static | From `app/icon.png` (Next.js convention) — auto-injected into `<head>` |
| `/opengraph-image` | Static | Generated at build by `app/opengraph-image.tsx` |
| `/robots.txt` | Static | From `app/robots.ts` |
| `/sitemap.xml` | Static | From `app/sitemap.ts` |

---

## 6. Design system

### 6.1 Colour tokens (light, `:root`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F4EFE6` | Page background (warm cream) |
| `--bg-2` | `#EDE7DA` | Secondary surfaces |
| `--paper` | `#FAF7F1` | Cards |
| `--ink` | `#15161B` | Primary text |
| `--ink-2` | `#2D2D2D` | Secondary text |
| `--muted` | `#5E5E5E` | Tertiary text / labels |
| `--line` | `rgba(21,22,27,0.10)` | Hairline borders |
| `--line-2` | `rgba(21,22,27,0.18)` | Stronger borders |
| `--navy` | `#2E3B8E` | TapDuty brand |
| `--navy-2` | `#1F2A6E` | Navy hover |
| `--navy-soft` | `#4B5BAE` | Navy tint |
| `--accent` | `#7A5AE0` | Brand accent (purple) — injected at runtime |
| `--accent-soft` | `#7A5AE0` | Soft accent — injected at runtime |
| `--green` | `#4F7A4E` | Status: ok |
| `--red` | `#B14A36` | Status: error |

### 6.2 Colour tokens (dark, `:root[data-theme="dark"]`)

Overrides `--bg`, `--bg-2`, `--paper`, `--ink`, `--ink-2`, `--muted`, `--line`, `--line-2`, `--navy` family. `--accent` stays purple in both modes.

| Token | Dark value |
|---|---|
| `--bg` | `#0F1014` |
| `--bg-2` | `#15171D` |
| `--paper` | `#181A21` |
| `--ink` | `#F4EFE6` |
| `--ink-2` | `#E5E0D6` |
| `--muted` | `#9BA0AC` |
| `--navy` | `#7C8AE0` |

### 6.3 Spacing & radii

```
--r-sm: 6px;  --r-md: 10px;  --r-lg: 16px;  --r-xl: 24px;

--shadow-sm: 0 1px 0 rgba(21,22,27,.04), 0 1px 2px rgba(21,22,27,.04);
--shadow-md: 0 1px 0 rgba(21,22,27,.04), 0 8px 24px -8px rgba(21,22,27,.10);
--shadow-lg: 0 1px 0 rgba(21,22,27,.04), 0 24px 60px -20px rgba(21,22,27,.18);

--max-w: 1240px;
--pad-x: clamp(20px, 4vw, 56px);
```

### 6.4 Typography

| Token | Value |
|---|---|
| `--fs-display` | `clamp(48px, 7.2vw, 112px)` |
| `--fs-h1` | `clamp(36px, 5vw, 72px)` |
| `--fs-h2` | `clamp(28px, 3.4vw, 48px)` |
| `--fs-h3` | `clamp(20px, 2vw, 26px)` |
| `--fs-lg` | `19px` |
| `--fs-body` | `16.5px` |
| `--fs-sm` | `14px` |
| `--fs-xs` | `12.5px` |

**Three font families**, loaded via `next/font/google` in `app/layout.tsx`:

| Family | CSS var | Weights | Style | Use |
|---|---|---|---|---|
| `Manrope` | `--font-manrope` | 400, 500, 600, 700, 800 | normal | Body + headings |
| `JetBrains Mono` | `--font-jetbrains-mono` | 400, 500, 600 | normal | `.mono` class (labels, code-like accents) |
| `Fraunces` | `--font-fraunces` | (default) | **italic only** | `.serif` class (accent words in headings) |

All fonts use `display: swap`.

`body` enables OpenType features: `font-feature-settings: "ss01", "cv11"`. `.mono` adds `"ss01", "ss02", "ss03"` and `letter-spacing: -0.01em`.

### 6.5 Utility classes

- `.container` — `max-w: 1240px`, horizontal padding `clamp(20px, 4vw, 56px)`, centred.
- `.mono` — JetBrains Mono with stylistic sets.
- `.serif` — Fraunces italic, normal weight.
- `.eyebrow` — uppercase mono label with leading hairline rule.
- `.btn`, `.btn-primary`, `.btn-ghost` — pill-shaped CTAs with `transform: translateY(1px)` on `:active`.
- `.sr-only` — visually hidden, screen-reader visible.
- `.reveal` / `.reveal.in` — scroll-reveal opacity/transform animation (driven by IntersectionObserver).
- `.skip-link` — accessibility skip-to-content link.

### 6.6 Theming mechanism

- Theme is controlled by `data-theme` attribute on `<html>`.
- The Nav has a sun/moon toggle button. Clicking it sets `document.documentElement.dataset.theme = "dark" | "light"`.
- Theme is **not persisted** across reloads (intentional — the default is light to match the brand cream).

---

## 7. Layout & global concerns

### 7.1 `app/layout.tsx` responsibilities

1. Load all three Google fonts with `next/font/google` exposed as CSS variables.
2. Apply font variables to `<body className="...">`.
3. Export `metadata`:
   - `metadataBase: new URL("https://www.wrenchit.io")`
   - `title`: `"Custom Software & AI Automation Studio · Kuala Lumpur | WrenchIt"`
   - `description`: see code; keyword-led, KL geo-anchored.
   - `alternates.canonical: "/"`
   - `openGraph` (type: website, locale: `en_US`)
   - `twitter` (`summary_large_image`)
   - `other`: `geo.region: MY-14`, `geo.placename`, `geo.position: "3.139;101.6869"`, `ICBM`
4. Export `viewport.themeColor` — different colours per light/dark scheme.
5. Inject `<noscript>` style that forces `.reveal { opacity: 1; transform: none }` when JS is off.
6. Inject a JSON-LD `<script type="application/ld+json">` with a `@graph` of two nodes:
   - `ProfessionalService` (`@id: <url>/#org`) — full business identity, founder, address, geo, opening hours, `areaServed: [MY, SG, AU, JP, AE, GB]`, `knowsAbout` list.
   - `FAQPage` (`@id: <url>/#faq`) — derived from `faqs` exported by `components/sections/FAQ.tsx`.

### 7.2 `app/page.tsx`

- **Server Component**, no hooks.
- Renders order: `Nav` → `ClientEffects` → `<main>` containing `Hero`, `Services`, `Products`, `Process`, `Stack`, `FAQ`, `Contact` → `Footer`.
- All non-Hero sections wrapped in `<div className="reveal">` for scroll-fade-in.
- Defines `const ACCENT = "#7A5AE0"` and threads it to sections that paint accent strokes/fills.
- Includes `<a href="#main" className="skip-link">Skip to content</a>` as the first child for keyboard users.
- Carries an inline comment `{/* Founder section hidden for now — preserve component for later */}` between `FAQ` and `Contact` — placeholder for a future founder section, no rendered output.

### 7.3 `components/ClientEffects.tsx` (`"use client"`)

Single component with three independent effects:

1. **Accent CSS variable injection** — writes `--accent` and `--accent-soft` on `<html>`. Keeps the value in one place so designers can swap brand colour by editing `ACCENT` in `page.tsx`.
2. **Scroll-reveal** — `IntersectionObserver(threshold: 0.12)`. For every `.reveal`, adds `.in` when it intersects, then `unobserve`s it. Falls back to adding `.in` to all `.reveal` elements if `IntersectionObserver` is unsupported.
3. **Hash-focus** — listens to `hashchange`; focuses the targeted element with `{ preventScroll: true }` so smooth scroll + focus both work for keyboard nav.

Returns `null`.

---

## 8. Sections (page composition)

Each section file lives at `components/sections/<Name>.tsx`. Sections accept an optional `accent: string` prop for inline accent strokes/fills.

### 8.1 `Nav` (`"use client"`)

- Fixed header with brand logo, link list, dark-mode toggle, primary CTA, mobile burger.
- State: `scrolled` (boolean), `progress` (0..1), `open` (mobile menu), `dark`.
- Effects:
  - `dark` → writes `data-theme` to `<html>`.
  - `scroll` (passive listener) → updates `scrolled` and `progress` (`scrollY / (scrollHeight - innerHeight)`).
  - `keydown Esc` while mobile menu is open → close + return focus to burger.
- Renders progress bar (`scaleX(progress)`).
- Links: `#services`, `#products`, `#process`, `#stack`.
- Logo uses `next/image` with `priority` (above the fold).

### 8.2 `Hero` (Server Component)

- Two-column hero with eyebrow, headline (`"Production software. Built by operators."`), sub, CTAs (`Start a project`, `See what we've shipped`), 3-stat strip (`10K+ DAU`, `14 days`, `100% code ownership`).
- `Built by operators.` rendered in `.serif` (italic Fraunces) with a hand-drawn SVG underline using the runtime accent stroke.
- Right column holds `<FounderCard />` (portrait + name + role, server-rendered) and `<ShipLog accent={accent} />` (client island).
- Background: `.hero-bg` with grid lines and a radial-gradient glow that uses the accent.

### 8.3 `ShipLog` (`"use client"`)

- Animated "ship.log" terminal panel with rotating activity feed.
- Module-level `events` array (7 entries).
- `useState(0)` for ticker index; `useEffect` runs a 2,200 ms interval that increments `idx`, modulo events length.
- **Respects `prefers-reduced-motion: reduce`** — no interval registered.
- Displays a 5-event rolling window. Each row: time, k-tag (deploy / build / ship / merge), target, note. The `ship` tag uses the accent colour.
- Footer: `today: 7 deploys` + sparkline SVG stroked with accent.

### 8.4 `Services` (Server)

- Eyebrow `What we do`. Heading `Three doors in. One team that ships.`
- Three cards from a module-level `items` array:
  - `01 · Custom SaaS products`
  - `02 · AI automation`
  - `03 · Full-stack development`
- Each card: tag, icon (from `Icon.tsx` — `cube`, `spark`, `stack`), title, blurb, three checklist points (`check` icon), and a CTA link to `#contact`.

### 8.5 `Products` (`"use client"`)

- Tabbed showcase with two products: `TapDuty`, `Tuckaby`. Module-level `products` record contains label, name, URL, year, blurb, 3 stats, tag chips, and brand gradient colours.
- State: `active: ProductKey`.
- Tabs: ARIA `aria-pressed` button with brand-coloured dot.
- Visit link: `href="https://${url}"` + `target="_blank"` + `rel="noopener noreferrer"` + `sr-only "(opens in new tab)"`.
- Visual column is `inert aria-hidden="true"` and renders one of two interactive mocks:
  - **`TapDutyMock`** — fake browser dashboard with sidebar, KPI cards (sparklines), and a roster table; phone overlay shows greeting, a fake QR (see `QrGlyph`), and next shift. Animates `count` 38→42 on a 1,800 ms interval (skipped under `prefers-reduced-motion`).
  - **`TuckabyMock`** — night sky reading frame with stars, moon, illustrated scene, play button, progress bar, and waveform. Animates `bar` on an 800 ms interval (skipped under reduced-motion).
- **`QrGlyph`** — generates an 11×11 deterministic pseudo-QR (corner finder patterns + bit pattern). Cells are built **once at module scope** into `QR_CELLS` (perf optimisation).

### 8.6 `Process` (Server)

- Eyebrow `How we work`. Heading `From "could you build…" to live in production.`
- Vertical ordered list of 4 steps from a module-level `steps` array:
  - `01 · Tell us your problem` (Day 1)
  - `02 · We propose a solution` (Week 1)
  - `03 · We build and ship` (Sprint 1—N)
  - `04 · You go live` (Launch)
- Each step has a numbered bullet + connector rail in the accent colour.

### 8.7 `Stack` (Server)

- Eyebrow `Our stack`. Heading `Boring tools. Sharp execution.`
- 12-cell grid from a module-level `tech` array: React, React Native, Next.js, Node.js, Python, Supabase, Vercel, AWS, n8n, Claude, OpenAI, ElevenLabs.

### 8.8 `FAQ` (Server)

- Eyebrow `Frequently asked`. Heading `Common questions we hear.`
- **Exports** the `faqs` constant — `layout.tsx` imports it to build the JSON-LD `FAQPage` graph.
- 8 entries covering: timeline, cost, code ownership, location/time zones, non-technical founders, stack, AI in practice, mobile apps.
- Uses native `<details>` / `<summary>` for accessibility (no JS required).

### 8.9 `Contact` (`"use client"`)

- Two-column card with eyebrow `Let's build`, heading, sub, and a "direct contact" block on the left (email, hours, location).
- Right side is the form. See §9 for the full contract.

### 8.10 `Footer` (Server)

- Logo, tagline, three link columns (Studio / Products / Reach out), giant `WRENCHIT` SVG wordmark, copyright bar with version + back-to-top.
- External links use `target="_blank"` + `rel="noopener noreferrer"` + sr-only `(opens in new tab)`.

---

## 9. Contact form contract

### 9.1 Form state

```ts
type FormState = {
  name: string;
  email: string;
  project: string;     // one of: "Custom SaaS" | "AI automation" | "Full-stack" | "Not sure yet"
  message: string;
  website: string;     // honeypot — must remain empty for real users
};
```

### 9.2 Client validation (in `Contact.tsx`)

- `name` — trimmed length ≥ 2.
- `email` — matches `EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/` (hoisted to module scope).
- `message` — trimmed length ≥ 12.
- Failures show inline errors (`aria-invalid`, `aria-describedby` wired correctly).

### 9.3 Submit behaviour

- POSTs `JSON.stringify(form)` to `/api/contact` with `Content-Type: application/json`.
- States: `"idle" | "sending" | "sent" | "error"`.
- Live region (`role="status"`, `aria-live="polite"`, `.sr-only`) announces sending / sent / error to screen readers.
- On `"sent"`: replaces the form with a confirmation card and a `Send another` reset button.
- On `"error"`: inline `role="alert"` with email fallback.

### 9.4 Accessibility details

- Each field labelled by an explicit `<label htmlFor>`.
- `autoComplete="name"` / `"email"` on the matching inputs.
- Project selector is a `role="radiogroup"` with `role="radio"` buttons and `aria-checked` state.
- `suppressHydrationWarning` is applied on field wrappers to swallow extension-injected attribute mismatches.

### 9.5 Honeypot (anti-bot layer 2)

- Hidden `<input id="f-website" name="website">` rendered inside an `aria-hidden="true"` wrapper.
- CSS: `position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden`.
- Plus `tabIndex={-1}` and `autoComplete="off"`.
- API treats any non-empty `website` value as a bot, **silently returns `{ ok: true }`** (no email sent). This denies bots a signal to tune against.

---

## 10. API: `app/api/contact/route.ts`

```
Runtime:     nodejs
maxDuration: 10
Limits:      MAX_NAME = 200, MAX_MESSAGE = 5000
Allowed projects: "Custom SaaS" | "AI automation" | "Full-stack" | "Not sure yet"
```

### 10.1 Request handling pipeline (in order)

1. `await checkBotId()` — **Vercel BotID Basic verification**. If `verification.isBot`, respond `403 { ok: false, error: "Access denied" }`.
2. Verify `process.env.RESEND_API_KEY` (or fallback `RESEND_API`) is set; else `500 "Mail service not configured"`.
3. Parse body JSON; on failure respond `400 "Invalid JSON"`.
4. **Honeypot check** — if `body.website` is a non-empty string, respond `200 { ok: true }` and exit. No email sent.
5. Coerce string fields. `name`, `email`, and `message` are trimmed; `project` is matched verbatim against the allow-list (no trim). Validate lengths and email regex.
6. Compose email (plain text + branded HTML, all interpolated user fields run through `escapeHtml`).
7. Send via `Resend.emails.send` with:
   - `from`: `process.env.RESEND_FROM` (default `"WrenchIt <onboarding@resend.dev>"`)
   - `to`: `process.env.CONTACT_TO` (default `"carl@wrenchit.io"`)
   - `replyTo`: the submitter's email
   - `subject`: `New WrenchIt enquiry — ${name}`
8. On Resend failure or exception, respond `502 "Mail send failed"`.
9. Success: `200 { ok: true }`.

### 10.2 HTML escape helper

```ts
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
```

---

## 11. Security controls

### 11.1 Vercel BotID (layer 1 — sophisticated bots)

| Step | File | What |
|---|---|---|
| Install | `package.json` | `botid` dependency |
| Build wrap | `next.config.ts` | `export default withBotId(nextConfig)` — adds proxy rewrites for the BotID challenge endpoints |
| Client init | `instrumentation-client.ts` | `initBotId({ protect: [{ path: "/api/contact", method: "POST" }] })` |
| Server check | `app/api/contact/route.ts` | `const verification = await checkBotId(); if (verification.isBot) return 403` |

**Mode used:** **Basic** (default). Free on all Vercel plans, no dashboard configuration, no env vars, no API keys. Detection runs the moment a deploy is live.

**Not used:** Deep Analysis (Kasada-powered). Would require `advancedOptions.checkLevel: 'deepAnalysis'` on both client and server, available only on Pro/Enterprise, billed at $1 per 1,000 calls. Easy to opt in later if spam pressure rises.

**Local dev caveat:** `checkBotId()` returns `isHuman` by default in `next dev`. To simulate a bot locally, pass `developmentOptions: { bypass: "BAD-BOT" }`.

### 11.2 Honeypot (layer 2 — dumb scrapers)

Hidden `website` input. API responds `200 { ok: true }` (silent drop) when filled. Both client form state and API route handle the field.

### 11.3 Input hardening

- Whitelist for `project` value (only the four exact strings are accepted).
- Length caps: `MAX_NAME = 200`, `MAX_MESSAGE = 5000`.
- Strict trim before validation.
- All user-supplied strings escape-encoded before HTML email rendering.

### 11.4 External link hygiene

Every external `<a target="_blank">` carries `rel="noopener noreferrer"` and an sr-only `"(opens in new tab)"` indicator.

### 11.5 Runtime hardening

- API route pinned to `runtime: "nodejs"`, `maxDuration: 10` (cap function time, defends against slow-loris-style attacks).
- HTTP errors return structured JSON without leaking stack traces.

### 11.6 Platform HTTP headers (set in `vercel.json`)

Applied to every response (`source: "/(.*)"`), in the order they appear in `vercel.json`:

| Header | Value | Purpose |
|---|---|---|
| `X-DNS-Prefetch-Control` | `on` | Allow DNS prefetch hints for faster external assets |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS for 2 years on this host + all subdomains; HSTS-preload-eligible |
| `X-Frame-Options` | `SAMEORIGIN` | Block clickjacking via cross-origin iframes |
| `X-Content-Type-Options` | `nosniff` | Disable MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Strip referrer detail on cross-origin navigations |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Deny powerful APIs by default |

A rebuild that misses `vercel.json` will be missing all of these.

---

## 12. Performance optimisations

### 12.1 Server-first rendering

- `app/page.tsx` is a Server Component.
- All static sections (`Services`, `Process`, `Stack`, `FAQ`, `Footer`, `Hero`, `FounderCard`) render on the server. Only true interactivity lives in client islands: `Nav`, `ClientEffects`, `ShipLog`, `Products` (tabs + animated mocks), `Contact` (form).
- Threading `accent: string` (primitive) keeps RSC serialisation cheap.

### 12.2 Static asset hoisting

- `opengraph-image.tsx` reads `public/carl-portrait.png` once at **module scope** with top-level `await`, base64-encoding it into `portraitSrc`. The buffer is reused across invocations.
- `Products.QrGlyph` builds its 121 `<rect>` cells once into a module-level `QR_CELLS` constant, then returns a constant SVG wrapper.

### 12.3 Allocation-cheap regex

- `Contact.tsx` hoists `EMAIL_RE` to module scope so validation does not recompile the regex on each render.

### 12.4 Fonts

- `next/font/google` with `display: swap` for all three families.
- Only the weights actually used are loaded (Manrope: 5 weights; JetBrains Mono: 3 weights; Fraunces: italic only).

### 12.5 Images

- All raster images use `next/image` for optimisation.
- Logo (Nav) and founder portrait carry `priority` (above the fold).

### 12.6 Listeners

- Nav scroll listener uses `{ passive: true }`.
- All effect-registered intervals are cleared on unmount.

### 12.7 Motion preferences

- Every animated component (`ShipLog`, `TapDutyMock`, `TuckabyMock`, CSS reveal) checks `matchMedia("(prefers-reduced-motion: reduce)")` and skips timers if reduce is requested. The `<noscript>` style block also disables `.reveal` animations entirely without JS.

---

## 13. SEO & social

| Surface | Where | Notes |
|---|---|---|
| Title | `layout.tsx > metadata.title` | Keyword-led, ends with brand: "Custom Software & AI Automation Studio · Kuala Lumpur \| WrenchIt" |
| Description | `layout.tsx > metadata.description` | 1-sentence positioning with APAC geo |
| Canonical | `alternates.canonical: "/"` | Single canonical URL |
| Open Graph | `metadata.openGraph` | type: website, locale: `en_US` |
| Twitter card | `metadata.twitter` | `summary_large_image` |
| Geo hints | `metadata.other` | `geo.region`, `geo.placename`, `geo.position`, `ICBM` (KL coords) |
| OG image | `app/opengraph-image.tsx` | 1200×630, two-column: text left, portrait right, brand cream background |
| JSON-LD | `<script>` in `layout.tsx` | `ProfessionalService` + `FAQPage` graph |
| Sitemap | `app/sitemap.ts` | Single URL, monthly change frequency |
| Robots | `app/robots.ts` | Allow all, points to sitemap |
| 404 | `app/not-found.tsx` | Branded, `robots: { index: false, follow: false }` |
| Theme colour | `viewport.themeColor` | `#F4EFE6` light / `#0F1014` dark |

---

## 14. Accessibility patterns

- Skip-to-content link as the first body child.
- `<main id="main" tabIndex={-1}>` so the skip link can land focus correctly.
- Every section has `tabIndex={-1}` so deep-links can focus the landing section.
- All decorative SVGs use `aria-hidden="true"`. Icons in `Icon.tsx` default to `aria-hidden` unless a `title` prop is supplied — then they receive `role="img"` and `aria-label`.
- Form errors use `aria-invalid` + `aria-describedby`.
- Live region (`role="status"`, `aria-live="polite"`) announces async form states.
- Project radio group is implemented as `role="radiogroup"` with `role="radio"` + `aria-checked` buttons.
- Native `<details>`/`<summary>` for FAQ — keyboard accessible by default.
- `noscript` keeps content visible if JS fails.
- All animation respects `prefers-reduced-motion`.

---

## 15. Environment variables

| Name | Required | Default | Purpose |
|---|---|---|---|
| `RESEND_API_KEY` (or `RESEND_API`) | ✅ | — | Auth for Resend SDK. Without it, the API responds `500 Mail service not configured`. |
| `RESEND_FROM` | optional | `"WrenchIt <onboarding@resend.dev>"` | From-address for outbound mail. Must be a verified sender on Resend. |
| `CONTACT_TO` | optional | `"carl@wrenchit.io"` | Inbox that receives form submissions. |

No env vars are required for Vercel BotID Basic — provisioning is automatic on Vercel deploys when `withBotId()` is in `next.config.ts`.

---

## 16. Hosting & deployment

- **Vercel**, deployed from the `master` branch (production).
- Auto-deploys on push.
- The repository has no `.vercel/` directory; if local CLI integration is needed, run `vercel link`.
- Build is fully static apart from `/api/contact` (function) and `/opengraph-image` (built at deploy).
- Vercel BotID dashboards live under **Project → Firewall → traffic filter → BotID**.

### 16.1 `vercel.json` (platform configuration)

The repo root contains a `vercel.json` that pins platform behaviour independent of `next.config.ts`. Required for a faithful rebuild.

| Field | Value | Why |
|---|---|---|
| `framework` | `"nextjs"` | Explicit framework hint for Vercel build pipeline |
| `regions` | `["sfo1"]` | Function region pin — single primary region for the contact API |
| `env.NEXT_TELEMETRY_DISABLED` | `"1"` | Disable Next.js telemetry at build time |
| `trailingSlash` | `false` | Canonical URLs without trailing slash |
| `cleanUrls` | `true` | Strip `.html` from URLs (defensive — App Router doesn't emit them anyway) |

**Headers** — six security headers on all routes (see §11.6), plus immutable cache headers (`public, max-age=31536000, immutable`) for these path patterns:

- `*.ico`
- `*.{png,jpg,jpeg,gif,webp,avif,svg}`
- `*.{woff,woff2,ttf,eot,otf}`
- `/_next/static/*`

**Redirects** (permanent, status 308):

- `/home → /`
- `/index.html → /`

### 16.2 Lint configuration (`eslint.config.mjs`)

Flat config that composes `next/core-web-vitals` + `next/typescript` rules and ignores build outputs:

```js
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "node_modules/**"] },
];

export default eslintConfig;
```

---

## 17. Git conventions

- Commit messages use gitmoji prefixes:
  - `:zap:` perf
  - `:sparkles:` feature
  - `:lipstick:` UI polish
  - `:shield:` security
  - `:bug:` fix
- Master branch is the production branch on origin. There is also a `uat` branch on origin for staging.
- Never invent parallel branches like `main` — push to whatever exists on origin.

---

## 18. Acceptance checklist for a re-build

A reimplementation is "done" when **all** of the following are true:

- [ ] `npm install && npm run build` succeeds with zero TS / ESLint errors.
- [ ] `/` renders the seven sections in order: Hero → Services → Products → Process → Stack → FAQ → Contact, plus a Nav and Footer.
- [ ] Theme toggle in Nav switches `data-theme` between `light` and `dark`; all colours adapt.
- [ ] Scroll progress bar fills as the user scrolls.
- [ ] ShipLog rotates rows every 2.2 s; halts under `prefers-reduced-motion: reduce`.
- [ ] TapDuty mock's "checked-in" counter animates 38–42; Tuckaby progress bar advances; both halt under reduced-motion.
- [ ] QR glyph is generated once and rendered as a deterministic 11×11 SVG.
- [ ] FAQ section renders 8 questions as native `<details>`.
- [ ] `view-source:/` contains a JSON-LD `<script>` with both `ProfessionalService` and `FAQPage` entries.
- [ ] `GET /sitemap.xml` returns a sitemap with the homepage; `GET /robots.txt` references the sitemap.
- [ ] `GET /opengraph-image` returns a 1200×630 PNG with text left + portrait right.
- [ ] `POST /api/contact` with a valid payload returns `200 { ok: true }` and triggers a Resend email.
- [ ] `POST /api/contact` with `website: "anything"` returns `200 { ok: true }` **without** sending an email.
- [ ] `POST /api/contact` from a BotID-detected bot returns `403 { ok: false, error: "Access denied" }`.
- [ ] `curl -I https://<deploy>/` returns all six security headers from §11.6 (X-DNS-Prefetch-Control, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- [ ] `GET /home` and `GET /index.html` issue a permanent redirect to `/`.
- [ ] Static assets under `/_next/static/*` and image/font extensions return `Cache-Control: public, max-age=31536000, immutable`.
- [ ] Lighthouse on `/` — **target**: Performance ≥ 95, Accessibility ≥ 95, SEO = 100. Verify with `npx lighthouse <url> --only-categories=performance,accessibility,seo` and record actuals.
- [ ] All external links open in a new tab with `rel="noopener noreferrer"` and an sr-only "(opens in new tab)" indicator.
- [ ] No CSS framework, no UI library, no icon library installed.
