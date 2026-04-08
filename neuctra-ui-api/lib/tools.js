// lib/tools.js
import { getVectorStore } from "./vectorStore.js";

export const createRagTool = async () => {
  const vectorStore = await getVectorStore();
  const retriever = vectorStore.asRetriever(3);

  return {
    name: "component-search",
    description:
      "Search relevant UI components from the design system based on user query",
    func: async (input) => {
      const docs = await retriever.invoke(input);

      return docs.map((d) => d.pageContent).join("\n\n");
    },
  };
};