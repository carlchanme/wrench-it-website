import { test, expect } from "@playwright/test";

const valid = {
  name: "Carl Test",
  email: "carl+test@wrenchit.io",
  project: "Custom SaaS",
  message: "This is a valid message body for the contact form.",
};

test.describe("Contact API (direct, CONTACT_TEST_MODE=1)", () => {
  test("rejects invalid JSON", async ({ request }) => {
    // Buffer payload bypasses Playwright's auto-JSON-stringification so the route receives raw bytes.
    const res = await request.post("/api/contact", {
      headers: { "Content-Type": "application/json" },
      data: Buffer.from("not json at all"),
    });
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe("Invalid JSON");
  });

  test("rejects short name", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, name: "A" } });
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe("Invalid name");
  });

  test("rejects bad email", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, email: "no-at-sign" } });
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe("Invalid email");
  });

  test("rejects unknown project value", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, project: "Crypto rug" } });
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe("Invalid project");
  });

  test("rejects short message", async ({ request }) => {
    const res = await request.post("/api/contact", { data: { ...valid, message: "hi" } });
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe("Invalid message");
  });

  test("honeypot triggered: returns ok silently without validating", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { ...valid, name: "", email: "", message: "", website: "spam-bot" },
    });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  test("valid payload returns ok (Resend skipped in TEST_MODE)", async ({ request }) => {
    const res = await request.post("/api/contact", { data: valid });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  test("all four valid project values accepted", async ({ request }) => {
    for (const project of ["Custom SaaS", "AI automation", "Full-stack", "Not sure yet"]) {
      const res = await request.post("/api/contact", { data: { ...valid, project } });
      expect(res.status(), `project=${project}`).toBe(200);
    }
  });
});
