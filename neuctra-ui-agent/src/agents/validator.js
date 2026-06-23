import { getComponentNames, getComponentPropNames } from "../data/components/registry.js";
import { normalizeWhitespace } from "../shared/utils.js";

const componentNames = new Set(getComponentNames());

function extractImportedNames(code) {
  const imports = code.match(/import\s+\{([^}]+)\}\s+from\s+['\"]neuctra-ui['\"];?/g) ?? [];

  return imports.flatMap((statement) => {
    const inside = statement.match(/\{([^}]+)\}/)?.[1] ?? "";
    return inside.split(",").map((value) => value.trim()).filter(Boolean);
  });
}

function extractJsxComponentUsages(code) {
  const matches = [];
  const regex = /<([A-Z][A-Za-z0-9]*)\b([\s\S]*?)(?:\/>|>)/g;
  let match;

  while ((match = regex.exec(code))) {
    const name = match[1];
    const propsSource = match[2] ?? "";
    matches.push({ name, propsSource });
  }

  return matches;
}

function extractPropNames(propsSource) {
  const names = [];
  const regex = /\s([A-Za-z0-9_-]+)(?=\s*=|\s|$)/g;
  let match;

  while ((match = regex.exec(propsSource))) {
    names.push(match[1]);
  }

  return names;
}

function detectIssues(code) {
  const issues = [];
  const importedNames = new Set(extractImportedNames(code));
  const usages = extractJsxComponentUsages(code);

  for (const importedName of importedNames) {
    if (!componentNames.has(importedName)) {
      issues.push({
        severity: "error",
        message: `Unknown Neuctra UI component imported: ${importedName}`,
      });
    }
  }

  for (const usage of usages) {
    if (!importedNames.has(usage.name) && !usage.name.startsWith("Drawer") && !usage.name.startsWith("Modal") && !usage.name.startsWith("Tab")) {
      issues.push({
        severity: "error",
        message: `Component used without import or unsupported namespace: ${usage.name}`,
      });
    }

    const allowedProps = new Set([
      ...getComponentPropNames(usage.name),
      "children",
      "className",
      "style",
      "id",
      "key",
      "ref",
      "role",
      "title",
    ]);

    for (const propName of extractPropNames(usage.propsSource)) {
      if (propName.startsWith("data-") || propName.startsWith("aria-")) {
        continue;
      }

      if (!allowedProps.has(propName)) {
        issues.push({
          severity: "warning",
          message: `Possible invalid prop on ${usage.name}: ${propName}`,
        });
      }
    }
  }

  if (!code.includes("export default")) {
    issues.push({
      severity: "warning",
      message: "Generated code should include a default export.",
    });
  }

  return issues;
}

export async function validateGeneratedCode(code) {
  const normalizedCode = normalizeWhitespace(code);
  const issues = detectIssues(normalizedCode);

  return {
    code: normalizedCode,
    issues,
  };
}