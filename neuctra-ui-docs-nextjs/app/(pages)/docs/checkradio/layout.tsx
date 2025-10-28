import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CheckRadio Component | Neuctra UI - Custom Checkbox & Radio Inputs",
  description: "A unified React component for checkbox and radio inputs with custom designs, form integration, accessibility features, and flexible styling options.",
  keywords: [
    "React Checkbox Component",
    "React Radio Button",
    "Custom Form Inputs",
    "CheckRadio UI",
    "Neuctra UI Components",
    "Accessible Forms",
    "Toggle Inputs",
    "Survey Inputs",
    "Form Controls"
  ],
  openGraph: {
    title: "CheckRadio Component | Neuctra UI - Stylish Input Selections",
    description: "Combine checkbox and radio functionality in one flexible component. Features custom icons, sizing options, controlled/uncontrolled modes, and full form integration.",
    url: "https://yourdomain.com/components/checkradio",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/checkradio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI CheckRadio Component showing checkbox and radio variations"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckRadio Component | Neuctra UI",
    description: "Unified checkbox and radio input component for React forms",
    images: ["https://yourdomain.com/images/checkradio-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/checkradio"
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