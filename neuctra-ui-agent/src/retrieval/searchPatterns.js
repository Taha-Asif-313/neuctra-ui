import { PATTERN_COLLECTION, searchCollection } from "./qdrant.js";
import { embedText } from "./embeddings.js";

export async function searchPatterns(query, limit = 5) {
  const vector = await embedText(query);
  const results = await searchCollection(PATTERN_COLLECTION, vector, limit);

  return results.map((result) => result.payload).filter((pattern) => Boolean(pattern?.name));
}