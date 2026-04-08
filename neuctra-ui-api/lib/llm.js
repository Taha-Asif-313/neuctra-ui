// lib/llm.js
import OpenAI from "openai";

const getClient = () => {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing API key. Set OPENROUTER_API_KEY (or OPENAI_API_KEY) in your environment."
    );
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });
};

export const generateCompletion = async (prompt) => {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free",
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices?.[0]?.message?.content?.trim() || "";
};