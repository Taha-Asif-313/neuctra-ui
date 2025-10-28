import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AudioGallery Component - Neuctra UI",
  description:
    "The AudioGallery component in Neuctra UI provides a beautiful way to display and play multiple audio tracks with playlist functionality, waveform visualization, and customizable controls.",
  keywords: [
    "React Audio Player",
    "Audio Gallery Component",
    "Music Player UI",
    "Waveform Visualization",
    "Playlist Component",
    "Neuctra UI",
    "React Media Components",
    "Web Audio API"
  ],
  openGraph: {
    title: "AudioGallery Component - Neuctra UI",
    description:
      "Feature-rich audio gallery for React applications with playlist management, customizable themes, progress tracking, and responsive design for all devices.",
    url: "https://yourdomain.com/components/audio-gallery",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/audio-gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI AudioGallery Component Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioGallery Component - Neuctra UI",
    description: "Modern audio gallery and player for React applications with advanced features"
  },
  alternates: {
    canonical: "https://yourdomain.com/components/audio-gallery"
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}