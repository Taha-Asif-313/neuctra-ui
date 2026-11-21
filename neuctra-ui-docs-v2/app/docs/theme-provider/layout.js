import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Theme Provider Component - React Dark Mode & Theme Context | Neuctra UI";
const DESCRIPTION =
  "React theme provider with light, dark, and system modes, OS preference syncing, persisted storage, a useTheme hook for theme-aware components, and a no-flash script for server-rendered apps.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react theme provider, react dark mode, useTheme hook, system theme react, persisted theme react, Tailwind dark mode, neuctra ui theme",
  path: "/docs/theme-provider",
});

const themeProviderFaq = buildComponentFaq("ThemeProvider");

export default function ThemeProviderLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Theme Provider", path: "/docs/theme-provider" },
          ]),
          techArticleSchema({
            name: "Theme Provider",
            description: DESCRIPTION,
            path: "/docs/theme-provider",
          }),
          faqSchema(themeProviderFaq),
        ]}
      />
      {children}
    </>
  );
}
