import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Wizard - React Stepper Form Component | Neuctra UI";
const DESCRIPTION =
  "A React wizard that combines a stepper with paginated content, controlled or uncontrolled steps, async validation gates and a finish handler.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react wizard, multi step form react, react stepper form, tailwind wizard component, neuctra ui wizard",
  path: "/docs/wizard",
});

const wizardFaq = buildComponentFaq("Wizard", {
  sizes: ["sm", "md"],
});

export default function WizardLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Wizard", path: "/docs/wizard" },
          ]),
          techArticleSchema({
            name: "Wizard",
            description: DESCRIPTION,
            path: "/docs/wizard",
          }),
          faqSchema(wizardFaq),
        ]}
      />
      {children}
    </>
  );
}
