import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar Component | Neuctra UI - Modern User Profile Pictures",
  description: "A highly customizable React Avatar component with image fallbacks, initials support, color variants, and responsive sizing. Perfect for user profiles, comments, and messaging UIs.",
  keywords: [
    "React Avatar Component",
    "User Profile Picture",
    "Circle Avatar",
    "Custom Avatar UI",
    "Fallback Avatar",
    "Neuctra UI Components",
    "Avatar with Initials",
    "Responsive Avatar",
    "Accessible Avatar"
  ],
  openGraph: {
    title: "Avatar Component | Neuctra UI - Flexible User Representation",
    description: "Implement beautiful user avatars with our React component. Supports images, initials, colors, badges, and responsive sizing for all devices.",
    url: "https://yourdomain.com/components/avatar",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/avatar-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Avatar Component showing multiple variants"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Avatar Component | Neuctra UI",
    description: "Flexible React avatar component with multiple display options",
    images: ["https://yourdomain.com/images/avatar-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/avatar"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}