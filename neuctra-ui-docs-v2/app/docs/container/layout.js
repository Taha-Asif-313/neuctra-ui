import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Container Component — Responsive Layout Wrapper | Neuctra UI";
const DESCRIPTION =
  "Build consistent layouts with the Container component in Neuctra UI. Control max-width, padding, and alignment for responsive React applications and design systems.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react container component, layout container ui, responsive wrapper react, max width container, tailwind layout wrapper, page container react, ui layout system, neuctra ui container",
  path: "/docs/container",
});

const containerFaq = buildComponentFaq("Container", {
  sizes: ["sm", "md", "lg", "xl", "2xl", "full"],
});

export default function ContainerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Container", path: "/docs/container" },
          ]),
          techArticleSchema({
            name: "Container",
            description: DESCRIPTION,
            path: "/docs/container",
          }),
          faqSchema(containerFaq),
        ]}
      />
      {children}
    </>
  );
}
