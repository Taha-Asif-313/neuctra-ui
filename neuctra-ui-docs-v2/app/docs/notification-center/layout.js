import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Notification Center - React Inbox Component | Neuctra UI";
const DESCRIPTION =
  "A React notification inbox with an unread badge, grouped items, custom triggers, mark-read callbacks and a popover panel.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react notification center, react inbox component, unread badge react, tailwind notifications popover, neuctra ui notification center",
  path: "/docs/notification-center",
});

const notificationCenterFaq = buildComponentFaq("NotificationCenter");

export default function NotificationCenterLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Notification Center", path: "/docs/notification-center" },
          ]),
          techArticleSchema({
            name: "NotificationCenter",
            description: DESCRIPTION,
            path: "/docs/notification-center",
          }),
          faqSchema(notificationCenterFaq),
        ]}
      />
      {children}
    </>
  );
}
