import { test, expect } from "@playwright/test";

test.describe("Nav", () => {
  test("dark-mode toggle flips data-theme on <html>", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "light");

    const toggle = page.getByRole("button", { name: /switch to dark theme/i });
    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", "dark");

    const toggleBack = page.getByRole("button", { name: /switch to light theme/i });
    await toggleBack.click();
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("primary nav anchors scroll to their sections", async ({ page }) => {
    await page.goto("/");
    const primaryNav = page.getByRole("navigation", { name: "Primary" });

    await primaryNav.getByRole("link", { name: "Services", exact: true }).click();
    await expect(page.locator("#services")).toBeInViewport({ ratio: 0.05 });
    await expect(page).toHaveURL(/#services$/);

    await primaryNav.getByRole("link", { name: "Products", exact: true }).click();
    await expect(page.locator("#products")).toBeInViewport({ ratio: 0.05 });
    await expect(page).toHaveURL(/#products$/);
  });

  test("'Talk to us' CTA jumps to #contact and focuses it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /talk to us/i }).first().click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport({ ratio: 0.05 });
  });
});
