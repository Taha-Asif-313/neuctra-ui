// Adds the semantic search layer to data/components.json in place.
//
// The registry itself stays the single source of truth for props/examples;
// this script adds the derived `search` metadata (families, layouts, aliases,
// use cases, keywords) and embeds the full component-rule prose used by the
// deep-search utility. It is safe to re-run: enrichRegistry() strips any
// previous `search` data before rebuilding it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enrichRegistry } from "../src/utils/search-taxonomy.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEST = path.resolve(__dirname, "..", "data", "components.json");
const DESIGN_RULES = path.resolve(__dirname, "..", "data", "design-rules.json");
const COMPONENT_RULES = path.resolve(__dirname, "..", "data", "component-rules.json");

const registry = JSON.parse(fs.readFileSync(DEST, "utf8"));
const aiDesignRules = JSON.parse(fs.readFileSync(DESIGN_RULES, "utf8"));
const componentRules = JSON.parse(fs.readFileSync(COMPONENT_RULES, "utf8"));
const enriched = enrichRegistry(registry, { aiDesignRules, componentRules });

fs.writeFileSync(DEST, `${JSON.stringify(enriched, null, 2)}\n`, "utf8");

const layoutSummary = Object.entries(enriched.search.layouts)
  .map(([id, layout]) => `${id}(${layout.components.length})`)
  .join(", ");
console.log(`Enriched ${enriched.componentCount} components -> ${path.relative(process.cwd(), DEST)}`);
console.log(`Layouts: ${layoutSummary}`);
