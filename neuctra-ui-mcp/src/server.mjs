import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Reads data/*.json from disk. Only works on runtimes with a filesystem
// (Node, Bun, Deno) — callers on edge/serverless runtimes without one
// (Cloudflare Workers) must import the JSON files themselves at build time
// and pass them into createServer({ registry, theme, aiDesignRules }) instead.
// Resolving __dirname is deferred inside this function (not module top-level)
// because import.meta.url is unavailable in some bundled edge runtimes even
// when this function itself is never called there.
function loadDataFromDisk() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const DATA_DIR = path.resolve(__dirname, "..", "data");
  const registry = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "components.json"), "utf8"),
  );
  const theme = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "theme.json"), "utf8"),
  );
  const aiDesignRules = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "aiDesignRules.json"), "utf8"),
  );
  return { registry, theme, aiDesignRules };
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
  const { registry, theme, aiDesignRules } = data ?? loadDataFromDisk();
  const componentsByName = new Map(registry.components.map((c) => [c.name, c]));

  const server = new McpServer({
    name: "neuctra-ui",
    version: "0.4.0",
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
          .describe(
            'Exact component name, e.g. "Input", "Select", "Modal", "CardHeader".',
          ),
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
        'Search components by keyword against name, category, description, and prop names. Use this when you know what you need (e.g. "date picker", "loading state", "icon button") but not the exact component name.',
      inputSchema: {
        query: z.string().describe("Keyword or short phrase to search for."),
      },
    },
    async ({ query }) => {
      const results = registry.components
        .filter((c) => matchesQuery(c, query))
        .map(summarize);
      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      };
    },
  );

  server.registerTool(
    "get_theme",
    {
      title: "Get Neuctra UI theming tokens",
      description:
        "Get the semantic color token system (bg-primary, text-foreground, etc.), the recommended `@neuctra/ui-cli` setup command, and how the toast notification API works. Call get_design_rules alongside this before generating any UI — not just for colors.",
      inputSchema: {},
    },
    async () => {
      const { rules, antiAiLookRules, ...themeOnly } = theme;
      return {
        content: [{ type: "text", text: JSON.stringify(themeOnly, null, 2) }],
      };
    },
  );

  server.registerTool(
    "get_design_rules",
    {
      title: "Get Neuctra UI design rules",
      description:
        "Get every design rule generated UI must follow when using @neuctra/ui. Covers two levels: (1) styling rules — token usage, surface/background conventions, component composition requirements like CardBody being compulsory whenever Card has body content, component-specific gotchas like Dropdown's trigger propagation, and the full set of rules for avoiding the visual tells that make UI look AI-generated (gradients, decorative shadows/blurs/glows, emoji-as-icons, etc.); (2) product/UX design rules — a numbered 50-section guide covering design philosophy, visual hierarchy, page/sidebar/navigation structure, per-component usage guidance (when to use Card, Modal vs Drawer, Table vs List, etc.), spacing/color/border/radius/shadow conventions, responsive design, accessibility, interaction design, a final UI quality checklist, and the rule against overwriting a component's built-in design. Call this before generating any UI — not just get_theme.",
      inputSchema: {},
    },
    async () => {
      const { rules, antiAiLookRules } = theme;
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { stylingRules: rules, antiAiLookRules, productDesignGuide: aiDesignRules },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  return server;
}
