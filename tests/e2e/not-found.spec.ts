import { test, expect } from "@playwright/test";

test.describe("404", () => {
  test("unknown URL returns 404 with branded copy", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/404 · not found/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /slipped through/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  });

  test("404 page is marked noindex,nofollow", async ({ page }) => {
    await page.goto("/another-bad-url");
    // Next.js can emit multiple robots meta tags; assert that the combined directive set covers both.
    const contents = await page.locator('meta[name="robots"]').evaluateAll((els) =>
      els.map((el) => (el as HTMLMetaElement).content.toLowerCase()),
    );
    const joined = contents.join(",");
    expect(joined).toMatch(/noindex/);
    expect(joined).toMatch(/nofollow/);
  });
});
