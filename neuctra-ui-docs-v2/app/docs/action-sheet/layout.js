import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Action Sheet - React Bottom Action Menu | Neuctra UI";
const DESCRIPTION =
  "A mobile-friendly React action sheet for contextual actions with focus trapping, scroll lock, safe-area padding, destructive and disabled options, and reduced-motion support.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react action sheet, bottom action menu react, mobile action sheet tailwind, dialog sheet component, neuctra ui action sheet",
  path: "/docs/action-sheet",
});

const actionSheetFaq = buildComponentFaq("ActionSheet");

export default function ActionSheetLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Action Sheet", path: "/docs/action-sheet" },
          ]),
          techArticleSchema({
            name: "ActionSheet",
            description: DESCRIPTION,
            path: "/docs/action-sheet",
          }),
          faqSchema(actionSheetFaq),
        ]}
      />
      {children}
    </>
  );
}
