import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Theme Toggle — Dark Mode Switch Component | Neuctra UI";
const DESCRIPTION =
  "Learn how to use the Theme Toggle component in Neuctra UI. A modern animated dark mode switch with Sun & Moon icons, fully reusable and context-driven.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "theme toggle react, dark mode switch react, lucide theme toggle, react theme context, neuctra ui theme, dark mode button react, custom toggle component",
  path: "/docs/theme-toggle",
});

const themeToggleFaq = [
  {
    question: "How do I import and use ThemeToggleButton?",
    answer:
      'Import it with `import { ThemeToggleButton } from "@neuctra/ui";` then pass the theme context from `useTheme()` as the `context` prop — it needs no internal hooks of its own.',
  },
  {
    question: "Can I style the Sun and Moon icons separately?",
    answer:
      "Yes. sunClassName and moonClassName style the icons independently on top of the root className, so you can match the toggle's colors to your brand instead of the default text-warning/text-info tokens.",
  },
  {
    question: "Where should ThemeProvider live in my app?",
    answer:
      "Keep ThemeProvider at the root of your application so every component — including ThemeToggleButton wherever it's placed (navbar, settings panel, etc.) — can access theme state.",
  },
];

export default function ThemeToggleLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Theme Toggle", path: "/docs/theme-toggle" },
          ]),
          techArticleSchema({
            name: "ThemeToggleButton",
            description: DESCRIPTION,
            path: "/docs/theme-toggle",
          }),
          faqSchema(themeToggleFaq),
        ]}
      />
      {children}
    </>
  );
}
