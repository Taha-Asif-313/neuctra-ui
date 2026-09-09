# @neuctra/ui-mcp

An MCP server that gives AI coding assistants (Claude Code, Claude Desktop, Cursor,
Antigravity, or anything else that speaks MCP) ground-truth knowledge of the
[`@neuctra/ui`](../neuctra-ui-package) component library, so they write correct code
instead of guessing.

This document explains what that means, why it exists, and how every piece of it works.

---

## 1. The problem this solves

Ask an AI assistant to "build a login form with Neuctra UI" and it has two options:

- **Recall from training data.** If Neuctra UI wasn't in its training set (likely — it's
  a small library), it has nothing to recall. It will pattern-match against libraries it
  *does* know (shadcn/ui, MUI, Chakra) and invent plausible-looking but wrong props —
  `<Input variant="outline" />` when your `Input` has no `variant` prop, or
  `<Button color="blue">` when colors come from `bg-primary`-style tokens, not a `color`
  prop.
- **Read your source files.** Possible, but slow (it has to find and open several
  `.tsx` files), token-expensive, and it still has to reverse-engineer the API from
  implementation code rather than being told it directly.

This package gives it a third option: **ask**. It exposes a small set of tools an AI can
call mid-conversation — "what props does `Select` take?", "what components exist for
forms?", "what color classes should I use?" — and gets back exact, structured answers
generated from your actual TypeScript source. No guessing, no file-spelunking.

---

## 2. How the pieces fit together

```
neuctra-ui-package/src/components/basic/*.tsx     (your actual component source)
        │
        │  npm run registry:generate  (ts-morph reads props/JSDoc/defaults,
        │                               scrapes one example per component
        │                               from neuctra-ui-docs)
        ▼
neuctra-ui-package/registry/components.json        (source of truth)
        │
        │  npm run sync-registry  (plain file copy)
        ▼
neuctra-ui-mcp/data/components.json                 (this package's local copy)
        │
        │  read once at server startup
        ▼
neuctra-ui-mcp/src/server.mjs                        (defines 5 MCP tools over that data)
        │
        │  spoken over stdio (stdin/stdout), JSON-RPC under the hood
        ▼
   Claude Code / Cursor / Antigravity / any MCP client
```

Three independently-regenerable files feed the server:

- **`data/components.json`** — synced from `neuctra-ui-package/registry/components.json`.
  Never edit this by hand; run `npm run sync-registry` after the upstream file changes.
- **`data/theme.json`** — hand-curated from `neuctra-ui-cli/lib/update-css.js` (the CSS
  the setup CLI generates for consumers). Update it manually if the token set changes —
  it doesn't have an automated generator because it also encodes *rules*, not just data:
  the color-token rules ("never hardcode colors"), the anti-AI-look rules ("no
  gradients/shadows/blurs/glows/emoji-icons"), the recommended `@neuctra/ui-cli init`
  setup command, and how the standalone `toast()` API works.
- **`data/aiDesignRules.json`** — also hand-curated, no generator. A 50-section
  product/UX design guide (design philosophy, visual hierarchy, page/sidebar/navigation
  structure, per-component usage guidance, spacing/color/border/radius/shadow
  conventions, responsive design, accessibility, and a final UI quality checklist).
  `theme.json`'s `rules`/`antiAiLookRules` are the mechanical, CSS-level rules; this file
  is the higher-level product-design layer — both are served together by
  `get_design_rules`.

---

## 3. What MCP actually is (30-second primer)

MCP (**M**odel **C**ontext **P**rotocol) is a standard for connecting an AI assistant to
external tools. Three roles:

- **Host** — the AI app itself (Claude Code, Cursor, Antigravity).
- **Client** — the part of the host that manages a connection to one server.
- **Server** — a small program (this package) that exposes **tools** (named actions with
  typed inputs) the AI can decide to call.

The host starts your server as a subprocess and talks to it over **stdio** — your
server's stdout carries JSON-RPC messages, not human-readable logs (that's why
`bin/cli.mjs` prints nothing except protocol traffic; use `console.error`, never
`console.log`, if you ever add debug output). On connect, the client asks "what tools do
you have?", gets back the 5 tool definitions below, and adds them to the AI's available
actions — the same way the tools listed in *this* conversation's system prompt work.
From then on, the AI decides on its own when a tool call would help, calls it, and reads
the result back into its context before continuing.

---

## 4. Recommended workflow

The tools are designed to be called in roughly this order when generating UI, not
grabbed ad hoc:

1. **`get_design_rules`** — call this first, before picking any component. It returns
   the styling rules, the anti-AI-look rules, and the 50-section product/UX guide. This
   shapes *what* to build (hierarchy, when a group actually needs `Card`, when `Modal`
   vs `Drawer`, etc.) before you start reaching for components.
2. **`get_theme`** — call alongside step 1, not instead of it. Tokens without the design
   rules just tell you which colors exist, not how to use them well.
3. **`list_components`** (filtered by category) or **`search_components`** (keyword) —
   confirm which real components exist for what you need. This matters specifically
   because the design guide can describe a *pattern* (e.g. a sidebar nav item) without
   there being a dedicated component for it — don't assume one exists, confirm here.
4. **`get_component`** — full spec for every component before writing code against it.
   Do this every time you touch a component you haven't already pulled specs for in the
   current conversation, not just once at the start. Never guess prop names from memory.
5. **Write the UI**, applying the design rules, the tokens, and the exact props from
   step 4.
6. **Self-check** against the "Final UI Quality Checklist" section (§49, found by
   its `number` field in `productDesignGuide.sections` — not by array index) and
   `antiAiLookRules` from `get_design_rules` before considering the UI
   done — reread them, don't just rely on having read them once at the start.

Steps 1–2 only need to happen once per session/task, not once per component — refetching
`get_theme`/`get_design_rules` for every single component would be wasteful. Step 4 is
the one that repeats for every new component.

---

## 5. The five tools, in detail

### `list_components`

Lists every exported component, optionally filtered to one category. Cheap and compact
(no props) — meant for browsing, not for writing code against.

**Input:** `{ category?: "layout" | "typography" | "form" | "actions" | "data-display" | "feedback" | "overlay" | "navigation" }`

**Example call → response:**
```jsonc
// list_components({ category: "form" })
[
  { "name": "Calendar", "category": "form", "description": "", "propCount": 9 },
  { "name": "Checkbox", "category": "form", "description": "A flexible checkbox component...", "propCount": 29 },
  { "name": "DatePicker", "category": "form", "description": "", "propCount": 15 }
  // ...
]
```

### `get_component`

The main tool. Full spec for exactly one component — every prop's name, TypeScript
type, whether it's required, its default value, its JSDoc description if it has one,
and a real usage snippet. The AI is instructed (via the tool's own description) to call
this before writing code against any component it hasn't already used in the
conversation.

**Input:** `{ name: string }` — exact component name, e.g. `"Input"`, `"CardHeader"`.

**Example call → response** (trimmed):
```jsonc
// get_component({ name: "Button" })
{
  "name": "Button",
  "category": "actions",
  "description": "The Button component is a flexible, highly customizable UI primitive...",
  "props": [
    { "name": "children", "type": "React.ReactNode", "required": false, "default": null,
      "description": "Optional so icon-only buttons are possible — pair with `aria-label`." },
    { "name": "loading", "type": "boolean", "required": false, "default": "false", "description": "" },
    { "name": "variant", "type": "\"default\" | \"outline\" | \"ghost\" | \"secondary\" | \"destructive\" | \"success\" | \"warning\" | \"info\"", "required": false, "default": null, "description": "" }
    // ...
  ],
  "example": "import { Button } from '@neuctra/ui';\n\nfunction BasicExample() {\n  return (\n    <Button onClick={() => console.log('Button clicked')}>\n      Click Me\n    </Button>\n  );\n}"
}
```

If the name doesn't match, it doesn't just fail — it returns an error result with
substring-matched suggestions (e.g. asking for `"Inpu"` suggests `"Input"`), so the AI
can self-correct instead of giving up.

### `search_components`

For when the AI knows what it needs but not the exact name — "date picker", "loading
state", "icon button". Matches against name, category, description, and prop names.

**Example:**
```jsonc
// search_components({ query: "date" })
[
  { "name": "Calendar", ... },
  { "name": "DatePicker", ... },
  { "name": "TagInput", ... }  // matched because it has an "updatedAt"-style prop, etc.
]
```

### `get_theme`

Returns the semantic color token system: the token list itself, a **setup** block
pointing the AI at the `@neuctra/ui-cli` `init` command instead of hand-writing token CSS
or a theme context, and a **toastNote** explaining the standalone `toast()` import.
Without `get_theme`, an AI would happily write `className="bg-blue-500"`, ignoring the
consumer's actual theme. `get_theme` does **not** carry the design/anti-AI-look rules —
see `get_design_rules` below for those; call both together, not one instead of the other.

**Response shape:**
```jsonc
{
  "system": "Tailwind CSS v4, semantic CSS-variable tokens mapped via @theme, toggled by a .dark class...",
  "tokens": [
    { "token": "primary", "className": "bg-primary / text-primary / border-primary",
      "pairsWith": "primary-foreground", "light": "#00c214", "dark": "#00c214",
      "usage": "Brand color: primary buttons, active states, links, focus accents." },
    // ...23 tokens total
  ],
  "note": "Values shown are the CLI-generated defaults...",
  "setup": {
    "recommendedCommand": "npx @neuctra/ui-cli@latest init",
    "whatItDoes": ["Installs @neuctra/ui.", "Checks/upgrades React and Tailwind CSS.", "..."],
    "whenToSuggestIt": "..."
  },
  "toastNote": "@neuctra/ui's toast notification system is a standalone function..."
}
```

### `get_design_rules`

Returns every design rule generated UI must follow, at two levels: the mechanical
**`stylingRules`** (token usage, surface/background conventions, component composition
requirements — e.g. `CardBody` is compulsory whenever `Card` has body content, since
`Card` itself renders no padding — and component-specific gotchas like Dropdown's
trigger already stopping propagation internally) and **`antiAiLookRules`** (no
gradients/shadows/blurs/glows/emoji-icons/em-dashes — the visual tells that make UI read
as AI-generated), plus **`productDesignGuide`** — a 50-section product/UX design guide
covering design philosophy, visual hierarchy, page/sidebar/navigation structure,
per-component usage guidance (when to reach for `Card` vs plain whitespace, `Modal` vs
`Drawer`, `Table` vs `List`, etc.), spacing/color/border/radius/shadow conventions,
responsive design, accessibility, interaction design, and a final UI quality checklist.

Call this before generating any UI — see the recommended workflow above.

**Response shape (trimmed):**
```jsonc
{
  "stylingRules": [
    "Theme colors only, compulsory, no exceptions...",
    "Use the Card component, not a hand-rolled lookalike...",
    // ...9 rules total
  ],
  "antiAiLookRules": [
    "No gradients, compulsory...",
    "No shadows, compulsory...",
    "No blur effects, compulsory...",
    // ...17 rules total
  ],
  "productDesignGuide": {
    "title": "Neuctra UI — AI Design Rules",
    "intro": "You are a senior product designer and frontend UI engineer using `@neuctra/ui`...",
    "sections": [
      { "number": 1, "title": "Core Design Philosophy", "content": "..." },
      { "number": 7, "title": "Cards", "content": "..." },
      // ...50 sections total
    ],
    "goldenRule": { "title": "Golden Rule", "content": "..." }
  }
}
```

---

## 6. Local development

```bash
npm install
npm run sync-registry   # pulls the latest registry.json from neuctra-ui-package
npm start                # runs the server on stdio — it will sit there silently, that's correct
```

`npm start` alone won't show you anything (it's waiting for a client to speak JSON-RPC
to it, not for a human to type at it). To actually exercise it, either wire it into a
real client (section 7) or write a small script using
`@modelcontextprotocol/sdk`'s `Client` + `StdioClientTransport` to spawn `bin/cli.mjs`
and call the tools programmatically — that's how this server was verified while building
it.

---

## 7. Connecting it to a client

All MCP clients use the same JSON shape — the differences are just *where* the config
file lives.

**Claude Code** — project-scoped, via CLI:
```bash
claude mcp add neuctra-ui -- npx -y @neuctra/ui-mcp
```
or by hand in `.mcp.json` at the repo root:
```json
{
  "mcpServers": {
    "neuctra-ui": { "command": "npx", "args": ["-y", "@neuctra/ui-mcp"] }
  }
}
```

**Cursor** — Settings → MCP → "Add new MCP server", or edit `.cursor/mcp.json`
(project) / `~/.cursor/mcp.json` (global) with the same JSON shape as above.

**Antigravity** — Settings → search "MCP" → "Manage MCP Servers" opens a JSON config
using the same `mcpServers` shape (or a form asking for command + args — use `npx` and
`-y @neuctra/ui-mcp`).

**Local development, any client** (before publishing, or to test changes):
```json
{
  "mcpServers": {
    "neuctra-ui": {
      "command": "node",
      "args": ["/absolute/path/to/neuctra-ui-mcp/bin/cli.mjs"]
    }
  }
}
```

Restart the client after editing its config — servers are only launched on startup.

---

## 8. Keeping the registry in sync

The registry is generated, not hand-maintained. Whenever a component's props change:

```bash
cd neuctra-ui-package
npm run registry:generate     # re-parses source, re-scrapes docs examples

cd ../neuctra-ui-mcp
npm run sync-registry         # copies the updated file in
```

`registry:generate` also runs automatically as part of `neuctra-ui-package`'s
`prepublishOnly`, and `sync-registry` runs automatically as part of this package's own
`prepublishOnly` — so a normal `npm publish` in each package keeps things current without
remembering these steps by hand. `data/theme.json` and `data/aiDesignRules.json` are the
two files with no generator; edit them directly — `theme.json` if the token set in
`neuctra-ui-cli/lib/update-css.js` ever changes or a rule needs adding, `aiDesignRules.json`
if the product-design guidance itself needs revising.

---

## 9. Publishing

```bash
npm run sync-registry
npm publish --access public   # --access public is required: scoped packages default to private
```

---

## 10. Project structure

```
neuctra-ui-mcp/
├── bin/
│   └── cli.mjs              # entry point: connects the server to a stdio transport
├── src/
│   └── server.mjs           # defines the 5 tools and their handlers
├── scripts/
│   └── sync-registry.mjs    # copies registry/components.json from neuctra-ui-package
├── data/
│   ├── components.json      # synced (generated) — don't edit by hand
│   ├── theme.json           # hand-curated token + styling/anti-AI-look rules
│   └── aiDesignRules.json   # hand-curated 50-section product/UX design guide
└── package.json
```

---

## 11. Extending it

To add a new tool (e.g. `get_example` returning just the code snippet, or
`list_categories`), open `src/server.mjs` and add another `server.registerTool(...)`
call following the existing pattern: a name, a `title`/`description` (the description is
what the AI reads to decide *when* to call it — be specific), a `zod` input schema, and
an async handler returning `{ content: [{ type: "text", text: ... }] }`. No other file
needs to change — `bin/cli.mjs` just connects whatever `createServer()` returns.
