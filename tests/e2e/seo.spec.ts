import { test, expect } from "@playwright/test";

test.describe("SEO surfaces", () => {
  test("/robots.txt is 200 and points at the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-Agent:\s*\*/i);
    expect(body).toMatch(/Sitemap:\s*https:\/\/www\.wrenchit\.io\/sitemap\.xml/i);
  });

  test("/sitemap.xml is 200 and lists the canonical URL", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("https://www.wrenchit.io");
  });

  test("/opengraph-image returns an image", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/^image\//);
  });

  test("canonical link points at site root", async ({ page }) => {
    await page.goto("/");
    const href = await page.locator('link[rel="canonical"]').getAttribute("href");
    // Next.js metadata resolves metadataBase + "/" without a trailing slash.
    expect(href).toBe("https://www.wrenchit.io");
  });

  test("OG + Twitter meta are populated", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /WrenchIt/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  });
});
