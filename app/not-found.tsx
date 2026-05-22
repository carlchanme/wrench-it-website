import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found · WrenchIt",
  description: "The URL didn't match anything we ship. Head back home and try again.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="nf">
      <div className="container nf-inner">
        <div className="eyebrow">
          <span className="nf-dot" aria-hidden="true" /> 404 · not found
        </div>
        <h1 className="nf-h1">
          This page <span className="serif">slipped through.</span>
        </h1>
        <p className="nf-sub">
          The URL didn&apos;t match anything we ship. Maybe a typo, maybe a stale link.
          Head back home and try again — or tell us what you were looking for.
        </p>
        <div className="nf-ctas">
          <Link href="/" className="btn btn-primary">
            Back to home
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/#contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
