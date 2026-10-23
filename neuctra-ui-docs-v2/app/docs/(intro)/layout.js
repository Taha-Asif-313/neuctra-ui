import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";

// Nested route group - still resolves to "/docs". Gives the Introduction
// page its own metadata layout, distinct from app/docs/layout.js (the
// Sidebar shell shared by every /docs/* route).
export const metadata = buildMetadata({
  title: "Neuctra UI - React Components and AI Assistant Toolkit",
  description:
    "Discover the Neuctra UI toolkit: a React component library, setup CLI, and AI assistant integrations through local and hosted MCP servers.",
  keywords:
    "Neuctra UI, React UI library, AI coding assistant, local MCP server, remote MCP, setup CLI, Tailwind React components, component library",
  path: "/docs",
});

export default function IntroLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
          ]),
          techArticleSchema({
            name: "Neuctra UI Documentation",
            description:
              "Modern React UI library for SaaS applications built with Tailwind CSS.",
            path: "/docs",
          }),
        ]}
      />
      {children}
    </>
  );
}
