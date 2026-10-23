import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "Privacy Policy - Neuctra UI",
  description:
    "Read the Neuctra UI Privacy Policy for information about data collection, use, security practices, and policy updates.",
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
