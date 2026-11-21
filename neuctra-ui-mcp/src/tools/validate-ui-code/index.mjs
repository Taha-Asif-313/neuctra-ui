import { z } from "zod";
import { validateUiCode } from "../../utils/code-validation.mjs";
import { SOURCE_POLICIES } from "../../utils/ui-policy.mjs";

export function registerValidateUiCodeTool(server, data) {
  server.registerTool(
    "validate-ui-code",
    {
      title: "Validate generated UI code",
      description:
        "Check generated UI code for Neuctra-first contract violations. Works universally: neuctra-first warns about foreign UI libraries and raw controls, neuctra-only makes them errors, and universal keeps the same checks informational. Also detects unknown Neuctra props, missing imports, composition gaps, and hardcoded colors.",
      inputSchema: {
        code: z.string().min(1).describe("The generated source code to validate."),
        sourcePolicy: z.enum(SOURCE_POLICIES).default("neuctra-first").describe("neuctra-first prefers Neuctra with scoped fallbacks; neuctra-only forbids other UI sources; universal allows any source."),
        fileName: z.string().optional().describe("Optional file name to include in the report."),
      },
    },
    async ({ code, sourcePolicy, fileName }) => ({
      content: [{
        type: "text",
        text: JSON.stringify(validateUiCode(code, { sourcePolicy, fileName, registry: data.registry }), null, 2),
      }],
    }),
  );
}
