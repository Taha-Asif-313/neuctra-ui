import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About Neuctra UI - Modern React Component Library",
  description: "Discover Neuctra UI - a modern React component library built with TypeScript and Tailwind CSS. Learn about our mission, features, and technology stack.",
  keywords: [
    "React components",
    "UI library",
    "Tailwind CSS",
    "TypeScript",
    "frontend development",
    "web components"
  ],
  openGraph: {
    title: "About Neuctra UI - Modern React Component Library",
    description: "Discover Neuctra UI - a modern React component library built with TypeScript and Tailwind CSS.",
    url: "https://neuctra-ui.com/about",
    siteName: "Neuctra UI",
    images: [
      {
        url: "https://neuctra-ui.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI About Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Neuctra UI - Modern React Component Library",
    description: "Discover Neuctra UI - a modern React component library built with TypeScript and Tailwind CSS.",
    images: ["https://neuctra-ui.com/og-about.jpg"],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <Navbar/>
    {children}
    <Footer/>
    </div>;
}