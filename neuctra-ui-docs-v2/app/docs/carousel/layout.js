import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Carousel Component — React Slider & Slideshow | Neuctra UI";
const DESCRIPTION =
  "React carousel with arrows, dots, looping, autoplay with hover pause, touch swipe, keyboard navigation and reduced-motion support.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react carousel component, image slider react, slideshow ui, autoplay carousel, swipe slider tailwind, neuctra ui carousel",
  path: "/docs/carousel",
});

const carouselFaq = buildComponentFaq("Carousel");

export default function CarouselLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Carousel", path: "/docs/carousel" },
          ]),
          techArticleSchema({
            name: "Carousel",
            description: DESCRIPTION,
            path: "/docs/carousel",
          }),
          faqSchema(carouselFaq),
        ]}
      />
      {children}
    </>
  );
}
