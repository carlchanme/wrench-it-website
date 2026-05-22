export const faqs: { q: string; a: string }[] = [
  {
    q: "How long does a typical project take?",
    a: "Two-week sprints with working software every Friday. Most builds land in 6–12 weeks from kickoff to live.",
  },
  {
    q: "What does it cost?",
    a: "Every engagement starts with a one-page scope and price you'll see before signing. Reach out and we'll send a number within 24 hours.",
  },
  {
    q: "Do I own the code?",
    a: "100% of the code is yours on day one. We work directly in your GitHub. No vendor lock-in, no proprietary platforms.",
  },
  {
    q: "Where are you based, and what time zones do you work in?",
    a: "Kuala Lumpur, Malaysia (UTC+8). We overlap fully with Singapore, Sydney, Tokyo, and Dubai, and catch London mornings.",
  },
  {
    q: "Do you work with non-technical founders?",
    a: "Often. Bring the business problem in plain language — we'll translate it into working software and walk you through the engineering decisions as they come up.",
  },
  {
    q: "What stack do you use?",
    a: "Next.js, React, React Native, Node, Python. Supabase, Vercel, AWS for infra. Claude and OpenAI for LLMs, ElevenLabs for voice. Boring, well-supported tools we trust at 2 a.m.",
  },
  {
    q: "How does AI automation work in practice?",
    a: "It's usually one or two specific bottlenecks, not 'AI everywhere'. Inbox triage, document extraction, voice agents, decision support. We embed AI where it earns its keep.",
  },
  {
    q: "Can you build mobile apps?",
    a: "Yes — React Native for iOS and Android from one codebase. TapDuty's app runs on it. Native when there's a real reason.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-pad faq" tabIndex={-1}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Frequently asked</div>
          <h2>
            Common questions <span className="serif">we hear.</span>
          </h2>
          <p>Most of what founders ask us before signing — answered up front.</p>
        </div>

        <div className="faq-list">
          {faqs.map(({ q, a }) => (
            <details key={q} className="faq-item">
              <summary className="faq-q">
                <span>{q}</span>
                <span className="faq-chev" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="faq-a">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
