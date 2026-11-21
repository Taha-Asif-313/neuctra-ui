import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Alert Dialog Component - React Confirmation Dialogs | Neuctra UI";
const DESCRIPTION =
  "Accessible React alert dialog for destructive confirmations, with typed confirmation, Cancel-first focus, and forced-choice behavior.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react alert dialog, react confirmation dialog, destructive confirmation react, accessible dialog react, typed confirmation ui, forced choice dialog, neuctra ui alert dialog",
  path: "/docs/alert-dialog",
});

const alertDialogFaq = buildComponentFaq("AlertDialog");

export default function AlertDialogLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Alert Dialog", path: "/docs/alert-dialog" },
          ]),
          techArticleSchema({
            name: "Alert Dialog",
            description: DESCRIPTION,
            path: "/docs/alert-dialog",
          }),
          faqSchema(alertDialogFaq),
        ]}
      />
      {children}
    </>
  );
}
