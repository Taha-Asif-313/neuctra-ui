import { COMPONENT_COLLECTION, searchCollection } from "./qdrant.js";
import { embedText } from "./embeddings.js";

export async function searchComponents(query, limit = 8) {
  const vector = await embedText(query);
  const results = await searchCollection(COMPONENT_COLLECTION, vector, limit);

  return results.map((result) => result.payload).filter((component) => Boolean(component?.name));
}