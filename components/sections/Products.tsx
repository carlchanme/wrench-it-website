"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

type ProductsProps = {
  accent: string;
};

type ProductKey = "tapduty" | "cusp";

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
  cusp: {
    label: "Booking & Memberships",
    name: "CUSP",
    url: "cusp.my",
    year: "2026",
    blurb:
      "Booking, memberships, and class packs for salons, barbershops, spas, gyms, and fitness studios. Clients book themselves round the clock, and the whole team reads one calendar.",
    // Capability facts, not traction. CUSP has no published customer numbers,
    // and its own site deliberately carries no social proof it hasn't earned —
    // this card must not get ahead of that. Keys are short because the stat
    // column is narrow; anything past about eight characters wraps mid-phrase,
    // and the detail they compress is already in the blurb above.
    stats: [
      { k: "2", v: "verticals served" },
      { k: "24/7", v: "self-serve booking" },
      { k: "30 days", v: "free trial" },
    ],
    tags: ["Next.js 16", "React 19", "Supabase", "Tailwind v4"],
    colorA: "#E11D34",
    colorB: "#F5A524",
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
            {active === "tapduty" && <TapDutyMock accent={accent} />}
            {active === "cusp" && <CuspMock />}
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

/* ---------- CUSP mock: class calendar + client booking phone ----------
   Unlike the other two, this mock takes no `accent` prop. CUSP has its own
   brand — a red→coral→amber gradient — and borrowing the site's navy would
   make the screenshot look like a WrenchIt product rather than CUSP's. */
const CUSP_RED = "#E11D34";
const CUSP_AMBER = "#F5A524";

function CuspMock() {
  // One class fills up while you watch. Same trick as the TapDuty check-in
  // counter: it suggests a live system without needing real data.
  const [booked, setBooked] = useState(9);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setBooked((b) => (b < 12 ? b + 1 : 9)), 1900);
    return () => clearInterval(id);
  }, []);

  const week = ["M", "T", "W", "T", "F", "S", "S"];

  // [time, class, coach, booked, capacity]
  const classes: [string, string, string, number, number][] = [
    ["07:00", "Yoga Flow", "Audrey", booked, 12],
    ["09:30", "Reformer Pilates", "Tash", 8, 8],
    ["18:00", "Barre Burn", "Audrey", 6, 14],
    ["19:30", "Dance Fit", "Mei", 11, 20],
  ];

  return (
    <div className="cu">
      {/* Studio-side calendar */}
      <div className="cu-browser">
        <div className="cu-browser-bar">
          <span className="td-dot td-dot-r" />
          <span className="td-dot td-dot-y" />
          <span className="td-dot td-dot-g" />
          <div className="td-url mono">app.cusp.my / calendar</div>
        </div>
        <div className="cu-app">
          <aside className="cu-side">
            <div className="cu-side-logo">
              <span className="cu-side-mark" />
              <span className="cu-side-name">CUSP</span>
            </div>
            <nav>
              <a className="is-active">
                <i /> Calendar
              </a>
              <a>
                <i /> Bookings
              </a>
              <a>
                <i /> Members
              </a>
              <a>
                <i /> Class packs
              </a>
              <a>
                <i /> Staff
              </a>
            </nav>
          </aside>
          <div className="cu-main">
            <div className="cu-h">
              <div>
                <div className="cu-h-eye mono">thursday, 21 august</div>
                <div className="cu-h-title">Studio schedule</div>
              </div>
              <div className="cu-h-chip">
                <span className="cu-h-dot" />
                <span className="mono">4 classes today</span>
              </div>
            </div>

            <div className="cu-week">
              {week.map((d, i) => (
                <span key={`${d}-${i}`} className={`cu-day ${i === 3 ? "is-today" : ""}`}>
                  <em>{d}</em>
                  <b>{18 + i}</b>
                </span>
              ))}
            </div>

            <div className="cu-classes">
              {classes.map(([time, name, coach, b, cap]) => {
                const full = b >= cap;
                return (
                  <div className="cu-class" key={name}>
                    <span className="cu-class-time mono">{time}</span>
                    <span className="cu-class-body">
                      <span className="cu-class-name">{name}</span>
                      <span className="cu-class-coach">{coach}</span>
                    </span>
                    <span className="cu-class-fill">
                      <span
                        className="cu-class-bar"
                        style={{
                          width: `${(b / cap) * 100}%`,
                          background: full ? CUSP_RED : `linear-gradient(90deg, ${CUSP_RED}, ${CUSP_AMBER})`,
                        }}
                      />
                    </span>
                    <span className={`cu-class-count mono ${full ? "is-full" : ""}`}>
                      {full ? "full" : `${b}/${cap}`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="cu-member">
              <span className="cu-member-av">R</span>
              <span className="cu-member-body">
                <span className="cu-member-name">Rina A.</span>
                <span className="cu-member-plan mono">10-class pack · renews 2 Sep</span>
              </span>
              <span className="cu-credits">
                <b>6</b> left
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Client-side booking */}
      <div className="cu-phone">
        <div className="cu-phone-bar">
          <span>9:41</span>
          <span className="mono">cusp</span>
        </div>
        <div className="cu-phone-body">
          <div className="cu-phone-eye mono">book a class</div>
          <div className="cu-phone-title">Reformer Pilates</div>
          <div className="cu-phone-sub">Thu 21 Aug · 09:30 · Tash</div>

          <div className="cu-slots">
            {["07:00", "09:30", "18:00"].map((t) => (
              <span key={t} className={`cu-slot ${t === "09:30" ? "is-picked" : ""}`}>
                {t}
              </span>
            ))}
          </div>

          <div className="cu-phone-credit">
            <span>Class pack</span>
            <b>6 credits</b>
          </div>

          <button type="button" className="cu-phone-cta">
            Confirm booking
          </button>
        </div>
      </div>
    </div>
  );
}
