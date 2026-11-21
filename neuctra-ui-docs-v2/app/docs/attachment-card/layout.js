import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Attachment Card Component - React File Upload Status | Neuctra UI";
const DESCRIPTION =
  "Display file attachments with upload progress, ready and error states, thumbnails, retry and remove actions in a compact accessible React card.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react attachment card, file upload progress ui, react file attachment component, upload status card, retry remove file ui, tailwind attachment card, neuctra ui",
  path: "/docs/attachment-card",
});

const attachmentCardFaq = buildComponentFaq("AttachmentCard", { sizes: ["sm", "md"] });

export default function AttachmentCardLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Attachment Card", path: "/docs/attachment-card" },
          ]),
          techArticleSchema({
            name: "AttachmentCard",
            description: DESCRIPTION,
            path: "/docs/attachment-card",
          }),
          faqSchema(attachmentCardFaq),
        ]}
      />
      {children}
    </>
  );
}
