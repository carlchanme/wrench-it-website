import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono, Fraunces } from "next/font/google";
import { faqs } from "@/components/sections/FAQ";
import "./globals.css";

const SITE_URL = "https://www.wrenchit.io";
const SITE_NAME = "WrenchIt";
const SITE_TITLE = "Custom Software & AI Automation Studio · Kuala Lumpur | WrenchIt";
const SITE_DESC =
  "Lean software studio in Kuala Lumpur. Custom SaaS, AI automation, and full-stack apps — designed, built, and shipped for founders and SMEs across APAC.";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  other: {
    "geo.region": "MY-14",
    "geo.placename": "Kuala Lumpur",
    "geo.position": "3.139;101.6869",
    ICBM: "3.139, 101.6869",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1014" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      legalName: "WrenchIt Software House Sdn Bhd",
      url: SITE_URL,
      logo: `${SITE_URL}/wrench-logo-horizontal.png`,
      image: `${SITE_URL}/opengraph-image`,
      description: SITE_DESC,
      email: "hello@wrenchit.io",
      founder: {
        "@type": "Person",
        name: "Carl",
        jobTitle: "Founder",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kuala Lumpur",
        addressRegion: "Wilayah Persekutuan Kuala Lumpur",
        addressCountry: "MY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 3.139,
        longitude: 101.6869,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      areaServed: ["MY", "SG", "AU", "JP", "AE", "GB"],
      knowsAbout: [
        "Custom SaaS development",
        "AI automation",
        "Full-stack development",
        "React Native",
        "Next.js",
        "Supabase",
      ],
      sameAs: [],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
      >
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
