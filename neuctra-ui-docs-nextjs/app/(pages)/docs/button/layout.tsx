import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Button Component | Neuctra UI - Interactive UI Elements",
  description: "A highly customizable React Button component with multiple variants, sizes, loading states, and icon support. Perfect for forms, CTAs, and user interactions.",
  keywords: [
    "React Button Component",
    "Custom Button UI",
    "Button Variants",
    "Loading Button",
    "Icon Button",
    "Neuctra UI Components",
    "Accessible Buttons",
    "CTA Buttons",
    "Button Group"
  ],
  openGraph: {
    title: "Button Component | Neuctra UI - Versatile Clickable Elements",
    description: "Build interactive interfaces with our Button component. Supports primary, secondary, outline, ghost, and destructive variants with full theming control.",
    url: "https://yourdomain.com/components/button",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/button-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Button Component showing multiple variants and states"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Button Component | Neuctra UI",
    description: "Flexible and accessible button component for React applications",
    images: ["https://yourdomain.com/images/button-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/button"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}