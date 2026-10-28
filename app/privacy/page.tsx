import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Privacy Policy | WrenchIT";
const DESC =
  "How WrenchIT handles personal data: the website contact form, and the read-only YouTube analytics tool that uses Google APIs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: "https://www.wrenchit.io/privacy",
    siteName: "WrenchIt",
    title: TITLE,
    description: DESC,
    locale: "en_US",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="legal">
      <div className="container legal-inner">
        <Link href="/" className="legal-back mono">
          ← Back to home
        </Link>
        <div className="eyebrow">Legal</div>
        <h1 className="legal-h1">Privacy Policy</h1>
        <p className="legal-meta mono">Last updated: 28 October 2026</p>

        <section>
          <h2>Who we are</h2>
          <p>
            This website is run by WRENCH IT SOLUTIONS, trading as WrenchIT, based in Kuala
            Lumpur, Malaysia. In this policy, &quot;we&quot;, &quot;us&quot; and
            &quot;WrenchIT&quot; mean WRENCH IT SOLUTIONS. You can reach us at{" "}
            <a href="mailto:hello@wrenchit.io">hello@wrenchit.io</a>.
          </p>
          <p>
            This policy covers two things: the website at www.wrenchit.io (Part A), and a private
            tool we operate called &quot;yt-analytics&quot;, which uses Google APIs (Part B).
          </p>
        </section>

        <h2 className="legal-part">Part A. This website</h2>

        <section>
          <h2>What we collect</h2>
          <p>
            The only personal data the website collects is what you type into the contact form on
            the home page. The form asks for:
          </p>
          <ul>
            <li>your name,</li>
            <li>your email address,</li>
            <li>the kind of project you have in mind (a choice from a short list), and</li>
            <li>your message.</li>
          </ul>
          <p>
            We use this only to read and reply to your enquiry. We do not add you to a mailing list
            and we do not sell or share it.
          </p>
        </section>

        <section>
          <h2>How the form is handled</h2>
          <p>
            When you send the form, the details are emailed to our inbox through Resend, an email
            delivery service. We do not store form submissions in a database on the website. The
            message stays in our email inbox until we delete it.
          </p>
          <p>
            To keep out automated spam, the form is protected by Vercel BotID, which checks whether
            the request comes from a real browser. The form also has a hidden field that real
            visitors never fill in.
          </p>
        </section>

        <section>
          <h2>Cookies and analytics</h2>
          <p>
            The website does not set cookies of its own, and it does not use advertising trackers
            or an analytics service. Like any web host, our hosting provider, Vercel, processes
            standard technical request data such as your IP address, browser type and the pages
            requested, in order to deliver the site and keep it secure.
          </p>
          <p>
            Fonts are served from our own domain at build time, so your browser does not contact
            Google Fonts when you visit.
          </p>
        </section>

        <section>
          <h2>The /batch tool</h2>
          <p>
            The page at /batch converts a file you choose into a CSV file. The conversion runs in
            your own browser. The file you select is read on your device and is not uploaded to our
            servers.
          </p>
        </section>

        <section>
          <h2>Who processes data for us</h2>
          <ul>
            <li>Vercel: hosts the website and provides the BotID bot check.</li>
            <li>Resend: delivers the contact form email to us.</li>
          </ul>
        </section>

        <h2 className="legal-part">Part B. The yt-analytics Google OAuth app</h2>

        <section>
          <h2>What it is</h2>
          <p>
            yt-analytics is a private tool operated by WrenchIT. It reads YouTube channel analytics
            for channels that the operator owns or manages. It is not a public service and it does
            not create accounts for other people.
          </p>
        </section>

        <section>
          <h2>Google permissions requested</h2>
          <p>The app asks for these two read-only scopes:</p>
          <ul>
            <li>
              <code>https://www.googleapis.com/auth/youtube.readonly</code>
            </li>
            <li>
              <code>https://www.googleapis.com/auth/yt-analytics.readonly</code>
            </li>
          </ul>
          <p>
            The app is read-only. It never uploads, edits or deletes videos, never posts comments,
            and never changes channel settings.
          </p>
        </section>

        <section>
          <h2>Data the app accesses</h2>
          <ul>
            <li>Channel ID and channel title.</li>
            <li>
              The list of uploaded videos: titles, publish dates, durations, and public counts of
              views, likes and comments.
            </li>
            <li>
              YouTube Analytics reports: views, watch time, average view duration and percentage,
              subscribers gained and lost, traffic source types, audience retention curves, and
              thumbnail impressions and click-through rate.
            </li>
          </ul>
        </section>

        <section>
          <h2>How the data is used</h2>
          <p>
            The data is used only to produce performance reports and content recommendations for
            the channel owner. We do not use it for advertising, we do not build profiles, we do
            not sell it, we do not transfer it to third parties, and we do not use it to train
            artificial intelligence or machine learning models.
          </p>
        </section>

        <section>
          <h2>Google API Services User Data Policy</h2>
          <p>
            WrenchIT&apos;s use and transfer of information received from Google APIs to any other
            app will adhere to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
          <p>
            The app uses YouTube API Services. By using it, you are bound by the{" "}
            <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
              YouTube Terms of Service
            </a>{" "}
            and the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Storage and security</h2>
          <p>
            The OAuth refresh token is stored locally on the operator&apos;s own computer, in a
            file that only the owner can read. Report files (CSV) are also stored locally. The tool
            has no server database, and the data is not shared with anyone.
          </p>
        </section>

        <section>
          <h2>Retention, revoking access and deletion</h2>
          <p>
            We keep the data only as long as it is needed for the reports. You can revoke the
            app&apos;s access to your Google account at any time at{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
            >
              myaccount.google.com/permissions
            </a>
            . To ask us to delete any data we have stored, email{" "}
            <a href="mailto:hello@wrenchit.io">hello@wrenchit.io</a>. We will delete it within 30
            days.
          </p>
        </section>

        <h2 className="legal-part">General</h2>

        <section>
          <h2>Your rights</h2>
          <p>
            Under Malaysia&apos;s Personal Data Protection Act 2010 and similar laws, you can ask to
            see the personal data we hold about you, ask us to correct it, and ask us to delete it.
            Email <a href="mailto:hello@wrenchit.io">hello@wrenchit.io</a> and we will respond
            promptly.
          </p>
        </section>

        <section>
          <h2>Security</h2>
          <p>
            The website is served over HTTPS. We limit access to the contact form emails and to the
            files described in Part B to the operator of WrenchIT.
          </p>
        </section>

        <section>
          <h2>Children</h2>
          <p>
            The website and the yt-analytics tool are not directed at children under 13, and we do
            not knowingly collect personal data from them.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            If we change this policy, we will post the new version on this page and update the date
            at the top.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            WRENCH IT SOLUTIONS, Kuala Lumpur, Malaysia.{" "}
            <a href="mailto:hello@wrenchit.io">hello@wrenchit.io</a>
          </p>
        </section>
      </div>
    </main>
  );
}
