const tech = [
  { name: "React", d: "UI library" },
  { name: "React Native", d: "Mobile apps" },
  { name: "Next.js", d: "Framework" },
  { name: "Node.js", d: "Runtime" },
  { name: "Python", d: "Data & ML" },
  { name: "Supabase", d: "DB + auth" },
  { name: "Vercel", d: "Hosting" },
  { name: "AWS", d: "Infra" },
  { name: "n8n", d: "Automation" },
  { name: "Claude", d: "LLM" },
  { name: "OpenAI", d: "LLM" },
  { name: "ElevenLabs", d: "Voice AI" },
];

export function Stack() {
  return (
    <section id="stack" className="section-pad stk">
      <div className="container">
        <div className="stk-head">
          <div className="eyebrow">Our stack</div>
          <h2 className="stk-title">
            Boring tools. <span className="serif">Sharp execution.</span>
          </h2>
          <p className="stk-sub">
            We pick tools that we trust at 2 a.m. — well-documented, well-supported, and easy to
            hand over.
          </p>
        </div>

        <div className="stk-grid">
          {tech.map((t) => (
            <div className="stk-cell" key={t.name}>
              <span className="stk-name">{t.name}</span>
              <span className="stk-d mono">{t.d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
