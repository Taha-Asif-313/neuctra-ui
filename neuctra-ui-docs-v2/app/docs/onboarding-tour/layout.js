import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Onboarding Tour Component - React Product Walkthroughs | Neuctra UI";
const DESCRIPTION =
  "React onboarding tour that anchors step tooltips to real page elements with a spotlight, keyboard support, and skip/back controls.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react onboarding tour, react product tour, guided walkthrough react, spotlight tooltip react, step by step tour ui, first time user experience, neuctra ui onboarding tour",
  path: "/docs/onboarding-tour",
});

const onboardingTourFaq = buildComponentFaq("OnboardingTour");

export default function OnboardingTourLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Onboarding Tour", path: "/docs/onboarding-tour" },
          ]),
          techArticleSchema({
            name: "Onboarding Tour",
            description: DESCRIPTION,
            path: "/docs/onboarding-tour",
          }),
          faqSchema(onboardingTourFaq),
        ]}
      />
      {children}
    </>
  );
}
