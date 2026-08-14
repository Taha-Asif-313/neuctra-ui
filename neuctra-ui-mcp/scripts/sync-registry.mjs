// Copies the generated component registry from the sibling neuctra-ui-package
// into data/. Keeps this package dependency-free (no need to install the
// full @neuctra/ui component library just to read one JSON file) while
// staying a single source of truth: neuctra-ui-package/registry/components.json.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

if (!fs.existsSync(SRC)) {
  console.error(
    `Registry not found at ${SRC}. Run "npm run registry:generate" in neuctra-ui-package first.`,
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.copyFileSync(SRC, DEST);
console.log(`Synced registry -> ${path.relative(process.cwd(), DEST)}`);
