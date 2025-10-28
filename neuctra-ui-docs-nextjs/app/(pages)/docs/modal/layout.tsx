import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modal Component | Neuctra UI - Elegant Dialog Windows",
  description: "A responsive React Modal component with animations, focus management, and customizable sizing. Perfect for alerts, forms, and focused content presentation.",
  keywords: [
    "React Modal Component",
    "Dialog Window",
    "Popup Modal",
    "Accessible Modal",
    "Neuctra UI Components",
    "Modal with Backdrop",
    "Animated Modal",
    "Fullscreen Modal",
    "Centered Dialog"
  ],
  openGraph: {
    title: "Modal Component | Neuctra UI - Focused Content Containers",
    description: "Create polished dialogs with our Modal component featuring smooth transitions, scroll locking, multiple sizes, and complete keyboard navigation support.",
    url: "https://yourdomain.com/components/modal",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/modal-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Modal Component showing centered dialog example"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Modal Component | Neuctra UI",
    description: "Professional modal/dialog component for React applications",
    images: ["https://yourdomain.com/images/modal-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/modal"
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