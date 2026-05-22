import Image from "next/image";
import { Icon } from "@/components/Icon";

export function Footer() {
  return (
    <footer className="ft">
      <div className="container">
        <div className="ft-top">
          <div className="ft-brand">
            <Image
              src="/wrench-logo-horizontal.png"
              alt="WrenchIt"
              width={130}
              height={26}
              className="ft-logo"
            />
            <p className="ft-tag">
              A lean software studio. Founded by Carl. Built in Kuala Lumpur.
            </p>
          </div>

          <div className="ft-cols">
            <div className="ft-col">
              <div className="ft-h mono">Studio</div>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#stack">Stack</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="ft-col">
              <div className="ft-h mono">Products</div>
              <a href="https://tapduty.com" target="_blank" rel="noreferrer">
                TapDuty <Icon name="arrow-up" size={11} />
              </a>
              <a href="https://tuckaby.app" target="_blank" rel="noreferrer">
                Tuckaby <Icon name="arrow-up" size={11} />
              </a>
            </div>
            <div className="ft-col">
              <div className="ft-h mono">Reach out</div>
              <a href="mailto:hello@wrenchit.io">
                <Icon name="mail" size={14} /> hello@wrenchit.io
              </a>
              {/* TODO: add real URLs and restore as anchors */}
              <span className="ft-soon">
                <Icon name="linkedin" size={14} /> LinkedIn
              </span>
              <span className="ft-soon">
                <Icon name="github" size={14} /> GitHub
              </span>
            </div>
          </div>
        </div>

        <div className="ft-mark" aria-hidden="true">
          <svg viewBox="0 0 900 120" preserveAspectRatio="xMidYMid meet">
            <text
              x="0"
              y="100"
              fontFamily="Manrope, sans-serif"
              fontWeight="800"
              fontSize="140"
              letterSpacing="-5"
            >
              WRENCHIT
            </text>
          </svg>
        </div>

        <div className="ft-bot">
          <span className="mono">© 2026 WrenchIt Software House Sdn Bhd</span>
          <span className="ft-dots mono">·</span>
          <span className="mono">All rights reserved</span>
          <span className="ft-dots mono">·</span>
          <span className="mono">v1.0.0</span>
          <span className="ft-spacer" />
          <a href="#top" className="ft-up">
            Back to top <Icon name="arrow-up" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
