import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VideoGallery Component | Neuctra UI - Responsive Video Collections",
  description: "A performant React VideoGallery component with thumbnail navigation, lazy loading, and adaptive streaming. Perfect for portfolios, media libraries, and video showcases.",
  keywords: [
    "React Video Gallery",
    "Video Collection Component",
    "Responsive Video Grid",
    "Neuctra UI Components",
    "Video Thumbnail Navigation",
    "Lazy Load Videos",
    "Adaptive Streaming",
    "Video Lightbox",
    "Media Library UI"
  ],
  openGraph: {
    title: "VideoGallery Component | Neuctra UI - Interactive Media Display",
    description: "Showcase video collections with smooth playback controls, quality switching, and customizable layouts. Supports YouTube, Vimeo, and self-hosted videos with optimal performance.",
    url: "https://yourdomain.com/components/video-gallery",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/video-gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI VideoGallery showing grid layout with playback controls"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VideoGallery Component | Neuctra UI",
    description: "Beautifully crafted video gallery for React applications",
    images: ["https://yourdomain.com/images/video-gallery-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/video-gallery"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
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