import { z } from "zod";
import { FRAMEWORKS } from "../../seo.mjs";
import { searchComponentsByQueries } from "../../utils/component-search.mjs";
import { buildCodeSkeleton } from "../../utils/code-skeleton.mjs";
import {
  buildImplementationContract,
  detectNeuctraGaps,
  narrowResponse,
  OUTPUT_MODES,
  SOURCE_POLICIES,
} from "../../utils/ui-policy.mjs";
import { getDesignRulesContext } from "../get-design-rules/index.mjs";
import { buildPageBrief, getLayouts, resolveLayout } from "../neuctra-ui-page-builder/index.mjs";

// Rules that apply to every generated interface. They are loaded before the
// prompt is interpreted so layout and component choices are constrained by
// the design system instead of decided after the fact.
const UNIVERSAL_RULE_NUMBERS = [1, 2, 3, 44, 49, 69, 70, 75, 76];

const UX_BLOCKS = [
  "core",
  "layout",
  "accessibilityInteraction",
  "modernDesign",
  "uxLaws",
  "antiAiDesignRules",
];

// Prompt signals -> rule numbers + layout/component hint terms. The hint terms
// are appended to the prompt before layout/component lookup, which is how the
// UX rules actually drive the rest of the pipeline.
const UX_SIGNALS = [
  {
    id: "responsive",
    label: "Responsive and adaptive layout",
    pattern: /\b(mobile|responsive|tablet|desktop|small screen|phone)\b/i,
    rules: [35, 59, 72],
    hints: "responsive mobile tablet desktop layout",
    componentQuery: "responsive grid container layout",
  },
  {
    id: "accessibility",
    label: "Accessibility and interaction quality",
    pattern: /\b(accessib\w*|a11y|keyboard|screen reader|focus|aria|tap target)\b/i,
    rules: [47, 48, 75],
    hints: "accessible interaction keyboard focus",
    componentQuery: "accessible button icon button tooltip",
  },
  {
    id: "forms",
    label: "Forms and data entry",
    pattern: /\b(form|forms|input|inputs|field|fields|signup|sign up|login|log in|register|checkout|validation|otp|verification)\b/i,
    rules: [15, 63, 72, 73],
    hints: "form data entry input validation",
    componentQuery: "form input validation",
  },
  {
    id: "confirmation",
    label: "Confirmation and destructive actions",
    pattern: /\b(confirm|confirmation|delete|remove|destructive|modal|dialog|popup)\b/i,
    rules: [16, 72, 73],
    hints: "modal dialog confirmation overlay",
    componentQuery: "modal dialog confirmation",
  },
  {
    id: "tables",
    label: "Tables, lists and findability",
    pattern: /\b(table|tables|record|records|grid|rows|columns|list|search|filter|sort|pagination|empty state|no results)\b/i,
    rules: [22, 23, 24, 31, 74],
    hints: "data table records list search filter pagination empty state",
    componentQuery: "data table records pagination",
  },
  {
    id: "dashboard",
    label: "Dashboards and analytics",
    pattern: /\b(dashboard|analytics|metrics|kpi|stats|charts?|overview|admin panel)\b/i,
    rules: [7, 55, 57, 65],
    hints: "dashboard analytics metrics stats admin panel",
    componentQuery: "dashboard stat card analytics",
  },
  {
    id: "navigation",
    label: "Navigation and wayfinding",
    pattern: /\b(navigation|navigate|sidebar|menu|tabs?|breadcrumb|stepper|wizard)\b/i,
    rules: [4, 5, 6, 21, 30, 74],
    hints: "navigation sidebar tabs breadcrumb stepper",
    componentQuery: "navigation sidebar tabs breadcrumb",
  },
  {
    id: "feedback",
    label: "Feedback and system status",
    pattern: /\b(loading|skeleton|spinner|progress|toast|notification|alert|error|success|status)\b/i,
    rules: [25, 26, 27, 28, 72],
    hints: "feedback loading skeleton toast notification status",
    componentQuery: "alert toast notification skeleton spinner",
  },
  {
    id: "commerce",
    label: "Commerce and conversion",
    pattern: /\b(checkout|cart|product|store|shop|pricing|plan|purchase|order)\b/i,
    rules: [13, 22, 63, 71, 73],
    hints: "checkout product store commerce pricing order",
    componentQuery: "product checkout cart order",
  },
  {
    id: "marketing",
    label: "Marketing and landing pages",
    pattern: /\b(landing|marketing|hero|homepage|home page|campaign|feature page)\b/i,
    rules: [56, 57, 58, 60, 61, 71],
    hints: "landing page marketing hero homepage",
    componentQuery: "hero landing page marketing",
  },
  {
    id: "documentation",
    label: "Documentation and help content",
    pattern: /\b(documentation|docs|help|article|guide|faq|tutorial)\b/i,
    rules: [21, 30, 45, 53, 64],
    hints: "documentation help article guide faq",
    componentQuery: "documentation help article code block",
  },
  {
    id: "settings",
    label: "Settings and preferences",
    pattern: /\b(settings|preferences|configuration|profile|account)\b/i,
    rules: [8, 21, 48, 73],
    hints: "settings preferences configuration account",
    componentQuery: "settings form tabs card",
  },
  {
    id: "media",
    label: "Imagery, icons and media",
    pattern: /\b(image|images|photo|gallery|carousel|slider|video|media|icon)\b/i,
    rules: [33, 34, 60, 61],
    hints: "image gallery carousel media icon",
    componentQuery: "image avatar carousel gallery",
  },
  {
    id: "motion",
    label: "Motion and animation",
    pattern: /\b(animat\w*|motion|transition|framer)\b/i,
    rules: [62],
    hints: "motion animation transition",
    componentQuery: "motion animation transition",
  },
  {
    id: "premium",
    label: "Premium, calm and human-designed UI",
    pattern: /\b(premium|calm|clean|modern|polished|human|minimal| clutter)\b/i,
    rules: [36, 37, 38, 39, 41, 42, 43],
    hints: "premium clean calm modern minimal",
    componentQuery: "card button typography",
  },
];

const unique = (values) => [...new Set(values.filter(Boolean))];

function matchUxSignals(request) {
  return UX_SIGNALS.flatMap((signal) => {
    const match = String(request ?? "").match(signal.pattern);
    if (!match) return [];
    return [{
      id: signal.id,
      label: signal.label,
      evidence: match[0],
      rules: signal.rules,
      hints: signal.hints,
      componentQuery: signal.componentQuery,
    }];
  });
}

function buildUxRules(data, matchedSignals) {
  const ruleNumbers = unique([
    ...UNIVERSAL_RULE_NUMBERS,
    ...matchedSignals.flatMap((signal) => signal.rules),
  ]);
  const rules = getDesignRulesContext(
    data.theme,
    data.aiDesignRules,
    ruleNumbers,
    UX_BLOCKS,
  );

  return {
    stage: "1. UX rules first",
    reason: "These rules constrain the layout and component choices before either is selected.",
    matchedSignals: matchedSignals.map(({ id, label, evidence, rules: signalRules, componentQuery }) => ({
      id,
      label,
      evidence,
      rules: signalRules,
      componentQuery,
    })),
    ruleNumbers,
    rules,
  };
}

export function buildDesignFromPrompt(data, {
  request,
  pageType = "auto",
  framework = "auto",
  preferences = {},
  detail = "summary",
  limit = 24,
  guidance = "lean",
  sourcePolicy = "neuctra-first",
  output = "brief",
  projectContext = {},
} = {}) {
  // Stage 1: UX rules are resolved first. Their hint terms feed stages 2-3.
  const matchedSignals = matchUxSignals(request);
  const uxRules = buildUxRules(data, matchedSignals);
  const hintTerms = matchedSignals.map((signal) => signal.hints);
  const componentQueries = unique([request, ...matchedSignals.map((signal) => signal.componentQuery)]);
  const ruledRequest = unique([request, ...hintTerms]).join(" ");
  const neuctraGaps = detectNeuctraGaps(data, matchedSignals);

  // Stage 2: choose the real-world page layout using prompt + UX hints.
  const selection = resolveLayout(ruledRequest, pageType, data.layouts);
  if (!selection.layout) {
    return { error: "No layouts are configured. Add layout recipes to data/layouts.json." };
  }
  const { layout, confidence, evidence } = selection;

  // Stage 3: get the real components for the same prompt + UX signals. Each
  // signal gets its own ranked query so a dominant layout cannot hide a
  // requested modal, table, alert, or other UX-critical component.
  const components = searchComponentsByQueries(data.registry, componentQueries, {
    detail,
    limit,
    guidance,
  });

  // Stage 4: turn the selected layout, components, variants, motion, and SEO
  // context into an implementable design brief.
  const designUi = buildPageBrief(data, {
    request,
    pageType: layout.id,
    framework,
    preferences,
  });

  const implementationContract = buildImplementationContract({
    sourcePolicy,
    gaps: neuctraGaps,
    layoutId: layout.id,
    componentNames: components.components.map((component) => component.name),
    projectContext,
  });

  const result = {
    uxRules,
    layout: {
      stage: "2. Layout selected from prompt + UX rules",
      id: layout.id,
      name: layout.name,
      category: layout.categoryName ?? layout.category ?? "general",
      confidence,
      evidence,
      purpose: layout.purpose,
      outline: layout.outline,
      responsiveNotes: layout.responsiveNotes,
      hintTerms,
    },
    components: {
      stage: "3. Components selected from prompt + UX rules",
      ...components,
    },
    designUi: {
      stage: "4. UI design brief",
      ...designUi,
    },
    implementationContract,
    neuctraGaps,
    instruction: "Follow uxRules first, then obey implementationContract while using the selected layout and returned component specs. Use a fallback only for a returned neuctraGaps item, then run validate-ui-code on the generated code.",
  };

  if (output === "code") {
    // The page-builder matches include a few implementation essentials such
    // as Button and EmptyState that can fall outside the ranked component cap.
    const skeletonComponents = [...new Map([
      ...components.components,
      ...(designUi.components?.matches ?? []),
    ].map((component) => [component.name, component])).values()];

    result.codeSkeleton = buildCodeSkeleton({
      request,
      layout,
      components: skeletonComponents,
      contract: implementationContract,
      framework,
      projectContext,
    });
  }

  return narrowResponse(result, { output });
}

export function registerNeuctraUiDesignFromPromptTool(server, data) {
  const layouts = getLayouts(data.layouts);
  const pageTypeOptions = ["auto", ...layouts.map((layout) => layout.id)];
  const guidanceEnum = ["lean", "full", "compact", "none"];

  server.registerTool(
    "neuctra-ui-design-from-prompt",
    {
      title: "Design a UI screen from a prompt with Neuctra UI first",
      description:
        "One-call universal UI planning tool with Neuctra UI as the default priority. It resolves UX rules first, uses them to choose the page layout, retrieves real @neuctra/ui components, then returns an implementation contract, gaps, an optional code skeleton, and the full design brief. sourcePolicy=neuctra-first is the default: use Neuctra everywhere it has a component and only fill explicit gaps. Use neuctra-only to forbid other UI sources, or universal to allow other libraries while still preferring Neuctra. output=code returns a starting JSX skeleton; then run validate-ui-code.",
      inputSchema: {
        request: z.string().min(8).describe("Describe the screen to create and the main user task."),
        pageType: z.enum(pageTypeOptions).default("auto").describe(`Layout ID to force, or auto to infer the best match from the prompt and UX rules. ${layouts.map((layout) => layout.id).join(", ")}`),
        framework: z.enum(["auto", ...FRAMEWORKS, "remix"]).default("auto").describe("Framework and router for framework-specific SEO guidance."),
        preferences: z.object({
          visualDirection: z.string().optional(),
          density: z.enum(["compact", "balanced", "spacious"]).optional(),
          primaryAction: z.string().optional(),
          platform: z.enum(["desktop", "mobile", "responsive"]).default("responsive"),
          audience: z.string().optional(),
          variants: z.object({
            navigationShell: z.string(),
            pageHeader: z.string(),
            statCard: z.string(),
            dashboardBody: z.string(),
          }).partial().optional(),
        }).default({}).describe("Optional design and audience preferences."),
        detail: z.enum(["summary", "full"]).default("summary").describe("summary returns component summaries; full returns raw specs with props and examples."),
        limit: z.number().int().min(1).max(80).default(24).describe("Maximum number of components to return."),
        guidance: z.enum(guidanceEnum).default("lean").describe("lean (default) keeps full rule prose once; full repeats it per component; compact keeps titles only; none omits guidance."),
        sourcePolicy: z.enum(SOURCE_POLICIES).default("neuctra-first").describe("neuctra-first (default) prefers Neuctra with scoped gap fallbacks; neuctra-only forbids other UI sources; universal allows any source."),
        output: z.enum(OUTPUT_MODES).default("brief").describe("brief returns the full brief; code adds a starting JSX skeleton; minimal returns a compact routing view."),
        projectContext: z.object({
          framework: z.string().optional(),
          router: z.string().optional(),
          neuctraUiVersion: z.string().optional(),
          themeTokens: z.array(z.string()).optional(),
          existingShell: z.string().optional(),
        }).default({}).describe("Optional project context from neuctra-ui-setup or the caller."),
      },
    },
    async ({ request, pageType, framework, preferences, detail, limit, guidance, sourcePolicy, output, projectContext }) => {
      const result = buildDesignFromPrompt(data, {
        request,
        pageType,
        framework,
        preferences,
        detail,
        limit,
        guidance,
        sourcePolicy,
        output,
        projectContext,
      });
      if (result.error) {
        return { isError: true, content: [{ type: "text", text: result.error }] };
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    },
  );
}
