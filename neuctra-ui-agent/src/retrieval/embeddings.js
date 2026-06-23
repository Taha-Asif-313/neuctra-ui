import "dotenv/config";
import OpenAI from "openai";

const embeddingModelName =
  process.env.NEUCTRA_EMBEDDING_MODEL ??
  "nvidia/llama-nemotron-embed-vl-1b-v2:free";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL:
    process.env.OPENROUTER_BASE_URL ??
    "https://openrouter.ai/api/v1",
});

export async function embedText(text) {
  const response = await client.embeddings.create({
    model: embeddingModelName,
    input: [String(text ?? "")],
    encoding_format: "float",
  });

  if (!response?.data?.length) {
    throw new Error(
      `Embedding API returned no vectors: ${JSON.stringify(response)}`
    );
  }

  return response.data[0].embedding;
}

export async function embedTexts(texts) {
  const cleanTexts = (texts ?? [])
    .map((text) => String(text ?? "").trim())
    .filter(Boolean);

  if (!cleanTexts.length) {
    return [];
  }

  const response = await client.embeddings.create({
    model: embeddingModelName,
    input: cleanTexts,
    encoding_format: "float",
  });

  if (!response?.data?.length) {
    throw new Error(
      `Embedding API returned no vectors: ${JSON.stringify(response)}`
    );
  }

  return response.data.map((item) => item.embedding);
}