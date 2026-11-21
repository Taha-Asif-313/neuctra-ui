import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Live Announcer Component - React aria-live Region | Neuctra UI";
const DESCRIPTION =
  "Announce dynamic messages to screen readers with a visually hidden, configurable aria-live region supporting polite and assertive politeness levels.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react live announcer, aria live region react, screen reader announcements, accessible status message, polite assertive announcement, neuctra ui",
  path: "/docs/live-announcer",
});

const liveAnnouncerFaq = buildComponentFaq("LiveAnnouncer");

export default function LiveAnnouncerLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Live Announcer", path: "/docs/live-announcer" },
          ]),
          techArticleSchema({
            name: "LiveAnnouncer",
            description: DESCRIPTION,
            path: "/docs/live-announcer",
          }),
          faqSchema(liveAnnouncerFaq),
        ]}
      />
      {children}
    </>
  );
}
