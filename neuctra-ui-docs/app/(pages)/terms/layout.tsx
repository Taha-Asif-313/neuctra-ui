import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Neuctra UI - Component Library Usage Guidelines",
  description: "Review the terms governing your use of Neuctra UI. Understand the MIT license permissions, restrictions, and your rights when using our React components.",
  keywords: [
    "Neuctra UI terms",
    "React component library terms",
    "MIT license terms",
    "frontend development terms",
    "software usage agreement"
  ],
  openGraph: {
    title: "Terms of Service | Neuctra UI",
    description: "The official terms governing your use of the Neuctra UI component library.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Neuctra UI",
    description: "Understand your rights and obligations when using Neuctra UI components.",
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