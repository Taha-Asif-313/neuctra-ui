// Generates registry/components.json — a machine-readable description of the
// public @neuctra/ui API (components, props, defaults, one usage example
// each). This is the source of truth an MCP server / AI tooling reads from,
// instead of re-deriving it by hand or by hallucinating from memory.
import { Project } from "ts-morph";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const DOCS_PAGES = path.resolve(
  ROOT,
  "..",
  "neuctra-ui-docs",
  "src",
  "layouts",
  "docs",
  "pages",
);
const OUT_DIR = path.join(ROOT, "registry");
const OUT_FILE = path.join(OUT_DIR, "components.json");

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

// Component -> category. Hand-curated once; new components need one line here.
const CATEGORY = {
  Container: "layout",
  Card: "layout",
  Divider: "layout",
  Text: "typography",
  Kbd: "typography",
  Input: "form",
  Textarea: "form",
  Select: "form",
  Checkbox: "form",
  RadioGroup: "form",
  Switch: "form",
  NumberInput: "form",
  PinInput: "form",
  TagInput: "form",
  FileUpload: "form",
  Slider: "form",
  Toggle: "form",
  ToggleGroup: "form",
  DatePicker: "form",
  Calendar: "form",
  Button: "actions",
  CopyButton: "actions",
  ThemeToggleButton: "actions",
  Table: "data-display",
  List: "data-display",
  Avatar: "data-display",
  AvatarGroup: "data-display",
  Badge: "data-display",
  Chip: "data-display",
  Stat: "data-display",
  Timeline: "data-display",
  Rating: "data-display",
  Image: "data-display",
  Carousel: "data-display",
  Alert: "feedback",
  Callout: "feedback",
  Progress: "feedback",
  Skeleton: "feedback",
  Spinner: "feedback",
  EmptyState: "feedback",
  Modal: "overlay",
  Drawer: "overlay",
  Dropdown: "overlay",
  Popover: "overlay",
  Tooltip: "overlay",
  Breadcrumb: "navigation",
  Pagination: "navigation",
  Stepper: "navigation",
  Tabs: "navigation",
};

/** Parse `export { A, B } from "./components/basic/File"` and the matching
 *  `export type { X, Y } from "./components/basic/File"` blocks out of
 *  src/index.ts, so the registry only ever describes the real public API. */
function parseIndexExports() {
  const text = fs.readFileSync(path.join(SRC, "index.ts"), "utf8");
  const re =
    /export\s+(type\s+)?\{([^}]*)\}\s*from\s*["']\.\/components\/basic\/([^"']+)["'];?/g;
  const byFile = new Map();
  let m;
  while ((m = re.exec(text))) {
    const isType = !!m[1];
    const names = m[2]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const file = m[3];
    if (!byFile.has(file)) byFile.set(file, { components: [], types: [] });
    byFile.get(file)[isType ? "types" : "components"].push(...names);
  }
  return byFile;
}

function findDefaults(sourceFile, componentName) {
  const varDecl = sourceFile.getVariableDeclaration(componentName);
  const funcDecl = sourceFile.getFunction(componentName);
  let fnLike = null;

  if (funcDecl) {
    fnLike = funcDecl;
  } else if (varDecl) {
    const init = varDecl.getInitializerIfKind ? varDecl.getInitializer() : undefined;
    if (init) {
      // forwardRef<Ref, Props>((props, ref) => ...) or forwardRef(function X(...))
      if (init.getKindName() === "CallExpression") {
        const args = init.getArguments();
        fnLike = args.find(
          (a) =>
            a.getKindName() === "ArrowFunction" ||
            a.getKindName() === "FunctionExpression",
        );
      } else if (
        init.getKindName() === "ArrowFunction" ||
        init.getKindName() === "FunctionExpression"
      ) {
        fnLike = init;
      }
    }
  }
  if (!fnLike) return {};

  const params = fnLike.getParameters();
  if (!params.length) return {};
  const nameNode = params[0].getNameNode();
  if (!nameNode || nameNode.getKindName() !== "ObjectBindingPattern") return {};

  const defaults = {};
  for (const el of nameNode.getElements()) {
    const init = el.getInitializer();
    if (init) {
      defaults[el.getName()] = init.getText();
    }
  }
  return defaults;
}

function extractProps(sourceFile, interfaceName, defaults) {
  const iface = sourceFile.getInterface(interfaceName);
  if (!iface) return null;

  const extendsClauses = iface
    .getExtends()
    .map((e) => e.getText())
    .filter((t) => t.includes("HTMLAttributes") || t.includes("Props"));

  const props = iface.getProperties().map((p) => {
    const typeNode = p.getTypeNode();
    const typeText = typeNode ? typeNode.getText() : p.getType().getText();
    const jsDoc = p.getJsDocs()[0]?.getDescription().trim() || "";
    return {
      name: p.getName(),
      type: typeText.replace(/\s+/g, " ").trim(),
      required: !p.hasQuestionToken(),
      default: defaults[p.getName()] ?? null,
      description: jsDoc,
    };
  });

  return { props, extends: extendsClauses };
}

function cleanText(raw) {
  return raw
    .replace(/<[^>]+>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDescription(text) {
  const h1Idx = text.indexOf("<h1");
  const scoped = h1Idx >= 0 ? text.slice(h1Idx) : text;
  const pMatch = scoped.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  return pMatch ? cleanText(pMatch[1]) : "";
}

function extractExample(text, componentName) {
  // Two shapes appear across docs pages: `code={\`...\`}` inline, and
  // `code: \`...\`,` inside an examples array literal.
  const patterns = [/code=\{`([\s\S]*?)`\}/g, /code:\s*`([\s\S]*?)`/g];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      if (m[1].includes(`<${componentName}`)) return m[1].trim();
    }
  }
  return "";
}

/** Best-effort scrape of the docs page: header description paragraph + first
 *  usage code snippet that renders this component. Docs markup isn't
 *  standardized across pages, so this tries the component's own page and
 *  falls back to its parent module's page (for subcomponents like CardBody
 *  that don't have one of their own). A miss just leaves the field empty —
 *  it never fails the build. */
function scrapeDocsPage(componentName, moduleName) {
  const candidates = [componentName];
  if (moduleName !== componentName) candidates.push(moduleName);

  let description = "";
  let example = "";
  for (const candidate of candidates) {
    const file = path.join(DOCS_PAGES, `${candidate}Docs.jsx`);
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    if (!description) description = extractDescription(text);
    if (!example) example = extractExample(text, componentName);
    if (description && example) break;
  }
  return { description, example };
}

function main() {
  const project = new Project({
    tsConfigFilePath: path.join(ROOT, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });

  const byFile = parseIndexExports();
  const components = [];

  for (const [file, { components: compNames, types }] of byFile) {
    if (file === "AudioGallery") continue; // not exported from index.ts anyway
    const filePath = path.join(SRC, "components", "basic", `${file}.tsx`);
    if (!fs.existsSync(filePath)) continue;
    const sourceFile = project.addSourceFileAtPath(filePath);

    for (const name of compNames) {
      const defaults = findDefaults(sourceFile, name);

      let ifaceName = types.find((t) => t === `${name}Props`);
      if (!ifaceName) ifaceName = types.find((t) => t === `${name}GroupProps`);
      if (!ifaceName && types.length === 1) ifaceName = types[0];

      const extracted = ifaceName
        ? extractProps(sourceFile, ifaceName, defaults)
        : null;

      const { description, example } = scrapeDocsPage(name, file);

      components.push({
        name,
        importFrom: "@neuctra/ui",
        module: file,
        category: CATEGORY[file] ?? "uncategorized",
        propsInterface: ifaceName ?? null,
        description,
        props: extracted?.props ?? [],
        extends: extracted?.extends ?? [],
        example,
      });
    }
  }

  components.sort((a, b) => a.name.localeCompare(b.name));

  const registry = {
    $schema: "https://json-schema.org/draft/2020-12/schema#",
    package: pkg.name,
    version: pkg.version,
    generatedAt: new Date().toISOString(),
    componentCount: components.length,
    components,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(registry, null, 2) + "\n");

  const missingProps = components.filter((c) => c.props.length === 0);
  const missingExamples = components.filter((c) => !c.example);
  console.log(`Wrote ${components.length} components to ${path.relative(ROOT, OUT_FILE)}`);
  if (missingProps.length) {
    console.log(
      `  no props extracted (${missingProps.length}): ${missingProps.map((c) => c.name).join(", ")}`,
    );
  }
  if (missingExamples.length) {
    console.log(
      `  no example scraped (${missingExamples.length}): ${missingExamples.map((c) => c.name).join(", ")}`,
    );
  }
}

main();
