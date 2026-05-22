import { test, expect } from "@playwright/test";

test.describe("Contact form (UI)", () => {
  test("client-side validation blocks short name, bad email, short message", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByLabel("Your name").fill("A");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("What are you building?").fill("short");
    await page.getByRole("button", { name: /send it/i }).click();

    await expect(page.locator("#f-name-err")).toBeVisible();
    await expect(page.locator("#f-email-err")).toBeVisible();
    await expect(page.locator("#f-msg-err")).toBeVisible();
  });

  test("happy path: valid form submits and renders 'Message sent.' state", async ({ page }) => {
    // Intercept so we never depend on the real API even though TEST_MODE is on.
    // This keeps the UI test isolated from any backend regression.
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
    );

    await page.goto("/#contact");
    await page.getByLabel("Your name").fill("Carl Test");
    await page.getByLabel("Email").fill("carl+test@wrenchit.io");
    await page.getByLabel("What are you building?").fill("I want a tiny SaaS that does X and Y for my team.");
    await page.getByRole("button", { name: /send it/i }).click();

    await expect(page.getByRole("heading", { name: /message sent/i })).toBeVisible();
    await expect(page.getByText(/Thanks, Carl/i)).toBeVisible();
  });

  test("API failure surfaces the error UI", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ ok: false, error: "boom" }) }),
    );

    await page.goto("/#contact");
    await page.getByLabel("Your name").fill("Carl Test");
    await page.getByLabel("Email").fill("carl+test@wrenchit.io");
    await page.getByLabel("What are you building?").fill("Long enough message for the validator.");
    await page.getByRole("button", { name: /send it/i }).click();

    await expect(page.locator(".cta-err")).toContainText(/couldn.t send/i);
  });

  test("'I'm interested in' segmented control switches projects", async ({ page }) => {
    await page.goto("/#contact");
    const aiOption = page.getByRole("radio", { name: "AI automation" });
    await aiOption.click();
    await expect(aiOption).toHaveAttribute("aria-checked", "true");
  });
});
