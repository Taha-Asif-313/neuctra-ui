import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dropdown Component | Neuctra UI - Interactive Menu Selector",
  description: "A fully accessible React Dropdown component with search, multi-select, keyboard navigation, and custom item rendering. Perfect for forms, filters, and action menus.",
  keywords: [
    "React Dropdown Component",
    "Select Menu UI",
    "Custom Dropdown",
    "Multi-Select Dropdown",
    "Accessible Dropdown",
    "Neuctra UI Components",
    "Form Selector",
    "Filter Dropdown",
    "Dropdown with Search"
  ],
  openGraph: {
    title: "Dropdown Component | Neuctra UI - Smart Selection Interface",
    description: "Feature-rich dropdown menus with type-ahead search, keyboard controls, async loading, and theming options. Supports single/multi-select modes and custom item templates.",
    url: "https://yourdomain.com/components/dropdown",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/dropdown-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Dropdown Component showing open menu with search"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dropdown Component | Neuctra UI",
    description: "Advanced dropdown/select component for React applications",
    images: ["https://yourdomain.com/images/dropdown-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/dropdown"
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