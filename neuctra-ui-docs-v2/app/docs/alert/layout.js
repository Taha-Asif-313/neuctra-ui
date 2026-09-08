import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "React Toast Notifications & useToast Hook | Neuctra UI";
const DESCRIPTION =
  "Create react-hot-toast-style toast notifications in React with Neuctra UI. Standalone toast() import, loading/promise support, position control, success/error/warning/info types, and full customization.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react toast, toast notifications react, react-hot-toast alternative, useToast hook, notification component, react alerts, toast provider, toast promise, toast loading, react ui library, success notification, error notification, neuctra ui",
  path: "/docs/alert",
});

const alertFaq = buildComponentFaq("Toast", {
  variants: ["light", "soft", "dark"],
});

export default function AlertLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Alert", path: "/docs/alert" },
          ]),
          techArticleSchema({
            name: "Toast",
            description: DESCRIPTION,
            path: "/docs/alert",
          }),
          faqSchema(alertFaq),
        ]}
      />
      {children}
    </>
  );
}
