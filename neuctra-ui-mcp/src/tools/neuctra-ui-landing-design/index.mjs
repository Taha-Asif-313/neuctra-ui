import { z } from "zod";

const normalize = (text) => ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;

// Deterministic, so one request gets a stable plan while different requests,
// or different variation numbers, land on different page shapes.
function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Keyword matches decide the order. The tie-break only settles equal scores
 * at variation 0. From variation 1 it can outweigh one keyword match, so asking
 * again gives a genuinely different page rather than the same top pick.
 */
function rank(items, text, seed, variation, bonus = () => 0) {
  const spread = variation > 0 ? 1.6 : 0.99;
  return items
    .map((item) => {
      const matched = (item.bestFor ?? []).filter((signal) => text.includes(normalize(signal)));
      const tieBreak = ((hashText(`${seed}:${item.id}`) % 1000) / 1000) * spread;
      return { item, matched, score: matched.length + bonus(item) + tieBreak };
    })
    .sort((a, b) => b.score - a.score);
}

const why = (matched, fallback) => (matched.length ? `Matches: ${matched.join(", ")}` : fallback);

/**
 * Variation 0 takes the best match. Higher variations step through the next
 * strongest options, so a strong keyword match cannot pin every variation to
 * the same choice. Returns the ranking with the pick moved to the front.
 */
function rotate(ranked, variation, depth) {
  if (!variation || ranked.length < 2) return ranked;
  const index = variation % Math.min(depth, ranked.length);
  return [ranked[index], ...ranked.filter((_, position) => position !== index)];
}

function chooseArchetype(landingDesign, text, seed, variation, avoid) {
  const options = landingDesign.archetypes.filter(({ id }) => !avoid.has(id));
  const ranked = rotate(
    rank(options.length ? options : landingDesign.archetypes, text, `${seed}:archetype`, variation),
    variation,
    3,
  );
  const [{ item, matched }] = ranked;
  return {
    archetype: item,
    summary: {
      id: item.id,
      name: item.name,
      story: item.story,
      sequence: item.sequence,
      why: why(matched, "Chosen for variety. Switch if another story suits the product better."),
      alternatives: ranked.slice(1, 3).map(({ item: alt }) => ({ id: alt.id, name: alt.name, sequence: alt.sequence })),
    },
  };
}

function chooseDirection(landingDesign, text, seed, variation, avoid) {
  const { axes } = landingDesign.directions;
  return Object.fromEntries(
    Object.entries(axes).map(([axis, options]) => {
      const allowed = options.filter(({ id }) => !avoid.has(id));
      const ranked = rotate(rank(allowed.length ? allowed : options, text, `${seed}:${axis}`, variation), variation, 2);
      const [{ item, matched }] = ranked;
      const { bestFor, ...choice } = item;
      return [
        axis,
        {
          ...choice,
          why: why(matched, "Chosen for variety."),
          alternatives: ranked.slice(1, 3).map(({ item: alt }) => alt.id),
        },
      ];
    }),
  );
}

const summarize = ({ id, name, job, description, pinned, hasCode, techniques }) => ({
  id,
  name,
  job,
  description,
  pinned,
  hasCode,
  techniques,
});

export function planLandingPage(landingDesign, request, { variation = 0, avoid = [] } = {}) {
  const text = normalize(request);
  const seed = `${request}#${variation}`;
  const avoided = new Set(avoid);
  const { archetype, summary } = chooseArchetype(landingDesign, text, seed, variation, avoided);
  const direction = chooseDirection(landingDesign, text, seed, variation, avoided);
  const prefer = new Set(archetype.prefer ?? []);

  const sequence = [...archetype.sequence];
  const plan = [];
  const used = new Set();
  let lastPinned = false;
  let pinnedCount = 0;

  for (let index = 0; index < sequence.length; index += 1) {
    const slot = sequence[index];
    const candidates = landingDesign.catalog.filter(
      (signature) => signature.slots.includes(slot) && !used.has(signature.id),
    );
    const fresh = candidates.filter(({ id }) => !avoided.has(id));
    // Avoided signatures are only a last resort, so a slot is never left empty.
    const ranked = rank(fresh.length ? fresh : candidates, text, `${seed}:${slot}`, variation, (signature) =>
      prefer.has(signature.id) ? 1 : 0,
    );
    const allowed = rotate(
      ranked.filter(
        ({ item, matched }) =>
          // Pinned sections are never adjacent, and a page gets two at most.
          (!item.pinned || (!lastPinned && pinnedCount < 2)) &&
          // Audience-specific sections, such as a terminal, need a reason.
          (!item.requiresMatch || matched.length > 0 || prefer.has(item.id)),
      ),
      variation,
      2,
    );
    const pick = allowed[0];

    if (!pick) continue;
    // An unrequested proof section pushes assistants to invent numbers.
    if (landingDesign.evidenceSlots.includes(slot) && !pick.matched.length) continue;

    used.add(pick.item.id);
    lastPinned = pick.item.pinned;
    pinnedCount += pick.item.pinned ? 1 : 0;
    plan.push({
      slot,
      ...summarize(pick.item),
      adapt: pick.item.adapt,
      why: prefer.has(pick.item.id)
        ? `Suits the ${archetype.name} story${pick.matched.length ? `; matches: ${pick.matched.join(", ")}` : ""}`
        : why(pick.matched, "Chosen for variety. Replace it if another signature suits the story better."),
      alternatives: allowed.slice(1, 3).map(({ item }) => item.id),
    });
  }

  return {
    archetype: summary,
    direction,
    plan,
    usedIds: [archetype.id, ...Object.values(direction).map(({ id }) => id), ...plan.map(({ id }) => id)],
  };
}

export function getLandingGuidance(landingDesign, request, options = {}) {
  const {
    catalog,
    evidenceSlots,
    adaptationNotes,
    archetypes,
    directions,
    techniques,
    remixRules,
    ...guidance
  } = landingDesign;

  return {
    ...guidance,
    remixRules,
    ...(request && {
      brief: planLandingPage(landingDesign, request, options),
      briefNote:
        "A starting point. Reorder, drop, or replace sections so the page follows the product's own story. Keep usedIds and pass them as avoid when designing another page, or raise variation for a different take on this one.",
    }),
    archetypes: archetypes.map(({ id, name, story, sequence }) => ({ id, name, story, sequence })),
    directionAxes: Object.fromEntries(
      Object.entries(directions.axes).map(([axis, list]) => [axis, list.map(({ id, name }) => ({ id, name }))]),
    ),
    techniques: techniques.map(({ id, name, use }) => ({ id, name, use })),
    catalog: catalog.map(({ id, slots, name, job, pinned, hasCode }) => ({ id, slots, name, job, pinned, hasCode })),
    nextStep:
      "Call this tool again with signatures set to the ids you chose, to get their code or build steps plus the techniques they use. Ask for extra techniques by id with techniques.",
  };
}

export function getLandingTechniques(landingDesign, ids) {
  return landingDesign.techniques.filter(({ id }) => ids.includes(id));
}

export function getLandingSignatures(landingDesign, landingPatterns, ids, { includeFoundation = true, techniques = [] } = {}) {
  const signatures = ids.map((id) => {
    const { bestFor, ...signature } = landingDesign.catalog.find((item) => item.id === id);
    return { ...signature, ...(landingPatterns.signatures[id] && { code: landingPatterns.signatures[id] }) };
  });
  const techniqueIds = [...new Set([...signatures.flatMap((signature) => signature.techniques ?? []), ...techniques])];

  return {
    remixRules: landingDesign.remixRules,
    adaptationNotes: landingDesign.adaptationNotes,
    ...(includeFoundation && { foundation: landingPatterns.foundation }),
    signatures,
    techniques: getLandingTechniques(landingDesign, techniqueIds),
  };
}

export function registerNeuctraUiLandingDesignTool(server, { landingDesign, landingPatterns }) {
  const ids = landingDesign.catalog.map((signature) => signature.id);
  const techniqueIds = landingDesign.techniques.map((technique) => technique.id);

  server.registerTool(
    "neuctra-ui-landing-design",
    {
      title: "Design a modern Neuctra UI landing page",
      description:
        "Design landing pages and marketing sites that do not look AI-generated and do not repeat each other: Framer Motion workflows drawn by scroll, pinned and stacking sections, zoom-through heroes, before-and-after wipes, and live product demos. Call first with request to get the design rules and a brief: a story archetype that sets the page order, a visual direction (composition, type, motion personality, surface), and a section plan. Pass avoid with the usedIds of earlier pages, or raise variation, to get a different page shape. Then call again with signatures to get code or build steps, plus the motion techniques they use. Use it for landing, home, and marketing pages. Use neuctra-ui-page-builder for application screens.",
      inputSchema: {
        request: z.string().optional().describe("What the product is, who it is for, and what the page should achieve. Used to plan a structure that suits this product."),
        variation: z.number().int().min(0).max(50).optional().describe("0 gives the best match. Any other number gives a different archetype, direction, and sections for the same request. Use it when a plan feels familiar."),
        avoid: z.array(z.string()).optional().describe("Archetype, direction, or signature ids to avoid, usually the usedIds from earlier pages, so this page takes a different shape."),
        signatures: z.array(z.enum(ids)).optional().describe("Signature ids from the catalog. Returns their code or build steps and the techniques they use, instead of the guidance."),
        techniques: z.array(z.enum(techniqueIds)).optional().describe("Motion technique ids. Returns their Framer Motion snippets and caveats. Can be combined with signatures."),
        includeFoundation: z.boolean().optional().describe("With signatures, also return the shared motion code and CSS. Defaults to true. Set false if the project already has them."),
      },
    },
    async ({ request, variation, avoid, signatures, techniques, includeFoundation }) => {
      let result;
      if (signatures?.length) {
        result = getLandingSignatures(landingDesign, landingPatterns, signatures, {
          includeFoundation: includeFoundation ?? true,
          techniques: techniques ?? [],
        });
      } else if (techniques?.length) {
        result = { techniques: getLandingTechniques(landingDesign, techniques) };
      } else {
        result = getLandingGuidance(landingDesign, request, { variation: variation ?? 0, avoid: avoid ?? [] });
      }

      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    },
  );
}
