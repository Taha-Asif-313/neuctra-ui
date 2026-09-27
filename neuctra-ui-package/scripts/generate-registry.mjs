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
// neuctra-ui-docs-v2 (Next.js App Router) is the canonical, actively
// deployed docs site — one folder per component under app/docs/<slug>/page.js.
// The legacy neuctra-ui-docs (Vite SPA, <Name>Docs.jsx per component) this
// used to scrape has been retired; DOCS_SLUG below maps each source module
// to its v2 folder since the slug doesn't always follow simple kebab-casing
// of the module name (e.g. RadioGroup -> "radio", not "radio-group").
const DOCS_PAGES = path.resolve(ROOT, "..", "neuctra-ui-docs-v2", "app", "docs");

// Module (the .tsx file under src/components/basic, as named in src/index.ts's
// `from "./components/basic/<File>"`) -> its neuctra-ui-docs-v2 folder slug.
// Several modules intentionally share one page (Calendar's docs live on the
// DatePicker page; ToggleGroup's live on the Toggle page).
const DOCS_SLUG = {
  Accordion: "accordion",
  Alert: "alert", // Alert.tsx actually exports the toast system; v2 covers it as "Toast" on this page
  Avatar: "avatar",
  AvatarGroup: "avatar-group",
  Badge: "badge",
  Breadcrumb: "breadcrumb",
  Button: "button",
  Calendar: "date-picker",
  Callout: "callout",
  Card: "card",
  Carousel: "carousel",
  Checkbox: "checkbox",
  Chip: "chip",
  Container: "container",
  CopyButton: "copy-button",
  DatePicker: "date-picker",
  Divider: "divider",
  Drawer: "drawer",
  Dropdown: "dropdown",
  EmptyState: "empty-state",
  FileUpload: "file-upload",
  IconButton: "icon-button",
  Image: "image",
  Input: "input",
  Kbd: "kbd",
  List: "list",
  Modal: "modal",
  NumberInput: "number-input",
  Pagination: "pagination",
  PinInput: "pin-input",
  Popover: "popover",
  Progress: "progress",
  RadioGroup: "radio",
  Rating: "rating",
  Select: "select",
  Skeleton: "skeleton",
  Slider: "slider",
  Spinner: "spinner",
  Stat: "stat",
  Stepper: "stepper",
  Switch: "switch",
  Table: "table",
  Tabs: "tabs",
  TagInput: "tag-input",
  Text: "text",
  Textarea: "textarea",
  ThemeToggleButton: "theme-toggle",
  Timeline: "timeline",
  TimePicker: "time-picker",
  Toggle: "toggle",
  ToggleGroup: "toggle",
  Tooltip: "tooltip",
};
const OUT_DIR = path.join(ROOT, "registry");
const OUT_FILE = path.join(OUT_DIR, "components.json");

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

// Component -> its props type name, for the rare cases where that name
// doesn't follow the `<Component>Props` / `<Component>GroupProps` convention
// (e.g. DrawerTriggerButton's props interface is named DrawerTriggerProps).
// Hand-curated once; add a line here rather than renaming a published export.
const INTERFACE_ALIAS = {
  DrawerTriggerButton: "DrawerTriggerProps",
  ThemeToggleButton: "ThemeToggleProps",
  // Table/Card sub-components that intentionally share one prop shape
  // across siblings rather than each having its own `<Name>Props`.
  CardBody: "CardSectionProps",
  CardFooter: "CardSectionProps",
  THead: "TableSectionProps",
  TBody: "TableSectionProps",
  TH: "TableCellProps",
  TD: "TableCellProps",
};

// Component -> category. Hand-curated once; new components need one line here.
const CATEGORY = {
  Accordion: "data-display",
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
  TimePicker: "form",
  Calendar: "form",
  Button: "actions",
  IconButton: "actions",
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

// A prop-shape member is either an interface's PropertySignature or a type
// alias's inline TypeLiteral PropertySignature — both expose the same shape
// (getName/getTypeNode/hasQuestionToken/getJsDocs), so one mapper covers both.
function mapMember(m, defaults) {
  const typeNode = m.getTypeNode();
  const typeText = typeNode ? typeNode.getText() : m.getType().getText();
  const jsDoc = m.getJsDocs()[0]?.getDescription().trim() || "";
  return {
    name: m.getName(),
    type: typeText.replace(/\s+/g, " ").trim(),
    required: !m.hasQuestionToken(),
    default: defaults[m.getName()] ?? null,
    description: jsDoc,
  };
}

function extractProps(sourceFile, interfaceName, defaults) {
  const iface = sourceFile.getInterface(interfaceName);
  if (iface) {
    const extendsClauses = iface
      .getExtends()
      .map((e) => e.getText())
      .filter((t) => t.includes("HTMLAttributes") || t.includes("Props"));
    return {
      props: iface.getProperties().map((p) => mapMember(p, defaults)),
      extends: extendsClauses,
    };
  }

  // Some prop shapes are declared as `export type XProps = { ... }` instead
  // of an interface (e.g. ThemeToggleProps), or as an intersection of an
  // inline object literal with a spread-in HTML props type (Text's
  // polymorphic `{ ... } & Omit<ComponentPropsWithoutRef<T>, "className">`).
  // ts-morph finds the alias by name regardless of generic type parameters;
  // for an intersection we only want the type's OWN literal members — the
  // other intersection members (HTMLAttributes, Omit<...>, etc.) are inherited
  // props, recorded in `extends` the same way an interface's `extends` is.
  const alias = sourceFile.getTypeAlias(interfaceName);
  const typeNode = alias?.getTypeNode();
  if (alias && typeNode) {
    const literals =
      typeNode.getKindName() === "TypeLiteral"
        ? [typeNode]
        : typeNode.getKindName() === "IntersectionType"
          ? typeNode.getTypeNodes().filter((t) => t.getKindName() === "TypeLiteral")
          : [];
    if (literals.length) {
      const extendsClauses =
        typeNode.getKindName() === "IntersectionType"
          ? typeNode
              .getTypeNodes()
              .filter((t) => t.getKindName() !== "TypeLiteral")
              .map((t) => t.getText())
          : [];
      return {
        props: literals.flatMap((lit) =>
          lit.getMembers().map((m) => mapMember(m, defaults)),
        ),
        extends: extendsClauses,
      };
    }
  }

  return null;
}

function cleanText(raw) {
  return raw
    .replace(/<[^>]+>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDescription(text) {
  // Almost every page's heading is a plain `<h1>`; the Text page dogfoods its
  // own component instead (`<Text as="h1">`), so accept either as the anchor.
  const h1Match = text.match(/<h1[\s>]|<Text\s+as=["']h1["']/);
  const scoped = h1Match ? text.slice(h1Match.index) : text;
  const pMatch = scoped.match(
    /<p[^>]*>([\s\S]*?)<\/p>|<Text\s+as=["']p["'][^>]*>([\s\S]*?)<\/Text>/,
  );
  const raw = pMatch ? pMatch[1] ?? pMatch[2] : "";
  const cleaned = cleanText(raw);
  if (cleaned || !raw) return cleaned;

  // A `<p>{DESCRIPTION}</p>` intro (the whole paragraph is one JS variable,
  // e.g. Slider's page) cleans to nothing since cleanText strips `{...}`
  // wholesale. Resolve it against a `const DESCRIPTION = "...";` elsewhere
  // on the same page instead of giving up.
  const varMatch = raw.trim().match(/^\{\s*([A-Za-z_$][\w$]*)\s*\}$/);
  if (!varMatch) return cleaned;
  const constMatch = text.match(
    new RegExp(`const\\s+${varMatch[1]}\\s*=\\s*([\`'"])([\\s\\S]*?)\\1`),
  );
  return constMatch ? cleanText(constMatch[2]) : cleaned;
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
 *  standardized across pages, so this tries the component's own slug and
 *  falls back to its parent module's slug (for subcomponents like CardBody,
 *  or modules that share a page like Calendar/DatePicker and Toggle/
 *  ToggleGroup). A miss just leaves the field empty — it never fails the
 *  build. */
function scrapeDocsPage(componentName, moduleName) {
  const candidates = [componentName];
  if (moduleName !== componentName) candidates.push(moduleName);

  let description = "";
  let example = "";
  for (const candidate of candidates) {
    const slug = DOCS_SLUG[candidate];
    if (!slug) continue;
    const file = path.join(DOCS_PAGES, slug, "page.js");
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
    const filePath = path.join(SRC, "components", "basic", `${file}.tsx`);
    if (!fs.existsSync(filePath)) continue;
    const sourceFile = project.addSourceFileAtPath(filePath);

    for (const name of compNames) {
      const defaults = findDefaults(sourceFile, name);

      let ifaceName = INTERFACE_ALIAS[name] && types.includes(INTERFACE_ALIAS[name])
        ? INTERFACE_ALIAS[name]
        : undefined;
      if (!ifaceName) ifaceName = types.find((t) => t === `${name}Props`);
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
