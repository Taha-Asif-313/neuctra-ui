import "dotenv/config";
import { patternRegistry } from "../data/patterns/registry.js";
import { embedTexts } from "../retrieval/embeddings.js";
import {
  ensureCollection,
  PATTERN_COLLECTION,
  upsertPoints,
} from "../retrieval/qdrant.js";
import { pathToFileURL } from "node:url";

export async function indexPatterns() {
  if (!patternRegistry?.length) return;

  const vectors = await embedTexts(
    patternRegistry.map((pattern) => pattern.searchText)
  );

  // Ensure collection matches embedding dimension (IMPORTANT)
  await ensureCollection(PATTERN_COLLECTION, vectors[0].length);

  await upsertPoints(
    PATTERN_COLLECTION,
    patternRegistry.map((pattern, index) => ({
      id: index + 1,
      vector: vectors[index],
      payload: pattern,
    }))
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await indexPatterns();
  console.log(
    `Indexed ${patternRegistry.length} pattern records into ${PATTERN_COLLECTION}.`
  );
}