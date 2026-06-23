import { componentRegistry, getComponentByName } from "../data/components/registry.js";
import { patternRegistry } from "../data/patterns/registry.js";
import { searchComponents } from "../retrieval/searchComponents.js";
import { searchPatterns } from "../retrieval/searchPatterns.js";
import { dedupeStrings, normalizeWhitespace } from "../shared/utils.js";
import { planPage } from "../agents/planner.js";
import { generateSectionCode } from "../agents/generator.js";
import { validateGeneratedCode } from "../agents/validator.js";
import { refineGeneratedCode } from "../agents/refiner.js";

function buildRetrievalQuery(section, prompt, pageType) {
  return [section, pageType, prompt].join(" ");
}

function fallbackSectionContext(section) {
  const sectionLower = section.toLowerCase();
  const components = componentRegistry.filter(
    (component) =>
      component.name.toLowerCase().includes(sectionLower) ||
      component.description.toLowerCase().includes(sectionLower),
  );
  const patterns = patternRegistry.filter(
    (pattern) =>
      pattern.section.toLowerCase().includes(sectionLower) ||
      pattern.name.toLowerCase().includes(sectionLower),
  );

  return { components, patterns };
}

function sectionFallbackSnippet(section, context) {
  const title = section.replace(/([a-z])([A-Z])/g, "$1 $2");
  const leadPattern = context.patterns[0]
  return [
    `<section className=\"py-16 sm:py-24\">`,
    `  <Container size=\"xl\" padding=\"lg\">`,
    `    <div className=\"space-y-6\">`,
    `      <Text as=\"h2\" className=\"text-3xl font-semibold tracking-tight sm:text-5xl\">${title}</Text>`,
    `      <Text as=\"p\" color=\"muted\" className=\"max-w-2xl text-base sm:text-lg\">${leadPattern?.description ?? `Build the ${title} section with clear hierarchy and strong spacing.`}</Text>`,
    `      <div className=\"flex flex-wrap gap-3\">`,
    `        <Button variant=\"default\">Primary Action</Button>`,
    `        <Button variant=\"outline\">Secondary Action</Button>`,
    `      </div>`,
    `    </div>`,
    `  </Container>`,
    `</section>`,
  ].join("\n");
}

async function buildSectionContext(prompt, plan, section) {
  const query = buildRetrievalQuery(section, prompt, plan.pageType);
  const [retrievedComponents, retrievedPatterns] = await Promise.all([
    searchComponents(query, 8).catch(() => []),
    searchPatterns(query, 4).catch(() => []),
  ]);

  const fallback = fallbackSectionContext(section);
  const components = dedupeStrings([
    ...retrievedComponents.map((component) => component.name),
    ...fallback.components.map((component) => component.name),
  ])
    .map((componentName) => getComponentByName(componentName))
    .filter(Boolean);

  const patterns = dedupeStrings([
    ...retrievedPatterns.map((pattern) => pattern.name),
    ...fallback.patterns.map((pattern) => pattern.name),
  ])
    .map((patternName) => patternRegistry.find((pattern) => pattern.name === patternName))
    .filter(Boolean);

  return {
    section,
    patterns,
    components,
  };
}

function buildImportList(sections) {
  const names = dedupeStrings(
    sections.flatMap((section) => section.context.components.map((component) => component.name)),
  );

  const safeNames = names.filter((name) => getComponentByName(name));

  if (!safeNames.includes("Container")) {
    safeNames.unshift("Container");
  }

  if (!safeNames.includes("Text")) {
    safeNames.push("Text");
  }

  if (!safeNames.includes("Button")) {
    safeNames.push("Button");
  }

  return dedupeStrings(safeNames);
}

function assemblePageCode(sections) {
  const imports = buildImportList(sections);
  const sectionBlocks = sections.map((section) => `      ${section.code.replace(/\n/g, "\n      ")}`);

  return normalizeWhitespace(`
import { ${imports.join(", ")} } from "neuctra-ui";

export default function GeneratedPage() {
  return (
    <main className="bg-background text-foreground">
${sectionBlocks.join("\n\n")}
    </main>
  );
}
`);
}

function buildFallbackPage(sections) {
  return assemblePageCode(
    sections.map((section) => ({
      section: section.section,
      code: sectionFallbackSnippet(section.section, section.context),
      context: section.context,
    })),
  );
}

export async function generateUI(prompt) {
  const plan = await planPage(prompt);
  const sections = [];

  for (const sectionName of plan.sections) {
    const context = await buildSectionContext(prompt, plan, sectionName);
    let code = await generateSectionCode(prompt, [context]);

    if (!code || !code.includes("<")) {
      code = sectionFallbackSnippet(sectionName, context);
    }

    sections.push({
      section: sectionName,
      code,
      context,
    });
  }

  let assembled = assemblePageCode(sections);
  let validation = await validateGeneratedCode(assembled);

  if (validation.issues.some((issue) => issue.severity === "error")) {
    assembled = buildFallbackPage(sections);
    validation = await validateGeneratedCode(assembled);
  }

  const refined = await refineGeneratedCode(validation.code);

  return {
    prompt,
    plan,
    sections,
    code: refined,
  };
}