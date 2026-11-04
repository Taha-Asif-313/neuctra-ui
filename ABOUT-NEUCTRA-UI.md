# About Neuctra UI

A plain-language guide to what Neuctra UI is, who it is for, how people use it, and why it is useful. You do not need a technical background to read this.

*Based on the project as of 4 November 2026: `@neuctra/ui` version 1.0.15, the setup tool version 0.1.15, and the AI connector version 0.4.9.*

---

## The short version

**Neuctra UI is a free, open-source toolkit that helps people build good-looking websites and web apps much faster.**

Instead of creating every button, form, menu, and popup from scratch, a developer picks ready-made pieces from Neuctra UI and puts them together. A setup tool prepares the project in one command. AI coding assistants can also connect to Neuctra UI, so they build with accurate information instead of guessing.

Think of it like **LEGO for websites**: the bricks are already made and they all fit together. You decide what to build.

---

## The problem it solves

Almost every website and app needs the same things: buttons, sign-up forms, tables, popups, menus, loading animations, and dark mode. Building these from nothing causes familiar problems:

- **It wastes time.** Teams rebuild the same pieces for every project.
- **Things look inconsistent.** Buttons on one page do not match buttons on another.
- **Details get missed.** Mobile layouts, loading screens, empty screens, and error messages are often forgotten.
- **Setup is tedious.** Hours can go into preparing a project before real work begins.
- **AI tools guess.** AI assistants often invent features that do not exist in a library, which creates broken code.

Neuctra UI addresses each of these in one place.

---

## What is inside: three main parts

The parts work alone or together.

### 1. The component library: the building blocks

This is the heart of Neuctra UI. A *component* is a ready-made piece of a screen, such as a button or a calendar.

It includes nearly 50 documented components, or 79 named pieces if you count their smaller parts (for example, a Modal is made of a header, body, and footer).

| Group | What it gives you |
|---|---|
| **Page structure** | Containers, cards, and dividers to organize a page |
| **Text and media** | Text styles, images, profile pictures, badges, and labels |
| **Forms and input** | Text boxes, dropdown lists, checkboxes, switches, sliders, star ratings, file upload, date and time pickers, and one-time-code boxes |
| **Buttons and actions** | Standard buttons, icon buttons, copy buttons, and a light/dark mode switch |
| **Showing information** | Tables, lists, statistics, timelines, image carousels, and expandable sections |
| **Feedback** | Pop-up notifications, notices, progress bars, loading animations, and "nothing here yet" screens |
| **Popups and overlays** | Dialog windows, side panels, dropdown menus, tooltips, and popovers |
| **Navigation** | Tabs, page numbers, "you are here" trails, and step-by-step progress indicators |

### 2. The setup tool (CLI): one command to get started

A *CLI* is a tool you run by typing a command. The Neuctra UI CLI prepares an existing project for you. It asks which framework you use, which language, and which main color you want, then handles the setup.

Color choices include Neuctra Green, Blue, Violet, Rose, Amber, Teal, or any custom color.

### 3. The AI connection (MCP): knowledge for AI coding assistants

*MCP* is a standard way to give AI tools extra knowledge. Connecting Neuctra UI to an AI coding assistant, such as Claude Code or Cursor, gives that assistant access to:

- **Accurate component details**, so it uses what really exists
- **A guided setup** that checks the project first
- **A page planner** with 49 layout recipes
- **Design rules** for clean, consistent, easy-to-use screens
- **Theme information** for colors and light/dark mode
- **SEO guidance** to help public pages be found on search engines and AI answer tools

There are two ways to connect: run it on your own computer, or point the AI tool to the hosted online address. The hosted version was tested on 4 November 2026 and is working.

The assistant does not need your project to use Neuctra UI to benefit from the general design and SEO advice. That guidance also applies to projects built with other tools.

### Also included: the documentation website

[ui.neuctra.com](https://ui.neuctra.com) brings everything together with guides, live examples for each component, setup instructions, and blog articles.

---

## Who can use it

| Person | How it helps |
|---|---|
| **Solo developers and freelancers** | Deliver client work faster and to a more polished standard |
| **Startup founders who code** | Launch a first version quickly, without hiring a designer first |
| **Small product teams** | Keep every screen consistent, and reduce repeated work |
| **Students and learners** | Build realistic projects and see how professional interfaces fit together |
| **People building with AI** | Get better results from AI assistants, because they work from accurate information |
| **Agencies** | Reuse one foundation across projects and restyle it per client |
| **SaaS and internal-tool builders** | Assemble dashboards, settings pages, and admin screens quickly |

**One important note:** Neuctra UI is not a drag-and-drop website builder. You need a React project and at least basic coding knowledge, or an AI coding assistant doing that work for you. A complete non-technical person would usually need help from a developer or an AI assistant.

---

## What you can build with it

- **SaaS dashboards:** analytics, billing, customer, and admin screens
- **Login and account pages:** sign-up, verification codes, and profile settings
- **Online stores:** product pages, carts, and checkout screens
- **Marketing websites:** homepages, landing pages, and pricing pages
- **Blogs and content sites:** article pages and listings
- **Help and documentation sites:** FAQs and help centers
- **Portfolios and agency sites**
- **Online tools and internal business tools**
- **Community and event pages**

The AI page planner includes 49 layout recipes across these areas, covering pages such as a Kanban board, a shopping cart, a pricing page, and a 404 page.

---

## How people use it

**Option A: with a developer**

1. Run the setup command in a React project.
2. Choose a framework, language, and main color.
3. Pick components from the documentation and combine them into screens.
4. Connect real data, logins, and business logic.
5. Publish the app.

**Option B: with an AI coding assistant**

1. Connect Neuctra UI to the AI tool.
2. Describe what you want in normal language, for example: *"Build a dashboard with sales stats and a customer table."*
3. The assistant plans the page, looks up the correct components, and writes the code.
4. Review the result and ask for changes.

Both options can be combined, and you can use only the parts you need.

---

## Main benefits

- **Saves time.** Common screens are assembled instead of built from scratch.
- **Free to use.** It is open source under the MIT license, including for commercial projects.
- **Consistent design.** All components share one design system, so an app feels unified.
- **Dark mode built in.** Light and dark themes are supported across the library.
- **Easy rebranding.** Change a small set of colors in one place, and the whole app follows.
- **Fully customizable.** Components can be restyled to match your own brand.
- **Works on all screen sizes.** The components are designed for phones, tablets, and desktops.
- **Fast setup.** One command handles most of the preparation.
- **Better AI results.** Assistants use real component information, which reduces made-up code.
- **More than components.** You also get design guidance, SEO guidance, and page layout recipes.
- **Clear documentation.** Each component has a page with live examples.
- **No lock-in to one AI tool.** It works with AI tools that support the MCP standard.

---

## How it compares with other approaches

| Approach | Good for | Trade-off |
|---|---|---|
| **Building everything yourself** | Total control | Slowest, and quality depends on your team |
| **Website builders (such as Wix)** | Non-technical users | Less flexible, and harder to build a custom app |
| **Other component libraries** | Developers who want ready-made pieces | Many are bigger and more established, but setup and AI support vary |
| **Neuctra UI** | React projects, especially with AI assistants | Requires React and Tailwind CSS, and is a newer project with a smaller community |

---

## What it does not do

Knowing the limits helps you set the right expectations.

- **It does not build a complete app for you.** It provides the screens' building blocks. Your app still needs its own data, login system, payments, and business rules.
- **It does not include finished templates.** Dashboards and login pages are assembled from components. The AI page planner gives a plan, and the AI assistant writes the page.
- **It is for React.** It will not work directly in plain HTML, WordPress, Vue, or Angular projects. The general design and SEO advice can still help those projects.
- **It needs Tailwind CSS,** a popular styling tool, to be installed in the project.
- **It does not guarantee search rankings.** SEO guidance improves your chances, but no one can promise rankings.
- **AI output still needs review.** Neuctra UI improves AI accuracy, but people should check the results.

**A setup warning:** The setup tool replaces the project's main style file. Anyone with custom styles should save a copy before running it.

---

## Common questions

**What does it cost?**
It is free. The MIT license allows personal and commercial use.

**Can I use it for client or business projects?**
Yes. The terms allow personal and commercial use, modification, and redistribution.

**Do I need to know how to code?**
Basic coding knowledge helps. With an AI coding assistant, you can do much of the work by describing what you want, but someone still needs to set up and review the project.

**Which project types are supported?**
The setup tool supports Vite React, Next.js, Remix, and React Router, in JavaScript or TypeScript.

**Can I change how it looks?**
Yes. You can set your own colors and restyle individual components.

**Does it work with other design libraries?**
The components are made for Neuctra UI, but the AI's general design and SEO guidance works with other libraries as well.

**Does it include login and accounts?**
It provides login screens and forms, but not the login system itself. That must come from your app or an authentication service.

**Is it being used and maintained?**
Yes. All three packages are published on npm, and the main library had about 1,150 downloads in the 30 days up to 3 November 2026. Development is active, with 138 commits so far.

---

## Who is behind it

Neuctra UI was created by **Taha Asif** and first committed in October 2025. It is part of the wider Neuctra family of projects.

---

## Where to find it

- **Website and documentation:** [ui.neuctra.com](https://ui.neuctra.com)
- **Start here:** [ui.neuctra.com/docs](https://ui.neuctra.com/docs)
- **AI assistant guide:** [ui.neuctra.com/docs/ai-assistant](https://ui.neuctra.com/docs/ai-assistant)
- **Blog:** [ui.neuctra.com/blog](https://ui.neuctra.com/blog)
- **Source code:** [github.com/Taha-Asif-313/neuctra-ui](https://github.com/Taha-Asif-313/neuctra-ui)
- **Report a problem:** [GitHub issues](https://github.com/Taha-Asif-313/neuctra-ui/issues)
- **Library on npm:** [@neuctra/ui](https://www.npmjs.com/package/@neuctra/ui)
- **Contact:** contact@neuctraui.com

---

## Word guide

| Word | Meaning |
|---|---|
| **UI (user interface)** | Everything a person sees and uses on a screen |
| **Component** | A reusable piece of a screen, such as a button |
| **Component library** | A collection of ready-made components |
| **Design system** | Shared rules and pieces that keep a product consistent |
| **React** | A very popular technology for building web apps |
| **Tailwind CSS** | A popular tool for styling websites |
| **Framework** | A foundation for building apps, such as Next.js |
| **Theme** | The colors and look of an app, such as light or dark |
| **CLI** | A tool you use by typing commands |
| **MCP** | A standard way to connect AI tools to outside knowledge |
| **npm** | The main online store for JavaScript packages |
| **Open source** | Software whose code is public and can be reused |
| **MIT license** | A permissive license that allows free use, including commercially |
| **SEO** | Making pages easier to find on search engines |
| **SaaS** | Software used online, usually by subscription |
