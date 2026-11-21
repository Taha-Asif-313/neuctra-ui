import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Disk loading is for Node, Bun, and Deno. Edge callers should pass imported
// data to createServer({ registry, theme, aiDesignRules, seoGuide, layouts, variants, landingDesign, landingPatterns }).
export function loadDataFromDisk() {
  const directory = path.dirname(fileURLToPath(import.meta.url));
  const dataDirectory = path.resolve(directory, "..", "data");
  const readJson = (name) =>
    JSON.parse(fs.readFileSync(path.join(dataDirectory, name), "utf8"));

  const registry = readJson("components.json");
  const aiDesignRules = readJson("design-rules.json");
  const componentRules = registry.search?.componentRules ?? [];

  return {
    registry,
    theme: readJson("theme.json"),
    aiDesignRules: {
      ...aiDesignRules,
      blocks: {
        ...(aiDesignRules.blocks ?? {}),
        ...(componentRules.length ? { components: componentRules } : {}),
      },
    },
    seoGuide: readJson("seo-guide.json"),
    layouts: readJson("layouts.json"),
    variants: readJson("variants.json"),
    landingDesign: readJson("landing-design.json"),
    landingPatterns: readJson("landing-patterns.json"),
  };
}
