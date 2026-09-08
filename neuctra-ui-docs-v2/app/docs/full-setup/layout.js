import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema } from "@/lib/seo/schemas/faqSchema";

const TITLE =
  "Neuctra UI Full Setup Guide - React Frameworks + Tailwind CSS v4 Installation";
const DESCRIPTION =
  "Complete step-by-step setup guide for Neuctra UI. Learn how to configure Vite, Next.js, Remix, install Tailwind CSS v4, set up theme variables, enable dark mode, and verify your React project is ready for production.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "neuctra ui setup, react ui library setup, vite tailwind css v4 setup, nextjs tailwind css v4 setup, remix tailwind css v4 setup, install neuctra ui, tailwind v4 react setup, react component library setup guide, dark mode setup react, ui kit installation guide, modern react ui framework",
  path: "/docs/full-setup",
});

const fullSetupFaq = [
  {
    question: "Which React frameworks does Neuctra UI support?",
    answer:
      "Neuctra UI works with Vite, Next.js, and Remix. Tailwind CSS v4 is configured slightly differently per framework (a Vite plugin for Vite/Remix, a PostCSS plugin for Next.js), but the component library and theme system are identical across all three.",
  },
  {
    question: "Do I need to manually write a theme context?",
    answer:
      "No — running `npx @neuctra/ui-cli@latest init` generates the theme context file for you automatically (.tsx if it detects TypeScript, .jsx otherwise) and wraps your app with ThemeProvider. Manual setup is only needed if you want full control over the file.",
  },
  {
    question: "How do I avoid a flash of the wrong theme on page load?",
    answer:
      "Apply the .dark class before paint rather than in a post-mount effect — the theme context's lazy useState initializer reads localStorage/prefers-color-scheme and sets the class synchronously on first render, so there's no flash.",
  },
];

export default function FullSetupLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Full Setup Guide", path: "/docs/full-setup" },
          ]),
          techArticleSchema({
            name: "Full Setup Guide",
            description: DESCRIPTION,
            path: "/docs/full-setup",
          }),
          faqSchema(fullSetupFaq),
        ]}
      />
      {children}
    </>
  );
}
