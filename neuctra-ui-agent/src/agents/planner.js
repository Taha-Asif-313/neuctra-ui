import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { createDeepAgent } from "deepagents";
import { messageContentToText, safeJsonParse } from "../shared/utils.js";
import { internetSearch } from "../tools/internetSearch.js";

const plannerModel = new ChatOpenAI({
  model: process.env.NEUCTRA_PLANNER_MODEL ?? "openai/gpt-oss-120b:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
  },
  temperature: 0.1,
});

const plannerAgent = createDeepAgent({
  model: plannerModel,
  tools: [internetSearch],
  systemPrompt:
    "You are a UI planning agent. Analyze the user request and return JSON only. Never generate TSX. Output only { pageType, tone, sections, notes? }. Choose sections appropriate for the requested page.",
});

function fallbackPlan(prompt) {
  const lowered = prompt.toLowerCase();

  if (lowered.includes("pricing")) {
    return {
      pageType: "pricing-page",
      tone: "conversion focused",
      sections: ["Navbar", "Pricing", "CTA", "Footer"],
    };
  }

  if (lowered.includes("dashboard") || lowered.includes("admin")) {
    return {
      pageType: "dashboard",
      tone: "clean admin",
      sections: ["Sidebar", "Stats", "Dashboard", "Footer"],
    };
  }

  if (lowered.includes("login") || lowered.includes("sign in") || lowered.includes("signin")) {
    return {
      pageType: "auth",
      tone: "minimal secure",
      sections: ["Login"],
    };
  }

  if (lowered.includes("setting") || lowered.includes("profile")) {
    return {
      pageType: "settings",
      tone: "organized",
      sections: ["Sidebar", "Settings"],
    };
  }

  return {
    pageType: "landing-page",
    tone: "modern SaaS",
    sections: ["Navbar", "Hero", "Features", "Testimonials", "Pricing", "CTA", "Footer"],
  };
}

export async function planPage(prompt) {
  const fallback = fallbackPlan(prompt);

  try {
    const result = await plannerAgent.invoke({
      messages: [
        {
          role: "user",
          content: `Plan the UI for this request and return JSON only: ${prompt}`,
        },
      ],
    });

    const content = messageContentToText(result.messages.at(-1)?.content ?? "");
    const parsed = safeJsonParse(content, fallback);

    if (!parsed?.sections?.length) {
      return fallback;
    }

    return {
      pageType: String(parsed.pageType ?? fallback.pageType),
      tone: String(parsed.tone ?? fallback.tone),
      sections: parsed.sections.map((section) => String(section)),
      notes: Array.isArray(parsed.notes) ? parsed.notes.map((note) => String(note)) : undefined,
    };
  } catch {
    return fallback;
  }
}