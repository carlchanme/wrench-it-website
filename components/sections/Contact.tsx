"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Icon } from "@/components/Icon";

type ContactProps = {
  accent: string;
};

type FormState = {
  name: string;
  email: string;
  project: string;
  message: string;
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const projects = ["Custom SaaS", "AI automation", "Full-stack", "Not sure yet"];

export function Contact({ accent }: ContactProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    project: "Custom SaaS",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const update =
    (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = (): Errors => {
    const errs: Errors = {};
    if (form.name.trim().length < 2) errs.name = "Tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Need a valid email.";
    if (form.message.trim().length < 12) errs.message = "A sentence or two, please.";
    return errs;
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    setTimeout(() => setState("sent"), 900);
  };

  const reset = () => {
    setForm({ name: "", email: "", project: "Custom SaaS", message: "" });
    setErrors({});
    setState("idle");
  };

  return (
    <section id="contact" className="section-pad cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-left">
            <div className="eyebrow">Let&apos;s build</div>
            <h2 className="cta-h">
              Ready to build something <span className="serif">that works?</span>
            </h2>
            <p className="cta-sub">
              Tell us what you need. We reply within 24 hours, almost always with a 15-minute call
              slot.
            </p>

            <div className="cta-direct">
              <a href="mailto:hello@wrenchit.io" className="cta-direct-row">
                <Icon name="mail" size={18} />
                <span>hello@wrenchit.io</span>
              </a>
              <div className="cta-direct-row" aria-hidden="true">
                <Icon name="clock" size={18} />
                <span>Mon–Fri · 9am to 6pm MYT</span>
              </div>
              <div className="cta-direct-row" aria-hidden="true">
                <Icon name="dot" size={18} />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
              <div className="cta-direct-row cta-direct-note" aria-hidden="true">
                <span className="cta-direct-bar" />
                <span>
                  Asia-Pacific time zone. Overlapping hours with Singapore, Sydney, Tokyo, Dubai,
                  and London mornings.
                </span>
              </div>
            </div>
          </div>

          <form
            className={`cta-form ${state === "sent" ? "is-sent" : ""}`}
            onSubmit={submit}
            noValidate
          >
            {state !== "sent" ? (
              <>
                <div className="fld" suppressHydrationWarning>
                  <label htmlFor="f-name">Your name</label>
                  <input
                    id="f-name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Alex Tan"
                    autoComplete="name"
                  />
                  {errors.name && <span className="fld-err">{errors.name}</span>}
                </div>
                <div className="fld" suppressHydrationWarning>
                  <label htmlFor="f-email">Email</label>
                  <input
                    id="f-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  {errors.email && <span className="fld-err">{errors.email}</span>}
                </div>
                <div className="fld" suppressHydrationWarning>
                  <label>I&apos;m interested in</label>
                  <div className="seg">
                    {projects.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        className={`seg-opt ${form.project === opt ? "is-on" : ""}`}
                        onClick={() => setForm((f) => ({ ...f, project: opt }))}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="fld" suppressHydrationWarning>
                  <label htmlFor="f-msg">What are you building?</label>
                  <textarea
                    id="f-msg"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Describe the problem in your own words. No tech talk needed."
                  />
                  {errors.message && <span className="fld-err">{errors.message}</span>}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary cta-submit"
                  disabled={state === "sending"}
                  style={{ background: state === "sending" ? "var(--ink-2)" : undefined }}
                >
                  {state === "sending" ? "Sending…" : "Send it"}
                  {state !== "sending" && (
                    <span className="arrow">
                      <Icon name="arrow" size={14} />
                    </span>
                  )}
                </button>
                <p className="cta-fine">
                  By sending, you agree we&apos;ll email you back at{" "}
                  <strong>{form.email || "your address"}</strong>. We don&apos;t share it, ever.
                </p>
              </>
            ) : (
              <div className="sent">
                <div className="sent-check" style={{ borderColor: accent, color: accent }}>
                  <Icon name="check" size={28} stroke={2} />
                </div>
                <h3 className="sent-h">Message sent.</h3>
                <p className="sent-p">
                  Thanks, <strong>{form.name.split(" ")[0]}</strong>. We&apos;ll reply within 24
                  hours, usually faster.
                </p>
                <button type="button" className="btn btn-ghost" onClick={reset}>
                  Send another
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
