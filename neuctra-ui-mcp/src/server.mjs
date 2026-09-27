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
