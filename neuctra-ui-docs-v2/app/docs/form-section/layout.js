import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Form Section Component - Accessible React Fieldset | Neuctra UI";
const DESCRIPTION =
  "Group related form controls with a semantic fieldset and legend, optional description, and a disabled state in a clean React form section component.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react form section, accessible fieldset component, react form grouping, semantic legend ui, disabled fieldset react, tailwind form section, neuctra ui",
  path: "/docs/form-section",
});

const formSectionFaq = buildComponentFaq("FormSection", {
  variants: ["card", "plain"],
  sizes: ["sm", "md", "lg"],
});

export default function FormSectionLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Form Section", path: "/docs/form-section" },
          ]),
          techArticleSchema({
            name: "FormSection",
            description: DESCRIPTION,
            path: "/docs/form-section",
          }),
          faqSchema(formSectionFaq),
        ]}
      />
      {children}
    </>
  );
}
