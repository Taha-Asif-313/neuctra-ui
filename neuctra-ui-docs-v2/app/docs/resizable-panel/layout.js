import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Resizable Panel Component - React Split Pane Layout | Neuctra UI";
const DESCRIPTION =
  "Create draggable split-pane layouts with percentage-based sizing, min and max constraints, collapsible panels, keyboard resizing, and horizontal or vertical directions.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react resizable panel, split pane layout react, draggable panels, collapsible sidebar react, resize handle component, tailwind split pane, neuctra ui",
  path: "/docs/resizable-panel",
});

const resizablePanelFaq = buildComponentFaq("ResizablePanelGroup");

export default function ResizablePanelLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Resizable Panel", path: "/docs/resizable-panel" },
          ]),
          techArticleSchema({
            name: "ResizablePanelGroup",
            description: DESCRIPTION,
            path: "/docs/resizable-panel",
          }),
          faqSchema(resizablePanelFaq),
        ]}
      />
      {children}
    </>
  );
}
