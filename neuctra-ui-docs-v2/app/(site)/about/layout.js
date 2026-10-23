import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";

export const metadata = buildMetadata({
  title: "About Neuctra UI - Components, CLI, and AI Assistant",
  description:
    "Learn about the Neuctra UI toolkit: its React component library, project setup CLI, and local or hosted MCP integrations for AI coding assistants.",
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
