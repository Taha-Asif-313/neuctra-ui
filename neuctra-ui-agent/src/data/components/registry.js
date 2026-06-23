import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));
const componentsFilePath = resolve(currentDir, "../../../components-jsons/neuctra-ui-components.json");
const rawComponents = JSON.parse(readFileSync(componentsFilePath, "utf8"));

function buildSearchText(component) {
  const propText = component.props ? JSON.stringify(component.props) : "";
  const exampleText = (component.examples ?? []).map((example) => example.code).join("\n");
  const tokenText = (component.designTokens ?? []).join(" ");
  const practiceText = (component.bestPractices ?? []).join(" ");
  const hintText = (component.agentHints ?? []).join(" ");

  return [
    component.name,
    component.importPath,
    component.category,
    component.description,
    propText,
    exampleText,
    tokenText,
    practiceText,
    hintText,
  ]
    .filter(Boolean)
    .join("\n");
}

function normalizeComponent(component) {
  return {
    ...component,
    documentType: "component",
    searchText: buildSearchText(component),
  };
}

function normalizeSubComponent(parentComponent, name) {
  return {
    name,
    importPath: parentComponent.importPath,
    category: parentComponent.category,
    description: `${name} sub-component for ${parentComponent.name}.`,
    props: {},
    examples: parentComponent.examples ?? [],
    designTokens: parentComponent.designTokens ?? [],
    bestPractices: parentComponent.bestPractices ?? [],
    agentHints: parentComponent.agentHints ?? [],
    subComponents: [],
    documentType: "component",
    searchText: buildSearchText(parentComponent),
    parentName: parentComponent.name,
    isSubComponent: true,
  };
}

export const componentRegistry = rawComponents.components.flatMap((component) => {
  const mainComponent = normalizeComponent(component);
  const subComponents = (component.subComponents ?? []).map((subComponent) =>
    normalizeSubComponent(component, subComponent),
  );

  return [mainComponent, ...subComponents];
});

export function getComponentByName(name) {
  return componentRegistry.find((component) => component.name.toLowerCase() === String(name ?? "").toLowerCase());
}

export function getComponentNames() {
  return componentRegistry.map((component) => component.name);
}

export function getComponentPropNames(name) {
  const component = getComponentByName(name);
  return component?.props ? Object.keys(component.props) : [];
}