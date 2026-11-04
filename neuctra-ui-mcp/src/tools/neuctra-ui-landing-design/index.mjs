import { z } from "zod";

const normalize = (text) => ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;

// Deterministic, so one project gets a stable plan while different projects
// that score equally still land on different page shapes.
function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function scoreSignature(signature, text, seed) {
  const matched = signature.bestFor.filter((signal) => text.includes(normalize(signal)));
  // The tie-break stays below 1, so it can never outrank a real match.
  const tieBreak = (hashText(`${seed}:${signature.id}`) % 1000) / 1000;
  return { signature, matched, score: matched.length + tieBreak };
}

const summarize = ({ id, name, job, description, pinned, hasCode }) => ({
  id,
  name,
  job,
  description,
  pinned,
  hasCode,
});

export function planLandingPage(landingDesign, request) {
  const text = normalize(request);
  const slots = [...landingDesign.planSlots];
  const plan = [];
  let lastPinned = false;
  let pinnedCount = 0;

  for (let index = 0; index < slots.length; index += 1) {
    const slot = slots[index];
    const ranked = landingDesign.catalog
      .filter((signature) => signature.slot === slot)
      .map((signature) => scoreSignature(signature, text, request))
      .sort((a, b) => b.score - a.score);
    // Pinned sections are never adjacent, and a page gets two at most.
    const pick = ranked.find(({ signature }) => !signature.pinned || (!lastPinned && pinnedCount < 2));

    if (!pick) continue;
    // An unrequested proof section pushes assistants to invent numbers.
    if (landingDesign.evidenceSlots.includes(slot) && !pick.matched.length) continue;

    lastPinned = pick.signature.pinned;
    pinnedCount += pick.signature.pinned ? 1 : 0;
    plan.push({
      slot,
      ...summarize(pick.signature),
      adapt: pick.signature.adapt,
      why: pick.matched.length
        ? `Matches: ${pick.matched.join(", ")}`
        : "Chosen for variety. Replace it if another signature suits the story better.",
    });

    // Put a calm section next, so the pinned process still has room.
    const process = slots.indexOf("process", index + 1);
    const showcase = slots.indexOf("showcase", index + 1);
    if (lastPinned && process === index + 1 && showcase !== -1) {
      [slots[process], slots[showcase]] = [slots[showcase], slots[process]];
    }
  }

  return plan;
}

export function getLandingGuidance(landingDesign, request) {
  const { catalog, planSlots, evidenceSlots, adaptationNotes, ...guidance } = landingDesign;

  return {
    ...guidance,
    ...(request && {
      recommendedPlan: planLandingPage(landingDesign, request),
      planNote: "A starting point. Reorder, drop, or replace sections so the page follows the product's own story.",
    }),
    catalog: catalog.map(({ id, slot, name, job, pinned, hasCode }) => ({ id, slot, name, job, pinned, hasCode })),
    nextStep: "Call this tool again with signatures set to the ids you chose to get their recipes and source code.",
  };
}

export function getLandingSignatures(landingDesign, landingPatterns, ids, includeFoundation = true) {
  return {
    adaptationNotes: landingDesign.adaptationNotes,
    ...(includeFoundation && { foundation: landingPatterns.foundation }),
    signatures: ids.map((id) => {
      const { bestFor, ...signature } = landingDesign.catalog.find((item) => item.id === id);
      return { ...signature, ...(landingPatterns.signatures[id] && { code: landingPatterns.signatures[id] }) };
    }),
  };
}

export function registerNeuctraUiLandingDesignTool(server, { landingDesign, landingPatterns }) {
  const ids = landingDesign.catalog.map((signature) => signature.id);

  server.registerTool(
    "neuctra-ui-landing-design",
    {
      title: "Design a modern Neuctra UI landing page",
      description:
        "Design impressive landing pages and marketing sites that do not look AI-generated: animated diagrams, scroll-driven workflows, and live product demos. Call first with request to get the design rules, signs of generic AI design, known pitfalls, and a page plan chosen for this product. Then call again with signatures to get working recipes and source code. Use it for landing, home, and marketing pages. Use neuctra-ui-page-builder for application screens.",
      inputSchema: {
        request: z.string().optional().describe("What the product is, who it is for, and what the page should achieve. Used to plan a structure that suits this product."),
        signatures: z.array(z.enum(ids)).optional().describe("Signature ids from the catalog. Returns their recipes and source code instead of the guidance."),
        includeFoundation: z.boolean().optional().describe("With signatures, also return the shared motion code and CSS. Defaults to true. Set false if the project already has them."),
      },
    },
    async ({ request, signatures, includeFoundation }) => {
      const result = signatures?.length
        ? getLandingSignatures(landingDesign, landingPatterns, signatures, includeFoundation)
        : getLandingGuidance(landingDesign, request);

      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    },
  );
}
