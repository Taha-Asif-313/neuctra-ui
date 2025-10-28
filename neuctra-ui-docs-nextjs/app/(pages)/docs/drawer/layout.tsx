import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drawer Component | Neuctra UI - Smooth Side Panels & Navigation",
  description: "A responsive React Drawer component with multiple placement options, smooth animations, and customizable overlay effects. Perfect for mobile menus, settings panels, and contextual information.",
  keywords: [
    "React Drawer Component",
    "Side Panel UI",
    "Mobile Navigation Drawer",
    "Sliding Panel",
    "Off-Canvas Menu",
    "Neuctra UI Components",
    "Overlay Drawer",
    "Push Content Drawer",
    "Accessible Drawer"
  ],
  openGraph: {
    title: "Drawer Component | Neuctra UI - Elegant Slide-Out Panels",
    description: "Implement smooth, accessible drawers with multiple positions (left, right, top, bottom), animation controls, and responsive behavior. Works seamlessly with app layouts.",
    url: "https://yourdomain.com/components/drawer",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/drawer-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Drawer Component showing left-side navigation example"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Drawer Component | Neuctra UI",
    description: "Flexible sliding panel component for React applications",
    images: ["https://yourdomain.com/images/drawer-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/drawer"
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