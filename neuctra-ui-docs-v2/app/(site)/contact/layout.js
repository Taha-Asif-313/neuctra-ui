import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "Contact — Neuctra UI",
  description:
    "Get in touch with the Neuctra UI team for support, feedback, contributions, and collaboration.",
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
