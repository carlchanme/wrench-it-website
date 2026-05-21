# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Commands

- `npm run dev` — dev server on http://localhost:3000 via **Turbopack** (`next dev --turbopack`).
- `npm run build` — production build (Turbopack).
- `npm run start` — serve the production build.
- `npm run lint` — ESLint via `eslint .` (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`).

No test runner is configured.

## Package manager

`package.json` declares `packageManager: yarn@3.6.4`, but the repo has a committed `package-lock.json` and no `yarn.lock`. Use **npm** — don't run `yarn install` or it will create a parallel lockfile.

## Stack

Next.js 16 App Router + React 19, TypeScript `strict`. Deployed on Vercel. No Tailwind, no shadcn, no CSS framework — all styling is hand-written CSS.

## Architecture

- **`app/layout.tsx`** — sets up three Google fonts (`Manrope`, `JetBrains_Mono`, `Fraunces`) as CSS variables (`--font-manrope`, `--font-jetbrains-mono`, `--font-fraunces`) and exports site metadata.
- **`app/page.tsx`** — `"use client"` orchestrator. Owns three effects:
  1. dark mode toggle (writes `data-theme` to `<html>`),
  2. accent color injection (writes `--accent` / `--accent-soft` CSS vars),
  3. scroll-reveal via `IntersectionObserver` on `.reveal` elements (adds `.in` class).
  Composes the page from `components/sections/*` (Nav, Hero, Services, Products, Process, Stack, Contact, Footer).
- **`components/sections/*.tsx`** — one file per page section. Each owns its own JSX + uses semantic class names defined in `globals.css`.
- **`components/Icon.tsx`** — hand-rolled SVG icon component. Add new icons to the `IconName` union and the switch statement inside. Do not pull in icon libraries.
- **`app/globals.css`** — all design tokens + every section's styles. Light theme in `:root`, dark theme in `:root[data-theme="dark"]`. Token names: `--bg`, `--ink`, `--paper`, `--accent`, `--navy`, etc. (NOT shadcn-style `--background` / `--foreground`.)

## Styling

- Hand-written CSS only. No utility classes — sections use semantic class names like `.hero-grid`, `.srv-card`, `.proc-step`.
- New styles go in `app/globals.css` under the relevant section banner comment.
- Theme switching is driven by `data-theme="dark"` on `<html>`, set by the dark-mode toggle in `app/page.tsx`.

## Path aliases

`@/*` resolves to the repo root (see `tsconfig.json`). Used as `@/components/sections/...` and `@/components/Icon`.

## Hosting

Deployed on Vercel. The repo root has no `.vercel/` directory; run `vercel link` if you need local CLI integration.
