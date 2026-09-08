import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";

// Nested route group — still resolves to "/docs". Gives the Introduction
// page its own metadata layout, distinct from app/docs/layout.js (the
// Sidebar shell shared by every /docs/* route).
export const metadata = buildMetadata({
  title: "Introduction — React UI Library for SaaS | Neuctra UI",
  description:
    "Discover Neuctra UI, a modern React UI library for SaaS applications built with Tailwind CSS. Learn how to build scalable dashboards, authentication systems, and reusable UI components with a fast developer experience.",
  keywords:
    "neuctra ui, react ui library, saas ui components, tailwind react components, dashboard ui react, authentication ui react, reusable ui system, component library react, modern ui framework, react saas boilerplate",
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
