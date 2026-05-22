# Pre-merge checklist — wrench-it-website

Run this gate before merging anything into `master` (production). All five steps must be green.

> Branches: `master` = production (live on www.wrenchit.io), no `uat` yet, no `main`.
>
> **Steps 1–4 also run in CI** via `.github/workflows/e2e.yml` on every PR targeting `master`
> and on direct pushes to `master`. Run them locally to fail fast before pushing. Step 5
> (preview-deploy smoke) is still manual — CI can't verify Resend deliverability or the
> Vercel-edge security headers.

## 1. Lint

```bash
npm run lint
```

ESLint flat config (`next/core-web-vitals` + `next/typescript`). Zero warnings, zero errors.

## 2. Typecheck

```bash
npm run typecheck
```

`tsc --noEmit` against the repo. `strict: true` is on in `tsconfig.json`.

## 3. Production build

```bash
npm run build
```

Catches build-time failures the dev server hides (RSC boundary issues, font fetches, OG image generation, sitemap/robots route execution).

## 4. End-to-end tests

```bash
npm run test:e2e
```

Boots a production build on port 3100 with `CONTACT_TEST_MODE=1` and runs Playwright (chromium) against:

- **homepage.spec** — 200, title, h1, every section anchor, skip-link, JSON-LD shape
- **nav.spec** — dark-mode toggle flips `data-theme`, anchor links scroll into view, "Talk to us" jumps to `#contact`
- **contact-form.spec** — client validation, happy path (intercepted), API failure UX, segmented project picker
- **contact-api.spec** — every validation branch, honeypot, valid payload (Resend skipped)
- **seo.spec** — `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, canonical, OG/Twitter meta
- **not-found.spec** — 404 status, branded copy, `noindex,nofollow`

On failure: `npm run test:e2e:report` to open the HTML report; traces/videos/screenshots are in `playwright-report/`.

## 5. Preview deploy smoke (manual, ~2 min)

After the four automated gates pass, push the branch and open the Vercel preview URL.

```bash
# After git push, find the preview URL in the Vercel dashboard
curl -I <preview-url>/ | grep -i 'x-frame-options\|strict-transport-security'
```

Then manually:

- [ ] Open the preview URL on desktop Chrome and iOS Safari (browser, not simulator).
- [ ] Toggle dark mode, scroll the page — animations + reveal land smoothly.
- [ ] Submit the contact form **once** with your real email. Confirm:
  - The success card renders ("Message sent. Thanks, <name>.").
  - An email lands in `carl@wrenchit.io` (or whatever `CONTACT_TO` resolves to on Vercel).
- [ ] Check `<preview>/robots.txt` returns the expected body (no `Disallow: /` regression).
- [ ] Check `<preview>/sitemap.xml` lists the canonical URL.

## What's *not* in this gate

- **Vercel-edge security headers** (`X-Frame-Options`, HSTS, etc. from `vercel.json`). These are applied by Vercel only, not by `next start`. Verify via curl on the preview URL in step 5.
- **Resend deliverability.** TEST_MODE skips the actual send. The only way to verify the email actually leaves is the manual preview-deploy submission.
- **Vercel BotID.** Disabled in TEST_MODE. Vercel applies it on real previews/production.

## When something fails

- Lint/typecheck/build failures → fix in place, never bypass with `--no-verify` or skip flags.
- E2E failure → open `playwright-report/`, look at the trace. If the test is genuinely flaky (not a real bug), mark with `test.fixme()` and file a follow-up — don't delete it.
- Preview smoke failure → do not merge. Roll back or fix on the branch first.
