import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table Component | Neuctra UI - Data Visualization & Management",
  description: "A high-performance React Table component with sorting, pagination, and filtering capabilities. Supports responsive layouts, row selection, and customizable cells for complex data display.",
  keywords: [
    "React Table Component",
    "Data Table UI",
    "Sortable Table",
    "Pagination Table",
    "Neuctra UI Components",
    "Responsive Data Table",
    "Filterable Table",
    "Virtualized Table",
    "Accessible Table"
  ],
  openGraph: {
    title: "Table Component | Neuctra UI - Advanced Data Grid",
    description: "Display and manage large datasets with our feature-rich Table component including column resizing, row expansion, server-side operations, and seamless theme integration.",
    url: "https://yourdomain.com/components/table",
    siteName: "Neuctra UI",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/table-og.jpg",
        width: 1200,
        height: 630,
        alt: "Neuctra UI Table Component showing sortable columns and pagination"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Table Component | Neuctra UI",
    description: "Enterprise-grade table component for React applications",
    images: ["https://yourdomain.com/images/table-twitter.jpg"]
  },
  alternates: {
    canonical: "https://yourdomain.com/components/table"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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