import { z } from "zod";
import { createComponentSearch } from "../../utils/component-search.mjs";

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
  command: "command-palette cmdk cmd+k palette actions",
  "command-palette": "command palette cmdk actions search",
  shell: "app-shell sidebar topbar dashboard admin layout",
  "app-shell": "app shell sidebar header dashboard layout",
  sidebar: "sidebar side navigation nav rail menu",
  "data-table": "data table grid datagrid sorting filtering selection pagination",
  grid: "data-table table rows columns grid",
  combobox: "combobox select typeahead async searchable",
  range: "range-slider slider min max price",
  "range-slider": "range slider dual thumb min max",
  wizard: "wizard stepper multi-step form onboarding checkout",
  notification: "notification-center toast inbox bell",
  inbox: "notification-center notification bell messages",
  chat: "chat-message message-list assistant conversation streaming",
  assistant: "chat-message message-list ai chat streaming",
  tree: "tree-view tree file folder hierarchy",
  toc: "table-of-contents on-this-page docs outline",
  docs: "code-block table-of-contents documentation api reference",
  lightbox: "lightbox image-gallery zoom media",
  pricing: "price price-tag commerce savings checkout",
  a11y: "skip-link visually-hidden live-announcer accessibility",
  resizable: "resizable-panel split pane drag resize",
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

  // "date picker", "text area", "icon button": the spaced spelling of an export name.
  const compact = queryTokens.join("");
  if (compact && compact !== queryText) {
    if (name === compact) score += 90;
    else if (compact.length >= 6 && name.includes(compact)) score += 40;
  }

  // Words of the export name ("OnboardingTour" -> onboarding, tour). Short
  // query words must match a whole name word, so "board" no longer hits
  // OnboardingTour; longer words may still match inside a name ("datepicker").
  const nameParts = component.name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().split(/\s+/);
  const nameHas = (term) => nameParts.includes(term) || (term.length >= 6 && name.includes(term));

  for (const token of queryTokens) {
    const expanded = tokens(SYNONYMS[token] ?? token);
    for (const term of expanded) {
      if (name === term) score += 32;
      else if (nameHas(term)) score += 18;
      else if (stem(term) !== term && nameHas(stem(term))) score += 18;
      if (component.category.toLowerCase() === term) score += 10;
      if (haystack.includes(term)) score += 3;
    }
  }

  return score + semanticScore(component, queryText, queryTokens);
}

// Plural-insensitive comparison key ("filters" -> "filter", "tabs" -> "tab").
const stem = (word) => (word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word);
const phrase = (text) => ` ${String(text).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;

// Uses the semantic layer written by enrichRegistry (aliases, use cases,
// family, keywords). Whole alias / use-case phrases found in the request weigh
// the most, so "confirm delete dialog" reaches AlertDialog and "cmd k search"
// reaches CommandPalette even though neither name appears in the request.
function semanticScore(component, queryText, queryTokens) {
  const search = component.search;
  if (!search) return 0;
  const text = phrase(queryText);
  const stemmedQuery = phrase(queryTokens.map(stem).join(" "));
  let score = 0;

  for (const [list, base] of [[search.aliases, 22], [search.useCases, 16]]) {
    for (const entry of list ?? []) {
      const words = tokens(entry);
      if (!words.length) continue;
      const exact = text.includes(phrase(words.join(" ")));
      const loose = !exact && words.length > 1 && stemmedQuery.includes(phrase(words.map(stem).join(" ")));
      if (exact || loose) score += base + Math.min(words.length, 4) * 4;
    }
  }

  const aliasTokens = new Set((search.aliases ?? []).flatMap(tokens).map(stem));
  const useCaseTokens = new Set((search.useCases ?? []).flatMap(tokens).map(stem));
  const keywordTokens = new Set((search.keywords ?? []).map(stem));
  const family = (search.family ?? "").split("-").map(stem);
  for (const token of queryTokens.map(stem)) {
    if (aliasTokens.has(token)) score += 5;
    if (useCaseTokens.has(token)) score += 3;
    if (family.includes(token)) score += 4;
    if (keywordTokens.has(token)) score += 1;
  }
  return score;
}

function stripSearch(component) {
  const { search: _search, ...rest } = component;
  return rest;
}

function summarize(component, guidance = null) {
  return {
    name: component.name,
    import: `import { ${component.name} } from '${component.importFrom}';`,
    category: component.category,
    description: component.description,
    ...(guidance ? { guidance } : {}),
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
    // `search` is internal ranking metadata added by the enrichment step;
    // it is not part of the public component spec and would only bloat tool
    // responses (especially the page builder).
    .map(({ component }) => stripSearch(component));
}

export function registerGetNeuctraUiComponentTool(server, registry) {
  const componentsByName = new Map(
    registry.components.map((component) => [component.name.toLowerCase(), component]),
  );
  const search = createComponentSearch(registry);
  const layoutIds = Object.keys(registry.search?.layouts ?? {});
  const familyIds = Object.keys(registry.search?.families ?? {});
  const enumOrString = (ids, description) =>
    (ids.length ? z.enum(ids) : z.string()).optional().describe(description);

  server.registerTool(
    "get-neuctra-ui-component",
    {
      title: "Get Neuctra UI components for a UI need",
      description:
        "Find and retrieve the real @neuctra/ui components that fit a natural-language UI requirement, such as layout containers, input forms, images, carousels, cards, modals, or drawers. Returns exact package imports, prop specifications, documented examples, and per-component usage guidance (where to use / what to avoid / compulsory requirements). By default (`guidance: lean`) the exact design-rule prose is returned once in designRules, so one call is enough and no get_design_rules follow-up is needed. Use layout for intent-level sets (all form components, all display components, all modals and drawers) and family for a group of related components such as table or toast. Omit request/componentName/category to browse all components as summaries.",
      inputSchema: {
        request: z.string().optional().describe("Describe the UI need naturally, e.g. 'a dismissible confirmation dialog' or 'responsive carousel for product images'."),
        componentName: z.string().optional().describe("Exact component name when already known, e.g. Container, Input, Carousel, Card, Modal, or Drawer."),
        category: z.enum(COMPONENT_CATEGORIES).optional().describe("Optionally restrict component discovery to a library category."),
        layout: enumOrString(layoutIds, "Deep search by layout intent: returns the whole component set for that kind of screen."),
        family: enumOrString(familyIds, "Deep search by component family (e.g. modal, drawer, table, toast) including related members."),
        detail: z.enum(["summary", "full"]).default("summary").describe("summary returns compact component summaries; full returns raw specs with props and examples."),
        limit: z.number().int().min(1).max(80).default(5).describe("Maximum number of components to return. Layout/family searches can need more than 5."),
        guidance: z.enum(["lean", "full", "compact", "none"]).default("lean").describe("lean (default) returns one self-contained response: per-component guidance with rule titles plus the full rule prose once in designRules. full repeats the prose per component for compatibility; compact keeps only guidance notes and rule titles; none omits guidance entirely."),
      },
    },
    async ({ request, componentName, category, layout, family, detail, limit, guidance }) => {
      // Deep search is intentionally opt-in via layout/family so the existing
      // ranked lookup (also used by the page builder) keeps its behaviour.
      if (layout || family) {
        const result = search.deepSearch(request, { layout, family, category, detail, limit, guidance });
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      }

      if (componentName) {
        const exact = componentsByName.get(componentName.toLowerCase());
        if (exact && (!category || exact.category === category)) {
          const payload = { components: [stripSearch(exact)] };
          if (guidance !== "none") {
            payload.components[0].guidance = search.guidanceFor(exact, guidance);
            const baseline = search.guidanceBaseline(guidance);
            if (baseline) payload.guidanceBaseline = baseline;
            if (guidance === "full" || guidance === "lean") payload.designRules = search.designRulesFor([exact]);
          }
          return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
        }
        if (!request?.trim()) {
          const suggestions = registry.components
            .filter((component) => (!category || component.category === category)
              && component.name.toLowerCase().includes(componentName.toLowerCase()))
            .slice(0, 8)
            .map((component) => summarize(component, guidance !== "none" ? search.guidanceFor(component, guidance) : null));
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
        const originals = registry.components
          .filter((component) => !category || component.category === category);
        const payload = {
          components: originals.map((component) => summarize(
            component,
            guidance !== "none" ? search.guidanceFor(component, guidance) : null,
          )),
        };
        const baseline = search.guidanceBaseline(guidance);
        if (guidance !== "none" && baseline) payload.guidanceBaseline = baseline;
        if (guidance === "full" || guidance === "lean") payload.designRules = search.designRulesFor(originals);
        return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
      }

      const ranked = findNeuctraUiComponents(registry, request, { category, limit });

      if (!ranked.length) {
        const suggestions = registry.components
          .filter((component) => !category || component.category === category)
          .map((component) => summarize(component, guidance !== "none" ? search.guidanceFor(component, guidance) : null));
        return {
          content: [{ type: "text", text: JSON.stringify({ message: "No component matched that request. Browse these available components or refine the request.", suggestions }, null, 2) }],
        };
      }

      const originals = ranked
        .map((component) => componentsByName.get(component.name.toLowerCase()))
        .filter(Boolean);
      const payload = {
        request,
        components: guidance === "none"
          ? ranked
          : ranked.map((component) => ({
              ...component,
              guidance: search.guidanceFor(componentsByName.get(component.name.toLowerCase()), guidance),
            })),
      };
      const baseline = search.guidanceBaseline(guidance);
      if (guidance !== "none" && baseline) payload.guidanceBaseline = baseline;
      if (guidance === "full" || guidance === "lean") payload.designRules = search.designRulesFor(originals);
      return {
        content: [{
          type: "text",
          text: JSON.stringify(payload, null, 2),
        }],
      };
    },
  );
}
