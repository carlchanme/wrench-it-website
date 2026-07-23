"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

type ProductsProps = {
  accent: string;
};

type ProductKey = "tapduty" | "tuckaby";

type Product = {
  label: string;
  name: string;
  url: string;
  year: string;
  blurb: string;
  stats: { k: string; v: string }[];
  tags: string[];
  colorA: string;
  colorB: string;
};

const products: Record<ProductKey, Product> = {
  tapduty: {
    label: "Workforce Management",
    name: "TapDuty",
    url: "tapduty.com",
    year: "2025",
    blurb:
      "A workforce management platform built for SMEs. QR-code attendance, shift scheduling, real-time dashboards, and commission tracking — all in one system.",
    stats: [
      { k: "1,200+", v: "shifts/week" },
      { k: "12 SMEs", v: "in production" },
      { k: "2 min", v: "to onboard a team" },
    ],
    tags: ["Next.js", "Supabase", "QR check-in"],
    colorA: "#2E3B8E",
    colorB: "#4B5BAE",
  },
  tuckaby: {
    label: "Bedtime Stories",
    name: "Tuckaby",
    url: "tuckaby.app",
    year: "2026",
    blurb:
      "A bedtime story web app that reads storybooks aloud to kids — turning screen time into sleep time. AI narration with calm, expressive voices.",
    stats: [
      { k: "47", v: "stories at launch" },
      { k: "8 min", v: "avg. read length" },
      { k: "0 ads", v: "ever" },
    ],
    tags: ["Next.js", "ElevenLabs", "Vercel", "Claude API"],
    colorA: "#3D2E5E",
    colorB: "#7A5AE0",
  },
};

export function Products({ accent }: ProductsProps) {
  const [active, setActive] = useState<ProductKey>("tapduty");
  const p = products[active];

  return (
    <section id="products" className="section-pad prd" tabIndex={-1}>
      <div className="container">
        <div className="prd-head">
          <div>
            <div className="eyebrow">What we&apos;ve built</div>
            <h2 className="prd-title">
              Real products. <span className="serif">Real users.</span>
            </h2>
          </div>
          <div className="prd-tabs" aria-label="Choose a product">
            {(Object.entries(products) as [ProductKey, Product][]).map(([key, v]) => (
              <button
                type="button"
                key={key}
                aria-pressed={active === key}
                onClick={() => setActive(key)}
                className={`prd-tab ${active === key ? "is-active" : ""}`}
              >
                <span className="prd-tab-dot" style={{ background: v.colorA }} aria-hidden="true" />
                {v.name}
              </button>
            ))}
          </div>
        </div>

        <article className="prd-card" data-product={active}>
          <div className="prd-info">
            <div className="prd-meta-row">
              <span className="prd-label">{p.label}</span>
              <span className="prd-sep">·</span>
              <span className="prd-year mono">{p.year}</span>
            </div>
            <h3 className="prd-name">{p.name}</h3>
            <p className="prd-blurb">{p.blurb}</p>

            <ul className="prd-stats">
              {p.stats.map((s) => (
                <li key={s.k}>
                  <span className="prd-stat-k">{s.k}</span>
                  <span className="prd-stat-v">{s.v}</span>
                </li>
              ))}
            </ul>

            <div className="prd-tags">
              {p.tags.map((t) => (
                <span key={t} className="prd-tag mono">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={`https://${p.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="prd-visit"
            >
              <span>Visit {p.url}</span>
              <Icon name="arrow-up" size={16} />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>

          <div className="prd-visual" inert aria-hidden="true">
            {active === "tapduty" ? <TapDutyMock accent={accent} /> : <TuckabyMock accent={accent} />}
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- TapDuty mock: dashboard + phone QR ---------- */
function TapDutyMock({ accent }: { accent: string }) {
  const [count, setCount] = useState(38);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCount((c) => (c < 42 ? c + 1 : 38)), 1800);
    return () => clearInterval(id);
  }, []);

  const roster: [string, string, string, string, string][] = [
    ["A. Tan", "Floor", "09:00 – 17:00", "in", "#4F7A4E"],
    ["M. Iskandar", "Kitchen", "10:00 – 18:00", "in", "#4F7A4E"],
    ["P. Lee", "Cashier", "12:00 – 20:00", "soon", accent],
    ["S. Devi", "Floor", "14:00 – 22:00", "—", "#9BA0AC"],
  ];

  return (
    <div className="td">
      {/* Browser dashboard */}
      <div className="td-browser">
        <div className="td-browser-bar">
          <span className="td-dot td-dot-r" />
          <span className="td-dot td-dot-y" />
          <span className="td-dot td-dot-g" />
          <div className="td-url mono">app.tapduty.com / dashboard</div>
        </div>
        <div className="td-app">
          <aside className="td-side">
            <div className="td-side-logo">
              <span style={{ background: "#2E3B8E" }} />
              <span className="td-side-name">TapDuty</span>
            </div>
            <nav>
              <a className="is-active">
                <i /> Dashboard
              </a>
              <a>
                <i /> Shifts
              </a>
              <a>
                <i /> Attendance
              </a>
              <a>
                <i /> Commissions
              </a>
              <a>
                <i /> Team
              </a>
            </nav>
          </aside>
          <div className="td-main">
            <div className="td-h">
              <div>
                <div className="td-h-eye mono">monday, 18 may</div>
                <div className="td-h-title">Today&apos;s roster</div>
              </div>
              <div className="td-h-chip">
                <span className="td-h-dot" />
                <span className="mono">{count}/42 checked in</span>
              </div>
            </div>
            <div className="td-kpis">
              <div className="td-kpi">
                <div className="td-kpi-label">on shift</div>
                <div className="td-kpi-num">{count}</div>
                <svg className="td-kpi-spark" viewBox="0 0 60 18" preserveAspectRatio="none">
                  <polyline
                    points="0,14 10,12 20,10 30,12 40,6 50,8 60,4"
                    fill="none"
                    stroke="#2E3B8E"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="td-kpi">
                <div className="td-kpi-label">commissions</div>
                <div className="td-kpi-num">RM 4,820</div>
                <svg className="td-kpi-spark" viewBox="0 0 60 18" preserveAspectRatio="none">
                  <polyline
                    points="0,14 10,10 20,12 30,8 40,9 50,5 60,3"
                    fill="none"
                    stroke={accent}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="td-kpi">
                <div className="td-kpi-label">no-shows</div>
                <div className="td-kpi-num">2</div>
                <svg className="td-kpi-spark" viewBox="0 0 60 18" preserveAspectRatio="none">
                  <polyline
                    points="0,4 10,6 20,5 30,9 40,7 50,11 60,12"
                    fill="none"
                    stroke="#B14A36"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="td-roster">
              <div className="td-roster-h">
                <span>Name</span>
                <span>Role</span>
                <span>Shift</span>
                <span>Status</span>
              </div>
              {roster.map(([n, r, sh, st, c]) => (
                <div className="td-roster-row" key={n}>
                  <span
                    className="td-av"
                    style={{
                      background: `color-mix(in oklab, ${c} 25%, transparent)`,
                      color: c,
                    }}
                  >
                    {n.split(" ")[0][0]}
                  </span>
                  <span className="td-cell-name">{n}</span>
                  <span className="td-cell-mute">{r}</span>
                  <span className="td-cell-mute mono">{sh}</span>
                  <span className="td-pill" style={{ color: c, borderColor: c }}>
                    {st}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone overlay */}
      <div className="td-phone">
        <div className="td-phone-bar">
          <span>9:41</span>
          <span className="mono">tapduty</span>
        </div>
        <div className="td-phone-body">
          <div className="td-phone-greet">Hi, Alia 👋</div>
          <div className="td-phone-sub">Scan to check in</div>
          <div className="td-qr">
            <QrGlyph />
            <div className="td-qr-scan" />
          </div>
          <div className="td-phone-shift">
            <div>
              <div className="td-phone-shift-l">Next shift</div>
              <div className="td-phone-shift-v">Today · 09:00</div>
            </div>
            <button type="button" className="td-phone-go" style={{ background: accent }}>
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const QR_CELLS = (() => {
  const cells = [];
  for (let y = 0; y < 11; y++) {
    for (let x = 0; x < 11; x++) {
      const corner = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
      const onBit = (x * 13 + y * 7 + x * y) % 5 < 2;
      const on = corner
        ? (x === 0 || x === 2 || x === 8 || x === 10 || y === 0 || y === 2 || y === 8 || y === 10) &&
          !(x === 1 || y === 1)
        : onBit;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * 12}
          y={y * 12}
          width="11"
          height="11"
          fill={on ? "#15161B" : "transparent"}
          rx="1.5"
        />
      );
    }
  }
  return cells;
})();

function QrGlyph() {
  return (
    <svg viewBox="0 0 132 132" width="120" height="120" aria-hidden="true">
      {QR_CELLS}
    </svg>
  );
}

/* ---------- Tuckaby mock: night sky reader ---------- */
function TuckabyMock({ accent }: { accent: string }) {
  const [bar, setBar] = useState(0.32);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setBar((b) => (b > 0.92 ? 0.15 : b + 0.02)), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="tk">
      <div className="tk-frame">
        <div className="tk-stars" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => {
            const top = (i * 47) % 100;
            const left = (i * 83) % 100;
            const sz = (i % 3) + 1;
            return (
              <span
                key={i}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: sz,
                  height: sz,
                  animationDelay: `${(i % 6) * 0.4}s`,
                }}
              />
            );
          })}
        </div>
        <div className="tk-moon" />
        <div className="tk-content">
          <div className="tk-eye mono">tuckaby · tonight&apos;s story</div>
          <h4 className="tk-title">The Quiet Lantern</h4>
          <p className="tk-sub">Narrated by Ada · 8 min</p>

          <div className="tk-art">
            <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="tk-hill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5D4E8E" />
                  <stop offset="100%" stopColor="#3D2E5E" />
                </linearGradient>
              </defs>
              <path d="M0 90 Q 50 60 100 80 T 200 75 L 200 120 L 0 120 Z" fill="url(#tk-hill)" />
              <path d="M0 105 Q 60 85 130 100 T 200 95 L 200 120 L 0 120 Z" fill="#2A1F46" />
              <circle cx="160" cy="32" r="14" fill="#F7E3B9" />
              <circle cx="155" cy="29" r="14" fill="#3D2E5E" />
              <g transform="translate(40 70)">
                <rect x="-3" y="-10" width="6" height="9" rx="1" fill={accent} />
                <rect x="-4" y="-12" width="8" height="2" rx="1" fill="#F7E3B9" />
                <line x1="0" y1="-14" x2="0" y2="-20" stroke="#F7E3B9" strokeWidth="0.8" />
                <circle cx="0" cy="-5" r="8" fill={accent} opacity="0.25" />
              </g>
            </svg>
          </div>

          <div className="tk-player">
            <button type="button" className="tk-play" style={{ background: accent }}>
              <Icon name="play" size={18} />
            </button>
            <div className="tk-track">
              <div className="tk-track-fill" style={{ width: `${bar * 100}%`, background: accent }} />
            </div>
            <span className="tk-time mono">3:14 / 8:02</span>
          </div>

          <div className="tk-wave" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, i) => {
              const h = 6 + Math.abs(Math.sin(i * 0.6 + bar * 14)) * 18;
              const dim = i / 36 > bar;
              return (
                <span
                  key={i}
                  style={{
                    height: h,
                    opacity: dim ? 0.25 : 0.9,
                    background: dim ? "#9B95C7" : accent,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* second card peeking */}
      <div className="tk-peek">
        <div className="tk-peek-cover" />
        <div className="tk-peek-meta">
          <div className="tk-peek-eye mono">up next</div>
          <div className="tk-peek-title">A House Made of Cloud</div>
        </div>
      </div>
    </div>
  );
}
