import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Disk loading is for Node, Bun, and Deno. Edge callers should pass imported
// data to createServer({ registry, theme, aiDesignRules, seoGuide, layouts }).
export function loadDataFromDisk() {
  const directory = path.dirname(fileURLToPath(import.meta.url));
  const dataDirectory = path.resolve(directory, "..", "data");
  const readJson = (name) =>
    JSON.parse(fs.readFileSync(path.join(dataDirectory, name), "utf8"));

  return {
    registry: readJson("components.json"),
    theme: readJson("theme.json"),
    aiDesignRules: readJson("aiDesignRules.json"),
    seoGuide: readJson("seoGuide.json"),
    layouts: readJson("layouts.json"),
  };
}
