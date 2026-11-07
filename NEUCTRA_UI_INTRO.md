# Introducing Neuctra UI

### Build polished React apps faster, and give your AI coding assistant the knowledge to build them properly.

Neuctra UI is a free, open-source toolkit for building websites and web apps. It has four parts that work together:

- **A component library** with ready-made buttons, forms, tables, popups, and more.
- **A one-command setup tool** that prepares your project for you.
- **An AI connector** that gives coding assistants like Claude Code and Cursor accurate knowledge, design rules, and page plans.
- **A documentation website** with live examples of every component.

Most UI libraries only give you the components. Neuctra UI also helps you set up your project, plan your pages, follow good design, make pages easy to find in search, and work well with AI assistants.

> **In one sentence:** Neuctra UI turns "we need to build an app" into "we're assembling an app", whether a developer or an AI assistant writes the code.

---

## Contents

1. [The 30-second version](#the-30-second-version)
2. [The problem every web project runs into](#the-problem-every-web-project-runs-into)
3. [How Neuctra UI solves it](#how-neuctra-ui-solves-it)
4. [Part 1: The component library](#part-1-the-component-library)
5. [Part 2: The setup tool (CLI)](#part-2-the-setup-tool-cli)
6. [Part 3: The AI connector (MCP)](#part-3-the-ai-connector-mcp)
7. [Part 4: The documentation website](#part-4-the-documentation-website)
8. [Watch it work: from idea to screen](#watch-it-work-from-idea-to-screen)
9. [What you get, by who you are](#what-you-get-by-who-you-are)
10. [How it compares](#how-it-compares)
11. [Being honest: what it does not do](#being-honest-what-it-does-not-do)
12. [Get started](#get-started)
13. [Questions people ask](#questions-people-ask)
14. [Word guide for non-technical readers](#word-guide-for-non-technical-readers)

---

## The 30-second version

**For non-technical readers:** Think of building a website like building a house. Most teams start by making their own bricks, doors, and windows before they can build anything. Neuctra UI gives you those parts already made, already matching, and already tested. It also gives your builders, whether they are people or AI assistants, the plans and building rules. You decide what to build and spend your time and money on what makes your product unique.

**For technical readers:** `@neuctra/ui` is a TypeScript React component library built on Tailwind CSS v4 semantic tokens, with class-based dark mode and ESM and CommonJS builds. `@neuctra/ui-cli` sets up Vite React, Next.js App Router, Remix, or React Router projects in one command. `@neuctra/ui-mcp` is a Model Context Protocol server with seven tools that give AI assistants the real component registry, including props, defaults, and examples, plus a 49-layout page planner, design rules, theme tokens, landing page recipes, and SEO, GEO, and AEO guidance. It runs locally over stdio or remotely over Streamable HTTP. The license is MIT.

### At a glance

| | |
|---|---|
| **Components** | 52 components, made up of 79 named, importable parts |
| **Setup time** | One command, with a few prompts |
| **Supported frameworks** | Vite React, Next.js, Remix, React Router (JavaScript or TypeScript) |
| **AI tools for assistants** | 7 dedicated MCP tools |
| **Page layout recipes** | 49 recipes across 11 industries and page types |
| **Landing page design** | 29 animated sections (18 with source code), 7 story archetypes, 18 motion techniques |
| **Themes** | Light and dark built in, with brand color changes in one place |
| **Price** | Free (MIT license, commercial use allowed) |

*Figures checked against the codebase on 7 November 2026: `@neuctra/ui` 1.0.16, `@neuctra/ui-cli` 0.1.15, `@neuctra/ui-mcp` 0.4.10.*

---

## The problem every web project runs into

Almost every website and web app needs the same things: buttons, sign-up forms, tables, popups, menus, notifications, loading screens, and dark mode. Every team rebuilds them, and the same problems come back each time.

### 1. Time and money go into parts nobody notices

A date picker, a popup window that traps keyboard focus correctly, or a table that works on a phone can each take days to build well. None of this work makes your product different. It only gets you to the starting line.

### 2. Apps start to look patched together

Buttons on one page don't match the buttons on another. Spacing changes from screen to screen. Dark mode works in some places and not others. Users notice, even when they can't explain what feels wrong, and trust drops.

### 3. Small details get forgotten

Loading states, empty screens, error messages, keyboard support, and mobile layouts are often left until the end, and then dropped when a deadline arrives.

### 4. Setup is slow and confusing

Before any real work starts, someone has to install packages, configure styles, set up colors, wire up dark mode, and connect everything to the framework. This can take hours, and it is easy to get wrong.

### 5. AI assistants guess

AI coding assistants are fast, but they often *invent* things. They use component names that don't exist, pass the wrong options, and produce designs that look obviously AI-made: purple gradients, glowing blobs, and the same three feature cards on every page. You save time writing code, then lose it fixing that code.

### 6. Good-looking pages that nobody finds

A page can look great and still be invisible to Google, and to AI answer tools such as ChatGPT and Perplexity, if titles, descriptions, and structured data are missing.

---

## How Neuctra UI solves it

Neuctra UI addresses each of those problems with a specific part of the toolkit:

| The problem | The Neuctra UI answer |
|---|---|
| Rebuilding the same parts | **52 ready-made components** to assemble instead of build |
| Inconsistent look | **One shared design system.** Every component uses the same colors, spacing, and theme. |
| Forgotten details | Skeletons, spinners, empty states, notices, and toasts are **included components** |
| Slow setup | **One command** (`npx @neuctra/ui-cli init`) sets up the library, theme, and dark mode |
| AI that guesses | **An AI connector** that gives assistants real component details, plus design rules against the "AI look" |
| Pages nobody finds | **Built-in SEO, GEO, and AEO guidance** for search engines and AI answer tools |

```
        ┌──────────────────────────────────────────────────────┐
        │                      NEUCTRA UI                      │
        ├──────────────┬──────────────┬──────────────┬─────────┤
        │  Component   │  Setup tool  │ AI connector │  Docs   │
        │   library    │    (CLI)     │    (MCP)     │ website │
        │              │              │              │         │
        │ The bricks   │ Prepares the │ Gives AI the │ Shows   │
        │              │ building site│ plans & rules│ how     │
        └──────┬───────┴──────┬───────┴──────┬───────┴────┬────┘
               │              │              │            │
               ▼              ▼              ▼            ▼
          Developers      New & existing   Claude Code,  Everyone
          write code      React projects   Cursor & other
                                           MCP-capable tools
```

You can use one part, two parts, or all four.

---

## Part 1: The component library

**Package:** `@neuctra/ui`

A *component* is a ready-made piece of a screen, such as a button, a calendar, or a popup. Neuctra UI includes 52 of them. Larger components are split into parts. For example, a Modal has a header, body, and footer that you arrange yourself. In total, the library has 79 named parts you can import.

### Everything included

| Group | Components | Used for |
|---|---|---|
| **Page structure** | Container, Card, Divider | Arranging pages into clean sections |
| **Text and media** | Text, Image, Avatar, AvatarGroup, Badge, Chip, Kbd | Headings, pictures, profile photos, labels, keyboard hints |
| **Forms and input** | Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, NumberInput, TagInput, PinInput, Rating, FileUpload, DatePicker, TimePicker, Calendar, Toggle, ToggleGroup | Sign-up forms, settings, checkout, search, booking, reviews, one-time codes |
| **Buttons and actions** | Button, IconButton, CopyButton, ThemeToggleButton | Every click, including copy-to-clipboard and light/dark switching |
| **Showing information** | Table, List, Stat, Timeline, Carousel, Accordion | Dashboards, reports, product galleries, FAQs, activity feeds |
| **Feedback** | Toast notifications, Callout, Progress, Spinner, Skeleton, EmptyState | Telling users what is happening, what went wrong, and what to do next |
| **Popups and overlays** | Modal, Drawer, Dropdown, Popover, Tooltip | Confirmations, side panels, menus, help text |
| **Navigation** | Tabs, Pagination, Breadcrumb, Stepper | Moving between sections, pages, and multi-step flows |

### Quality built in

These are features you would otherwise have to build and test yourself.

- **Dark mode everywhere.** Every component supports light and dark themes, controlled by one switch.
- **Change your brand in one place.** Colors are *design tokens*, which are named values such as `primary`, `background`, and `card`. Change the primary color once and every button, link, focus ring, and highlight in the app updates.
- **Accessibility support.** Modal and Drawer keep keyboard focus inside the open window and stop the page from scrolling behind it. Most components include proper accessibility attributes, so screen readers and keyboard users can use them.
- **Works on every screen size.** The components are designed for phones, tablets, and desktops.
- **TypeScript types.** Every component and option is fully typed, so code editors can autocomplete and catch mistakes before they reach users.
- **Easy notifications.** Show a notification from anywhere in your app with one line: `toast.success("Saved!")`.
- **Fits into modern projects.** The library ships ES module and CommonJS builds and works with React 18 and 19.

### What the code looks like

For developers, the code is short and easy to read:

```tsx
import { Card, Text, Input, Button, toast } from "@neuctra/ui";

export function NewsletterSignup() {
  return (
    <Card>
      <Text as="h2">Join the newsletter</Text>
      <Input label="Email address" type="email" placeholder="you@company.com" />
      <Button onClick={() => toast.success("You're subscribed!")}>Subscribe</Button>
    </Card>
  );
}
```

For non-technical readers, this example creates a card with a heading, an email box, and a button. When someone clicks the button, a success notification appears. The library handles the styling, dark mode, and mobile layout.

---

## Part 2: The setup tool (CLI)

**Package:** `@neuctra/ui-cli`

Setup is often the least enjoyable part of a project. Neuctra UI reduces it to one command:

```bash
npx @neuctra/ui-cli init
```

The tool asks three questions:

1. **Which framework?** Vite React, Next.js, Remix, or React Router. It detects your framework and suggests it.
2. **Which language?** JavaScript or TypeScript. It detects this too.
3. **Which brand color?** Neuctra Green, Blue, Violet, Rose, Amber, Teal, or any custom color.

Then it:

- Installs the component library
- Checks that React and Tailwind CSS are present
- Writes the complete theme stylesheet with light and dark colors
- Creates the theme system that saves each user's light or dark choice
- Connects that theme system to your app's starting file, based on your framework

### Before and after

| Without the CLI | With the CLI |
|---|---|
| Read installation guides | One command |
| Hand-write dozens of color variables for light and dark | Generated for you |
| Build a dark mode system and save the user's choice | Generated for you |
| Work out where to connect it in each framework | Done automatically for four frameworks |
| Usually hours | Usually a few minutes |

For automated pipelines (CI), every question can also be answered upfront:

```bash
npx @neuctra/ui-cli init --framework=next --language=ts --primary-color=#2563eb --yes
```

---

## Part 3: The AI connector (MCP)

**Package:** `@neuctra/ui-mcp` · **Hosted address:** `https://mcp.ui.neuctra.com/mcp`

This part sets Neuctra UI apart from most component libraries.

### The problem with AI assistants today

When you ask an AI assistant to "build a dashboard with Library X", it relies on whatever it remembers from training. That memory may be out of date, incomplete, or wrong. The result is code that looks right and fails, or a page that clearly looks AI-made.

### The Neuctra UI answer

*MCP (Model Context Protocol)* is an open standard that lets AI assistants look things up in outside tools while they work. Once Neuctra UI is connected, the assistant can **check the real details before writing code**.

It has seven tools:

| Tool | What it does for the AI | Why it matters to you |
|---|---|---|
| **Project setup** | Checks your project folder, detects the framework, and sets up Neuctra UI with the CLI or manual steps. It never deletes existing work without explicit confirmation. | Setup is safe and correct |
| **Component finder** | Matches a plain-language need, such as "a dismissible confirmation dialog", to real components with exact imports, every option, and working examples | No invented components and no broken code |
| **Page builder** | Picks the right layout from **49 real-world recipes**, then returns matching components, design variants, animation presets, and SEO advice | The AI plans before it builds |
| **Design rules** | Gives the AI senior-designer guidance on layout, accessibility, interaction, and modern design, plus specific rules that prevent the "AI look" | Results look designed, not generated |
| **Theme setup** | Returns the exact color tokens and light and dark mappings | Colors stay consistent with your brand |
| **Landing page designer** | Gives each product its own story, visual direction, and section plan, then provides **29 animated sections** and **18 motion techniques** with working code | Landing pages that stand out and don't repeat each other |
| **SEO setup** | A structured SEO process: inspect, audit, prioritize, implement, validate, and report. It covers technical SEO, on-page SEO, local SEO, GEO, and AEO. | Pages that search engines and AI answer tools can find and understand |

### The 49 page recipes

The page builder knows how real products are structured across 11 groups:

| Group | Recipes |
|---|---|
| SaaS and application | 11 |
| E-commerce | 7 |
| General and system pages (such as 404 and settings) | 7 |
| Marketing and sales | 6 |
| Publishing and content | 5 |
| Documentation and support | 4 |
| Portfolio and agency | 3 |
| Community and membership | 2 |
| Events and education | 2 |
| Forms and workflows | 1 |
| Tools and utilities | 1 |

### Dashboards that don't all look the same

Most AI-built dashboards look identical: a sidebar, four stat cards labeled "Total Users / Revenue / Orders / Growth", and a grid. Neuctra UI's **design variants** score options for the navigation shell, page header, stat cards, and dashboard body against your request. A clinic dashboard should show appointments and wait times. A SaaS dashboard should show monthly recurring revenue (MRR) and churn. The rules require content to come from **your** domain, not generic placeholders.

### Rules against the "AI look"

Neuctra UI includes clear rules that keep AI output from looking generic. For example:

- **No off-brand colors.** Gradients and glows may only use your theme colors, so changing the theme changes everything.
- **Restrained gradients.** No more than one gradient heading per screen, and never on buttons or body text.
- **No heavy shadows** on cards and buttons. Borders, background changes, and spacing separate content.
- **No vague headlines** such as "Supercharge your workflow". Headlines must say something only your product can say.
- **No decorative particles or floating orbs.** Motion should show the product doing something useful.

The core design principle the AI follows:

> *"Don't ask which components can I put on this page. Ask what the user needs to understand and do, and which component communicates that most naturally. The best interface is not the one that uses the most components. It is the one where every component has a purpose."*

### Landing pages with a clear idea

Most AI tools give every product the same landing page. Neuctra UI starts each page with a short **brief**:

- **A story archetype** that sets the order of the page, such as *From mess to fixed*, *Follow the work*, *Show the terminal*, or *Help them decide*.
- **A visual direction** that sets the composition, type, motion personality, and surface style.
- **A section plan** chosen for that product.

When you build another page, the tool can avoid everything the last page used, so the next one has a genuinely different shape.

The sections are built with Framer Motion. They include:

- A **workflow drawn by scroll**, with a moving packet and branches that run in parallel
- A **stacking deck** of feature cards
- A **fly-in hero**, where the camera zooms into the product
- A **before-and-after wipe** that visitors can drag
- **Self-running feature tabs** and a **kinetic headline**
- A **live bento grid** and a **terminal replay**

There is also a library of 18 motion techniques that assistants combine into new sections. Every section shows what the product does instead of relying on decoration.

### SEO for search engines and AI answers

The SEO tool covers:

- **SEO:** Ranking on Google and Bing, including titles, descriptions, sitemaps, and structured data
- **GEO (Generative Engine Optimization):** Being cited by AI tools such as ChatGPT, Perplexity, and Google AI Overviews
- **AEO (Answer Engine Optimization):** Being the direct answer to a user's question
- **Local SEO:** Being found by nearby customers

It starts with a read-only audit, so nothing changes until you decide what to fix. It focuses on useful content and accessibility, not ranking tricks.

### Two ways to connect

**Run it on your computer:**

```bash
claude mcp add neuctra-ui -- npx -y @neuctra/ui-mcp
```

**Or use the hosted server, with nothing to install:**

```bash
claude mcp add --scope user neuctra-ui --transport http https://mcp.ui.neuctra.com/mcp
```

It works with any AI tool that supports MCP, including Claude Code, Cursor, and others. **You are not locked into one AI vendor.**

The design rules and SEO guidance are also useful for projects that don't use Neuctra UI components.

---

## Part 4: The documentation website

**Website:** [ui.neuctra.com](https://ui.neuctra.com)

- **A page for every component**, with live interactive examples and copy-ready code
- **Full setup guide** for every supported framework
- **Layout playground** for trying page structures
- **AI assistant and MCP guides** for both local and hosted connections
- **Blog** with articles and tutorials
- **An `llms.txt` file**, so AI tools can read and understand the documentation. The website follows the same GEO practices it teaches.

---

## Watch it work: from idea to screen

Here is a realistic example. A founder needs an analytics dashboard for a clinic-booking product.

**With an AI assistant connected to Neuctra UI:**

1. The founder writes: *"Build a dashboard for clinic managers showing today's appointments, no-shows, and average wait time, with a table of upcoming bookings."*
2. The assistant calls the **page builder**. It selects the closest SaaS dashboard recipe, chooses a navigation shell and stat-card style suited to an operations user, and gathers the right components.
3. The assistant calls the **component finder** to get the exact options for `Stat`, `Table`, `Badge`, and `Tabs`, so it doesn't guess.
4. It follows the **design rules**: real clinic metrics instead of "Total Users", theme colors only, and clear empty and loading states.
5. The founder gets a working, consistent, dark-mode-ready page and asks for adjustments in plain language.

**Without Neuctra UI,** the same request often produces invented components, generic placeholder numbers, mismatched colors, and an hour of fixes.

---

## What you get, by who you are

### Business owners and founders

- **Launch faster.** Teams spend less time rebuilding common parts and more time on the product.
- **Spend less.** Fewer development hours go into parts that don't make your business different. The toolkit itself costs nothing.
- **Look professional from day one.** Consistent design builds trust with customers and investors.
- **Get more from AI.** If your team uses AI assistants, their output becomes more accurate and needs less rework.
- **Be easier to find.** SEO and AI-answer guidance is included.
- **Low risk.** The MIT license allows commercial use with no fees and no vendor lock-in.

### Developers

- **Stop rebuilding the same parts.** Focus on business logic, data, and features.
- **Set up in minutes.** One command covers four frameworks, and you can run it without prompts in CI.
- **Typed, predictable components** with readable, nested building blocks such as `Modal`, `ModalHeader`, `ModalBody`, and `ModalFooter`.
- **Themes that work with your styling.** Semantic Tailwind v4 tokens and class-based dark mode, with no extra theme engine to learn.
- **Accessibility support included** in overlays: focus trapping and scroll locking.

### Product teams and agencies

- **One design system across products and pages.** New team members can contribute without reinventing the style.
- **Rebrand per client** by changing the token values while reusing the same foundation.
- **Design and SEO rules your AI tools follow**, so every team member, and every AI assistant, works to the same standard.

### People building with AI

- **Fewer made-up components.** The assistant reads the real registry before writing code.
- **Pages that don't look AI-generated,** guided by the anti-AI-look rules and design variants.
- **A plan before code.** The page builder chooses a structure before the assistant writes code.
- **Works with your preferred AI tool,** including Claude Code, Cursor, and other MCP-capable clients.

### Students and learners

- **Learn by building real things.** Recreate real-world layouts such as dashboards, stores, and pricing pages using 49 recipes.
- **See professional patterns.** Accessibility, theming, and component composition are shown in working code.
- **Free forever.**

---

## How it compares

| Approach | Good for | Trade-off |
|---|---|---|
| **Building everything yourself** | Full control | Slowest, most expensive, and quality depends on the team |
| **Website builders (Wix, Squarespace)** | Simple sites with no code | Harder to build custom apps, limited flexibility, platform lock-in |
| **Traditional component libraries** | Developers who want ready-made parts | Usually components only. Setup, page planning, design rules, SEO, and AI support are left to you. |
| **Neuctra UI** | React apps built by developers, AI assistants, or both | Requires React and Tailwind CSS. It is newer, with a smaller community than long-established libraries. |

**Where Neuctra UI stands out:** It is designed for the way software is built today, with people and AI working together. The components, setup tool, AI knowledge, design rules, and SEO guidance all come from one source and stay in sync. Before each release, the component registry the AI reads is regenerated directly from the library's source code.

---

## Being honest: what it does not do

Setting clear expectations matters, so here are the limits:

- **It is not a no-code website builder.** You need a React project and either a developer or an AI coding assistant.
- **It does not build your whole app.** It provides the interface. Your data, accounts, payments, and business rules still come from your app or other services. For example, it provides login *screens*, not the login *system*.
- **It is for React.** It won't work directly with WordPress, Vue, Angular, or plain HTML. The design and SEO guidance still apply to those projects.
- **It needs Tailwind CSS**, a widely used styling tool.
- **The setup tool replaces your main stylesheet.** If you have custom styles, save a copy before running it.
- **No one can guarantee search rankings.** The SEO guidance improves your chances, but it cannot promise a position on Google or a citation in an AI answer.
- **AI output still needs human review.** Neuctra UI makes AI output much more accurate, but people should still check it.

---

## Get started

### Path A: you or your developer write the code

```bash
# 1. In your React project
npx @neuctra/ui-cli init

# 2. Use components
import { Button } from "@neuctra/ui";
```

Then browse [ui.neuctra.com/docs](https://ui.neuctra.com/docs) and start building.

### Path B: an AI assistant writes the code

```bash
# 1. Connect Neuctra UI to your AI tool (hosted, nothing to install)
claude mcp add --scope user neuctra-ui --transport http https://mcp.ui.neuctra.com/mcp
```

2. Ask in plain language: *"Set up Neuctra UI in this project and build a pricing page for my product."*
3. Review the result and ask for changes.

### Path C: both

Most teams combine both paths. The developer sets up the foundation and important logic, and the AI assistant builds screens quickly from accurate information.

---

## Questions people ask

**Is it really free?**
Yes. It uses the MIT license, which allows free personal and commercial use, modification, and redistribution.

**Can I use it for client work or a commercial product?**
Yes. The MIT license allows commercial use.

**Do I need to know how to code?**
Basic coding knowledge helps. With an AI assistant connected, you can describe what you want in plain language, but someone should still set up and review the project.

**Which frameworks are supported?**
Vite React, Next.js (App Router), Remix, and React Router, in JavaScript or TypeScript. It requires React 18 or later.

**Can it match my brand?**
Yes. Choose a preset color or any custom color during setup. You can also change the tokens later and restyle individual components.

**Which AI tools can use it?**
Any tool that supports MCP, including Claude Code and Cursor. You can run it locally or use the hosted server.

**Is it maintained?**
Yes. Neuctra UI has been under active development since October 2025, with more than 140 commits. All three packages are published on npm, and the main library had about 1,150 downloads in the 30 days up to 3 November 2026.

**Who made it?**
Neuctra UI was created by **Taha Asif** and is part of the wider Neuctra ecosystem.

---

## Word guide for non-technical readers

| Word | Plain meaning |
|---|---|
| **UI (user interface)** | Everything people see and use on a screen |
| **Component** | A reusable piece of a screen, such as a button or a form |
| **Component library** | A collection of ready-made components |
| **Design system** | Shared rules and parts that keep a product looking consistent |
| **Design tokens** | Named colors and values that are changed in one place to update the whole app |
| **React** | One of the most popular technologies for building web apps |
| **Tailwind CSS** | A popular tool for styling websites |
| **Framework** | A foundation for building apps, such as Next.js |
| **CLI** | A tool you use by typing a command |
| **MCP** | An open standard that lets AI assistants use outside tools and knowledge |
| **AI coding assistant** | An AI that writes code from plain-language requests, such as Claude Code or Cursor |
| **SEO** | Making pages easy to find on search engines |
| **GEO / AEO** | Making content easy for AI tools to find, cite, and use as a direct answer |
| **Accessibility** | Making apps usable for everyone, including keyboard and screen reader users |
| **Open source / MIT license** | Public code that anyone can use for free, including in commercial products |
| **npm** | The main online registry for JavaScript packages |

---

## Links

- **Website and docs:** [ui.neuctra.com](https://ui.neuctra.com)
- **Start here:** [ui.neuctra.com/docs](https://ui.neuctra.com/docs)
- **AI assistant guide:** [ui.neuctra.com/docs/ai-assistant](https://ui.neuctra.com/docs/ai-assistant)
- **MCP setup:** [ui.neuctra.com/docs/mcp](https://ui.neuctra.com/docs/mcp)
- **Blog:** [ui.neuctra.com/blog](https://ui.neuctra.com/blog)
- **Source code:** [github.com/Taha-Asif-313/neuctra-ui](https://github.com/Taha-Asif-313/neuctra-ui)
- **Report a problem:** [GitHub issues](https://github.com/Taha-Asif-313/neuctra-ui/issues)
- **npm:** [@neuctra/ui](https://www.npmjs.com/package/@neuctra/ui) · [@neuctra/ui-cli](https://www.npmjs.com/package/@neuctra/ui-cli) · [@neuctra/ui-mcp](https://www.npmjs.com/package/@neuctra/ui-mcp)

---

### Neuctra UI: the parts, the plans, and the rules, all in one place.

**Stop rebuilding the basics. Start building what makes your product different.**
