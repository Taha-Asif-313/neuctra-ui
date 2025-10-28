import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badge Component | Neuctra UI - Status Indicators & Notifications",
  description: "A flexible React Badge component for status indicators, notifications counts, and labels. Supports colors, sizes, positioning, and custom content with animation effects.",
  keywords: [
    "React Badge Component",
    "Notification Badge",
    "Status Indicator",
    "UI Badge",
    "Pill Component",
    "Neuctra UI Components",
    "Floating Badge",
    "Counter Badge",
    "Accessible Badges"
  ],
  openGraph: {
    title: "Badge Component | Neuctra UI - Versatile Status Indicators",
    description: "Create attention-grabbing badges with multiple variants, positioning options, and animations. Perfect for notifications, statuses, and new content indicators.",
    url: "https://yourdomain.com/components/badge",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/badge-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Badge Component showing notification and status examples"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Badge Component | Neuctra UI",
    description: "Highly customizable badge component for React applications",
    images: ["https://yourdomain.com/images/badge-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/badge"
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}