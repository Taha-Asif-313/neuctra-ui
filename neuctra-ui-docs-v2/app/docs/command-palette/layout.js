import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Command Palette Component - React Cmd+K Search Menu | Neuctra UI";
const DESCRIPTION =
  "Searchable React command palette with grouped commands, keyboard navigation, recent items, shortcut hints, and an accessible modal overlay.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react command palette, cmd k menu react, react command menu, searchable command list, keyboard navigation react, shortcut hints ui, neuctra ui command palette",
  path: "/docs/command-palette",
});

const commandPaletteFaq = buildComponentFaq("CommandPalette");

export default function CommandPaletteLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Command Palette", path: "/docs/command-palette" },
          ]),
          techArticleSchema({
            name: "Command Palette",
            description: DESCRIPTION,
            path: "/docs/command-palette",
          }),
          faqSchema(commandPaletteFaq),
        ]}
      />
      {children}
    </>
  );
}
