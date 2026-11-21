// Copies the generated component registry from the sibling neuctra-ui-package
// into data/. Keeps this package dependency-free (no need to install the
// full @neuctra/ui component library just to read one JSON file) while
// staying a single source of truth: neuctra-ui-package/registry/components.json.
//
// After copying, the deterministic semantic search layer is added so
// data/components.json always carries the families/layouts/aliases needed by
// the deep-search utility. Re-running this script is idempotent.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enrichRegistry } from "../src/utils/search-taxonomy.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(
  __dirname,
  "..",
  "..",
  "neuctra-ui-package",
  "registry",
  "components.json",
);
const DEST = path.resolve(__dirname, "..", "data", "components.json");
const DESIGN_RULES = path.resolve(__dirname, "..", "data", "design-rules.json");
const COMPONENT_RULES = path.resolve(__dirname, "..", "data", "component-rules.json");

if (!fs.existsSync(SRC)) {
  console.error(
    `Registry not found at ${SRC}. Run "npm run registry:generate" in neuctra-ui-package first.`,
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));
const aiDesignRules = JSON.parse(fs.readFileSync(DESIGN_RULES, "utf8"));
const componentRules = JSON.parse(fs.readFileSync(COMPONENT_RULES, "utf8"));
fs.writeFileSync(
  DEST,
  `${JSON.stringify(enrichRegistry(raw, { aiDesignRules, componentRules }), null, 2)}\n`,
  "utf8",
);
console.log(`Synced + enriched registry -> ${path.relative(process.cwd(), DEST)}`);
