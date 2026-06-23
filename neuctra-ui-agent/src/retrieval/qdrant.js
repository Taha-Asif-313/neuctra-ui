import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";

export const COMPONENT_COLLECTION = "neuctra-components";
export const PATTERN_COLLECTION = "ui-patterns";

export const qdrant = new QdrantClient({
  url: process.env.QDRANT_ENDPOINT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export async function ensureCollection(collectionName, vectorSize = 2048) {
  const result = await qdrant
    .collectionExists(collectionName)
    .catch(() => ({ exists: false }));

  const exists = result?.exists === true;

  if (!exists) {
    console.log(
      `Creating collection "${collectionName}" with dimension ${vectorSize}`,
    );

    await qdrant.createCollection(collectionName, {
      vectors: {
        size: vectorSize,
        distance: "Cosine",
      },
    });

    return;
  }

  const info = await qdrant.getCollection(collectionName);

  const configuredSize =
    typeof info.config.params.vectors === "object"
      ? info.config.params.vectors.size
      : null;

  if (configuredSize !== vectorSize) {
    throw new Error(
      `Collection dimension mismatch. Qdrant=${configuredSize}, Embedding=${vectorSize}`,
    );
  }
}

export async function upsertPoints(collectionName, points) {
  if (!points?.length) {
    return;
  }

  // Detect the vector dimension dynamically from the first point
  const sampleVector = points[0].vector;
  const vectorSize = Array.isArray(sampleVector) ? sampleVector.length : 1536;

  // Auto-create if it doesn't exist
  await ensureCollection(collectionName, vectorSize);

  await qdrant.upsert(collectionName, {
    wait: true,
    points,
  });
}

export async function searchCollection(collectionName, vector, limit = 8) {
  const results = await qdrant.search(collectionName, {
    vector,
    limit,
    with_payload: true,
  });

  return results.map((result) => ({
    id: result.id,
    score: result.score,
    payload: result.payload,
  }));
}
