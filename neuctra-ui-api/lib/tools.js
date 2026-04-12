// lib/tools.js
import { getVectorStore } from "./vectorStore.js";

export const createRagTool = async () => {
  const vectorStore = await getVectorStore();

  return {
    name: "component-search",
    description:
      "Search relevant UI components from the design system based on user query",
    func: async (input) => {
      const docs = await vectorStore.similaritySearch(input, 3);

      return docs.map((d) => d.pageContent).join("\n\n");
    },
  };
};