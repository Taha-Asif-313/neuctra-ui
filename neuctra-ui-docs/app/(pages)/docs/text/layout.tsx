import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Component | Neuctra UI - Typography & Content Styling",
  description: "A versatile React Text component for consistent typography with responsive sizing, color variants, and semantic text elements. Perfect for paragraphs, headings, and inline text styling.",
  keywords: [
    "React Text Component",
    "Typography System",
    "Text Styling",
    "Responsive Typography",
    "Neuctra UI Components",
    "Heading Components",
    "Paragraph Styling",
    "Text Color Variants",
    "Accessible Text"
  ],
  openGraph: {
    title: "Text Component | Neuctra UI - Beautiful Typography Made Simple",
    description: "Implement consistent text styling across your application with our Text component featuring font hierarchy control, truncation, text transforms, and seamless theme integration.",
    url: "https://yourdomain.com/components/text",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/text-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Text Component showing typography hierarchy examples"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Component | Neuctra UI",
    description: "Flexible typography component for React applications",
    images: ["https://yourdomain.com/images/text-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/text"
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