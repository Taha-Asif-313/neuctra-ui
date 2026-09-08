import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "AvatarGroup Component — React Stacked Avatars | Neuctra UI";
const DESCRIPTION =
  "React avatar group with overlapping stack, background rings and an automatic +N overflow counter — built with Tailwind CSS.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react avatar group, stacked avatars ui, team avatars component, avatar stack react, neuctra ui avatar group",
  path: "/docs/avatar-group",
});

const avatarGroupFaq = buildComponentFaq("AvatarGroup", {
  sizes: ["sm", "md", "lg"],
});

export default function AvatarGroupLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Avatar Group", path: "/docs/avatar-group" },
          ]),
          techArticleSchema({
            name: "AvatarGroup",
            description: DESCRIPTION,
            path: "/docs/avatar-group",
          }),
          faqSchema(avatarGroupFaq),
        ]}
      />
      {children}
    </>
  );
}
