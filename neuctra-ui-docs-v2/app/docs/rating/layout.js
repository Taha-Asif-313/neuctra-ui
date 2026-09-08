import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Rating Component — React Star Rating | Neuctra UI";
const DESCRIPTION =
  "React star rating component with keyboard-accessible radio semantics, hover preview, clearable selection and fractional read-only display (e.g. 4.3).";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react rating component, star rating react, review stars ui, tailwind rating, fractional star rating, neuctra ui rating",
  path: "/docs/rating",
});

const ratingFaq = buildComponentFaq("Rating", {
  sizes: ["sm", "md", "lg"],
});

export default function RatingLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Rating", path: "/docs/rating" },
          ]),
          techArticleSchema({
            name: "Rating",
            description: DESCRIPTION,
            path: "/docs/rating",
          }),
          faqSchema(ratingFaq),
        ]}
      />
      {children}
    </>
  );
}
