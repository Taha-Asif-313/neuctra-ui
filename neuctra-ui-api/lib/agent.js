// lib/agent.js
import { generateCompletion } from "./llm.js";
import { createUITool } from "./uiTool.js";
import { components } from "./components.js";

const normalize = (value) => String(value || "").toLowerCase();

const scoreComponent = (component, queryTokens) => {
  const haystack = normalize(
    `${component.name} ${component.description} ${Object.keys(component.props || {}).join(" ")}`
  );

  return queryTokens.reduce((score, token) => {
    if (!token) return score;
    if (haystack.includes(token)) return score + 1;
    return score;
  }, 0);
};

const selectRelevantComponents = (query, limit = 8) => {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);

  return [...components]
    .map((component) => ({ component, score: scoreComponent(component, tokens) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.component);
};

export const createAgent = async () => {
  const uiTool = createUITool(generateCompletion);

  return {
    call: async ({ input }) => {
      const relevant = selectRelevantComponents(input);
      const componentContext = JSON.stringify(relevant, null, 2);
      const generationInput = `
Use the component metadata below to generate the UI. Prefer these components if relevant.

Available Components:
${componentContext}

User Request:
${input}
      `;

      const output = await uiTool.func(generationInput);
      return { output };
    },
  };
};