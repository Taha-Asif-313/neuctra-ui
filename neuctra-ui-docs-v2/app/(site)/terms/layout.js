import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "Terms of Service - Neuctra UI",
  description:
    "Review the Neuctra UI Terms of Service, including the published license and usage guidelines for the software.",
  path: "/terms",
});

export default function TermsLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Terms of Service", path: "/terms" },
        ])}
      />
      {children}
    </>
  );
}
