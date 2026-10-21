import { z } from "zod";
import { setupNeuctraUi } from "./index.mjs";

export function registerNeuctraUiSetupTool(server) {
  server.registerTool(
    "neuctra-ui-setup",
    {
      title: "Analyze or set up a Neuctra UI project",
      description: "Dedicated project setup assistant for @neuctra/ui. It first analyzes the target directory and detects Next.js, Vite React, Remix, or React Router. Call with action=analyze first. Setup calls require an explicit framework and either cli (scaffold/configure using @neuctra/ui-cli, then install lucide-react) or manual (return step-by-step instructions). Existing matching projects are preserved and initialized in place. Replacing or clearing populated directories requires explicit confirmation flags; this tool never cleans a directory during analysis.",
      inputSchema: {
        action: z.enum(["analyze", "setup"]).default("analyze").describe("Always analyze before setup; setup performs the selected workflow."),
        projectPath: z.string().optional().describe("Project directory; defaults to the MCP client's current working directory."),
        framework: z.enum(["nextjs", "vite", "remix", "react-router"]).optional().describe("Framework selected by the user. With no preference, the recommended default is Next.js App Router, JavaScript, Tailwind, and static export."),
        setupMode: z.enum(["cli", "manual"]).optional().describe("Use the setup CLI workflow, or return manual setup instructions."),
        confirmClear: z.boolean().optional().describe("Explicit confirmation to remove files from a populated unrecognized directory before scaffolding."),
        confirmReplace: z.boolean().optional().describe("Explicit confirmation to replace an existing detected framework with a different one."),
      },
    },
    async (input) => {
      try {
        const result = await setupNeuctraUi(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { isError: true, content: [{ type: "text", text: `Neuctra UI setup failed: ${error.message}` }] };
      }
    },
  )
}
