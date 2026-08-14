"use client";

import { useEffect, useState } from "react";

const events = [
  { t: "16:42", k: "deploy", target: "tapduty / shift-engine", note: "v2.18.0 → production" },
  { t: "16:21", k: "build", target: "cusp / class-packs", note: "credit expiry rules" },
  { t: "15:58", k: "ship", target: "client / pos-dashboard", note: "→ live to 12 stores" },
  { t: "15:33", k: "merge", target: "tapduty / qr-attendance", note: "PR #284 squashed" },
  { t: "14:50", k: "deploy", target: "cusp / booking-widget", note: "embed v1.4.0" },
  { t: "14:11", k: "build", target: "client / inbox-triage", note: "Claude function-calling" },
  { t: "13:40", k: "ship", target: "tapduty / commission-v2", note: "scheduled rollout 18:00" },
];

export function ShipLog() {
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
              style={
                e.k === "ship"
                  ? { color: "var(--accent)", borderColor: "var(--accent)" }
                  : undefined
              }
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
              stroke="var(--accent)"
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
