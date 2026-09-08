import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Progress Component — React Progress Bar & Ring | Neuctra UI";
const DESCRIPTION =
  "React progress component with linear and circular variants, determinate and indeterminate modes, value labels and full ARIA progressbar semantics.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react progress bar, circular progress react, progress ring component, indeterminate progress, tailwind progress bar, neuctra ui progress",
  path: "/docs/progress",
});

const progressFaq = buildComponentFaq("Progress", {
  variants: ["linear", "circular"],
  sizes: ["sm", "md", "lg"],
});

export default function ProgressLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Progress", path: "/docs/progress" },
          ]),
          techArticleSchema({
            name: "Progress",
            description: DESCRIPTION,
            path: "/docs/progress",
          }),
          faqSchema(progressFaq),
        ]}
      />
      {children}
    </>
  );
}
