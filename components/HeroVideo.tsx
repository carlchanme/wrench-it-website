"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video.
 *
 * Deliberately has NO `autoplay` attribute and uses `preload="none"`, so the
 * browser downloads nothing until we call play(). That is what keeps phones,
 * metered connections and reduced-motion users from paying for a decorative
 * asset they will never see — an `autoplay` attribute would fetch it on every
 * device regardless of the media queries below.
 *
 * Playback is granted only when all of these hold:
 *   - viewport is >= 1024px (phones/tablets keep the poster)
 *   - the user has not asked for reduced motion
 *   - the hero is actually on screen (decoding stops once scrolled past)
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Muted is required for programmatic playback to be allowed at all.
    el.muted = true;

    let io: IntersectionObserver | null = null;

    const allowed = () => wide.matches && !calm.matches;

    const stop = () => {
      el.pause();
      io?.disconnect();
      io = null;
    };

    const start = () => {
      if (!allowed()) return;
      if (io) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) {
              // play() rejects if the browser still blocks it; the poster
              // simply stays up, which is a fine outcome.
              void el.play().catch(() => {});
            } else {
              el.pause();
            }
          }
        },
        { threshold: 0.05 },
      );
      io.observe(el);
    };

    const sync = () => {
      if (allowed()) start();
      else stop();
    };

    sync();
    wide.addEventListener("change", sync);
    calm.addEventListener("change", sync);

    return () => {
      wide.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <div className="hero-video" aria-hidden="true">
      <video
        ref={ref}
        className="hero-video-el"
        poster="/hero-poster.webp"
        preload="none"
        muted
        loop
        playsInline
        disablePictureInPicture
        tabIndex={-1}
      >
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-scrim" />
    </div>
  );
}
