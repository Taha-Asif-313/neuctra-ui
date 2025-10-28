import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabs Component | Neuctra UI - Organized Content Navigation",
  description: "An accessible React Tabs component with keyboard navigation, animated transitions, and responsive behavior. Perfect for organizing content into logical sections with smooth switching.",
  keywords: [
    "React Tabs Component",
    "Tabbed Interface",
    "Content Tabs",
    "Accessible Tabs",
    "Neuctra UI Components",
    "Animated Tabs",
    "Vertical Tabs",
    "Tab Panels",
    "Responsive Tabs"
  ],
  openGraph: {
    title: "Tabs Component | Neuctra UI - Intuitive Content Organization",
    description: "Create elegant tabbed interfaces with our Tabs component featuring automatic activation, disabled states, custom indicators, and seamless theme integration.",
    url: "https://yourdomain.com/components/tabs",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/tabs-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Tabs Component showing horizontal and vertical variants"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabs Component | Neuctra UI",
    description: "Flexible tabbed navigation component for React applications",
    images: ["https://yourdomain.com/images/tabs-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/tabs"
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