import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VideoPlayer Component | Neuctra UI - Adaptive Media Player",
  description: "A feature-rich React VideoPlayer with adaptive bitrate streaming, customizable controls, and cross-browser support. Supports HLS, MP4, and embedded platforms with full responsiveness.",
  keywords: [
    "React Video Player",
    "Custom Media Player",
    "Adaptive Streaming",
    "Neuctra UI Components",
    "HLS Video Player",
    "MP4 Player Component",
    "Video JS Alternative",
    "Accessible Video Player",
    "Embeddable Video"
  ],
  openGraph: {
    title: "VideoPlayer Component | Neuctra UI - Professional Media Playback",
    description: "Deliver premium video experiences with our player featuring quality selection, playback speed control, PiP mode, and seamless fullscreen transitions. Works across all devices.",
    url: "https://yourdomain.com/components/video-player",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/video-player-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI VideoPlayer with custom controls and playback options"
      }
    ]
  },
  twitter: {
    card: "player",
    title: "VideoPlayer Component | Neuctra UI",
    description: "Enterprise-grade video player for React applications",
    images: ["https://yourdomain.com/images/video-player-twitter.jpg"],
  },
  alternates: {
    canonical: "https://yourdomain.com/components/video-player"
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