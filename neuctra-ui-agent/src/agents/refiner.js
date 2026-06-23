import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { createDeepAgent } from "deepagents";
import { messageContentToText, normalizeWhitespace } from "../shared/utils.js";

const refinerModel = new ChatOpenAI({
  model: process.env.NEUCTRA_REFINER_MODEL ?? "openai/gpt-oss-120b:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
  },
  temperature: 0.15,
});

const refinerAgent = createDeepAgent({
  model: refinerModel,
  tools: [],
  systemPrompt:
    "You improve React JSX generated for Neuctra UI. Keep the same components and intent. Improve spacing, hierarchy, CTA placement, responsive layout, and typography. Output only code.",
});

export async function refineGeneratedCode(code) {
  try {
    const result = await refinerAgent.invoke({
      messages: [
        {
          role: "user",
          content: `Refine this JSX while keeping Neuctra UI components only:\n\n${code}`,
        },
      ],
    });

    const refined = messageContentToText(result.messages.at(-1)?.content ?? code);
    return normalizeWhitespace(refined || code);
  } catch {
    return normalizeWhitespace(code);
  }
}