import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "About — Neuctra UI",
  description:
    "Learn what Neuctra UI is, the principles behind it, and why teams use it to ship modern interfaces faster.",
  path: "/about",
});

export default function AboutLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "About", path: "/about" },
        ])}
      />
      {children}
    </>
  );
}
