# @neuctra/ui-mcp

Give your AI coding assistant accurate, ready-to-use knowledge of [`@neuctra/ui`](https://www.npmjs.com/package/@neuctra/ui). The Neuctra UI MCP server helps an assistant set up a project, plan pages, find components with their real props, apply Neuctra design rules, and follow framework-specific SEO guidance.

## What you can do

- Set up Neuctra UI in a React project with the guided setup tool.
- Plan a tool page, blog, dashboard, form, store page, and more with the page builder.
- Find the right prebuilt component from a natural-language description and get its exact import, props, and example.
- Retrieve Neuctra UI theme tokens and design rules.
- Get SEO, AEO, and GEO rules with implementation guidance for your framework.

## Install and connect

You do not need to install this package into your app. Add it as an MCP server in your AI coding client; the client runs it with `npx`.

### Claude Code

```bash
claude mcp add neuctra-ui -- npx -y @neuctra/ui-mcp
```

### Cursor

Add this server to your project’s `.cursor/mcp.json` (create the file if needed):

```json
{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}
```

### Other MCP clients

Add a server with command `npx` and arguments `-y`, `@neuctra/ui-mcp`. If your client uses JSON configuration, the server entry is:

```json
{
  "command": "npx",
  "args": ["-y", "@neuctra/ui-mcp"]
}
```

Restart or reload your AI client after changing its MCP settings. On first launch, `npx` downloads the package from npm.

## Recommended workflow

1. Ask your assistant to analyze the current project with `neuctra-ui-setup`.
2. Use `neuctra-ui-page-builder` to plan a page from its goal and user needs.
3. Use the returned component specs and examples to implement the page. For additional component discovery, call `get-neuctra-ui-component`.
4. Use `neuctra-ui-theme-setup` and `get_design_rules` for theme tokens, composition guidance, accessibility, and visual rules.
5. For public pages, use `neuctra-ui-seo-setup` with the project’s framework so the assistant can apply the right SEO steps.

The assistant writes the application code. The page builder supplies a layout plan and verified component guidance; it does not generate an entire page file by itself.

## Available tools

### `neuctra-ui-setup`

Analyze a project and guide or run Neuctra UI setup.

- First call with `action: "analyze"` to detect the existing framework and project state.
- Then call with `action: "setup"` and choose `setupMode: "cli"` or `"manual"`.
- Supported setup frameworks: `nextjs`, `vite`, `remix`, and `react-router`.
- If no framework is specified, Next.js App Router with JavaScript, Tailwind, and static export is the recommended default.
- Existing matching projects are initialized in place. Replacing or clearing files requires explicit confirmation.
- CLI setup runs `npx @neuctra/ui-cli@latest init` and installs `lucide-react`.

Example analyze request:

```json
{
  "action": "analyze"
}
```

Example setup request after selecting Next.js and CLI setup:

```json
{
  "action": "setup",
  "framework": "nextjs",
  "setupMode": "cli"
}
```

### `neuctra-ui-page-builder`

Describe the page and the task it should support. The tool infers a page type, selects a matching layout recipe, and combines it with relevant Neuctra UI component specs, design rules, and framework-aware SEO guidance.

Supported page recipes include tool pages, blog pages, dashboards, landing pages, forms, authentication, settings, data tables, ecommerce, documentation, and custom pages.

```json
{
  "request": "Build an online image compressor with upload, preview, and download steps.",
  "pageType": "auto",
  "framework": "auto"
}
```

Use `pageType: "auto"` to infer the closest specific layout from the request, or choose any layout ID from the grouped catalog in `data/layouts.json`. The catalog covers marketing, SaaS applications, e-commerce, publishing, support, portfolios, communities, events, forms, and system pages. Use `framework: "auto"` to have the assistant identify the project framework, or provide a framework such as `nextjs-app`, `react-vite`, `react-router`, or `remix`.

### `get-neuctra-ui-component`

Find components by describing what the interface needs. Results include the component’s exact package import, full prop definitions, and documented usage example.

```json
{
  "request": "A responsive carousel for product images",
  "limit": 3
}
```

You can also provide an exact `componentName` such as `Container`, `Input`, `Carousel`, `Card`, `Modal`, or `Drawer`. Use `category` to browse a component group (`layout`, `typography`, `form`, `actions`, `data-display`, `feedback`, `overlay`, or `navigation`).

Example component usage:

```jsx
import { Container } from "@neuctra/ui";

function BasicExample() {
  return (
    <Container size="md" center className="bg-zinc-800 p-4 rounded-lg">
      Hello Developer! I am a container.
    </Container>
  );
}
```

Check the returned props and example before using a component. Component APIs can differ from similarly named components in other libraries.

### `neuctra-ui-theme-setup`

Returns the Neuctra UI semantic theme tokens, Tailwind theme mappings, and theme setup guidance. Use these tokens (such as `bg-primary` and `text-foreground`) so components work with the configured light and dark themes. The tool also explains the `toast()` API.

### `get_design_rules`

Returns Neuctra UI’s design guidance, including component composition requirements, theme usage, accessibility, responsive behavior, spacing, hierarchy, and visual consistency. Use it when planning or reviewing an interface. The page builder includes the rules most relevant to its selected page layout.

### `neuctra-ui-seo-setup`

Returns the complete SEO, AEO, and GEO rules and ordered implementation steps. Framework matters: Next.js metadata APIs differ from Vite React, Remix, and React Router. Pass a framework or use `auto` and give the assistant the project context when useful.

```json
{
  "framework": "auto",
  "projectContext": "React Router app using server rendering"
}
```

The guidance covers titles and descriptions, keyword and search intent, heading structure, canonical URLs, robots directives, sitemaps, structured data (JSON-LD), visible FAQs, performance, trust signals, and framework-specific implementation. It is a reference for the assistant; it does not generate a one-off metadata snippet or audit a page.

## Tips for better results

- Describe the page’s purpose and the user’s main task, not just its visual style.
- Mention the framework and router when you know them.
- Include important constraints such as mobile-first layout, primary actions, or existing project conventions.
- Ask the assistant to inspect component specs before writing code with unfamiliar components.
- For public pages, ask it to keep metadata and JSON-LD consistent with content that is actually visible.

## Troubleshooting

**The tools do not appear in my client**

Check that the MCP server entry uses command `npx` with arguments `-y` and `@neuctra/ui-mcp`, then restart or reload the client. Confirm that Node.js and npm are installed and available to the client process.

**The assistant selected the wrong page layout**

Specify `pageType` directly (for example, `tool-page`, `blog-page`, or `dashboard`) and describe the main user task more clearly.

**The assistant is unsure which component to use**

Call `get-neuctra-ui-component` with a concrete need, such as “date input with calendar selection” or “drawer for mobile filters.” Review the returned component names and props before implementation.

**SEO instructions do not match my app**

Pass the actual framework and router, such as `nextjs-app`, `react-vite`, `react-router`, or `remix`. For `auto`, provide relevant project details or ask the assistant to inspect the project configuration first.

## License

MIT
