import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Reads data/*.json from disk. Only works on runtimes with a filesystem
// (Node, Bun, Deno) — callers on edge/serverless runtimes without one
// (Cloudflare Workers) must import the JSON files themselves at build time
// and pass them into createServer({ registry, theme }) instead. Resolving
// __dirname is deferred inside this function (not module top-level) because
// import.meta.url is unavailable in some bundled edge runtimes even when
// this function itself is never called there.
function loadDataFromDisk() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const DATA_DIR = path.resolve(__dirname, "..", "data");
  const registry = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "components.json"), "utf8"),
  );
  const theme = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "theme.json"), "utf8"));
  return { registry, theme };
}

function summarize(component) {
  return {
    name: component.name,
    category: component.category,
    description: component.description,
    propCount: component.props.length,
  };
}

function matchesQuery(component, query) {
  const q = query.toLowerCase();
  if (component.name.toLowerCase().includes(q)) return true;
  if (component.category.toLowerCase().includes(q)) return true;
  if (component.description.toLowerCase().includes(q)) return true;
  return component.props.some((p) => p.name.toLowerCase().includes(q));
}

export function createServer(data) {
  const { registry, theme } = data ?? loadDataFromDisk();
  const componentsByName = new Map(registry.components.map((c) => [c.name, c]));

  const server = new McpServer({
    name: "neuctra-ui",
    version: "0.3.1",
  });

  server.registerTool(
    "list_components",
    {
      title: "List Neuctra UI components",
      description:
        "List every component exported by @neuctra/ui, optionally filtered by category. Returns compact summaries — use get_component for full prop details.",
      inputSchema: {
        category: z
          .enum([
            "layout",
            "typography",
            "form",
            "actions",
            "data-display",
            "feedback",
            "overlay",
            "navigation",
          ])
          .optional()
          .describe("Restrict results to one category."),
      },
    },
    async ({ category }) => {
      const list = registry.components
        .filter((c) => !category || c.category === category)
        .map(summarize);
      return {
        content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
      };
    },
  );

  server.registerTool(
    "get_component",
    {
      title: "Get a Neuctra UI component's full spec",
      description:
        "Get the full spec for one @neuctra/ui component: every prop with its type, whether it's required, its default value, description, plus a real usage example. Always call this before writing code that uses a component you haven't used yet in this conversation — do not guess prop names.",
      inputSchema: {
        name: z
          .string()
          .describe('Exact component name, e.g. "Input", "Select", "Modal", "CardHeader".'),
      },
    },
    async ({ name }) => {
      const component = componentsByName.get(name);
      if (!component) {
        const suggestions = registry.components
          .map((c) => c.name)
          .filter((n) => n.toLowerCase().includes(name.toLowerCase()))
          .slice(0, 8);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `No component named "${name}". ${
                suggestions.length
                  ? `Did you mean: ${suggestions.join(", ")}?`
                  : "Call list_components to see everything available."
              }`,
            },
          ],
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(component, null, 2) }],
      };
    },
  );

  server.registerTool(
    "search_components",
    {
      title: "Search Neuctra UI components",
      description:
        "Search components by keyword against name, category, description, and prop names. Use this when you know what you need (e.g. \"date picker\", \"loading state\", \"icon button\") but not the exact component name.",
      inputSchema: {
        query: z.string().describe("Keyword or short phrase to search for."),
      },
    },
    async ({ query }) => {
      const results = registry.components.filter((c) => matchesQuery(c, query)).map(summarize);
      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      };
    },
  );

  server.registerTool(
    "get_theme",
    {
      title: "Get Neuctra UI theming rules and tokens",
      description:
        "Get the semantic color token system (bg-primary, text-foreground, etc.), the styling rules generated UI must follow, a set of rules for avoiding the visual tells that make UI look AI-generated (gradients, decorative shadows/blurs/glows, emoji-as-icons, etc.), the recommended `@neuctra/ui-cli` setup command, and how the toast notification API works. Call this before generating any UI — not just for colors.",
      inputSchema: {},
    },
    async () => {
      return {
        content: [{ type: "text", text: JSON.stringify(theme, null, 2) }],
      };
    },
  );

  return server;
}
