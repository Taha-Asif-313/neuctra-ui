# @neuctra/ui-mcp

Give your AI coding assistant accurate, ready-to-use knowledge of [`@neuctra/ui`](https://www.npmjs.com/package/@neuctra/ui). The Neuctra UI MCP server helps an assistant set up a project, plan pages, find components with their real props, apply Neuctra design rules, and follow framework-specific SEO guidance.

## What you can do

- Set up Neuctra UI in a React project with the guided setup tool.
- Plan a tool page, blog, dashboard, form, store page, and more with the page builder.
- Find the right prebuilt component from a natural-language description and get its exact import, props, and example.
- Retrieve Neuctra UI theme tokens and design rules.
- Get SEO, AEO, and GEO rules with implementation guidance for your framework.
- Design landing pages that feel authored rather than AI-generated, with animated diagrams, scroll-driven workflows, and working source code.

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

1. Ask your assistant to analyze the current project with `neuctra-ui-setup`. Analyze now reports the detected framework, whether Neuctra UI is installed, its declared version, and likely theme files.
2. Use `neuctra-ui-design-from-prompt`. It resolves UX rules first, then selects the layout and real components. The default `sourcePolicy: "neuctra-first"` keeps Neuctra UI as the default source while allowing narrowly scoped fallbacks for returned gaps.
3. Use `output: "code"` when you want a starting JSX skeleton with verified imports, followed by `validate-ui-code` on the generated code. Fix reported errors before presenting the result.
4. If you only need the page recipe, use `neuctra-ui-page-builder`. If you only need component discovery, use `get-neuctra-ui-component`.
5. Use `neuctra-ui-theme-setup` and `get_design_rules` for theme tokens and broader design topics. Component-level composition and usage rules already come with every component search result.
6. For public pages, use `neuctra-ui-seo-setup` with the project’s framework so the assistant can apply the right SEO steps.

The assistant writes the final application code. `output: "code"` supplies a scaffold, not a production-complete page; the design brief, contract, and validator are guardrails for accuracy and consistency.

## Available tools

### `neuctra-ui-setup`

Analyze a project and guide or run Neuctra UI setup.

- First call with `action: "analyze"` to detect the existing framework, project state, `hasNeuctraUi`, `neuctraUiVersion`, and likely `themeFiles`.
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

### `neuctra-ui-design-from-prompt`

One-call orchestration for turning a prompt into an implementable UI plan. It runs strictly in this order:

1. resolves the UX/design rules relevant to the prompt
2. uses those rules plus the prompt to select the best real-world page layout
3. retrieves the real `@neuctra/ui` components and their usage guidance
4. returns the page-builder design brief with variants, motion, and SEO context
5. attaches an `implementationContract`, explicit `neuctraGaps`, and an optional code skeleton

```json
{
  "request": "Build a responsive dashboard with a confirmation modal for deleting records",
  "framework": "auto",
  "detail": "full",
  "limit": 24,
  "guidance": "lean",
  "sourcePolicy": "neuctra-first",
  "output": "code",
  "projectContext": {
    "framework": "nextjs",
    "neuctraUiVersion": "1.0.17"
  }
}
```

The response is ordered as `uxRules` → `layout` → `components` → `designUi`, followed by `implementationContract`, `neuctraGaps`, and optional `codeSkeleton`.

`sourcePolicy` controls how strict the Neuctra priority is:

- `neuctra-first` (default): use Neuctra for everything it covers; fill only explicit gaps with scoped fallbacks.
- `neuctra-only`: forbid other UI libraries and raw control replacements; unsupported needs remain reported gaps.
- `universal`: allow any UI source, but still prefer Neuctra when it has an equivalent component.

`output` controls response size:

- `brief` (default): full design brief and contract.
- `code`: adds a starting JSX skeleton using the returned verified imports.
- `minimal`: compact routing view with rule numbers, layout ID, component names, variants, and contract.

Leave `pageType: "auto"` unless you need to force a specific layout. Use `detail: "full"` when you need every prop and example; the default summaries are cheaper.

### `validate-ui-code`

Check generated code against the Neuctra-first contract. The tool is universal: the same checks are errors in `neuctra-only`, warnings in `neuctra-first`, and informational in `universal`.

```json
{
  "code": "import { Button } from '@neuctra/ui/button';\nexport default function Page() { return <Button>Go</Button> }",
  "sourcePolicy": "neuctra-first",
  "fileName": "app/page.tsx"
}
```

It reports:

- foreign UI library imports
- raw `button`, `input`, `select`, `textarea`, `table`, and `dialog` usage
- unknown Neuctra props
- Neuctra components used without a matching import
- composition problems such as `Modal` without `ModalBody`
- hardcoded hex or Tailwind palette colors
- missing loading/empty/error state markers
- a 0–100 score, `passed`, and `nextAction`

Always fix errors and rerun validation before presenting generated UI.

### `check-neuctra-ui-registry`

Read-only registry freshness report. It never syncs, writes files, or bumps versions.

```json
{
  "upstreamVersion": "1.0.18"
}
```

Returns the local version, component count, search version, rule counts, a short fingerprint, and whether the supplied upstream version is `current`, `needs-review`, or `unknown`. Use it before deciding manually to run `sync-registry`.

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

#### Deep search by layout or family

For "give me every component for X" questions, use `layout` or `family` instead of a free-text `request`. These return the whole component set for an intent, not just a few ranked matches, and include the matched intent, compact summaries, family groupings, and related families.

```json
{ "layout": "forms" }
```

```json
{ "family": "drawer", "detail": "summary" }
```

Available layout IDs: `forms`, `display`, `dialogs`, `data-tables`, `navigation`, `feedback`, `layout`, `actions`, `typography`, `dashboards`, `authentication`, `settings`. For example, `layout: "forms"` returns all form controls plus the card/toast shell and validation feedback; `layout: "dialogs"` returns modals, drawers, dropdowns, popovers, and tooltips; `layout: "display"` returns tables, lists, cards, stats, timelines, and other data views.

Use `family` for a single related group, for example `family: "table"` (Table, TBody, TD, TH, THead, TRow) or `family: "toast"`. Omit both `request` and `layout`/`family` to list every available layout, category, and family.

Set `detail: "full"` to get the raw specs with props and examples instead of summaries; raise `limit` (up to 80) when a layout has many members. The same search is available programmatically as `deepSearchComponents(registry, query, options)` from `@neuctra/ui-mcp/utils/component-search`.

#### Usage guidance comes with the components

Every component result includes a `guidance` object: `useFor` (where and why to use it), `avoid` (common mistakes), `requirements` (compulsory rules such as `CardBody`, Modal scrolling, or form placeholders), and an optional `composition` tree.

The default `guidance: "lean"` mode is token-optimized and still self-contained:

- per-component `rules` are `{ number, title }`
- the full `{ number, title, content }` prose appears **once** in the top-level `designRules` array
- `guidanceBaseline` also uses titles only because those rules are already in `designRules`
- internal `search` metadata and raw `ruleIds` are never exposed

```json
{ "componentName": "Modal" }
```

So one call tells the assistant how to use the component correctly — no `get_design_rules` follow-up is needed.

| Mode | Per-component rules | Top-level `designRules` | Use when |
|---|---|---|---|
| `lean` (default) | `{ number, title }` | full prose once | normal code generation; lowest cost for one-call guidance |
| `full` | `{ number, title, content }` | full prose too | legacy clients that expect duplicated prose |
| `compact` | `{ number, title }` | omitted | you only need selection/API plus short notes |
| `none` | omitted | omitted | pure discovery / minimum context |

Use `get_design_rules` only for broader topics such as UX laws, anti-AI patterns, or landing-page rules.

In the registry, these live in `components[].search.guidance`, `search.layouts[].guidance`, `search.families[].guidance`, `search.guidanceBaseline`, `search.componentRules`, and `search.designRules`. The component-rule prose is generated from `data/component-rules.json`; `data/design-rules.json` no longer needs a `components` block. The server injects `search.componentRules` back into `aiDesignRules.blocks.components` so `get_design_rules` and the page builder still work.

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

### `neuctra-ui-landing-design`

Design landing and marketing pages that do not look AI-generated, and that do not look like each other. Use it in two steps.

First, describe the product. The tool returns the design rules, common signs of generic AI design, known motion pitfalls, and a **brief** for that product:

- **Archetype:** the order of the story, such as *From mess to fixed*, *Follow the work*, *Show the terminal*, or *Help them decide*. There are seven.
- **Direction:** one choice on each of four axes: composition, type, motion personality, and surface.
- **Plan:** a section for each slot in the archetype, with two alternatives each.
- **usedIds:** every id the brief used.

```json
{
  "request": "An open-source API testing tool for backend developers."
}
```

To get a different page shape, pass the `usedIds` from earlier pages as `avoid`, or raise `variation`:

```json
{
  "request": "An open-source API testing tool for backend developers.",
  "avoid": ["developer-first", "terminal-hero", "sideways-pipeline"],
  "variation": 1
}
```

Then request the signatures you want. Coded signatures return their source; recipe signatures return build steps. Both come with the Framer Motion techniques they use, as snippets with caveats, plus the shared motion code and CSS. Set `includeFoundation` to `false` if the project already has the shared code. Use `techniques` on its own to get any technique by id.

```json
{
  "signatures": ["scroll-flowchart", "before-after-wipe"],
  "techniques": ["motion-along-path"]
}
```

The catalog has 29 signatures, 18 with code. They include a drawn workflow with parallel branches, a stacking deck, a fly-in product hero, a before-and-after wipe, self-running feature tabs, a kinetic headline, a live bento grid, and a terminal replay. The technique library has 18 entries, such as scroll-drawn paths, sticky stacks, horizontal tracks, clip-path wipes, layout morphs, travel along a path, and scroll-velocity effects.

The code is a reference, not a template. Follow the `remixRules` so that the page follows your product's own story. For application screens, use `neuctra-ui-page-builder`.

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
