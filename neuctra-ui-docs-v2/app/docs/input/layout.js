import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "React Input Component - Form Fields for SaaS & Dashboards | Neuctra UI";
const DESCRIPTION =
  "Build modern form inputs in React with Neuctra UI. Supports validation states, prefixes, suffixes, password toggle, textarea, sizing, and full customization for SaaS apps and dashboards.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react input component, form input react, saas form ui, tailwind input component, react form builder, authentication input ui, input validation react, textarea component react, neuctra ui input, dashboard form components",
  path: "/docs/input",
});

const inputFaq = buildComponentFaq("Input", {
  sizes: ["sm", "md", "lg"],
});

export default function InputLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Input", path: "/docs/input" },
          ]),
          techArticleSchema({
            name: "Input",
            description: DESCRIPTION,
            path: "/docs/input",
          }),
          faqSchema(inputFaq),
        ]}
      />
      {children}
    </>
  );
}
