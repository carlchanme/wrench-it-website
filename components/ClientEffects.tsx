"use client";

import { useEffect } from "react";

type Props = {
  accent: string;
};

export function ClientEffects({ accent }: Props) {
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", accent);
    r.style.setProperty("--accent-soft", accent);
  }, [accent]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      document.getElementById(id)?.focus({ preventScroll: true });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
