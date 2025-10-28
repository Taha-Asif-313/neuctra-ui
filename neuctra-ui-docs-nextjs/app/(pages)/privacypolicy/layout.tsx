import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Neuctra UI - Modern React Component Library",
  description: "Learn how Neuctra UI collects and protects your data. Our privacy policy explains what information we gather and how we use it to improve our component library.",
  keywords: [
    "Neuctra UI privacy policy",
    "React component library privacy",
    "data protection",
    "web development privacy",
    "frontend tools privacy"
  ],
  openGraph: {
    title: "Privacy Policy | Neuctra UI",
    description: "Understand how we handle your data with Neuctra UI's comprehensive privacy policy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Neuctra UI",
    description: "Your data matters. See how we protect it in Neuctra UI's privacy policy.",
  }
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