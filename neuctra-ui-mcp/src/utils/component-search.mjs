// Deep component search.
//
// Answers intent-level questions instead of doing a flat text scan:
//   - "give me every form component"        -> layout "forms"  / category "form"
//   - "show me display components"          -> layout "display"
//   - "modals and drawers"                  -> layout "dialogs" (both families)
//   - everything in family "table"          -> family "table" (+ related members)
//   - "a responsive product image carousel" -> weighted free-text ranking
//
// It reads the semantic layer written into data/components.json by
// scripts/enrich-search-data.mjs, so the ranking stays in sync with the
// registry instead of hard-coding component lists here.

const STOP_WORDS = new Set([
  "a", "an", "and", "any", "are", "as", "at", "be", "by", "can", "for", "from",
  "has", "have", "i", "in", "into", "is", "it", "its", "of", "on", "or", "our",
  "that", "the", "their", "this", "to", "ui", "use", "used", "using", "with",
]);

function tokens(text) {
  return String(text ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

const normalize = (text) => ` ${String(text ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;
const unique = (values) => [...new Set(values.filter(Boolean))];
const slug = (value) => String(value ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function titleFromId(id) {
  return slug(id).split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
}

function buildIndex(component) {
  const search = component.search ?? {};
  const propsText = (component.props ?? [])
    .map((prop) => `${prop.name} ${prop.description ?? ""} ${prop.type ?? ""}`)
    .join(" ");
  return {
    name: component.name.toLowerCase(),
    category: slug(component.category),
    family: slug(search.family),
    aliases: new Set((search.aliases ?? []).flatMap(tokens)),
    useCases: new Set((search.useCases ?? []).flatMap(tokens)),
    keywords: new Set(search.keywords ?? []),
    haystack: `${component.name} ${component.category} ${component.description ?? ""} ${propsText}`.toLowerCase(),
  };
}

// Public responses use the full rule text embedded in components.json. Raw
// ruleIds stay internal. `lean` and `compact` keep only readable rule titles;
// `lean` still returns the full prose once via the top-level designRules array.
export function publicGuidance(guidance, designRules = {}, mode = "lean") {
  if (!guidance || mode === "none") return null;
  const { ruleIds, rules: embeddedRules, ...rest } = guidance;
  const source = embeddedRules?.length
    ? embeddedRules
    : (ruleIds ?? []).map((id) => designRules[String(id)]).filter(Boolean);
  const rules = source.map((rule) => ({
    number: rule.number,
    title: rule.title,
    ...(mode === "full" && rule.content ? { content: rule.content } : {}),
  }));
  return {
    ...rest,
    ...(rules.length ? { rules } : {}),
  };
}

function summarizeComponent(component, designRules = {}, mode = "lean") {
  const guidance = publicGuidance(component.search?.guidance, designRules, mode);
  return {
    name: component.name,
    import: `import { ${component.name} } from '${component.importFrom}';`,
    category: component.category,
    family: component.search?.family ?? null,
    description: component.description,
    aliases: component.search?.aliases ?? [],
    useCases: component.search?.useCases ?? [],
    ...(guidance ? { guidance } : {}),
    propCount: component.props?.length ?? 0,
  };
}

// Full detail responses should expose the registry spec, not the private
// ranking metadata added by enrichment. Guidance is attached explicitly so
// every mode has one consistent, public shape.
function publicFullComponent(component, designRules = {}, mode = "lean") {
  const { search: _search, ...raw } = component;
  if (mode === "none") return raw;
  const guidance = publicGuidance(component.search?.guidance, designRules, mode);
  return {
    ...raw,
    family: component.search?.family ?? null,
    ...(guidance ? { guidance } : {}),
  };
}

// Multi-query search for orchestration tools. A single prompt can imply several
// UX needs (for example "dashboard", "confirmation", and "records"); ranking
// each need separately prevents one detected layout from hiding the others.
export function searchComponentsByQueries(registry, queries = [], options = {}) {
  const {
    detail = "summary",
    limit,
    guidance = "lean",
  } = options;
  const mode = ["full", "compact", "none", "lean"].includes(guidance) ? guidance : "lean";
  const search = createComponentSearch(registry);
  const textQueries = unique(queries.filter((query) => String(query ?? "").trim()));

  if (!textQueries.length) {
    return {
      query: "",
      intent: { type: "discover" },
      components: [],
      total: 0,
      truncated: false,
    };
  }

  const scored = (registry?.components ?? [])
    .map((component) => {
      let score = 0;
      for (const query of textQueries) {
        score += search.scoreComponent(component, query);
      }
      return { component, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name));

  const total = scored.length;
  const selected = Number.isFinite(limit) && limit > 0 ? scored.slice(0, limit) : scored;
  const designRules = registry?.search?.designRules ?? {};
  const results = selected.map(({ component, score }) => {
    const body = detail === "full"
      ? publicFullComponent(component, designRules, mode)
      : summarizeComponent(component, designRules, mode);
    return {
      ...body,
      ...(detail !== "full" && score > 0 ? { relevance: score } : {}),
    };
  });

  // Keep the same one-time rule resolution contract as deepSearch: full prose
  // is returned once at the top level, never repeated inside each component.
  const ruleIds = new Set();
  for (const { component } of selected) {
    for (const rule of component.search?.guidance?.rules ?? []) ruleIds.add(Number(rule.number));
    for (const id of component.search?.guidance?.ruleIds ?? []) ruleIds.add(Number(id));
  }
  const baseline = registry?.search?.guidanceBaseline ?? {};
  for (const rule of baseline.rules ?? []) ruleIds.add(Number(rule.number));
  for (const id of baseline.ruleIds ?? []) ruleIds.add(Number(id));
  const designRulesResult = mode === "full" || mode === "lean"
    ? [...ruleIds]
      .sort((a, b) => a - b)
      .map((id) => designRules[String(id)])
      .filter(Boolean)
    : [];

  const families = registry?.search?.families ?? {};
  const familyIds = unique(selected.map(({ component }) => component.search?.family).filter(Boolean))
    .filter((id) => selected.filter(({ component }) => component.search?.family === id).length > 1);
  const groups = familyIds.length > 1
    ? familyIds.map((id) => ({
        family: id,
        label: families[id]?.label ?? titleFromId(id),
        components: selected
          .filter(({ component }) => component.search?.family === id)
          .map(({ component }) => component.name),
      }))
    : [];

  return {
    query: textQueries.join(" | "),
    intent: {
      type: "ux-composed",
      queries: textQueries,
    },
    components: results,
    total,
    truncated: total > results.length,
    ...(groups.length ? { groups } : {}),
    ...(mode !== "none" && baseline ? { guidanceBaseline: search.guidanceBaseline(mode) } : {}),
    ...(designRulesResult.length ? { designRules: designRulesResult } : {}),
  };
}

/**
 * Create a reusable searcher over an enriched registry. Building the indexes
 * once keeps repeated calls cheap (the stdio server and HTTP worker both keep
 * the registry around for the lifetime of a process/request).
 */
export function createComponentSearch(registry) {
  const components = registry?.components ?? [];
  const searchData = registry?.search ?? {};
  const categories = searchData.categories ?? {};
  const families = searchData.families ?? {};
  const layouts = searchData.layouts ?? {};
  const synonyms = searchData.synonyms ?? {};
  const designRules = searchData.designRules ?? {};
  const guidanceBaselineRaw = searchData.guidanceBaseline ?? null;

  const byName = new Map(components.map((component) => [component.name.toLowerCase(), component]));
  const index = new Map(components.map((component) => [component.name, buildIndex(component)]));

  function listLayouts() {
    return Object.values(layouts).map(({ id, label, description, categories: cats, families: fams, components: members }) => ({
      id, label, description,
      categories: cats ?? [],
      families: fams ?? [],
      componentCount: members?.length ?? 0,
    }));
  }

  function listCategories() {
    return Object.entries(categories).map(([id, value]) => ({ id, label: titleFromId(id), ...value }));
  }

  function listFamilies() {
    return Object.entries(families).map(([id, value]) => ({ id, ...value }));
  }

  function getRelatedFamilies(familyId) {
    const id = slug(familyId);
    const related = new Set();
    for (const layout of Object.values(layouts)) {
      const members = layout.families ?? [];
      if (!members.includes(id)) continue;
      for (const member of members) if (member !== id) related.add(member);
    }
    return [...related].map((member) => ({
      id: member,
      label: families[member]?.label ?? titleFromId(member),
      componentCount: families[member]?.componentCount ?? 0,
    }));
  }

  // Guidance carries full rule prose per component in components.json, with a
  // deduplicated copy in search.designRules. These helpers strip internal IDs;
  // only explicit `full` mode keeps the prose per component.
  function guidanceFor(component, mode = "lean") {
    return publicGuidance(component?.search?.guidance, designRules, mode);
  }

  function guidanceBaseline(mode = "lean") {
    return publicGuidance(guidanceBaselineRaw, designRules, mode);
  }

  function designRulesFor(matchedComponents = [], extraRuleIds = []) {
    const ids = new Set(extraRuleIds.map(Number).filter(Number.isFinite));
    for (const component of matchedComponents) {
      for (const rule of component?.search?.guidance?.rules ?? []) ids.add(Number(rule.number));
      for (const id of component?.search?.guidance?.ruleIds ?? []) ids.add(Number(id));
    }
    return [...ids]
      .sort((a, b) => a - b)
      .map((id) => designRules[String(id)])
      .filter(Boolean);
  }

  function scoreComponent(component, query, context = {}) {
    const info = index.get(component.name);
    if (!info) return 0;
    let score = 0;

    const raw = String(query ?? "").toLowerCase().trim();
    if (raw) {
      if (info.name === raw) score += 100;
      else if (info.name.includes(raw)) score += 40;
    }
    for (const token of tokens(query)) {
      const terms = unique([token, ...tokens(synonyms[token] ?? "")]);
      for (const term of terms) {
        if (info.name === term) score += 30;
        else if (info.name.includes(term)) score += 12;
        if (info.category === term) score += 10;
        if (info.family === term) score += 10;
        if (info.aliases.has(term)) score += 8;
        if (info.useCases.has(term)) score += 5;
        if (info.keywords.has(term)) score += 3;
        if (info.haystack.includes(term)) score += 1;
      }
    }

    if (context.family && info.family === slug(context.family)) score += 20;
    if (context.category && info.category === slug(context.category)) score += 20;
    return score;
  }

  function detectLayouts(query) {
    if (!String(query ?? "").trim()) return [];
    const text = normalize(query);
    const matches = [];
    for (const layout of Object.values(layouts)) {
      const matched = [];
      let score = 0;
      for (const signal of layout.signals ?? []) {
        if (text.includes(normalize(signal))) {
          matched.push(signal);
          score += String(signal).includes(" ") ? 3 : 2;
        }
      }
      for (const token of tokens(layout.label)) {
        if (text.includes(` ${token} `)) {
          matched.push(token);
          score += 1;
        }
      }
      if (score) matches.push({ layout, score, matched: unique(matched) });
    }
    return matches.sort((a, b) => b.score - a.score || a.layout.id.localeCompare(b.layout.id));
  }

  function resolveComponentName(value) {
    if (!value) return null;
    const key = String(value).toLowerCase().trim();
    return byName.get(key)
      ?? components.find((component) => component.name.toLowerCase().includes(key))
      ?? null;
  }

  /**
   * The main entry point. Every selector is optional; combining them narrows
   * the result. `detail: "full"` returns raw registry entries with props and
   * examples, otherwise compact summaries are returned.
   */
  function deepSearch(query = "", options = {}) {
    const {
      category,
      family,
      layout,
      componentName,
      detail = "summary",
      limit,
      groupBy = "family",
      guidance = "lean",
    } = options;
    const guidanceMode = ["full", "compact", "none", "lean"].includes(guidance) ? guidance : "lean";
    const text = String(query ?? "").trim();
    const hasSelector = Boolean(category || family || layout || componentName || text);

    const facets = {
      layouts: listLayouts(),
      categories: listCategories(),
      families: listFamilies(),
    };

    if (!hasSelector) {
      return {
        query: text,
        intent: { type: "discover" },
        components: [],
        total: 0,
        facets,
      };
    }

    const selectedLayout = layout ? layouts[slug(layout)] ?? layouts[layout] : null;
    const selectedCategory = category ? categories[slug(category)] ?? categories[category] : null;
    const selectedFamily = family ? families[slug(family)] ?? families[family] : null;
    const exactComponent = resolveComponentName(componentName);
    const detected = detectLayouts(text);
    const topLayout = detected[0]?.layout ?? null;

    let match = null;
    let candidateNames = null;

    if (selectedLayout) {
      candidateNames = selectedLayout.components ?? [];
      match = { type: "layout", id: selectedLayout.id, label: selectedLayout.label, description: selectedLayout.description };
    } else if (selectedCategory) {
      candidateNames = selectedCategory.components ?? [];
      match = { type: "category", id: slug(category), label: titleFromId(category), componentCount: selectedCategory.componentCount };
    } else if (selectedFamily) {
      candidateNames = selectedFamily.components ?? [];
      match = { type: "family", id: slug(family), label: selectedFamily.label, componentCount: selectedFamily.componentCount };
    } else if (exactComponent) {
      match = { type: "component", id: exactComponent.name, label: exactComponent.name };
    } else if (topLayout) {
      candidateNames = topLayout.components ?? [];
      match = {
        type: "layout",
        id: topLayout.id,
        label: topLayout.label,
        description: topLayout.description,
        confidence: detected[0].score,
        matchedSignals: detected[0].matched,
      };
    } else {
      match = { type: "text", label: text };
    }

    let ranked;
    if (candidateNames) {
      // "Give me all form components" is a membership query: keep the stable
      // canonical order instead of re-ranking by incidental words in the text.
      ranked = candidateNames
        .map((name) => byName.get(String(name).toLowerCase()))
        .filter(Boolean)
        .map((component) => ({ component, score: 0 }));
    } else if (exactComponent) {
      ranked = [{ component: exactComponent, score: 1000 }];
      for (const name of exactComponent.search?.related ?? []) {
        const related = byName.get(String(name).toLowerCase());
        if (related) ranked.push({ component: related, score: 500, relatedTo: exactComponent.name });
      }
      ranked.sort((a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name));
    } else {
      ranked = components
        .map((component) => ({ component, score: scoreComponent(component, text) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name));
    }

    const total = ranked.length;
    const selected = Number.isFinite(limit) && limit > 0 ? ranked.slice(0, limit) : ranked;
    const results = selected.map(({ component, score, relatedTo }) => {
      const body = detail === "full"
        ? publicFullComponent(component, designRules, guidanceMode)
        : summarizeComponent(component, designRules, guidanceMode);
      return {
        ...body,
        ...(relatedTo ? { relatedTo } : {}),
        ...(detail !== "full" && score > 0 ? { relevance: score } : {}),
      };
    });

    // `full` and `lean` resolve each rule once for the whole result so the
    // caller never has to call get_design_rules after a component search.
    // `lean` keeps per-component rules as { number, title } and avoids
    // repeating the same prose on every hit.
    const extraRuleIds = [
      ...(match.type === "layout" ? layouts[match.id]?.guidance?.ruleIds ?? [] : []),
      ...(match.type === "family" ? families[slug(family)]?.guidance?.ruleIds ?? [] : []),
      ...(selectedLayout?.guidance?.ruleIds ?? []),
      ...(selectedFamily?.guidance?.ruleIds ?? []),
    ];
    const designRulesResult = guidanceMode === "full" || guidanceMode === "lean"
      ? designRulesFor(selected.map(({ component }) => component), extraRuleIds)
      : [];

    // Only group when it actually simplifies the result (several families with
    // more than one member), e.g. modals vs drawers in the dialogs layout.
    const familyIds = unique(selected.map(({ component }) => component.search?.family).filter(Boolean))
      .filter((id) => selected.filter(({ component }) => component.search?.family === id).length > 1);
    const groups = familyIds.length > 1
      ? familyIds.map((id) => ({
          family: id,
          label: families[id]?.label ?? titleFromId(id),
          components: selected
            .filter(({ component }) => component.search?.family === id)
            .map(({ component }) => component.name),
        }))
      : [];

    let relatedFamilies = [];
    if (match.type === "layout") {
      const layout = layouts[match.id];
      relatedFamilies = (layout?.families ?? []).map((id) => ({
        id,
        label: families[id]?.label ?? titleFromId(id),
        componentCount: families[id]?.componentCount ?? 0,
      }));
    } else if (match.type === "family") {
      relatedFamilies = getRelatedFamilies(slug(family));
    } else if (match.type === "component" && exactComponent?.search?.family) {
      relatedFamilies = getRelatedFamilies(exactComponent.search.family);
    }

    return {
      query: text,
      intent: {
        ...match,
        ...(componentName ? { componentName } : {}),
        ...(selectedLayout || topLayout ? { layoutId: selectedLayout?.id ?? topLayout.id } : {}),
      },
      components: results,
      total,
      truncated: total > results.length,
      ...(groups.length && groupBy === "family" ? { groups } : {}),
      ...(relatedFamilies.length ? { relatedFamilies } : {}),
      ...(guidanceMode !== "none" && guidanceBaselineRaw ? { guidanceBaseline: guidanceBaseline(guidanceMode) } : {}),
      ...(designRulesResult.length ? { designRules: designRulesResult } : {}),
      facets: hasSelector ? undefined : facets,
    };
  }

  return {
    deepSearch,
    listLayouts,
    listCategories,
    listFamilies,
    getRelatedFamilies,
    scoreComponent,
    guidanceFor,
    guidanceBaseline,
    designRulesFor,
  };
}

/** Convenience wrapper for callers that only need a single lookup. */
export function deepSearchComponents(registry, query = "", options = {}) {
  return createComponentSearch(registry).deepSearch(query, options);
}
