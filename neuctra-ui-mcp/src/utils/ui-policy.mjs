// Universal UI policy with a Neuctra-first default. The policy travels with
// design-from-prompt responses so the assistant sees the enforcement rules at
// the same time as the layout and component decisions.

import { searchComponentsByQueries } from "./component-search.mjs";

export const SOURCE_POLICIES = ["neuctra-first", "neuctra-only", "universal"];
export const OUTPUT_MODES = ["brief", "code", "minimal"];

const POLICY_PRIORITY = {
  "neuctra-first": "Neuctra UI is the default source. Use another source only for an explicit returned gap.",
  "neuctra-only": "Neuctra UI is the only allowed UI source. Unsupported needs must be reported as gaps.",
  universal: "Use the best UI source for the job, but prefer Neuctra UI when it has an equivalent component.",
};

const FALLBACK_NOTES = {
  dashboard: "Use a charting library only for the plot surface; keep cards, stats, tables, and controls in Neuctra UI.",
  tables: "Use a data/virtualization library only for advanced grid behavior; keep table shell, pagination, and empty states in Neuctra UI.",
  media: "Use a media library only for playback or zoom behavior; keep surrounding surfaces and controls in Neuctra UI.",
  motion: "Framer Motion is allowed for animation; keep the components themselves from Neuctra UI.",
};

const unique = (values) => [...new Set(values.filter(Boolean))];

/**
 * Detect needs implied by UX signals that the current Neuctra registry cannot
 * satisfy. A gap is not permission to ignore the design system; it is a scoped
 * escape hatch with a recommendation.
 */
export function detectNeuctraGaps(data, matchedSignals = []) {
  const gaps = [];
  for (const signal of matchedSignals) {
    const result = searchComponentsByQueries(data.registry, [signal.componentQuery], {
      limit: 3,
      guidance: "none",
    });
    if (result.components.length) continue;
    gaps.push({
      need: signal.label,
      evidence: signal.evidence,
      query: signal.componentQuery,
      recommendation: FALLBACK_NOTES[signal.id]
        ?? "Use a neutral fallback only for this need; keep all surrounding UI in Neuctra UI.",
    });
  }
  return gaps;
}

export function buildImplementationContract({
  sourcePolicy = "neuctra-first",
  gaps = [],
  layoutId,
  componentNames = [],
  projectContext = {},
} = {}) {
  const policy = SOURCE_POLICIES.includes(sourcePolicy) ? sourcePolicy : "neuctra-first";
  const must = [
    "Use the exact imports, props, and composition returned by the MCP.",
    "Follow the UX rules before choosing layout, components, or styling.",
    "Use semantic theme tokens instead of hardcoded colors.",
    "Include loading, empty, error, and success states where the selected layout requires them.",
  ];
  const never = [
    "Do not invent props that are not in the returned component specs.",
    "Do not use raw Tailwind-only structures to replace a component that the registry already provides.",
  ];
  let allowedFallbacks = [];

  if (policy === "neuctra-only") {
    must.push("Use only @neuctra/ui for all UI surfaces and controls.");
    must.push("If a need is unsupported, report it as a gap instead of silently using another library.");
    never.push("Do not import MUI, Ant Design, Chakra, Radix UI, shadcn, Bootstrap, Headless UI, HeroUI, or NextUI.");
    never.push("Do not use raw button, input, select, textarea, table, or dialog elements as component replacements.");
  } else if (policy === "neuctra-first") {
    must.push("Prefer @neuctra/ui for every need that has a registry component.");
    must.push("Use a fallback only for a returned gap and keep the fallback narrowly scoped.");
    never.push("Do not introduce a second UI component library for needs Neuctra already covers.");
    allowedFallbacks = [
      "Framer Motion for animation",
      "Chart or media libraries for returned gaps",
      "Native HTML only for semantics that Neuctra does not expose",
    ];
  } else {
    must.push("Prefer @neuctra/ui when it has an exact component, then choose the best remaining source for gaps.");
    never.push("Do not claim a component is Neuctra UI if it comes from another library.");
    allowedFallbacks = [
      "Other UI libraries when they fit better",
      "Native HTML and CSS",
      "Framer Motion for animation",
      "Chart, map, editor, or media libraries for specialized needs",
    ];
  }

  return {
    sourcePolicy: policy,
    priority: POLICY_PRIORITY[policy],
    selectedLayout: layoutId ?? null,
    componentCount: componentNames.length,
    must: unique(must),
    never: unique(never),
    allowedFallbacks,
    neuctraGaps: gaps,
    verification: [
      "Run validate-ui-code on the generated code.",
      "Fix every error before presenting the result.",
      "Confirm all imports match the returned component specs.",
    ],
    validator: {
      tool: "validate-ui-code",
      sourcePolicy: policy,
    },
    ...(Object.keys(projectContext ?? {}).length ? { projectContext } : {}),
  };
}

export function narrowResponse(result, { output }) {
  if (output !== "minimal") return result;
  return {
    output: "minimal",
    uxRules: {
      stage: result.uxRules.stage,
      ruleNumbers: result.uxRules.ruleNumbers,
      matchedSignals: result.uxRules.matchedSignals.map(({ id, evidence }) => ({ id, evidence })),
    },
    layout: {
      stage: result.layout.stage,
      id: result.layout.id,
      name: result.layout.name,
      confidence: result.layout.confidence,
    },
    components: {
      stage: result.components.stage,
      names: result.components.components.map((component) => component.name),
      total: result.components.total,
    },
    designUi: {
      stage: result.designUi.stage,
      inferredPageType: result.designUi.pageAnalysis.inferredPageType,
      selectedVariants: Object.fromEntries(
        Object.entries(result.designUi.designVariants?.selections ?? {})
          .map(([key, value]) => [key, value?.recommended?.id ?? null]),
      ),
    },
    implementationContract: result.implementationContract,
    neuctraGaps: result.neuctraGaps,
    ...(result.codeSkeleton ? { codeSkeleton: result.codeSkeleton } : {}),
  };
}
