// lib/vectorStore.js
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";
import { components } from "./components.js";

let vectorStore;

export const getVectorStore = async () => {
  if (vectorStore) return vectorStore;

  const docs = components.map(
    (comp) =>
      new Document({
        pageContent: `
Component: ${comp.name}
Description: ${comp.description}
Code:
${comp.code}
        `,
        metadata: { name: comp.name },
      })
  );

  vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      apiKey: process.env.OPENROUTER_API_KEY,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    })
  );

  return vectorStore;
};