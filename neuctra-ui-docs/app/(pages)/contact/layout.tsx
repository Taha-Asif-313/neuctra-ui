import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Neuctra UI - Get Support & Provide Feedback",
  description: "Reach out to the Neuctra UI team for support, questions, or feedback. Connect via email, GitHub, or Twitter for help with our React component library.",
  keywords: [
    "Neuctra UI contact",
    "React component library support",
    "frontend development help",
    "UI component feedback",
    "technical support"
  ],
  openGraph: {
    title: "Contact Neuctra UI Team",
    description: "Get in touch with our team for support, questions, or partnership opportunities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Neuctra UI Team",
    description: "We're here to help! Reach out for support or feedback on our component library.",
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