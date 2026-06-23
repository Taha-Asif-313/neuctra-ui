import "dotenv/config";
import { componentRegistry } from "../data/components/registry.js";
import { embedTexts } from "../retrieval/embeddings.js";
import {
  COMPONENT_COLLECTION,
  ensureCollection,
  upsertPoints,
} from "../retrieval/qdrant.js";
import { pathToFileURL } from "node:url";

export async function indexComponents() {
  const vectors = await embedTexts(
    componentRegistry.map((component) => component.searchText)
  );

  await ensureCollection(
    COMPONENT_COLLECTION,
    vectors[0].length
  );

  await upsertPoints(
    COMPONENT_COLLECTION,
    componentRegistry.map((component, index) => ({
      id: index + 1,
      vector: vectors[index],
      payload: component,
    }))
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await indexComponents();
  console.log(
    `Indexed ${componentRegistry.length} component records into ${COMPONENT_COLLECTION}.`,
  );
}
