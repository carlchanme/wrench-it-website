import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders title, h1, and every section anchor", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/WrenchIt/i);
    await expect(page.locator("h1").first()).toBeVisible();

    for (const id of ["services", "products", "process", "stack", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("skip-link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText(/skip to content/i);
  });

  test("ProfessionalService + FAQPage JSON-LD is present and parseable", async ({ page }) => {
    await page.goto("/");
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(ld).toBeTruthy();
    const parsed = JSON.parse(ld!);
    const graph = parsed["@graph"] as Array<{ "@type": string }>;
    const types = graph.map((n) => n["@type"]);
    expect(types).toContain("ProfessionalService");
    expect(types).toContain("FAQPage");
  });

});
