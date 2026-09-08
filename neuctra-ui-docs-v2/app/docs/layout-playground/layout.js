import { buildMetadata } from "@/lib/seo/buildMetadata";

// Orphan route: not linked from the Sidebar or the old sitemap.xml. Ported
// for functional parity but not worth indexing — noIndex avoids diluting
// crawl budget on a page nobody can discover via navigation.
export const metadata = buildMetadata({
  title: "Layout Playground — Interactive Flex & Grid Builder | Neuctra UI",
  description:
    "Experiment with flexbox and grid layouts in real time using the Neuctra UI Layout Playground. Adjust columns, spacing, alignment, and sidebar layouts and generate production-ready React JSX instantly.",
  keywords:
    "layout playground, react layout builder, flexbox generator, grid layout tool, ui layout playground, tailwind flex grid builder, container layout react, sidebar layout generator, dashboard layout builder, responsive ui builder, neuctra ui tools",
  path: "/docs/layout-playground",
  noIndex: true,
});

export default function LayoutPlaygroundLayout({ children }) {
  return children;
}
