import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeScript from "@/components/ThemeScript";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GoToTop from "@/components/GoToTop";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/seo/schemas/organizationSchema";
import { websiteSchema } from "@/lib/seo/schemas/websiteSchema";
import { softwareApplicationSchema } from "@/lib/seo/schemas/softwareApplicationSchema";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo/site";

// Only Poppins is self-hosted here — it's the only font the site (and
// @neuctra/ui's own compiled styles) actually renders with. The old
// `@import url(fonts.googleapis.com...)` also pulled Inter/Roboto, but
// neither was ever applied anywhere; next/font self-hosts at build time
// regardless, so there's no reason to pay for fonts nothing uses.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const GA_MEASUREMENT_ID = "G-L2JVCT6NVS";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // No `template` here on purpose: every real route sets its own complete,
  // already-branded title (e.g. "About — Neuctra UI") via buildMetadata(),
  // so a title template would double-suffix it ("About — Neuctra UI |
  // Neuctra UI"). `default` is only a fallback for a route that somehow
  // exports no title of its own.
  title:
    "Neuctra UI - React UI Library for SaaS | Tailwind React Components for SaaS Apps",
  description: DEFAULT_DESCRIPTION,
  keywords:
    "react ui library, saas ui components, tailwind react components, react component library, saas dashboard ui",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeScript />
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            softwareApplicationSchema(),
          ]}
        />
        <ThemeProvider>
          <GoToTop />
          {children}
        </ThemeProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
