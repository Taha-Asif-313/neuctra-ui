import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

const title = "Neuctra UI Blog - Product UI and AI Development Guides";
const description = "Practical Neuctra UI guides for component design, React project setup, and AI-assisted development workflows.";
export const metadata = buildMetadata({ title, description, keywords: "Neuctra UI blog, React UI guides, AI coding assistant, MCP workflow, React CLI", path: "/blog" });

export default function BlogLayout({ children }) {
  return <><JsonLd data={breadcrumbSchema([{ label: "Home", path: "/" }, { label: "Blog", path: "/blog" }])} />{children}</>;
}
