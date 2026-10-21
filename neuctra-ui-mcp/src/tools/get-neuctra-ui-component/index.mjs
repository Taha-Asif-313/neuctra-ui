import { z } from "zod";

const COMPONENT_CATEGORIES = [
  "layout", "typography", "form", "actions", "data-display", "feedback", "overlay", "navigation",
];

const SYNONYMS = {
  layouting: "layout container section grid",
  layout: "layout container section grid",
  form: "form input field select checkbox radio textarea",
  forms: "form input field select checkbox radio textarea",
  field: "input form field",
  fields: "input form field",
  image: "image media picture avatar",
  images: "image media picture avatar",
  carousel: "carousel slider slides",
  carousels: "carousel slider slides",
  slider: "carousel slider slides",
  modal: "modal dialog overlay popup",
  dialog: "modal dialog overlay popup",
  dialogs: "modal dialog overlay popup",
  drawer: "drawer panel sheet overlay",
  drawers: "drawer panel sheet overlay",
  card: "card panel surface",
  cards: "card panel surface",
};

const STOP_WORDS = new Set(["a", "an", "and", "for", "i", "in", "it", "of", "on", "the", "to", "ui", "use", "with"]);

function tokens(text) {
  return text
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-z0-9]+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

function searchableText(component) {
  return [
    component.name,
    component.category,
    component.description,
    ...component.props.flatMap((prop) => [prop.name, prop.description, prop.type]),
  ].join(" ").toLowerCase();
}

function rankComponent(component, query) {
  const name = component.name.toLowerCase();
  const haystack = searchableText(component);
  const queryText = query.toLowerCase().trim();
  const queryTokens = tokens(queryText);
  let score = 0;

  if (name === queryText) score += 100;
  else if (name.includes(queryText) && queryText) score += 50;

  for (const token of queryTokens) {
    const expanded = tokens(SYNONYMS[token] ?? token);
    for (const term of expanded) {
      if (name === term) score += 32;
      else if (name.includes(term)) score += 18;
      if (component.category.toLowerCase() === term) score += 10;
      if (haystack.includes(term)) score += 3;
    }
  }

  return score;
}

function summarize(component) {
  return {
    name: component.name,
    import: `import { ${component.name} } from '${component.importFrom}';`,
    category: component.category,
    description: component.description,
    propCount: component.props.length,
  };
}

export function findNeuctraUiComponents(registry, request, { category, limit = 5 } = {}) {
  if (!request?.trim()) return [];
  return registry.components
    .filter((component) => !category || component.category === category)
    .map((component) => ({ component, score: rankComponent(component, request) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name))
    .slice(0, limit)
    .map(({ component }) => component);
}

export function registerGetNeuctraUiComponentTool(server, registry) {
  const componentsByName = new Map(
    registry.components.map((component) => [component.name.toLowerCase(), component]),
  );

  server.registerTool(
    "get-neuctra-ui-component",
    {
      title: "Get Neuctra UI components for a UI need",
      description:
        "Find and retrieve the real @neuctra/ui components that fit a natural-language UI requirement, such as layout containers, input forms, images, carousels, cards, modals, or drawers. Returns exact package imports, full prop specifications, and documented examples for ranked matches. Use this before implementing with Neuctra UI; do not guess component names or props. Set category to browse a category or omit request/category to list components.",
      inputSchema: {
        request: z.string().optional().describe("Describe the UI need naturally, e.g. 'a dismissible confirmation dialog' or 'responsive carousel for product images'."),
        componentName: z.string().optional().describe("Exact component name when already known, e.g. Container, Input, Carousel, Card, Modal, or Drawer."),
        category: z.enum(COMPONENT_CATEGORIES).optional().describe("Optionally restrict component discovery to a library category."),
        limit: z.number().int().min(1).max(10).default(5).describe("Maximum number of full component specs to return for a natural-language request."),
      },
    },
    async ({ request, componentName, category, limit }) => {
      if (componentName) {
        const exact = componentsByName.get(componentName.toLowerCase());
        if (exact && (!category || exact.category === category)) {
          return { content: [{ type: "text", text: JSON.stringify({ components: [exact] }, null, 2) }] };
        }
        if (!request?.trim()) {
          const suggestions = registry.components
            .filter((component) => (!category || component.category === category)
              && component.name.toLowerCase().includes(componentName.toLowerCase()))
            .slice(0, 8)
            .map(summarize);
          return {
            isError: true,
            content: [{
              type: "text",
              text: JSON.stringify({
                message: `No exact component named "${componentName}"${category ? ` in category "${category}"` : ""}.`,
                suggestions,
              }, null, 2),
            }],
          };
        }
      }

      if (!request?.trim()) {
        const components = registry.components
          .filter((component) => !category || component.category === category)
          .map(summarize);
        return { content: [{ type: "text", text: JSON.stringify({ components }, null, 2) }] };
      }

      const ranked = findNeuctraUiComponents(registry, request, { category, limit });

      if (!ranked.length) {
        const suggestions = registry.components
          .filter((component) => !category || component.category === category)
          .map(summarize);
        return {
          content: [{ type: "text", text: JSON.stringify({ message: "No component matched that request. Browse these available components or refine the request.", suggestions }, null, 2) }],
        };
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({ request, components: ranked }, null, 2),
        }],
      };
    },
  );
}
