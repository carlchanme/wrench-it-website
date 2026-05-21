"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";

type HeroProps = {
  accent: string;
};

const events = [
  { t: "16:42", k: "deploy", target: "tapduty / shift-engine", note: "v2.18.0 → production" },
  { t: "16:21", k: "build", target: "tuckaby / narrator-svc", note: "ElevenLabs streaming" },
  { t: "15:58", k: "ship", target: "client / pos-dashboard", note: "→ live to 12 stores" },
  { t: "15:33", k: "merge", target: "tapduty / qr-attendance", note: "PR #284 squashed" },
  { t: "14:50", k: "deploy", target: "tuckaby / story-vault", note: "47 new titles" },
  { t: "14:11", k: "build", target: "client / inbox-triage", note: "Claude function-calling" },
  { t: "13:40", k: "ship", target: "tapduty / commission-v2", note: "scheduled rollout 18:00" },
];

export function Hero({ accent }: HeroProps) {
  return (
    <section id="top" className="hero" tabIndex={-1}>
      <div className="container hero-grid">
        <div className="hero-left">
          <div className="hero-eyebrow eyebrow">
            <span className="hero-dot" /> Available for new projects
          </div>

          <h1 className="hero-h1">
            <span className="hero-line">Production software.</span>
            <span className="hero-line">
              <span className="hero-accent serif">
                Built by operators.
                <svg
                  className="hero-underline"
                  viewBox="0 0 600 22"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 14 C 120 4, 280 4, 598 12"
                    fill="none"
                    stroke={accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p className="hero-sub">
            A lean software studio. We design, build, and ship AI&#8209;powered web apps, mobile apps,
            and automation — for founders and SMEs who need working software, not roadmaps.
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              Start a project
              <span className="arrow">
                <Icon name="arrow" size={14} />
              </span>
            </a>
            <a href="#products" className="btn btn-ghost">
              See what we&apos;ve shipped
            </a>
          </div>

          <ul className="hero-meta">
            <li>
              <span className="hero-meta-num">10K+</span>
              <span className="hero-meta-lbl">daily active users</span>
            </li>
            <li>
              <span className="hero-meta-num">14 days</span>
              <span className="hero-meta-lbl">idea → first deploy</span>
            </li>
            <li>
              <span className="hero-meta-num">100%</span>
              <span className="hero-meta-lbl">code ownership, day one</span>
            </li>
          </ul>
        </div>

        <div className="hero-right">
          <FounderCard />
          <ShipLog accent={accent} />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <div
          className="hero-glow"
          style={{
            background: `radial-gradient(60% 60% at 70% 30%, ${accent}22, transparent 70%)`,
          }}
        />
      </div>
    </section>
  );
}

function FounderCard() {
  return (
    <div className="founder-card">
      <div className="founder-photo">
        <Image
          src="/carl-portrait.png"
          alt="Carl — founder of WrenchIt"
          width={160}
          height={200}
          priority
        />
      </div>
      <div className="founder-meta">
        <div className="founder-eye mono">Founded by</div>
        <h3 className="founder-name">Carl</h3>
        <p className="founder-role">
          Engineering leader · 15+ years shipping production software.
        </p>
      </div>
    </div>
  );
}

function ShipLog({ accent }: { accent: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % events.length), 2200);
    return () => clearInterval(id);
  }, []);

  const visible = [];
  for (let i = 0; i < 5; i++) visible.push(events[(idx + i) % events.length]);

  return (
    <div className="ship">
      <div className="ship-head">
        <div className="ship-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="ship-title mono">ship.log</div>
        <div className="ship-pill">
          <span className="ship-pill-dot" /> live
        </div>
      </div>
      <div className="ship-body mono">
        {visible.map((e, i) => (
          <div key={idx + "-" + i} className={`ship-row ship-row-${i}`}>
            <span className="ship-time">{e.t}</span>
            <span
              className={`ship-tag ship-tag-${e.k}`}
              style={e.k === "ship" ? { color: accent, borderColor: accent } : undefined}
            >
              {e.k}
            </span>
            <span className="ship-target">{e.target}</span>
            <span className="ship-note">{e.note}</span>
          </div>
        ))}
      </div>
      <div className="ship-footer">
        <div className="ship-stat">
          <span className="ship-stat-label mono">today</span>
          <span className="ship-stat-num">7 deploys</span>
        </div>
        <div className="ship-spark" aria-hidden="true">
          <svg viewBox="0 0 120 32" preserveAspectRatio="none">
            <polyline
              points="0,24 12,22 24,18 36,20 48,12 60,16 72,8 84,12 96,6 108,10 120,4"
              fill="none"
              stroke={accent}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
