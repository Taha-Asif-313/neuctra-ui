import { z } from "zod";
import { setupNeuctraUi } from "./index.mjs";

export function registerNeuctraUiSetupTool(server, data = {}) {
  server.registerTool(
    "neuctra-ui-setup",
    {
      title: "Analyze or set up a Neuctra UI project",
      description: "Dedicated project setup assistant for @neuctra/ui. Call with action=analyze first: it detects Next.js, Vite React, Remix or React Router. Setup with setupMode=cli runs @neuctra/ui-cli init non-interactively, which installs @neuctra/ui and lucide-react with the project's package manager, configures Tailwind CSS v4 for the bundler, merges the theme tokens into the existing global CSS (keeping the project's own styles, with a .neuctra-backup copy), and wraps the app in ThemeProvider + ToastProvider from @neuctra/ui with a no-flash theme script. setupMode=manual returns the same steps plus the token CSS to paste. Existing matching projects are initialized in place; replacing or clearing a populated directory needs explicit confirmation flags. Static export for Next.js is opt-in (staticExport=true).",
      inputSchema: {
        action: z.enum(["analyze", "setup"]).default("analyze").describe("Always analyze before setup; setup performs the selected workflow."),
        projectPath: z.string().optional().describe("Project directory; defaults to the MCP client's current working directory."),
        framework: z.enum(["nextjs", "vite", "remix", "react-router"]).optional().describe("Framework selected by the user. With no preference, the recommended default is Next.js App Router with TypeScript and Tailwind CSS v4."),
        setupMode: z.enum(["cli", "manual"]).optional().describe("Use the setup CLI workflow, or return manual setup instructions."),
        language: z.enum(["ts", "js"]).optional().describe("TypeScript or JavaScript. Defaults to the project's language, or TypeScript for a new project."),
        primaryColor: z.string().optional().describe("Brand accent as a hex color (e.g. #2563eb). Defaults to the Neuctra green #00c214."),
        staticExport: z.boolean().optional().describe("Next.js only: add output: \"export\" to next.config (merged, not overwritten). Off by default because it disables API routes, server rendering and image optimization."),
        confirmClear: z.boolean().optional().describe("Explicit confirmation to remove files from a populated unrecognized directory before scaffolding."),
        confirmReplace: z.boolean().optional().describe("Explicit confirmation to replace an existing detected framework with a different one."),
      },
    },
    async (input) => {
      try {
        const result = await setupNeuctraUi(input, { theme: data.theme });
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { isError: true, content: [{ type: "text", text: `Neuctra UI setup failed: ${error.message}` }] };
      }
    },
  )
}
