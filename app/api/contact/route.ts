import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const maxDuration = 10;

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_MESSAGE = 5000;
const VALID_PROJECTS = ["Custom SaaS", "AI automation", "Full-stack", "Not sure yet"] as const;

type Body = {
  name?: unknown;
  email?: unknown;
  project?: unknown;
  message?: unknown;
};

function bad(reason: string, status = 400) {
  return NextResponse.json({ ok: false, error: reason }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY / RESEND_API");
    return bad("Mail service not configured", 500);
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid JSON");
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const project = typeof body.project === "string" ? body.project : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > MAX_NAME) return bad("Invalid name");
  if (!EMAIL_RX.test(email)) return bad("Invalid email");
  if (!VALID_PROJECTS.includes(project as (typeof VALID_PROJECTS)[number])) return bad("Invalid project");
  if (message.length < 12 || message.length > MAX_MESSAGE) return bad("Invalid message");

  const resend = new Resend(apiKey);
  const subject = `New WrenchIt enquiry — ${name}`;
  const plain = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Project: ${project}`,
    ``,
    message,
  ].join("\n");
  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.55;color:#15161B">
    <p style="margin:0 0 16px"><strong>New WrenchIt enquiry</strong></p>
    <table style="border-collapse:collapse;margin:0 0 16px">
      <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B">Name</td><td style="padding:4px 0"><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#6B6B6B">Project</td><td style="padding:4px 0">${escapeHtml(project)}</td></tr>
    </table>
    <div style="white-space:pre-wrap;border-top:1px solid #eee;padding-top:16px">${escapeHtml(message)}</div>
  </div>`;

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || "WrenchIt <onboarding@resend.dev>",
      to: process.env.CONTACT_TO || "carl@wrenchit.io",
      replyTo: email,
      subject,
      text: plain,
      html,
    });
    if (error) {
      console.error("Resend error", error);
      return bad("Mail send failed", 502);
    }
  } catch (err) {
    console.error("Resend exception", err);
    return bad("Mail send failed", 502);
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
