export const blogContent = {
  "connect-neuctra-ui-to-your-ai-assistant": {
    intro:
      "Neuctra UI MCP gives a compatible coding assistant a structured reference for components, theme guidance, and documented workflows. Choose a local process or a hosted endpoint based on the MCP support in your coding tool.",
    sections: [
      {
        heading: "What the MCP connection provides",
        paragraphs: [
          "The MCP server exposes tools that can list and search components, return component specifications, and provide design and theme guidance. Some tools also help plan pages and review public page SEO.",
          "The MCP server supplies reference information. Your coding assistant and its project tools still handle the conversation and code changes.",
        ],
      },
      {
        heading: "Connect a local stdio server",
        paragraphs: [
          "Use the local package when your coding tool can start MCP processes on your computer. Add this server entry to the tool's MCP configuration, then restart or reload the client.",
        ],
        code: `{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}`,
      },
      {
        heading: "Connect over hosted HTTP",
        paragraphs: [
          "If your tool accepts a remote MCP endpoint, connect it to the hosted server at the URL below. This option does not require you to start a local MCP process.",
        ],
        code: "https://mcp.ui.neuctra.com/mcp",
      },
      {
        heading: "Choose the connection that fits",
        list: [
          "Use local stdio when your client launches local MCP processes or you want to manage that process on your machine.",
          "Use hosted HTTP when your client supports remote MCP connections and you prefer a hosted endpoint.",
          "Check your client's current MCP settings and documentation because connection setup differs between tools.",
        ],
      },
      {
        heading: "Try a focused request",
        paragraphs: [
          "After the server connects, ask the coding assistant to find a component for a specific interface need, check its documented props, and use the theme guidance. Review the result against your project's framework and requirements.",
        ],
      },
    ],
    related: [
      { title: "AI Assistant overview", href: "/docs/ai-assistant" },
      { title: "Local and remote MCP setup", href: "/docs/mcp" },
      { title: "Remote MCP over HTTP", href: "/docs/mcp-http" },
    ],
  },
  "start-a-react-project-with-the-neuctra-ui-cli": {
    intro:
      "The Neuctra UI CLI prepares an existing supported React project with the library and theme setup. Here is what to expect before and after you run it.",
    sections: [
      {
        heading: "Check the project first",
        paragraphs: [
          "Run the CLI from the root of an existing React project. It supports Vite React, Next.js App Router, Remix, and React Router, with JavaScript and TypeScript setup options.",
          "Save any custom styles in the global CSS file the CLI may select. The generated Neuctra theme stylesheet replaces that file, so keep a copy of existing CSS before continuing.",
        ],
      },
      {
        heading: "Run the setup",
        paragraphs: [
          "Start the interactive setup from the project directory and choose the detected framework, language, and primary color, or adjust the selections.",
        ],
        code: "npx @neuctra/ui-cli@latest init",
      },
      {
        heading: "Use noninteractive options",
        paragraphs: [
          "For a script or CI workflow, pass the framework, language, and color explicitly. The yes option accepts detected defaults for any omitted values.",
        ],
        code: "npx @neuctra/ui-cli@latest init --framework=next --language=ts --primary-color=#2563eb --yes",
      },
      {
        heading: "Review the generated setup",
        list: [
          "Confirm the configured global stylesheet is imported by the app.",
          "Check the generated theme context and provider placement.",
          "If your application uses a custom root structure, follow the CLI output and connect providers manually where needed.",
          "Restore your saved custom CSS and verify it alongside the Neuctra theme tokens.",
        ],
      },
      {
        heading: "Start using the components",
        paragraphs: [
          "Import components from @neuctra/ui. Use the component documentation to check exact props and examples before building a new screen.",
        ],
        code: `import { Button, Input } from "@neuctra/ui";

export function SignUpAction() {
  return (
    <form>
      <Input placeholder="Email address" />
      <Button type="submit">Continue</Button>
    </form>
  );
}`,
      },
    ],
    related: [
      { title: "Neuctra UI CLI guide", href: "/docs/cli" },
      { title: "Full manual setup", href: "/docs/full-setup" },
      { title: "Browse components", href: "/docs" },
    ],
  },
  "get-reliable-results-from-component-documentation": {
    intro:
      "Reliable UI work starts by checking the component API and matching it to the user's task. A short discovery routine can prevent guessed props and inconsistent patterns.",
    sections: [
      {
        heading: "Start with the interface need",
        paragraphs: [
          "Describe the interaction or information the screen needs to support. For example, explain that users need to choose a date, filter a table, or confirm a destructive action. A concrete task makes component discovery more useful than searching by visual style alone.",
        ],
      },
      {
        heading: "Find and inspect a component",
        paragraphs: [
          "Search the component catalog by name, category, or use case. Before implementing a component that is new to you, check its required props, optional props, defaults, and real usage example.",
          "Treat the package documentation as the source for the component API. Do not infer prop names from a similarly named component in another library.",
        ],
      },
      {
        heading: "Follow the theme and composition rules",
        list: [
          "Use semantic theme tokens so the configured theme can control component colors.",
          "Keep the component's built-in design unless the page has a specific layout need that requires an override.",
          "Group content only when the grouping helps readers understand the page. Avoid adding panels and decorative elements without a purpose.",
          "Check keyboard, focus, empty, and error states when the component supports interaction.",
        ],
      },
      {
        heading: "Review the result in context",
        paragraphs: [
          "Test the component in the project's framework and responsive layout. Check that the copy, labels, and actions match what users can actually do, and update the examples to fit your application's data and needs.",
        ],
      },
    ],
    related: [
      { title: "Component documentation", href: "/docs" },
      { title: "Neuctra UI design rules", href: "/docs/ai-assistant" },
      { title: "Theme setup", href: "/docs/full-setup" },
    ],
  },
};
