import { Icon } from "@/components/Icon";
import { HeroVideo } from "@/components/HeroVideo";
import { ShipLog } from "@/components/sections/ShipLog";

export function Hero() {
  return (
    <section id="top" className="hero" tabIndex={-1}>
      <HeroVideo />
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
                  {/* Sits on the page background, so it tracks the theme-aware
                      token rather than the mode-blind `accent` prop. */}
                  <path
                    d="M2 14 C 120 4, 280 4, 598 12"
                    fill="none"
                    stroke="var(--accent)"
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
          <ShipLog />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
      </div>
    </section>
  );
}
