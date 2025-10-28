import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accordion Component - Neuctra UI",
  description:
    "The Accordion component in Neuctra UI provides a collapsible content area with smooth animations, keyboard navigation, and full customization options for headers and panels.",
  keywords: [
    "React Accordion Component",
    "Collapsible UI Element",
    "Accessible Accordion",
    "Neuctra UI",
    "React UI Components",
    "FAQ Component",
    "Expandable Sections"
  ],
  openGraph: {
    title: "Accordion Component - Neuctra UI",
    description:
      "Build accessible, animated accordions with Neuctra UI. Supports multiple modes, custom icons, controlled/uncontrolled states, and seamless theming integration.",
    url: "https://yourdomain.com/components/accordion",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/accordion-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Accordion Component Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Accordion Component - Neuctra UI",
    description: "Feature-rich accordion component for React applications"
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}