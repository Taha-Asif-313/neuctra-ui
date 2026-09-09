import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Stepper Component — React Multi-Step Progress | Neuctra UI";
const DESCRIPTION =
  "React stepper component for wizards and checkouts. Horizontal and vertical orientation, clickable completed steps and done/active/pending states.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react stepper component, wizard steps ui, checkout steps react, multi step form progress, tailwind stepper, neuctra ui stepper",
  path: "/docs/stepper",
});

const stepperFaq = buildComponentFaq("Stepper", { sizes: ["sm", "md"] });

export default function StepperLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Stepper", path: "/docs/stepper" },
          ]),
          techArticleSchema({
            name: "Stepper",
            description: DESCRIPTION,
            path: "/docs/stepper",
          }),
          faqSchema(stepperFaq),
        ]}
      />
      {children}
    </>
  );
}
