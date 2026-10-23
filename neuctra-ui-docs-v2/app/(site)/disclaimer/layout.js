import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

const title = "Disclaimer - Neuctra UI";
const description = "Information about the scope of Neuctra UI documentation, software licenses, examples, and external service links.";
export const metadata = buildMetadata({ title, description, path: "/disclaimer" });

export default function DisclaimerLayout({ children }) {
  return <><JsonLd data={breadcrumbSchema([{ label: "Home", path: "/" }, { label: "Disclaimer", path: "/disclaimer" }])} />{children}</>;
}
