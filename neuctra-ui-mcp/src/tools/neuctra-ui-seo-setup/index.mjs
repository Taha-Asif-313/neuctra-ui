import { z } from "zod";
import { FRAMEWORKS } from "../../seo.mjs";

const FRAMEWORK_OPTIONS = ["auto", ...FRAMEWORKS, "remix"];

const RULE_GROUPS = {
  "on-page": ["on_page_checklist"],
  technical: ["technical_seo"],
  performance: ["on_page_checklist"],
  frameworks: ["technical_seo"],
  "launch-checklist": ["validation", "reporting"],
  geo: ["geo_checklist", "off_page_seo"],
  aeo: ["aeo_checklist"],
  local: ["local_seo"],
};

function selectGuideSections(seoGuide, ruleIds) {
  if (!ruleIds?.length) return {};
  const keys = new Set(ruleIds.flatMap((id) => RULE_GROUPS[id] ?? []));
  return Object.fromEntries([...keys].filter((key) => seoGuide[key] !== undefined).map((key) => [key, seoGuide[key]]));
}

/** Builds context from the current SEO Agent Rules schema. */
export function buildSeoGuideContext(seoGuide, { framework = "auto", ruleIds } = {}) {
  if (!seoGuide) return null;

  const selected = ruleIds?.length ? selectGuideSections(seoGuide, ruleIds) : {
    on_page_checklist: seoGuide.on_page_checklist,
    technical_seo: seoGuide.technical_seo,
    off_page_seo: seoGuide.off_page_seo,
    local_seo: seoGuide.local_seo,
    geo_checklist: seoGuide.geo_checklist,
    aeo_checklist: seoGuide.aeo_checklist,
    validation: seoGuide.validation,
    reporting: seoGuide.reporting,
  };

  const checklists = [
    ...(selected.on_page_checklist ?? []),
    ...(selected.geo_checklist ?? []),
    ...(selected.aeo_checklist ?? []),
  ];

  return {
    version: seoGuide.version,
    name: seoGuide.name,
    role: seoGuide.role,
    workflow: seoGuide.workflow,
    mode: seoGuide.mode,
    framework: {
      requested: framework,
      detectedFromProjectContext: framework === "auto",
      projectContextRequiredForDetection: framework === "auto",
      frameworkSpecificImplementation: "Follow the detected framework's existing metadata, rendering, routing, and asset conventions. This guide does not prescribe framework-specific code snippets.",
    },
    ...selected,
    // Kept for the page builder's existing response contract.
    seoRules: checklists,
    implementationSteps: seoGuide.workflow,
    safeImplementation: seoGuide.safe_implementation,
    validation: selected.validation ?? seoGuide.validation,
    reporting: selected.reporting ?? seoGuide.reporting,
    references: seoGuide.references,
    principle: seoGuide.principle,
  };
}

export function registerNeuctraUiSeoSetupTool(server, { seoGuide }) {
  server.registerTool(
    "neuctra-ui-seo-setup",
    {
      title: "Neuctra UI SEO setup guide",
      description:
        "Return the current SEO Agent Rules for planning or carrying out an evidence-based SEO review in a Neuctra UI project. Covers technical and on-page SEO, GEO, AEO, local and off-page SEO, safe implementation, validation, and reporting. The default mode is read-only audit; implementation should follow the guide and existing project conventions. It does not guarantee rankings, indexing, rich results, or AI citations.",
      inputSchema: {
        framework: z
          .enum(FRAMEWORK_OPTIONS)
          .default("auto")
          .describe("Project framework. With auto, inspect projectContext and repository files before choosing framework-specific implementation details."),
        projectContext: z
          .string()
          .optional()
          .describe("Optional package.json, framework/router configuration, or brief project details. Used as evidence when framework is auto."),
      },
    },
    async ({ framework, projectContext }) => {
      const response = buildSeoGuideContext(seoGuide, { framework });
      if (!response) {
        return {
          isError: true,
          content: [{ type: "text", text: "SEO guide data was not loaded into this server." }],
        };
      }
      response.framework.projectContext = projectContext ?? null;

      return {
        content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
      };
    },
  );
}
