import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GridView Component | Neuctra UI - Responsive Grid Layout System",
  description: "A powerful React GridView component with customizable columns, responsive breakpoints, and gap controls. Perfect for galleries, dashboards, and card-based layouts.",
  keywords: [
    "React GridView Component",
    "Responsive Grid Layout",
    "CSS Grid Wrapper",
    "Card Grid System",
    "Neuctra UI Components",
    "Masonry Grid",
    "Auto-Fit Grid",
    "Grid Gap Utilities",
    "Image Gallery Grid"
  ],
  openGraph: {
    title: "GridView Component | Neuctra UI - Flexible Layout Engine",
    description: "Create pixel-perfect responsive grids with column control, auto-placement, and customizable spacing. Supports variable item sizes and dynamic content loading.",
    url: "https://yourdomain.com/components/gridview",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/gridview-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI GridView showing responsive column layouts"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GridView Component | Neuctra UI",
    description: "Advanced grid layout system for React applications",
    images: ["https://yourdomain.com/images/gridview-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/gridview"
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