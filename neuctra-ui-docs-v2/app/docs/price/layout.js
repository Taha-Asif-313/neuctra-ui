import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Price Component - React Pricing Display with Savings | Neuctra UI";
const DESCRIPTION =
  "Format and display product prices with currency locales, comparison prices, savings badges, sizes, and installment text in an accessible React component.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react price component, currency formatting react, compare at price ui, savings badge component, react product price, tailwind price tag, neuctra ui",
  path: "/docs/price",
});

const priceFaq = buildComponentFaq("Price", { sizes: ["sm", "md", "lg"] });

export default function PriceLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Price", path: "/docs/price" },
          ]),
          techArticleSchema({
            name: "Price",
            description: DESCRIPTION,
            path: "/docs/price",
          }),
          faqSchema(priceFaq),
        ]}
      />
      {children}
    </>
  );
}
