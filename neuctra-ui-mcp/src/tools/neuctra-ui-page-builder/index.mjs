import { z } from "zod";
import { FRAMEWORKS } from "../../seo.mjs";
import { findNeuctraUiComponents } from "../get-neuctra-ui-component/index.mjs";
import { getDesignRulesContext } from "../get-design-rules/index.mjs";
import { buildSeoGuideContext } from "../neuctra-ui-seo-setup/index.mjs";

function getLayouts(layoutData) {
  const grouped = (layoutData?.layoutGroups ?? []).flatMap((group) =>
    (group.layouts ?? []).map((layout) => ({ ...layout, category: layout.category ?? group.id, categoryName: group.name })),
  );
  const legacy = layoutData?.layouts ?? [];
  return [...grouped, ...legacy];
}

function resolveLayout(request, requestedType, layoutData) {
  const layouts = getLayouts(layoutData);
  if (requestedType !== "auto") {
    const explicit = layouts.find((layout) => layout.id === requestedType);
    if (explicit) return { layout: explicit, confidence: 1, evidence: [`Explicit page type: ${requestedType}`] };
  }

  const normalized = request.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const scored = layouts
    .filter((layout) => layout.id !== "custom")
    .map((layout) => {
      let score = 0;
      const evidence = [];
      for (const alias of layout.aliases ?? []) {
        const phrase = alias.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        if (phrase && (` ${normalized} `).includes(` ${phrase} `)) {
          const weight = 5 + Math.min(phrase.split(" ").length, 4) * 2;
          score += weight;
          evidence.push(`layout phrase: ${alias}`);
        }
      }
      for (const keyword of layout.keywords ?? []) {
        const term = keyword.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        if (term && (` ${normalized} `).includes(` ${term} `)) {
          score += 2;
          evidence.push(`topic: ${keyword}`);
        }
      }
      return { layout, score, evidence, specificity: Math.max(...(layout.aliases ?? []).map((alias) => alias.split(/\s+/).length), 0) };
    })
    .sort((a, b) => b.score - a.score || b.specificity - a.specificity);

  const best = scored[0];
  const custom = layouts.find((layout) => layout.id === "custom") ?? layouts[0];
  if (!best || best.score === 0) {
    return { layout: custom, confidence: 0.25, evidence: ["No specific page pattern detected; use a custom structure based on the stated task."] };
  }
  const nextScore = scored[1]?.score ?? 0;
  return {
    layout: best.layout,
    confidence: Math.min(0.98, 0.55 + best.score / (best.score + nextScore + 4)),
    evidence: best.evidence.slice(0, 8),
  };
}

function detectTaskSignals(request) {
  return [
    ["create", /\b(create|build|make|new|design)\b/i],
    ["review", /\b(review|view|inspect|monitor|track|activity|analytics)\b/i],
    ["search", /\b(search|find|filter|sort)\b/i],
    ["edit", /\b(edit|update|change|manage|configure)\b/i],
    ["complete", /\b(complete|submit|checkout|send|publish|save|convert|upload)\b/i],
    ["compare", /\b(compare|pricing|plan|option|alternative)\b/i],
  ].filter(([, pattern]) => pattern.test(request)).map(([signal]) => signal);
}

function getComponentGuidance(registry, request, layout) {
  const candidates = new Map();
  const queries = [request, ...(layout.componentQueries ?? [])];
  for (const query of queries) {
    for (const component of findNeuctraUiComponents(registry, query, { limit: query === request ? 5 : 2 })) {
      if (!candidates.has(component.name)) candidates.set(component.name, component);
      if (candidates.size >= 12) return [...candidates.values()];
    }
  }
  return [...candidates.values()];
}

export function registerNeuctraUiPageBuilderTool(server, data) {
  const layouts = getLayouts(data.layouts);
  const pageTypeOptions = ["auto", ...layouts.map((layout) => layout.id)];

  server.registerTool(
    "neuctra-ui-page-builder",
    {
      title: "Analyze and plan a Neuctra UI page",
      description:
        "Analyze a page request and choose from every layout in the grouped real-world catalog in data/layouts.json, including marketing, SaaS dashboards, commerce, publishing, support, portfolios, communities, events, and system pages. Use pageType=auto to select the closest specific layout from the request, or choose an explicit pageType. Returns the selected recipe, matching @neuctra/ui component specs, relevant design rules, and SEO guidance.",
      inputSchema: {
        request: z.string().min(8).describe("Describe the page to create and the main user task."),
        pageType: z.enum(pageTypeOptions).default("auto").describe(`Layout ID from the full catalog (${layouts.map((layout) => layout.id).join(", ")}) or auto to infer the best match from the request.`),
        framework: z.enum(["auto", ...FRAMEWORKS, "remix"]).default("auto").describe("Framework and router for framework-specific SEO implementation guidance."),
        preferences: z.object({
          visualDirection: z.string().optional(),
          density: z.enum(["compact", "balanced", "spacious"]).optional(),
          primaryAction: z.string().optional(),
          platform: z.enum(["desktop", "mobile", "responsive"]).default("responsive"),
          audience: z.string().optional(),
        }).default({}).describe("Optional design and audience preferences."),
      },
    },
    async ({ request, pageType, framework, preferences }) => {
      const { layout, confidence, evidence } = resolveLayout(request, pageType, data.layouts);
      if (!layout) {
        return { isError: true, content: [{ type: "text", text: "No layouts are configured. Add layout recipes to data/layouts.json." }] };
      }

      const components = getComponentGuidance(data.registry, request, layout);
      const design = getDesignRulesContext(data.theme, data.aiDesignRules, layout.designRuleNumbers);
      const seo = buildSeoGuideContext(data.seoGuide, {
        framework,
        ruleIds: layout.seoRuleIds,
      });
      const signals = detectTaskSignals(request);
      const preferencesToClarify = [];
      if (!preferences.visualDirection) preferencesToClarify.push("visual direction");
      if (!preferences.density) preferencesToClarify.push("content density");
      if (!preferences.primaryAction && layout.id !== "blog-page" && layout.id !== "documentation") preferencesToClarify.push("primary action");

      const brief = {
        pageAnalysis: {
          request,
          inferredPageType: layout.id,
          layoutName: layout.name,
          layoutCategory: layout.categoryName ?? layout.category ?? "general",
          confidence,
          evidence,
          detectedTaskSignals: signals,
          userGoal: signals.length
            ? `Support the requested ${signals.join(", ")} task with a clear primary path.`
            : "Use the requested page outcome to define the primary path without adding unrelated features.",
        },
        layout: {
          purpose: layout.purpose,
          outline: layout.outline,
          responsiveNotes: layout.responsiveNotes,
          userPreferences: preferences,
          preferencesToClarify,
        },
        components: {
          source: "@neuctra/ui component registry",
          matches: components,
          instruction: "Use these exact exports and documented props. If a required component is absent from the matches, call get-neuctra-ui-component for that need before inventing a pattern.",
        },
        designRules: design,
        seoGuidance: seo ? {
          framework: seo.framework,
          relevantRules: seo.seoRules,
          implementationSteps: seo.implementationSteps,
          layoutSpecificNotes: layout.seoNotes,
        } : null,
        implementationInstructions: [
          "Use the selected layout as a starting structure and adapt its sections to the exact request.",
          "Keep the primary task visually clear; do not add sections that do not serve the request.",
          "Use Neuctra UI components with the exact props and semantic theme tokens from the supplied context.",
          "Apply the SEO steps only when the page is public and indexable; protect private application pages.",
          "When framework is auto, inspect the project files and choose metadata and rendering APIs for the installed framework and router.",
        ],
      };

      return { content: [{ type: "text", text: JSON.stringify(brief, null, 2) }] };
    },
  );
}
