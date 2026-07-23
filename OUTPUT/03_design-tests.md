# PROMPT 3 of 3 - Level 3: design-as-TDD

> Paste after CLAUDE.md + DESIGN.md exist and lint clean (still on
> `redesign/level3`). Write the tests FIRST, confirm they fail for the right
> reason, then implement remaining routes against them with the Vizzly loop.

---

Write a test suite that enforces the design system defined in `DESIGN.md`. The
purpose of these tests is to catch **design-system drift** - the moment someone
reintroduces the purple accent, a hex color, a stats row under the hero, a
glassmorphic card, or a hover-scale effect, a test fails with a clear message
pointing to the violated rule. This is **not** a functional test suite. Functional
tests (the contact form's Resend/BotID submission, the `/batch` converter logic)
belong elsewhere and must not be mixed in.

**Source of truth: `DESIGN.md`.** Every testable rule maps to at least one test.
Where a rule is measurable, test it. Where a rule is subjective ("feels
editorial," "operator-led"), skip it - those are review-time judgments.

Write the tests **before** implementing the remaining routes, so the
implementation is forced to fit the tests.

Repo note: there is **no unit-test runner configured yet** (only Playwright for
e2e via `test:e2e`). Add **Vitest** for layers 1-2, and use the existing Playwright
setup for layer 3.

## Build the suite in four layers, in this order of priority

### 1. Static analysis - run on every commit (fastest, catches the most)
Scan `app/**` and `components/**` for banned patterns and fail with a pointed
message:
- Banned fonts as a primary face (Inter, Geist, Poppins, Montserrat, Roboto, DM
  Sans, Plus Jakarta, Open Sans, Nunito, **Manrope**, system-ui).
- Any hex (`#rrggbb`), `hsl(`, `rgb(`, or `rgba(` color literal in `globals.css`
  or any `.tsx`/`.css` (OKLCH only).
- The retired purple `#7A5AE0` or its OKLCH equivalent anywhere.
- The old radius ladder values (`6px`, `10px`, `16px`, `24px` as `border-radius`)
  - only `0` and `999px` allowed.
- `transform: translateY/scale` or `transition` on `transform` in hover rules; any
  `box-shadow` ladder (`--shadow-sm/md/lg`); `backdrop-filter` (glassmorphism);
  `radial-gradient`/`linear-gradient` (no gradients).

### 2. Component tests (Vitest + Testing Library) - render each primitive, assert
correct states AND verify forbidden variants do not exist. The point is to fail
when someone introduces "Card with shadow" or "PrimaryButtonLarge."
- **Button**: pill shape (999px) or 0-radius per DESIGN.md, single padding scale,
  no shadow utility, hover changes opacity/underline only (no transform). Exactly
  one component exports the primary variant; two or more near-duplicates fail.
- **Field** (contact form input): minimum 44px height; label rendered as a sibling
  element above the input (never as `placeholder` text); 1px border in `--line` by
  default, `--ink` on focus - assert the focus border color is not `--accent`.
- **Row / SpecTable**: dense vertical padding; mono metadata aligned right (assert
  it uses the JetBrains Mono font-family); single hairline bottom border in
  `--line`; no striped variant in source; no icons inside the spec table.
- **Eyebrow**: mono, uppercase, tracked; uses `--ink-soft`/`--muted`, never
  `--accent` as fill.
- **Section**: 0-radius surfaces; vertical padding is one of 96/144/192px; no
  `box-shadow`.

### 3. Visual regression (Playwright)
Screenshot `/`, `/batch`, `/faq` (if present), and the 404 at 1440px and 375px;
diff against committed baselines. Assert the hero has exactly one CTA and no
stats row.

### 4. Vizzly - human-in-the-loop TDD loop
Requires Node 22+. One-time: `npm install -g @vizzly-testing/cli && vizzly init`.
- Start the local TDD server: `vizzly tdd start` (diffs at
  `http://localhost:47392`), and run `npm test -- --watch`.
- Then implement each remaining route/section with TDD using the Vizzly CLI as the
  testing medium. Claude writes `vizzly` tests that push Playwright screenshots to
  the viewer; approve or deny each diff. Every rejected diff becomes feedback for
  the next pass until the design converges.
- Typical instruction: `implement the shipped-work section with TDD using the
  Vizzly CLI`.

Routes still to implement/verify against this suite: `/` (six sections), `/batch`,
`/faq` (if moved), the branded 404, and the contact-form empty/error/success
states.

Testing depth requested for this project: **(d) full Vizzly TDD**.
