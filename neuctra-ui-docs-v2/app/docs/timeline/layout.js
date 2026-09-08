import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Timeline Component — React Activity Feed | Neuctra UI";
const DESCRIPTION =
  "React timeline component for activity feeds, order tracking and changelogs. Done/active/pending statuses, custom icons and timestamps — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react timeline component, activity feed ui, order tracking timeline, changelog component react, vertical timeline tailwind, neuctra ui timeline",
  path: "/docs/timeline",
});

const timelineFaq = buildComponentFaq("Timeline", {
  sizes: ["sm", "md"],
});

export default function TimelineLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Timeline", path: "/docs/timeline" },
          ]),
          techArticleSchema({
            name: "Timeline",
            description: DESCRIPTION,
            path: "/docs/timeline",
          }),
          faqSchema(timelineFaq),
        ]}
      />
      {children}
    </>
  );
}
