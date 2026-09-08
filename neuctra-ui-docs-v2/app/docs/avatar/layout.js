import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Avatar Component — React User Profile UI | Neuctra UI";
const DESCRIPTION =
  "Build flexible and accessible avatar components with Neuctra UI. Supports images, initials fallback, online/offline status, sizes, shapes, rings, and click interactions.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react avatar component, user avatar ui, profile image component, avatar fallback initials, online offline indicator react, avatar size variants, circular avatar react, neuctra ui avatar",
  path: "/docs/avatar",
});

const avatarFaq = buildComponentFaq("Avatar", {
  variants: ["circular", "rounded", "square"],
  sizes: ["xs", "sm", "md", "lg", "xl", "2xl", "responsive"],
});

export default function AvatarLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Avatar", path: "/docs/avatar" },
          ]),
          techArticleSchema({
            name: "Avatar",
            description: DESCRIPTION,
            path: "/docs/avatar",
          }),
          faqSchema(avatarFaq),
        ]}
      />
      {children}
    </>
  );
}
