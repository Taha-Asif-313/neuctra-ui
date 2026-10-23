import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

// Nested route group - still resolves to "/". Exists solely so the home
// page can have its own metadata-holding layout.js distinct from
// app/(site)/layout.js (which only provides the shared Navbar/Footer shell
// for every site page) and from the client-interactive page.js below.
export const metadata = buildMetadata({
  title: "React UI Component Library for SaaS | Neuctra UI",
  description:
    "Build SaaS dashboards and product interfaces with Neuctra UI, a customizable React component library using Tailwind CSS, with CLI setup and AI assistant support.",
  keywords: [
    "Neuctra UI",
    "React UI library",
    "React component library",
    "React UI library for SaaS",
    "Tailwind CSS React components",
    "React Tailwind UI components",
    "SaaS UI library",
    "React design system",
    "React dashboard components",
    "Tailwind dashboard UI",
    "React admin dashboard",
    "React authentication UI",
    "React form components",
    "AI coding assistant UI library",
    "MCP UI library",
    "Neuctra UI MCP",
    "Model Context Protocol UI",
    "Neuctra UI AI Assistant",
    "Neuctra UI CLI",
  ].join(", "),
  path: "/",
});

export default function HomeLayout({ children }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ label: "Home", path: "/" }])} />
      {children}
    </>
  );
}
