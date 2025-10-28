import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlexBox Component | Neuctra UI - Modern CSS Flexbox Layouts",
  description: "A powerful React FlexBox component that simplifies responsive layouts with intuitive props for alignment, spacing, and direction control. Perfect for component composition.",
  keywords: [
    "React FlexBox Component",
    "CSS Flexbox Wrapper",
    "Flex Layout System",
    "Responsive Flex Container",
    "Neuctra UI Components",
    "Flex Gap Utilities",
    "Justify Content",
    "Align Items",
    "Flex Direction"
  ],
  openGraph: {
    title: "FlexBox Component | Neuctra UI - Smart Layout Simplification",
    description: "Build flexible layouts faster with our FlexBox component. Features responsive direction control, gap spacing, alignment utilities, and nested flex containers.",
    url: "https://yourdomain.com/components/flexbox",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/flexbox-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI FlexBox Component showing various layout examples"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexBox Component | Neuctra UI",
    description: "CSS Flexbox abstraction for building modern React layouts",
    images: ["https://yourdomain.com/images/flexbox-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/flexbox"
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