import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Modal Component — React Dialogs, Overlays & SaaS UI Patterns | Neuctra UI";
const DESCRIPTION =
  "Build accessible modal dialogs with the Neuctra UI Modal component. Supports structured layouts, overlays, animations, async actions, and composable sections for SaaS dashboards, confirmations, and forms in React.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "React modal component, UI modal dialog, SaaS modal UI, React popup component, overlay dialog React, Tailwind modal, confirmation modal React, Neuctra UI Modal, modal form component, accessible dialog React, React UI library modal",
  path: "/docs/modal",
});

const modalFaq = buildComponentFaq("Modal");

export default function ModalLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Modal", path: "/docs/modal" },
          ]),
          techArticleSchema({
            name: "Modal",
            description: DESCRIPTION,
            path: "/docs/modal",
          }),
          faqSchema(modalFaq),
        ]}
      />
      {children}
    </>
  );
}
