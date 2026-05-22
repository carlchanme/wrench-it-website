"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";

const links = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Stack" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner container">
        <a href="#top" className="nav-logo" aria-label="WrenchIt — home">
          <Image
            src="/wrench-logo-horizontal.png"
            alt="WrenchIt"
            width={130}
            height={26}
            priority
          />
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-icon"
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={dark}
          >
            <Icon name={dark ? "sun" : "moon"} size={18} />
          </button>
          <a href="#contact" className="btn btn-primary nav-cta">
            Talk to us
            <span className="arrow">
              <Icon name="arrow" size={14} />
            </span>
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="nav-icon nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile"
          >
            <Icon name={open ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />

      {open && (
        <div id="nav-mobile" className="nav-mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-mobile-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary nav-mobile-cta"
            onClick={() => setOpen(false)}
          >
            Talk to us{" "}
            <span className="arrow">
              <Icon name="arrow" size={14} />
            </span>
          </a>
        </div>
      )}
    </header>
  );
}
