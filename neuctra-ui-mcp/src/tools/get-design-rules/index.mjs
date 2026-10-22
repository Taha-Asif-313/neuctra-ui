import { z } from "zod";

const BLOCK_NAMES = [
  "core",
  "layout",
  "components",
  "accessibilityInteraction",
  "modernDesign",
  "antiAiDesignRules",
];

function makeProductDesignRules(aiDesignRules, blockNames, sectionNumbers) {
  const selected = sectionNumbers ? new Set(sectionNumbers) : null;
  return Object.fromEntries(
    blockNames
      .filter((name) => name !== "antiAiDesignRules")
      .map((name) => [
        name,
        (aiDesignRules.blocks?.[name] ?? []).filter((section) => !selected || selected.has(section.number)),
      ])
      .filter(([, sections]) => sections.length),
  );
}

export function getDesignRulesContext(theme, aiDesignRules, sectionNumbers, requestedBlocks) {
  const { rules, antiAiLookRules } = theme;
  const availableBlocks = aiDesignRules.blocks ?? {};
  const requested = requestedBlocks?.length
    ? requestedBlocks
    : sectionNumbers
      ? BLOCK_NAMES.filter((name) => name === "antiAiDesignRules" || (availableBlocks[name] ?? []).some((section) => sectionNumbers.includes(section.number)))
      : ["core", "antiAiDesignRules"];
  const blockNames = [...new Set(requested)];

  return {
    stylingRules: rules,
    antiAiDesignRules: {
      ...(availableBlocks.antiAiDesignRules?.length && { productDesign: availableBlocks.antiAiDesignRules }),
      theme: antiAiLookRules,
    },
    productDesignRules: makeProductDesignRules(aiDesignRules, blockNames, sectionNumbers),
    ...(aiDesignRules.goldenRule && { goldenRule: aiDesignRules.goldenRule }),
  };
}

export function registerGetDesignRulesTool(server, { theme, aiDesignRules }) {
  server.registerTool(
    "get_design_rules",
    {
      title: "Get Neuctra UI design rules",
      description:
        "Return structured Neuctra UI design guidance in focused blocks: core, layout, components, accessibilityInteraction, modernDesign, and antiAiDesignRules. By default returns core guidance and anti-AI rules; request additional blocks when needed. The page builder supplies only the sections relevant to its selected layout.",
      inputSchema: {
        blocks: z.array(z.enum(BLOCK_NAMES)).optional().describe("Named design rule blocks to return. Defaults to core and antiAiDesignRules."),
      },
    },
    async ({ blocks }) => ({
      content: [{
        type: "text",
        text: JSON.stringify(getDesignRulesContext(theme, aiDesignRules, undefined, blocks), null, 2),
      }],
    }),
  );
}
