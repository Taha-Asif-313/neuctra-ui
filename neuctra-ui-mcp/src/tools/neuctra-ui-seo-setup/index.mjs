import { z } from "zod";
import { FRAMEWORKS } from "../../seo.mjs";

export function buildSeoGuideContext(seoGuide, { framework = "auto", ruleIds } = {}) {
  if (!seoGuide) return null;
  const selectedRules = ruleIds
    ? seoGuide.seoRules.filter((rule) => ruleIds.includes(rule.id))
    : seoGuide.seoRules;
  const knownFramework = ["nextjs-app", "nextjs-pages", "react-vite", "react-router", "remix"].includes(framework);
  const implementation = knownFramework
    ? seoGuide.implementationSteps.frameworkSpecific[framework]
    : framework === "auto"
      ? seoGuide.implementationSteps.frameworkSpecific
      : seoGuide.implementationSteps.frameworkSpecific.other;

  return {
    title: seoGuide.title,
    intro: seoGuide.intro,
    seoRules: selectedRules,
    implementationSteps: seoGuide.implementationSteps.steps,
    framework: {
      requested: framework,
      implementation,
      assistantGuidance: seoGuide.implementationSteps.assistantGuidance,
    },
  };
}

export function registerNeuctraUiSeoSetupTool(server, { seoGuide }) {
  server.registerTool(
    "neuctra-ui-seo-setup",
    {
      title: "Neuctra UI SEO rules and implementation guide",
      description:
        "Return one complete SEO, AEO, and GEO guide for a Neuctra UI project. The guide has two portions: comprehensive SEO rules and ordered implementation steps, including framework-specific metadata, rendering, JSON-LD, sitemap, and robots guidance. This is an assistant reference tool: inspect the project and apply the rules to its actual framework; it does not generate a single page snippet or audit input.",
      inputSchema: {
        framework: z
          .enum(["auto", ...FRAMEWORKS, "remix"])
          .default("auto")
          .describe("Project framework. Use auto to inspect repository context and infer it; framework changes how metadata and rendering are implemented."),
        projectContext: z
          .string()
          .optional()
          .describe("Optional package.json/framework config or brief project details to help select the right implementation steps."),
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
