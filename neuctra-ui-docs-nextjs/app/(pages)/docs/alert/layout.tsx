import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alert Component - Neuctra UI",
  description:
    "The Alert component in Neuctra UI displays contextual feedback messages with customizable styles, icons, and animations for success, error, warning, and info states.",
  keywords: [
    "React Alert Component",
    "Notification Messages",
    "Toast Notifications",
    "Error Alerts",
    "Success Alerts",
    "Neuctra UI",
    "React UI Components",
    "User Feedback System"
  ],
  openGraph: {
    title: "Alert Component - Neuctra UI",
    description:
      "Elegant and flexible Alert system for React. Supports dismissible alerts, auto-timeout, custom icons, and seamless integration with any theme.",
    url: "https://yourdomain.com/components/alert",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/alert-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Alert Component Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alert Component - Neuctra UI",
    description: "Beautiful and functional alerts for React applications"
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}