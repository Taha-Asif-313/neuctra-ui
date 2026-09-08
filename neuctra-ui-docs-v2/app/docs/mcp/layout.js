import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Neuctra UI MCP - Connect AI to Neuctra UI";
const DESCRIPTION =
  "Connect AI coding assistants to Neuctra UI using the remote MCP server. Let AI discover components, props, examples, theme tokens, and styling rules automatically.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Neuctra UI MCP, Neuctra MCP, remote MCP, MCP server, Model Context Protocol, AI coding assistant, Claude Code, Cursor, Antigravity, React UI, Neuctra UI",
  path: "/docs/mcp",
});

const mcpFaq = [
  {
    question: "How do I connect Neuctra UI MCP to my AI coding assistant?",
    answer:
      "Add https://mcp.ui.neuctra.com/mcp as a remote MCP server in your AI tool's MCP settings — no package installation is required. Most AI tools with remote MCP or connector support (Claude Code, Cursor, Antigravity) accept this URL directly.",
  },
  {
    question: "What can the AI do once Neuctra UI MCP is connected?",
    answer:
      "It can call list_components to discover components, get_component to inspect exact props/types/defaults/examples for one component, search_components to find a component by natural-language query, and get_theme to fetch semantic color tokens and styling guidelines — instead of guessing from training data.",
  },
  {
    question: "Do I need to run the MCP server locally?",
    answer:
      "No — most users should use the hosted remote MCP server. Running it locally (npx -y @neuctra/ui-mcp) is only needed if you're developing or testing the MCP package itself.",
  },
];

export default function McpLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Neuctra UI MCP", path: "/docs/mcp" },
          ]),
          techArticleSchema({
            name: "Neuctra UI MCP",
            description: DESCRIPTION,
            path: "/docs/mcp",
          }),
          faqSchema(mcpFaq),
        ]}
      />
      {children}
    </>
  );
}
