import { tool } from "langchain";
import { TavilySearch } from "@langchain/tavily";
import { z } from "zod";

export const internetSearch = tool(
  async ({ query, maxResults = 5 }) => {
    const search = new TavilySearch({
      maxResults,
      tavilyApiKey: process.env.TAVILY_API_KEY,
    });

    const results = await search._call({ query });

    return JSON.stringify(
      results.results.map((item) => ({
        title: item.title,
        url: item.url,
        content: item.content,
      })),
      null,
      2
    );
  },
  {
    name: "internet_search",
    description:
      "Search the web for UI inspiration, documentation, React examples, Tailwind examples, accessibility practices, and frontend development resources.",
    schema: z.object({
      query: z.string(),
      maxResults: z.number().optional().default(5),
    }),
  }
);