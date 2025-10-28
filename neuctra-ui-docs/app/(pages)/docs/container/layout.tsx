import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Container Component | Neuctra UI - Responsive Content Wrapper",
  description: "A flexible React Container component with responsive breakpoints, max-width constraints, and padding controls. Perfect for creating consistent layouts across all screen sizes.",
  keywords: [
    "React Container Component",
    "Responsive Wrapper",
    "Layout Container",
    "Content Constraint",
    "Neuctra UI Components",
    "Page Layout",
    "Breakpoint Management",
    "Fluid Containers",
    "Fixed-Width Containers"
  ],
  openGraph: {
    title: "Container Component | Neuctra UI - Layout Foundation",
    description: "Build consistent layouts with our Container component. Features responsive width control, padding variants, and seamless integration with grid systems.",
    url: "https://yourdomain.com/components/container",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/container-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Container Component showing responsive behavior"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Container Component | Neuctra UI",
    description: "Responsive layout container for building consistent React applications",
    images: ["https://yourdomain.com/images/container-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/container"
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