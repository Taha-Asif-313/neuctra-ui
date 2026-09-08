import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "Terms of Service — Neuctra UI",
  description:
    "Terms of Service for Neuctra UI. Read the legal terms, license, and usage guidelines for using the Neuctra UI library.",
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
