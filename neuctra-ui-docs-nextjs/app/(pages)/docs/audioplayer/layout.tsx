import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AudioPlayer Component | Neuctra UI - Modern React Audio Component",
  description: "A fully customizable React AudioPlayer component with playlist support, waveform visualization, keyboard controls, and seamless theme integration. Perfect for podcasts, music apps, and audio content.",
  keywords: [
    "React AudioPlayer",
    "Web Audio Player",
    "Custom Audio Component",
    "Music Player React",
    "Podcast Player UI",
    "Neuctra UI Components",
    "HTML5 Audio Player",
    "Accessible Audio Player",
    "Audio Visualization"
  ],
  openGraph: {
    title: "AudioPlayer Component | Neuctra UI - Feature-Rich React Audio Solution",
    description: "Build professional audio experiences with our React AudioPlayer. Includes playlist management, volume control, playback speed, and responsive design. Supports all modern browsers.",
    url: "https://yourdomain.com/components/audio-player",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/audio-player-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI AudioPlayer Component with Playlist and Waveform Visualization"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioPlayer Component | Neuctra UI",
    description: "Professional-grade React audio player with advanced controls and visualization",
    images: ["https://yourdomain.com/images/audio-player-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/audio-player"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
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