import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";

// Nested route group - still resolves to "/docs". Gives the Introduction
// page its own metadata layout, distinct from app/docs/layout.js (the
// Sidebar shell shared by every /docs/* route).
export const metadata = buildMetadata({
  title: "Neuctra UI Documentation | React Components, Setup & Theming",
  description:
    "Install and use Neuctra UI in React projects. Browse component APIs, Tailwind CSS theme setup, the project setup CLI, and AI assistant integrations.",
  keywords:
    "Neuctra UI documentation, React UI components, React component library setup, Tailwind CSS theming, React UI CLI, Neuctra UI MCP",
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
