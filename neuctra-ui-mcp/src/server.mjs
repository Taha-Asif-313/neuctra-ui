import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  FRAMEWORKS,
  PAGE_TYPES,
  generatePageSeo,
  auditPageSeo,
} from "./seo.mjs";

// Reads data/*.json from disk. Only works on runtimes with a filesystem
// (Node, Bun, Deno) — callers on edge/serverless runtimes without one
// (Cloudflare Workers) must import the JSON files themselves at build time
// and pass them into createServer({ registry, theme, aiDesignRules, seoGuide }) instead.
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
  const seoGuide = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "seoGuide.json"), "utf8"),
  );
  return { registry, theme, aiDesignRules, seoGuide };
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

const UI_CATEGORIES = [
  "dashboard", "landing-page", "form", "settings", "authentication",
  "data-table", "ecommerce", "documentation", "custom",
];

const CATEGORY_RULES = {
  dashboard: [3, 4, 5, 7, 22, 23, 24, 27, 31, 35, 55, 57, 59],
  "landing-page": [3, 7, 13, 24, 33, 35, 53, 55, 56, 57, 58, 59, 60],
  form: [15, 16, 17, 24, 25, 27, 35, 47, 48, 59],
  settings: [3, 7, 13, 15, 16, 17, 18, 21, 24, 35, 47, 48, 59],
  authentication: [3, 13, 15, 24, 25, 27, 35, 47, 48, 56, 59],
  "data-table": [3, 7, 22, 23, 24, 27, 31, 35, 47, 48, 59],
  ecommerce: [3, 7, 13, 15, 22, 24, 25, 31, 33, 35, 47, 48, 55, 57, 59, 60],
  documentation: [3, 4, 5, 8, 9, 10, 21, 23, 30, 35, 45, 47, 48, 53, 59, 61],
  custom: [3, 35, 44, 47, 48, 49, 53, 59],
};

const CATEGORY_TERMS = {
  dashboard: "dashboard analytics metric chart sidebar",
  "landing-page": "hero marketing testimonial feature pricing",
  form: "form input select checkbox radio date picker",
  settings: "settings preferences profile toggle tabs",
  authentication: "login sign up password email verification",
  "data-table": "table data pagination filter sort",
  ecommerce: "product cart checkout price inventory",
  documentation: "docs article navigation breadcrumb code",
  custom: "",
};

function inferUiCategory(request) {
  const text = request.toLowerCase();
  const patterns = [
    ["authentication", /\b(login|log in|sign.?up|sign.?in|authentication|password reset)\b/],
    ["data-table", /\b(data.?table|table|records|spreadsheet|listing)\b/],
    ["ecommerce", /\b(e.?commerce|checkout|cart|product page|storefront|shop)\b/],
    ["documentation", /\b(documentation|docs page|knowledge base|article)\b/],
    ["settings", /\b(settings|preferences|configuration|profile)\b/],
    ["form", /\b(form|survey|wizard|application form)\b/],
    ["landing-page", /\b(landing page|homepage|marketing page|hero section)\b/],
    ["dashboard", /\b(dashboard|admin panel|analytics|metrics)\b/],
  ];
  return patterns.find(([, pattern]) => pattern.test(text))?.[0] ?? "custom";
}

function makeUiBuildBrief({ request, category, preferences, registry, theme, aiDesignRules }) {
  const resolvedCategory = category === "auto" ? inferUiCategory(request) : category;
  const requestSignals = [
    ["create", /\b(create|add|new|invite|register)\b/i],
    ["review", /\b(review|view|inspect|monitor|track|activity|analytics)\b/i],
    ["search", /\b(search|find|filter|sort)\b/i],
    ["edit", /\b(edit|update|change|manage|configure)\b/i],
    ["complete", /\b(complete|submit|checkout|send|publish|save)\b/i],
    ["compare", /\b(compare|pricing|plan|option|alternative)\b/i],
  ].filter(([, pattern]) => pattern.test(request)).map(([signal]) => signal);
  const sections = new Map(aiDesignRules.sections.map((section) => [section.number, section]));
  const sharedRuleNumbers = [1, 2, 35, 37, 43, 44, 47, 48, 49, 50, 51, 59];
  const selectedNumbers = [...new Set([...sharedRuleNumbers, ...(CATEGORY_RULES[resolvedCategory] ?? [])])];
  const relevantRules = selectedNumbers
    .map((number) => sections.get(number))
    .filter(Boolean)
    .map(({ number, title, content }) => ({ number, title, content }));
  const terms = CATEGORY_TERMS[resolvedCategory] ?? "";
  const candidates = terms
    ? registry.components
        .filter((component) => terms.split(" ").some((term) => matchesQuery(component, term)))
        .slice(0, 8)
        .map(summarize)
    : [];

  const missingPreferences = [];
  if (!preferences.visualDirection) missingPreferences.push({
    id: "visualDirection", question: "What visual direction should this use?",
    options: ["Neuctra default", "Minimal", "Editorial", "Dense and utilitarian"],
  });
  if (!preferences.density) missingPreferences.push({
    id: "density", question: "How dense should the interface feel?",
    options: ["Balanced", "Compact", "Spacious"],
  });
  if (!preferences.primaryAction && resolvedCategory !== "documentation") missingPreferences.push({
    id: "primaryAction", question: "What is the main action users should take?",
    options: [],
  });

  const compactTheme = {
    system: theme.system,
    tokens: theme.tokens.map(({ token, className, pairsWith, usage }) => ({ token, className, ...(pairsWith ? { pairsWith } : {}), usage })),
    toastNote: theme.toastNote,
  };

  return {
    category: resolvedCategory,
    categoryWasInferred: category === "auto",
    request,
    requestAnalysis: {
      detectedTaskSignals: requestSignals,
      userGoal: requestSignals.length
        ? `Support the requested ${requestSignals.join(", ")} task${requestSignals.length > 1 ? "s" : ""} with a clear primary path.`
        : "Use the request's stated outcome to define the primary path; do not add unrelated features.",
      categoryConsiderations: {
        dashboard: "Prioritize the most actionable metrics and provide clear routes to underlying records.",
        "landing-page": "Make the value proposition and primary conversion action clear before secondary details.",
        form: "Group fields by meaning, explain validation, and preserve entered data when errors occur.",
        settings: "Group controls by user mental model and make saved versus unsaved changes clear.",
        authentication: "Keep the entry task focused and make recovery and validation paths easy to find.",
        "data-table": "Make scanning, filtering, row actions, and narrow-screen behavior usable.",
        ecommerce: "Keep product choice, price, availability, and the next purchase action easy to understand.",
        documentation: "Prioritize readable content, table of contents, and predictable navigation.",
        custom: "Choose patterns from the user's task and content; avoid adding interface chrome without a need.",
      }[resolvedCategory],
    },
    preferences,
    uxPlan: {
      objective: "Make the user's primary task obvious, then keep supporting choices and information in a clear hierarchy.",
      layoutApproach: resolvedCategory === "dashboard" || resolvedCategory === "documentation"
        ? "Use a responsive app shell with grouped navigation and a focused content area."
        : resolvedCategory === "landing-page"
          ? "Lead with the value proposition and primary action, then vary section layouts to support the story."
          : "Keep the primary task prominent, group related content, and avoid panels where whitespace is enough.",
      interactionAndStates: ["Define loading, empty, error, success, and disabled states where applicable.", "Use clear labels, keyboard-accessible controls, visible focus, and touch-friendly targets."],
      responsiveBehavior: preferences.platform === "desktop"
        ? "Prioritize desktop workflows while keeping the layout usable at narrower widths and preventing horizontal overflow."
        : preferences.platform === "mobile"
          ? "Prioritize the mobile task flow, touch targets, and compact navigation; prevent horizontal overflow."
          : "Design mobile-first; preserve task order, prevent horizontal overflow, and adapt navigation and data views to narrow screens.",
      performanceGuidance: ["Keep client-side state limited to interactive needs and avoid unnecessary rerenders.", "Paginate or virtualize large data sets; lazy-load below-the-fold media."],
      preferenceQuestions: missingPreferences,
    },
    recommendedComponents: candidates,
    designContext: {
      coreStylingRules: theme.rules,
      antiAiLookRules: theme.antiAiLookRules,
      theme: compactTheme,
      relevantProductRules: relevantRules,
      goldenRule: aiDesignRules.goldenRule,
    },
    implementationNotes: [
      "Use semantic Neuctra theme classes so light and dark themes work; do not hardcode palette colors.",
      "Use the selected components' built-in design and exact documented props.",
      "Call get_component for each unfamiliar component before writing its code.",
      "Apply only the included category rules; retrieve get_design_rules for any unresolved edge case.",
    ],
  };
}

export function createServer(data) {
  const { registry, theme, aiDesignRules, seoGuide } = data ?? loadDataFromDisk();
  const componentsByName = new Map(registry.components.map((c) => [c.name, c]));

  const server = new McpServer({
    name: "neuctra-ui",
    version: "0.5.0",
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
    "neuctra-ui-builder",
    {
      title: "Plan Neuctra UI with focused design context",
      description:
        "Prepare a compact, category-aware implementation brief for a UI request. Infers or accepts the UI category, identifies relevant Neuctra components and design-guide sections, includes essential theme/accessibility/responsive rules, and returns optional preference questions. Use this instead of loading the full design guide for routine UI generation. It plans and curates context; the host model writes the UI. Call get_component for exact props before using unfamiliar components, and get_design_rules for edge cases.",
      inputSchema: {
        request: z.string().min(8).describe("What UI to build and what users need to accomplish."),
        category: z.enum(["auto", ...UI_CATEGORIES]).default("auto").describe("UI category, or auto to infer it from the request."),
        preferences: z.object({
          visualDirection: z.string().optional().describe("Visual style preference, if known."),
          density: z.enum(["compact", "balanced", "spacious"]).optional(),
          primaryAction: z.string().optional().describe("The main user action, if known."),
          platform: z.enum(["desktop", "mobile", "responsive"]).optional(),
          audience: z.string().optional(),
        }).default({}).describe("Optional user preferences; unanswered high-impact choices are returned as concise questions."),
      },
    },
    async ({ request, category, preferences }) => ({
      content: [{
        type: "text",
        text: JSON.stringify(makeUiBuildBrief({ request, category, preferences, registry, theme, aiDesignRules }), null, 2),
      }],
    }),
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
        "Get every design rule generated UI must follow when using @neuctra/ui. Covers two levels: (1) styling rules — token usage, surface/background conventions, component composition requirements like CardBody being compulsory whenever Card has body content, component-specific gotchas like Dropdown's trigger propagation, and the full set of rules for avoiding the visual tells that make UI look AI-generated (gradients, decorative shadows/blurs/glows, emoji-as-icons, etc.); (2) product/UX design rules — a numbered 63-section guide covering design philosophy, visual hierarchy, page/sidebar/navigation structure, per-component usage guidance (when to use Card, Modal vs Drawer, Table vs List, etc.), spacing/color/border/radius/shadow conventions, responsive design, accessibility, interaction design, a final UI quality checklist, the rule against overwriting a component's built-in design, paragraph text color (text-secondary for paragraphs, text-muted-foreground only for metadata/hints), and modern layout guidance: a fixed responsive type scale, readable measure, spacing rhythm, grid and hero patterns, focal point and section variety, a breakpoint checklist, imagery, iconography, motion timing and microcopy. Call this before generating any UI — not just get_theme.",
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

  const seoTopicIds = seoGuide ? seoGuide.topics.map((t) => t.id) : [];

  server.registerTool(
    "get_seo_guide",
    {
      title: "Get the SEO, AEO and GEO guide",
      description:
        "Get the playbook for making a site built with @neuctra/ui rank in search (SEO), get chosen as the answer in featured snippets, AI Overviews and voice (AEO), and get cited by ChatGPT, Perplexity, Claude and Gemini (GEO). Topics: technical (SSR, client-only widgets, one URL registry, canonicals, robots.txt, sitemaps), performance (Core Web Vitals), on-page (titles with one brand-suffix rule, descriptions, headings), keywords-intent, eeat, aeo, geo (llms.txt, AI crawler policy, entity signals), schema (weaving one JSON-LD @graph, one node per type, tool/listing pages), faq, meta-checklist, frameworks (where metadata goes in Next.js, Vite, React Router, Astro, TanStack Start, Gatsby, HTML, plus Next.js metadata gotchas), page-templates (tool, category, home), site-wide, ads-readiness, off-page-monitoring and launch-checklist. Call this before building or reviewing any public-facing page.",
      inputSchema: {
        topic: z
          .enum(["all", ...seoTopicIds])
          .optional()
          .describe('One topic id, or "all" (default) for the whole guide.'),
      },
    },
    async ({ topic }) => {
      if (!seoGuide) {
        return {
          isError: true,
          content: [{ type: "text", text: "SEO guide data was not loaded into this server." }],
        };
      }
      const payload =
        !topic || topic === "all"
          ? seoGuide
          : seoGuide.topics.find((t) => t.id === topic);
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      };
    },
  );

  server.registerTool(
    "generate_page_seo",
    {
      title: "Generate a page's meta tags and woven JSON-LD",
      description:
        "Generate everything one page needs to rank and be cited: a meta title (60 chars max) and description (155 chars max), canonical URL, robots, OpenGraph and Twitter tags, and one JSON-LD @graph that weaves Organization, WebSite, WebPage, BreadcrumbList, the page-type node (TechArticle, BlogPosting, SoftwareApplication for tools/products, Product with offers), HowTo (from visible steps), ItemList (for category/home pages) and FAQPage together by @id. Returns a ready-to-paste snippet for the chosen framework (Next.js App/Pages Router, Vite React, React Router/Remix, Astro, TanStack Start, Gatsby or plain HTML), plus warnings and AEO/GEO follow-ups. Deterministic: pass real FAQs, dates, prices and authors; it never invents them.",
      inputSchema: {
        framework: z.enum(FRAMEWORKS).default("html").describe("Target framework for the snippet."),
        pageType: z.enum(PAGE_TYPES).describe("What the page is; picks the schema types and description template."),
        siteName: z.string().describe('Brand name, e.g. "Neuctra UI".'),
        siteUrl: z.string().url().describe('Site origin, e.g. "https://ui.neuctra.com".'),
        path: z.string().describe('Route path, e.g. "/docs/card" ("/" for home).'),
        primaryKeyword: z.string().describe('The one query this page should rank for, e.g. "react card component".'),
        pageName: z.string().optional().describe("Short page name used as the headline/breadcrumb, e.g. \"Card Component\"."),
        title: z.string().optional().describe("Custom title. Omit to build one from the keyword and brand."),
        description: z.string().optional().describe("Custom meta description. Strongly recommended; the fallback is a template."),
        breadcrumbs: z
          .array(z.object({ name: z.string(), path: z.string() }))
          .optional()
          .describe("Breadcrumb trail from Home to this page. Omit to derive it from the path."),
        faqs: z
          .array(z.object({ question: z.string(), answer: z.string() }))
          .optional()
          .describe("Real FAQs that are visible on the page; mirrored word for word into FAQPage schema."),
        ogImage: z.string().url().optional().describe("Absolute URL of a 1200x630 social image."),
        logo: z.string().url().optional().describe("Absolute URL of the organization logo."),
        sameAs: z.array(z.string().url()).optional().describe("Official profiles (GitHub, LinkedIn, X, npm, ...) for the Organization entity."),
        author: z.string().optional().describe("Author name for docs/blog pages."),
        datePublished: z.string().optional().describe("ISO date, e.g. 2026-09-27."),
        dateModified: z.string().optional().describe("ISO date of the last real content change."),
        productType: z.enum(["SoftwareApplication", "Product"]).optional().describe("Main entity type for product/pricing pages (default SoftwareApplication)."),
        applicationCategory: z.string().optional().describe('SoftwareApplication category, e.g. "DeveloperApplication" (default).'),
        offers: z
          .array(z.object({ name: z.string().optional(), price: z.union([z.string(), z.number()]), priceCurrency: z.string() }))
          .optional()
          .describe("Real, visible prices for product/pricing pages."),
        ogTitle: z.string().optional().describe("Shorter social title for og:title/twitter:title (defaults to the meta title)."),
        ogDescription: z.string().optional().describe("Social description (defaults to the meta description)."),
        isFree: z.boolean().optional().describe("Tool/product is free: adds isAccessibleForFree and a price 0 Offer."),
        currency: z.string().optional().describe('Currency for the free Offer (default "USD").'),
        features: z.array(z.string()).optional().describe("3 to 8 short capabilities, used as the SoftwareApplication featureList."),
        steps: z.array(z.string()).optional().describe('The visible "How to" steps, in order; builds a HowTo node from the same data as the on-page list.'),
        howToName: z.string().optional().describe('HowTo name, e.g. "How to merge PDF files" (default "How to use <page>").'),
        items: z
          .array(z.object({ name: z.string(), path: z.string() }))
          .optional()
          .describe("Pages a category/home page lists, in visible order; builds an ItemList."),
        language: z.string().default("en").describe("Page language (BCP 47)."),
        noindex: z.boolean().optional().describe("Set for utility pages that should not be indexed."),
      },
    },
    async (input) => {
      const result = generatePageSeo(input);
      const { snippet, ...rest } = result;
      return {
        content: [
          { type: "text", text: JSON.stringify({ ...rest, snippetFile: snippet.file }, null, 2) },
          { type: "text", text: `Snippet for ${snippet.framework} (${snippet.file}):\n\n\`\`\`${snippet.language}\n${snippet.code}\n\`\`\`` },
        ],
      };
    },
  );

  server.registerTool(
    "audit_page_seo",
    {
      title: "Audit a page's SEO, AEO and schema",
      description:
        "Check one page against SEO, AEO and structured-data rules and get a score plus pass/warn/fail items, each with the exact fix: title and description length, a single H1, heading order, question-style H2s, keyword placement (title, H1, first 100 words, URL), URL shape, canonical, noindex, OpenGraph image, brand suffix (missing or doubled), JSON-LD syntax, duplicate schema nodes (e.g. two FAQPage or SoftwareApplication), WebPage/BreadcrumbList/Organization/FAQPage schema (and FAQ markup matching visible FAQs), FAQ count, thin content, missing alt text, and pages that render client-only (no H1 in the HTML). Easiest input: pass the built HTML as html. Otherwise pass whatever you know; checks without input are skipped.",
      inputSchema: {
        url: z.string().describe("Absolute URL of the page."),
        html: z
          .string()
          .optional()
          .describe("The page's built or server-rendered HTML (view-source, or a file from out/ or dist/). Title, description, canonical, headings, og:image, JSON-LD types, alt text and word count are extracted from it; explicit fields override."),
        brandName: z.string().optional().describe('Brand expected once at the end of the title, e.g. "Neuctra Tools".'),
        title: z.string().optional(),
        description: z.string().optional(),
        h1s: z.array(z.string()).optional().describe("Text of every H1 on the page."),
        headings: z
          .array(z.object({ level: z.number().int().min(1).max(6), text: z.string() }))
          .optional()
          .describe("All headings in document order."),
        canonical: z.string().optional().describe('Canonical href; pass "" if the page has none.'),
        noindex: z.boolean().optional(),
        hasOgImage: z.boolean().optional(),
        jsonLdTypes: z.array(z.string()).optional().describe('Every @type found in the page\'s JSON-LD, e.g. ["Organization","WebSite","WebPage","BreadcrumbList"].'),
        faqCount: z.number().int().min(0).optional().describe("Number of FAQs visible on the page."),
        wordCount: z.number().int().min(0).optional(),
        imagesMissingAlt: z.number().int().min(0).optional(),
        primaryKeyword: z.string().optional(),
        firstParagraph: z.string().optional().describe("Opening text of the main content."),
      },
    },
    async (input) => ({
      content: [{ type: "text", text: JSON.stringify(auditPageSeo(input), null, 2) }],
    }),
  );

  return server;
}
