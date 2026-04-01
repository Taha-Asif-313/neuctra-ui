// api/generate.js (or serverless entry point)
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQA } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/schema";
import { Components } from "./neuctraUiComponents.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Step 1: Initialize embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Step 2: Prepare vector store for RAG
const vectorStore = new MemoryVectorStore(embeddings);
Components.forEach(c => {
  vectorStore.addDocuments([
    new Document({
      pageContent: `${c.name}: ${c.description}\nProps: ${JSON.stringify(c.props)}\nExample: ${c.example}`,
      metadata: { name: c.name }
    })
  ]);
});

// Step 3: Initialize LangChain OpenAI model
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0.2
});

// Step 4: Create RAG chain
const chain = RetrievalQA.fromChainType(model, vectorStore.asRetriever());

// API Route
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const response = await chain.call({ query: prompt });
    res.json({ code: response.answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Export for serverless
export const handler = serverless(app);