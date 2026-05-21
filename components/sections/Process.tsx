type ProcessProps = {
  accent: string;
};

const steps = [
  {
    n: "01",
    t: "Tell us your problem",
    b: "We start with a conversation. What's broken? What do you need? No deck, no questionnaire — just a call.",
    duration: "Day 1",
  },
  {
    n: "02",
    t: "We propose a solution",
    b: "A clear scope, timeline, and price. One page. You'll know exactly what you're getting before you sign anything.",
    duration: "Week 1",
  },
  {
    n: "03",
    t: "We build and ship",
    b: "Two-week sprints. Working software every Friday. You see progress, give feedback, and steer the work.",
    duration: "Sprint 1—N",
  },
  {
    n: "04",
    t: "You go live",
    b: "We deploy, test, and hand over. Your product, your data, your control. Optional retainer for ongoing work.",
    duration: "Launch",
  },
];

export function Process({ accent }: ProcessProps) {
  return (
    <section id="process" className="section-pad proc" tabIndex={-1}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">How we work</div>
          <h2>From &ldquo;could you build…&rdquo; to live in production.</h2>
          <p>
            No proposals, no kick-off theatre. We move from conversation to shipping software in
            days, not months.
          </p>
        </div>

        <ol className="proc-list">
          {steps.map((s, i) => (
            <li className="proc-step" key={s.n}>
              <div className="proc-rail">
                <span className="proc-bullet" style={{ borderColor: accent }}>
                  <span className="proc-bullet-inner" style={{ background: accent }} />
                </span>
                {i < steps.length - 1 && <span className="proc-line" />}
              </div>
              <div className="proc-content">
                <div className="proc-meta">
                  <span className="proc-n mono">{s.n}</span>
                  <span className="proc-d mono">{s.duration}</span>
                </div>
                <div className="proc-body">
                  <h3 className="proc-t">{s.t}</h3>
                  <p className="proc-b">{s.b}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
