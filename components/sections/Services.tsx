import { Icon, type IconName } from "@/components/Icon";

type ServicesProps = {
  accent: string;
};

const items: { tag: string; icon: IconName; title: string; blurb: string; points: string[] }[] = [
  {
    tag: "01",
    icon: "cube",
    title: "Custom SaaS products",
    blurb:
      "Production-grade web and mobile apps, end-to-end. Your idea, our engineering — shipped to your users.",
    points: [
      "Discovery & scope in a week",
      "Design + build in 2-week sprints",
      "Deployed on Vercel, AWS, or Supabase",
    ],
  },
  {
    tag: "02",
    icon: "spark",
    title: "AI automation",
    blurb:
      "We embed AI where it earns its keep — voice agents, intelligent inbox triage, document extraction, decision support.",
    points: [
      "LLM workflows with Claude & OpenAI",
      "Voice & realtime with ElevenLabs",
      "n8n + custom pipelines, observable",
    ],
  },
  {
    tag: "03",
    icon: "stack",
    title: "Full-stack development",
    blurb:
      "React, React Native, Next.js, Node. Modern stack, clean code, fast delivery — handed over with docs you can read.",
    points: [
      "Web apps, mobile apps, dashboards",
      "Type-safe APIs and integrations",
      "100% of the code is yours, day one",
    ],
  },
];

export function Services({ accent }: ServicesProps) {
  return (
    <section id="services" className="section-pad srv">
      <div className="container">
        <div className="srv-head">
          <div>
            <div className="eyebrow">What we do</div>
            <h2 className="srv-title">
              Three doors in.
              <br />
              <span className="serif">One team that ships.</span>
            </h2>
          </div>
          <p className="srv-sub">
            We work the way a small in-house team would — except faster, with sharper opinions, and
            without the headcount overhead.
          </p>
        </div>

        <div className="srv-grid">
          {items.map((it) => (
            <article key={it.tag} className="srv-card">
              <div className="srv-card-top">
                <span className="srv-tag mono">{it.tag}</span>
                <span className="srv-icon" style={{ color: accent }}>
                  <Icon name={it.icon} size={26} stroke={1.5} />
                </span>
              </div>
              <h3 className="srv-card-title">{it.title}</h3>
              <p className="srv-card-blurb">{it.blurb}</p>
              <ul className="srv-card-list">
                {it.points.map((p) => (
                  <li key={p}>
                    <span className="srv-check" style={{ color: accent }}>
                      <Icon name="check" size={16} />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="srv-card-foot">
                <a href="#contact" className="srv-link">
                  Start a project <Icon name="arrow" size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
