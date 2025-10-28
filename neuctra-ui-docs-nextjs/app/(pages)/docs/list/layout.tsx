import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Component | Neuctra UI - Structured Data Display",
  description: "A flexible React List component with customizable items, dividers, and nested lists. Supports selection states, icons, and responsive layouts for optimal data presentation.",
  keywords: [
    "React List Component",
    "UI List Display",
    "Ordered List",
    "Unordered List",
    "Neuctra UI Components",
    "Nested Lists",
    "Selectable List Items",
    "List with Icons",
    "Accessible Lists"
  ],
  openGraph: {
    title: "List Component | Neuctra UI - Organized Content Presentation",
    description: "Display structured data with our List component featuring customizable density, interactive items, avatar support, and seamless integration with other components.",
    url: "https://yourdomain.com/components/list",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/list-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI List Component showing multiple list variations"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "List Component | Neuctra UI",
    description: "Versatile list component for organized data display in React",
    images: ["https://yourdomain.com/images/list-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/list"
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