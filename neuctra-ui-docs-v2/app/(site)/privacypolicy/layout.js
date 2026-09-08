import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "Privacy Policy — Neuctra UI",
  description:
    "Neuctra UI Privacy Policy: how we collect and use data, security practices, and user rights.",
  path: "/privacypolicy",
});

export default function PrivacyPolicyLayout({ children }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Privacy Policy", path: "/privacypolicy" },
        ])}
      />
      {children}
    </>
  );
}
