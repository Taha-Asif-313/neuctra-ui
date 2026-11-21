import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "App Shell Component - React Responsive Dashboard Layout | Neuctra UI";
const DESCRIPTION =
  "Responsive React app shell with a desktop sidebar, sticky header, mobile navigation drawer, and a main landmark for accessible dashboards. Use contained mode to embed it inside any bounded region.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react app shell, react dashboard layout, responsive admin layout, mobile sidebar drawer react, sticky header layout, main landmark, neuctra ui app shell",
  path: "/docs/app-shell",
});

const appShellFaq = buildComponentFaq("AppShell");

export default function AppShellLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "App Shell", path: "/docs/app-shell" },
          ]),
          techArticleSchema({
            name: "App Shell",
            description: DESCRIPTION,
            path: "/docs/app-shell",
          }),
          faqSchema(appShellFaq),
        ]}
      />
      {children}
    </>
  );
}
