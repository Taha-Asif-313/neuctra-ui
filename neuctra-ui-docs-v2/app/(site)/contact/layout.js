import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "Contact - Neuctra UI",
  description:
    "Find contact routes for Neuctra UI product questions, bug reports, feature requests, and open-source contributions.",
  path: "/contact",
});

export default function ContactLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
        ])}
      />
      {children}
    </>
  );
}
