// Merge locally authored @neuctra/ui extensions into the pinned MCP registry.
//
// This is deliberately NOT sync-registry. It never reads a newer upstream
// version as the source of truth; it keeps the current MCP version/metadata and
// only imports component entries that do not yet exist locally. Use this after
// adding components to neuctra-ui-package and regenerating its registry.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enrichRegistry } from "../src/utils/search-taxonomy.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MCP_DATA = path.join(ROOT, "data", "components.json");
const PACKAGE_DATA = path.resolve(
  ROOT,
  "..",
  "neuctra-ui-package",
  "registry",
  "components.json",
);
const DESIGN_RULES = path.join(ROOT, "data", "design-rules.json");
const COMPONENT_RULES = path.join(ROOT, "data", "component-rules.json");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

const local = readJson(MCP_DATA);
const generated = readJson(PACKAGE_DATA);
const aiDesignRules = readJson(DESIGN_RULES);
const componentRules = readJson(COMPONENT_RULES);

const localNames = new Set(local.components.map((component) => component.name));
const additions = (generated.components ?? []).filter(
  (component) => !localNames.has(component.name),
);

// Refresh components that already exist locally but whose generated API data
// changed in the package (new props, new example, new description). Without
// this, a component added once would keep its first-seen props forever.
// Only the generated fields are replaced; `search` is rebuilt by enrichRegistry.
const GENERATED_FIELDS = ["importFrom", "module", "category", "propsInterface", "description", "props", "extends", "example"];
const generatedByName = new Map((generated.components ?? []).map((component) => [component.name, component]));
const refreshedNames = [];
for (const [index, component] of local.components.entries()) {
  const fresh = generatedByName.get(component.name);
  if (!fresh) continue;
  const changed = GENERATED_FIELDS.some(
    (field) => JSON.stringify(component[field] ?? null) !== JSON.stringify(fresh[field] ?? null),
  );
  if (!changed) continue;
  const next = { ...component };
  for (const field of GENERATED_FIELDS) {
    if (fresh[field] === undefined) delete next[field];
    else next[field] = fresh[field];
  }
  local.components[index] = next;
  refreshedNames.push(component.name);
}

if (!additions.length && !refreshedNames.length) {
  console.log("No new or changed components to merge; local registry is already up to date.");
}

// Validate before writing. enrichRegistry does not deduplicate or repair shape.
const errors = [];
const seen = new Set([...localNames]);
for (const component of additions) {
  if (seen.has(component.name)) errors.push(`Duplicate name: ${component.name}`);
  seen.add(component.name);
  for (const field of ["name", "module", "category", "importFrom", "description"]) {
    if (!component[field]) errors.push(`${component.name}: missing ${field}`);
  }
  if (!Array.isArray(component.props)) errors.push(`${component.name}: props must be an array`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const allowedCategories = new Set([
  "layout", "typography", "form", "actions", "data-display", "feedback", "overlay", "navigation",
]);
for (const component of additions) {
  if (!allowedCategories.has(component.category)) {
    errors.push(`${component.name}: unsupported category ${component.category}`);
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const mergedComponents = [...local.components, ...additions].sort((a, b) =>
  a.name.localeCompare(b.name),
);

const previousExtensions = local.localExtensions ?? {};
const previousNames = new Set(previousExtensions.addedNames ?? []);
for (const component of additions) previousNames.add(component.name);
const addedModules = new Set(
  mergedComponents
    .filter((component) => previousNames.has(component.name))
    .map((component) => component.module),
).size;

const source = {
  ...local,
  components: mergedComponents,
  localExtensions: {
    ...previousExtensions,
    enabled: true,
    strategy: "local-registry-overlay",
    source: "@neuctra/ui local package registry",
    addedCount: previousNames.size,
    addedModules,
    addedNames: [...previousNames].sort((a, b) => a.localeCompare(b)),
    upstreamSynced: false,
  },
};

const enriched = enrichRegistry(source, { aiDesignRules, componentRules });
fs.writeFileSync(MCP_DATA, `${JSON.stringify(enriched, null, 2)}\n`, "utf8");

console.log(
  JSON.stringify(
    {
      merged: additions.length,
      refreshed: refreshedNames.length,
      refreshedNames,
      totalComponents: enriched.components.length,
      version: enriched.version,
      localExtensions: {
        addedCount: enriched.localExtensions.addedCount,
        addedModules: enriched.localExtensions.addedModules,
      },
      searchVersion: enriched.search.version,
      families: Object.keys(enriched.search.families).length,
      layouts: Object.keys(enriched.search.layouts).length,
    },
    null,
    2,
  ),
);
