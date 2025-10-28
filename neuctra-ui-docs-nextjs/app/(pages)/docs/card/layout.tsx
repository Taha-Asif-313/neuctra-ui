import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Component | Neuctra UI - Flexible Content Containers",
  description: "A versatile React Card component with multiple layouts, hover effects, and customizable content areas. Perfect for product displays, dashboards, and content grouping.",
  keywords: [
    "React Card Component",
    "UI Card Design",
    "Content Container",
    "Product Card",
    "Dashboard Cards",
    "Neuctra UI Components",
    "Card Layouts",
    "Hover Effects",
    "Accessible Cards"
  ],
  openGraph: {
    title: "Card Component | Neuctra UI - Content Presentation Made Simple",
    description: "Create beautiful content containers with our Card component. Supports headers, footers, media areas, and multiple styling variants with responsive behavior.",
    url: "https://yourdomain.com/components/card",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/card-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Card Component showing multiple layout examples"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Card Component | Neuctra UI",
    description: "Flexible card component for elegant content presentation in React",
    images: ["https://yourdomain.com/images/card-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/card"
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