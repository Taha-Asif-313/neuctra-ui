import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ImageGallery Component | Neuctra UI - Responsive Photo Galleries",
  description: "A performant React ImageGallery component with lightbox previews, grid layouts, lazy loading, and touch-friendly navigation. Perfect for portfolios, product displays, and media collections.",
  keywords: [
    "React Image Gallery",
    "Photo Gallery Component",
    "Lightbox Gallery",
    "Responsive Image Grid",
    "Neuctra UI Components",
    "Masonry Gallery",
    "Touch-Friendly Gallery",
    "Lazy Load Images",
    "Image Carousel"
  ],
  openGraph: {
    title: "ImageGallery Component | Neuctra UI - Interactive Media Display",
    description: "Create stunning image galleries with thumbnail navigation, fullscreen mode, zoom controls, and customizable layouts. Supports keyboard navigation and swipe gestures.",
    url: "https://yourdomain.com/components/image-gallery",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/image-gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI ImageGallery showing grid layout with lightbox preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ImageGallery Component | Neuctra UI",
    description: "Beautifully crafted image gallery component for React",
    images: ["https://yourdomain.com/images/image-gallery-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/image-gallery"
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