"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const ACCENT = "#7A5AE0";

export default function Page() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", ACCENT);
    r.style.setProperty("--accent-soft", ACCENT);
  }, []);

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
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav dark={dark} onToggleDark={() => setDark((d) => !d)} />

      <main>
        <Hero accent={ACCENT} />

        <div className="reveal">
          <Services accent={ACCENT} />
        </div>
        <div className="reveal">
          <Products accent={ACCENT} />
        </div>
        <div className="reveal">
          <Process accent={ACCENT} />
        </div>
        <div className="reveal">
          <Stack />
        </div>
        {/* Founder section hidden for now — preserve component for later */}
        <div className="reveal">
          <Contact accent={ACCENT} />
        </div>
      </main>

      <Footer />
    </>
  );
}
