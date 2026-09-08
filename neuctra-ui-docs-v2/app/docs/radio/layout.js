import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "RadioGroup Component — Accessible React Selection Controls | Neuctra UI";
const DESCRIPTION =
  "Build accessible and customizable RadioGroup components in React. Supports keyboard navigation, icons, descriptions, multiple sizes, orientations, validation states, and full Tailwind styling control for SaaS UI.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "React RadioGroup component, accessible radio buttons React, Tailwind RadioGroup, form radio component React, custom radio UI, keyboard accessible radio group, React selection control, SaaS form components, Neuctra UI RadioGroup, headless radio group React",
  path: "/docs/radio",
});

const radioFaq = buildComponentFaq("RadioGroup", {
  sizes: ["sm", "md", "lg"],
});

export default function RadioLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Radio", path: "/docs/radio" },
          ]),
          techArticleSchema({
            name: "RadioGroup",
            description: DESCRIPTION,
            path: "/docs/radio",
          }),
          faqSchema(radioFaq),
        ]}
      />
      {children}
    </>
  );
}
