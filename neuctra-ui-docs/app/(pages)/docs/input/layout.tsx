import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input Component | Neuctra UI - Smart Form Controls",
  description: "A versatile React Input component with validation states, label floating, and accessibility features. Supports text, email, password, and search input types with responsive design.",
  keywords: [
    "React Input Component",
    "Form Text Field",
    "Accessible Input",
    "Floating Label Input",
    "Neuctra UI Components",
    "Input Validation",
    "Controlled Input",
    "Password Input",
    "Search Input"
  ],
  openGraph: {
    title: "Input Component | Neuctra UI - Flexible Form Fields",
    description: "Build better forms with our Input component featuring error states, helper text, prefix/suffix slots, and automatic type handling. Works seamlessly with form libraries.",
    url: "https://yourdomain.com/components/input",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/input-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Input Component showing various input states"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Input Component | Neuctra UI",
    description: "Feature-rich input field component for React forms",
    images: ["https://yourdomain.com/images/input-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/input"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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