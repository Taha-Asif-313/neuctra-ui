import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { createDeepAgent } from "deepagents";
import { buildDesignRulesPrompt } from "../shared/designRules.js";
import { messageContentToText, normalizeWhitespace } from "../shared/utils.js";

const generatorModel = new ChatOpenAI({
  model: process.env.NEUCTRA_GENERATOR_MODEL ?? "openai/gpt-oss-120b:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
  },
  temperature: 0.2,
});

const generatorAgent = createDeepAgent({
  model: generatorModel,
  tools: [],
  systemPrompt:
    "You are a React JSX generator for Neuctra UI. Use only the provided Neuctra UI components and the retrieved metadata. Output only JSX for a section block. Never add explanations. Prefer responsive, mobile-first SaaS layouts with consistent spacing and accessibility-minded structure.",
});

function formatContext(context) {
  return context
    .map((sectionContext) => {
      const componentNames = sectionContext.components.map((component) => component.name).join(", ");
      const patternNames = sectionContext.patterns.map((pattern) => pattern.name).join(", ");

      return [
        `Section: ${sectionContext.section}`,
        `Patterns: ${patternNames}`,
        `Components: ${componentNames}`,
        "Component details:",
        ...sectionContext.components.slice(0, 6).map((component) => {
          const props = component.props ? JSON.stringify(component.props) : "{}";
          const examples = (component.examples ?? []).map((example) => `${example.label}: ${example.code}`).join(" | ");
          return `- ${component.name}: ${component.description}\n  props: ${props}\n  examples: ${examples}`;
        }),
      ].join("\n");
    })
    .join("\n\n");
}

export async function generateSectionCode(prompt, context) {
  const result = await generatorAgent.invoke({
    messages: [
      {
        role: "user",
        content: [
          `User request: ${prompt}`,
          buildDesignRulesPrompt(),
          "Generate only JSX for the requested section using only the retrieved Neuctra UI components.",
          formatContext(context),
          "Return only code.",
        ].join("\n\n"),
      },
    ],
  });

  return normalizeWhitespace(messageContentToText(result.messages.at(-1)?.content ?? ""));
}