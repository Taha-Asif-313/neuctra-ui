import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Announcement Bar Component - React Status Banners | Neuctra UI";
const DESCRIPTION =
  "React announcement bar with info, warning, success, and destructive tones, optional actions, icons, and persisted dismissal.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react announcement bar, react status banner, dismissible banner react, maintenance notice ui, promotional bar react, alert banner Tailwind, neuctra ui announcement bar",
  path: "/docs/announcement-bar",
});

const announcementBarFaq = buildComponentFaq("AnnouncementBar", {
  variants: ["solid", "soft"],
  sizes: ["sm", "md"],
});

export default function AnnouncementBarLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Announcement Bar", path: "/docs/announcement-bar" },
          ]),
          techArticleSchema({
            name: "Announcement Bar",
            description: DESCRIPTION,
            path: "/docs/announcement-bar",
          }),
          faqSchema(announcementBarFaq),
        ]}
      />
      {children}
    </>
  );
}
