import { z } from "zod";

export function getDesignRulesContext(theme, aiDesignRules, sectionNumbers) {
  const { rules, antiAiLookRules } = theme;
  if (!sectionNumbers) {
    return { stylingRules: rules, antiAiLookRules, productDesignGuide: aiDesignRules };
  }

  const selected = new Set(sectionNumbers);
  return {
    stylingRules: rules,
    antiAiLookRules,
    productDesignGuide: {
      title: aiDesignRules.title,
      intro: aiDesignRules.intro,
      sections: aiDesignRules.sections.filter((section) => selected.has(section.number)),
      goldenRule: aiDesignRules.goldenRule,
    },
  };
}

export function registerGetDesignRulesTool(server, { theme, aiDesignRules }) {
  server.registerTool(
    "get_design_rules",
    {
      title: "Get Neuctra UI design rules",
      description:
        "Get every design rule generated UI must follow when using @neuctra/ui. Covers two levels: (1) styling rules — token usage, surface/background conventions, component composition requirements like CardBody being compulsory whenever Card has body content, component-specific gotchas like Dropdown's trigger propagation, and the full set of rules for avoiding the visual tells that make UI look AI-generated (gradients, decorative shadows/blurs/glows, emoji-as-icons, etc.); (2) product/UX design rules — a numbered 63-section guide covering design philosophy, visual hierarchy, page/sidebar/navigation structure, per-component usage guidance (when to use Card, Modal vs Drawer, Table vs List, etc.), spacing/color/border/radius/shadow conventions, responsive design, accessibility, interaction design, a final UI quality checklist, the rule against overwriting a component's built-in design, paragraph text color (text-secondary for paragraphs, text-muted-foreground only for metadata/hints), and modern layout guidance: a fixed responsive type scale, readable measure, spacing rhythm, grid and hero patterns, focal point and section variety, a breakpoint checklist, imagery, iconography, motion timing and microcopy. Call this before generating any UI — not just neuctra-ui-theme-setup.",
      inputSchema: {},
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(getDesignRulesContext(theme, aiDesignRules), null, 2),
          },
        ],
      };
    },
  )
}
