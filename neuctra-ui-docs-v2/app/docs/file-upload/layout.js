import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "FileUpload Component — React Drag & Drop Uploader | Neuctra UI";
const DESCRIPTION =
  "React file upload component with drag-and-drop, click-to-browse, accept filters, size and count limits, per-file errors and a removable file list.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react file upload component, drag and drop uploader, dropzone react, file input tailwind, upload files ui, neuctra ui file upload",
  path: "/docs/file-upload",
});

const fileUploadFaq = buildComponentFaq("FileUpload");

export default function FileUploadLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "File Upload", path: "/docs/file-upload" },
          ]),
          techArticleSchema({
            name: "FileUpload",
            description: DESCRIPTION,
            path: "/docs/file-upload",
          }),
          faqSchema(fileUploadFaq),
        ]}
      />
      {children}
    </>
  );
}
