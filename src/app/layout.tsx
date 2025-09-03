import { ReactNode, Suspense } from 'react'
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ErrorBoundary } from "@/components/error-boundary";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleAnalytics } from "@/components/analytics";
import Script from "next/script";
import ClientSideInit from "@/components/client-side-init";
import { StructuredData } from "@/components/seo/structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://wrenchit.io"),
  title: {
    default: "WrenchIT - Software Development & AI Automation",
    template: "%s | WrenchIT",
  },
  description: "Professional software development and AI automation services. We build modern websites, mobile apps, and intelligent automation solutions to transform your business.",
  applicationName: "WrenchIT",
  keywords: [
    "software development",
    "AI automation", 
    "web development",
    "mobile app development",
    "React development",
    "Next.js development",
    "TypeScript development",
    "Node.js development",
    "custom software solutions",
    "business automation",
    "digital transformation",
    "cloud solutions",
    "DevOps",
    "API development",
    "database design",
    "UI/UX design",
    "e-commerce development",
    "CRM systems",
    "enterprise software",
    "startup development",
    "San Francisco software company",
    "California tech services",
    "WrenchIT"
  ],
  authors: [
    { name: "WrenchIT Team", url: "https://wrenchit.io" },
    { name: "Carl Rodriguez", url: "https://wrenchit.io/team/carl-rodriguez" }
  ],
  creator: "WrenchIT",
  publisher: "WrenchIT",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "fr_FR"],
    url: "https://wrenchit.io",
    title: "WrenchIT - Software Development & AI Automation",
    description: "Professional software development and AI automation services. We build modern websites, mobile apps, and intelligent automation solutions to transform your business.",
    siteName: "WrenchIT",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WrenchIT - Professional Software Development & AI Automation Services",
        type: "image/png",
      },
      {
        url: "/og-image-square.png", 
        width: 600,
        height: 600,
        alt: "WrenchIT Logo",
        type: "image/png",
      },
    ],
    emails: ["carl@wrenchit.io"],
    phoneNumbers: ["+1-555-123-4567"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wrenchit_io",
    creator: "@wrenchit_io",
    title: "WrenchIT - Software Development & AI Automation",
    description: "Professional software development and AI automation services. Transform your business with modern technology solutions.",
    images: {
      url: "/og-image.png",
      alt: "WrenchIT - Professional Software Development & AI Automation Services",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Business Services",
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE", // Replace with actual code
    "msvalidate.01": "YOUR_BING_VERIFICATION_CODE", // Replace with actual code
    "yandex-verification": "YOUR_YANDEX_VERIFICATION_CODE", // Replace with actual code
    "pinterest-site-verification": "YOUR_PINTEREST_VERIFICATION_CODE", // Replace with actual code
    "facebook-domain-verification": "YOUR_FACEBOOK_DOMAIN_VERIFICATION_CODE", // Replace with actual code
    "geo.region": "US-CA",
    "geo.placename": "San Francisco",
    "geo.position": "37.7749;-122.4194",
    "ICBM": "37.7749, -122.4194",
    "rating": "general",
    "distribution": "global",
    "language": "EN",
    "revisit-after": "7 days",
    "content-language": "en-us",
    "pragma": "no-cache",
    "cache-control": "no-cache",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
}

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <StructuredData 
          type="website"
          url="https://wrenchit.io"
          title="WrenchIT - Software Development & AI Automation"
          description="Professional software development and AI automation services. We build modern websites, mobile apps, and intelligent automation solutions to transform your business."
          image="/og-image.png"
        />
        
        {/* Additional SEO Meta Tags */}
        <link rel="canonical" href="https://wrenchit.io" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Francisco" />
        <meta name="geo.position" content="37.7749;-122.4194" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            
            {/* Cookie Consent Banner */}
            <CookieConsent />
            
            {/* Google Analytics Component */}
            {GA_MEASUREMENT_ID && (
              <Suspense fallback={null}>
                <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
              </Suspense>
            )}
            
            {/* Client-side initialization */}
            <ClientSideInit />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
