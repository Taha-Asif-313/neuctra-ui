// Universal generated-code validation with Neuctra-first checks by default.
// It is deterministic and regex-based: useful as a fast guardrail, not a
// replacement for TypeScript or a real linter.

const UI_LIBRARY_PATTERNS = [
  { name: "MUI", pattern: /^@mui\// },
  { name: "Material UI", pattern: /^@material-ui\// },
  { name: "Ant Design", pattern: /^antd(?:\/|$)/ },
  { name: "Chakra UI", pattern: /^@chakra-ui\// },
  { name: "Radix UI", pattern: /^@radix-ui\// },
  { name: "Headless UI", pattern: /^@headlessui\// },
  { name: "shadcn", pattern: /(^|\/)shadcn(-ui)?(?:\/|$)/i },
  { name: "Bootstrap", pattern: /^(react-bootstrap|bootstrap|reactstrap)(?:\/|$)/ },
  { name: "HeroUI", pattern: /^@heroui\// },
  { name: "NextUI", pattern: /^@nextui-org\// },
  { name: "PrimeReact", pattern: /^primereact(?:\/|$)/ },
];

const RAW_CONTROL_TAGS = new Set(["button", "input", "select", "textarea", "table", "dialog"]);
const REACT_PROPS = new Set([
  "className", "children", "key", "ref", "id", "style", "title", "tabIndex", "role",
  "dangerouslySetInnerHTML", "suppressHydrationWarning", "defaultChecked", "defaultValue",
]);

// Native attributes accepted by components whose props extend HTML attributes.
const HTML_ATTRIBUTES = new Set([
  "hidden", "lang", "dir", "draggable", "translate", "slot", "inert", "autoFocus",
  "href", "target", "rel", "type", "name", "value", "disabled", "placeholder",
  "htmlFor", "form", "required", "readOnly", "multiple", "accept", "alt", "src",
  "width", "height", "loading", "download", "spellCheck", "autoComplete", "contentEditable",
]);

const severityWeight = { error: 20, warning: 8, info: 2 };
const unique = (values) => [...new Set(values.filter(Boolean))];

function severityFor(policy, severity) {
  if (policy === "universal") return severity === "error" ? "warning" : "info";
  if (policy === "neuctra-only" && severity === "warning") return "error";
  return severity;
}

function extractImportSources(code) {
  return [...code.matchAll(/(?:from\s+|import\s*)["']([^"']+)["']/g)].map((match) => match[1]);
}

function extractNeuctraImports(code) {
  const sources = [];
  const names = new Set();
  const pattern = /import\s+([\s\S]*?)\s+from\s+["'](@neuctra\/ui[^"']*)["']/g;
  for (const match of code.matchAll(pattern)) {
    const clause = match[1];
    sources.push(match[2]);
    const named = clause.match(/\{([^}]*)\}/);
    if (named) {
      for (const part of named[1].split(",")) {
        const name = part.trim().split(/\s+as\s+/).pop()?.trim();
        if (name) names.add(name);
      }
    }
    const defaultName = clause.match(/^\s*([A-Za-z_][\w]*)\s*(?:,|$)/);
    if (defaultName) names.add(defaultName[1]);
  }
  return { sources: unique(sources), names };
}

// Skip a quoted string or template literal starting at `i`; returns the index
// just past its closing quote.
function skipString(code, i) {
  const quote = code[i];
  let j = i + 1;
  while (j < code.length) {
    if (code[j] === "\\") { j += 2; continue; }
    if (code[j] === quote) return j + 1;
    if (quote === "`" && code[j] === "$" && code[j + 1] === "{") { j = skipBraces(code, j + 1); continue; }
    j += 1;
  }
  return j;
}

// Skip a balanced {...} expression starting at the "{" at `i`. Strings and
// nested braces are respected, so `onChange={() => setOpen(a > b)}` and
// `sidebar={<Sidebar sections={[]} />}` are consumed as one value.
function skipBraces(code, i) {
  let depth = 0;
  let j = i;
  while (j < code.length) {
    const ch = code[j];
    if (ch === "\"" || ch === "'" || ch === "`") { j = skipString(code, j); continue; }
    if (ch === "{") depth += 1;
    else if (ch === "}") { depth -= 1; if (depth === 0) return j + 1; }
    j += 1;
  }
  return j;
}

// Read the top-level attribute names of the JSX opening tag whose name ends
// at `i`. Attributes of JSX nested inside attribute values are NOT included;
// those tags are found separately by extractTags.
function readTagAttributes(code, i) {
  const names = [];
  let j = i;
  while (j < code.length) {
    while (/\s/.test(code[j] ?? "")) j += 1;
    const ch = code[j];
    if (ch === undefined || ch === ">" || (ch === "/" && code[j + 1] === ">")) break;
    if (ch === "{") { j = skipBraces(code, j); continue; } // {...spread}
    const match = /^[A-Za-z_][A-Za-z0-9_:.-]*/.exec(code.slice(j, j + 200));
    if (!match) { j += 1; continue; }
    names.push(match[0]);
    j += match[0].length;
    while (/\s/.test(code[j] ?? "")) j += 1;
    if (code[j] !== "=") continue;
    j += 1;
    while (/\s/.test(code[j] ?? "")) j += 1;
    if (code[j] === "\"" || code[j] === "'") j = skipString(code, j);
    else if (code[j] === "{") j = skipBraces(code, j);
  }
  return names;
}

function extractTags(code) {
  const tags = [];
  // A JSX opening tag starts with "<Name" that is not part of a comparison or
  // a TypeScript generic call such as useState<string>(...).
  for (const match of code.matchAll(/<([A-Za-z][A-Za-z0-9.]*)/g)) {
    const before = code.slice(Math.max(0, match.index - 1), match.index);
    if (/[A-Za-z0-9_)\]]/.test(before)) continue; // a < b, foo<T>, arr[i]<x
    tags.push({ name: match[1], attributes: readTagAttributes(code, match.index + match[0].length) });
  }
  return tags;
}

function extractAttributes(names) {
  return names.filter((name) => !REACT_PROPS.has(name)
    && !name.startsWith("data-")
    && !name.startsWith("aria-")
    && !/^on[A-Z]/.test(name));
}

export function validateUiCode(code, {
  sourcePolicy = "neuctra-first",
  registry,
  fileName,
} = {}) {
  const text = String(code ?? "");
  const policy = ["neuctra-first", "neuctra-only", "universal"].includes(sourcePolicy)
    ? sourcePolicy
    : "neuctra-first";
  const components = registry?.components ?? [];
  const byName = new Map(components.map((component) => [component.name, component]));
  const violations = [];
  const add = (severity, message, extra = {}) => {
    violations.push({ severity: severityFor(policy, severity), message, ...extra });
  };

  const importSources = extractImportSources(text);
  const neuctraImports = extractNeuctraImports(text);
  const tags = extractTags(text);
  const usedNames = unique(tags.map((tag) => tag.name));
  const usedNeuctraComponents = usedNames.filter((name) => neuctraImports.names.has(name));

  for (const library of UI_LIBRARY_PATTERNS) {
    const matches = importSources.filter((source) => library.pattern.test(source));
    if (matches.length) {
      add("warning", `Foreign UI library import detected: ${library.name}. Use Neuctra UI first.`, {
        imports: matches,
      });
    }
  }

  for (const tag of tags) {
    if (!RAW_CONTROL_TAGS.has(tag.name)) continue;
    add("warning", `Raw <${tag.name}> used. Prefer the matching Neuctra UI component.`, {
      component: tag.name,
    });
  }

  for (const name of usedNames) {
    const component = byName.get(name);
    if (!component) continue;
    if (!neuctraImports.names.has(name)) {
      add("warning", `${name} looks like a Neuctra component but was not imported from @neuctra/ui.`, {
        component: name,
      });
      continue;
    }
    const validProps = new Set((component.props ?? []).map((prop) => prop.name));
    // Components that extend native HTML attributes accept those too.
    const extendsHtml = /HTMLAttributes|HTMLProps|ComponentProps/.test(JSON.stringify(component.extends ?? ""));
    const attrs = unique(tags.filter((tag) => tag.name === name).flatMap((tag) => extractAttributes(tag.attributes)));
    const unknown = attrs.filter((attr) => !validProps.has(attr) && !(extendsHtml && /^[a-z][a-zA-Z]*$/.test(attr) && HTML_ATTRIBUTES.has(attr)));
    if (unknown.length) {
      add("error", `${name} received unknown prop(s): ${unknown.join(", ")}`, {
        component: name,
        props: unknown,
      });
    }
  }

  const used = new Set(usedNames);
  if (used.has("Modal") && !used.has("ModalBody")) {
    add("warning", "Modal should include ModalHeader, ModalBody, and ModalFooter for accessible structure.");
  }
  if (used.has("Table") && !used.has("TBody")) {
    add("warning", "Table should include THead and TBody for semantic table structure.");
  }
  if (used.has("Tabs") && !used.has("TabList")) {
    add("warning", "Tabs should include TabList and TabPanels.");
  }

  if (/#[0-9a-fA-F]{3,8}\b/.test(text)) {
    add("warning", "Hardcoded hex color detected. Prefer semantic theme tokens.");
  }
  if (/\b(?:bg|text|border)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/.test(text)) {
    add("warning", "Hardcoded Tailwind palette color detected. Prefer semantic theme tokens.");
  }

  const needsStates = used.has("Table") || used.has("Modal") || used.has("Card");
  if (needsStates && !/\b(isLoading|loading|empty|error|success|no results)\b/i.test(text)) {
    add("info", "No loading/empty/error state markers found. Add states required by the selected layout.");
  }

  const score = Math.max(0, 100 - violations.reduce((total, violation) => total + (severityWeight[violation.severity] ?? 1), 0));
  const passed = !violations.some((violation) => violation.severity === "error");

  return {
    tool: "validate-ui-code",
    sourcePolicy: policy,
    ...(fileName ? { fileName } : {}),
    score,
    passed,
    neuctraImports: neuctraImports.sources,
    foreignUiImports: importSources.filter((source) => UI_LIBRARY_PATTERNS.some((library) => library.pattern.test(source))),
    usedNeuctraComponents,
    violations,
    summary: passed
      ? "No blocking Neuctra UI contract errors found."
      : "Fix the errors before presenting the generated UI.",
    nextAction: passed
      ? "Rerun after any edits, then do a visual review."
      : "Fix every error, then call validate-ui-code again.",
  };
}
