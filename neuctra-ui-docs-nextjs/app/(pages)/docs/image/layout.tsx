import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Component | Neuctra UI - Optimized Media Loading",
  description: "A high-performance React Image component with automatic optimization, lazy loading, and responsive sizing. Supports placeholders, blur-up effects, and multiple file formats.",
  keywords: [
    "React Image Component",
    "Optimized Image Loading",
    "Lazy Load Images",
    "Responsive Images",
    "Neuctra UI Components",
    "Blur-Up Placeholder",
    "WebP Conversion",
    "Image Optimization",
    "Next.js Image"
  ],
  openGraph: {
    title: "Image Component | Neuctra UI - Smart Media Handling",
    description: "Deliver optimized images with automatic format conversion, size scaling, and CDN caching. Features lazy loading, priority loading, and graceful degradation.",
    url: "https://yourdomain.com/components/image",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/image-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Image Component showing optimization features"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Component | Neuctra UI",
    description: "Performance-optimized image component for React applications",
    images: ["https://yourdomain.com/images/image-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/image"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1
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