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
  // The hero is permanently dark (video background) regardless of theme. The
  // bar is sticky, so at rest it sits ABOVE the hero in normal flow and needs
  // no special treatment — but once scrolled it overlays the hero for ~900px,
  // and a cream bar over dark video is unreadable. `scrolled` alone can't
  // express this (it flips after 12px and stays on for the whole page).
  const [overHero, setOverHero] = useState(true);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  // Dark by default — must match the data-theme stamped on <html> in layout.tsx.
  const [dark, setDark] = useState(true);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    // Keep the browser/OS chrome colour in step with the chosen theme; the
    // static metadata can only describe the default.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#0F1014" : "#F4EFE6");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const hero = document.getElementById("top");
      const navH = headerRef.current?.offsetHeight ?? 72;
      setOverHero(hero ? hero.getBoundingClientRect().bottom > navH : false);
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
    <header
      ref={headerRef}
      className={`nav ${scrolled ? "scrolled" : ""} ${scrolled && overHero && !open ? "over-hero" : ""}`}
    >
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
