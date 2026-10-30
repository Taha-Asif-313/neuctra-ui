// Scores the design variants in data/variants.json against a page request so
// the page builder recommends a context-appropriate navigation shell, header,
// stat card and dashboard grid instead of the same default every time.

const normalize = (text) => ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;

// Small deterministic tie-breaker (0..1) so equally-scored variants rotate
// with the request text instead of always resolving to the first entry.
function tieBreak(seed) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 1000) / 1000;
}

function resolvePlatform(request, platform) {
  if (platform !== "responsive") return platform;
  return /\bmobile[ -]?(app|first|only)\b|\bpwa\b/i.test(request) ? "mobile" : platform;
}

function scoreVariant(variant, { text, layoutId, density, platform, seed }) {
  let score = 0;
  const reasons = [];
  for (const signal of variant.signals ?? []) {
    const phrase = normalize(signal);
    if (phrase.trim() && text.includes(phrase)) {
      score += phrase.trim().includes(" ") ? 4 : 3;
      reasons.push(`request mentions "${signal}"`);
    }
  }
  if (variant.layouts?.includes(layoutId)) {
    score += 3;
    reasons.push(`suits the ${layoutId} layout`);
  }
  if (density) {
    if (variant.density?.includes(density)) {
      score += 2;
      reasons.push(`fits ${density} density`);
    } else {
      score -= 1;
    }
  }
  const platforms = variant.platforms ?? [];
  if (platform === "mobile") {
    if (platforms.includes("mobile")) {
      score += 4;
      reasons.push("works on mobile-first products");
    } else {
      score -= 3;
    }
  } else if (!platforms.includes(platform) && !platforms.includes("responsive")) {
    score -= 10;
  }
  return { score: score + tieBreak(`${seed}:${variant.id}`), reasons };
}

const summarize = ({ id, name, bestFor, structure }) => ({ id, name, bestFor, structure });

export function selectDesignVariants(variantData, { request, layoutId, preferences = {} }) {
  const groups = variantData?.groups ?? {};
  const text = normalize(request);
  const platform = resolvePlatform(request, preferences.platform ?? "responsive");
  const overrides = preferences.variants ?? {};
  const selections = {};

  for (const [groupId, group] of Object.entries(groups)) {
    if (!group.appliesTo?.includes(layoutId)) continue;
    const ranked = (group.variants ?? [])
      .map((variant) => ({
        variant,
        ...scoreVariant(variant, { text, layoutId, density: preferences.density, platform, seed: `${request}:${groupId}` }),
      }))
      .sort((a, b) => b.score - a.score);

    const override = overrides[groupId] && ranked.find(({ variant }) => variant.id === overrides[groupId]);
    const chosen = override ?? ranked[0];
    if (!chosen) continue;

    selections[groupId] = {
      title: group.title,
      recommended: {
        ...chosen.variant,
        why: override
          ? ["explicitly requested in preferences.variants"]
          : chosen.reasons.length
            ? chosen.reasons
            : ["no strong context signal; chosen to avoid repeating the default, confirm it fits the brief"],
      },
      alternatives: ranked.filter((entry) => entry !== chosen).slice(0, 2).map(({ variant }) => summarize(variant)),
      otherOptions: ranked.filter((entry) => entry !== chosen).slice(2).map(({ variant }) => variant.id),
    };
  }

  if (!Object.keys(selections).length) return null;
  return {
    principles: variantData.principles ?? [],
    effectivePlatform: platform,
    selections,
  };
}
