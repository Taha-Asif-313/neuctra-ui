export const blogContent = {
  "react-saas-dashboard-components-cards-stats-tables": {
    intro:
      "A useful SaaS dashboard makes the current state of a product easy to understand and the next action easy to find. React dashboard components can help you build that structure without turning every screen into a different design system.",
    sections: [
      {
        heading: "Start with the dashboard task",
        paragraphs: [
          "Decide what the user comes to the page to do: review recent activity, monitor a metric, manage records, or change account settings. Give the main task priority in the page heading and put supporting information around it.",
          "A reusable component library supplies building blocks. It does not automatically decide the product's information architecture or replace your application's data, permissions, and business rules.",
        ],
      },
      {
        heading: "Compose a dashboard from a small set of patterns",
        list: [
          "Use a consistent page container and cards to group related information.",
          "Use stat or metric components for a small number of important values; include labels and time context so the numbers make sense.",
          "Use tables for records that users need to scan or act on. Keep column labels clear and provide a useful empty state when there are no records.",
          "Use navigation, buttons, dropdowns, and dialogs for the actions people need in context.",
        ],
      },
      {
        heading: "Plan for real data states",
        paragraphs: [
          "A production dashboard needs loading, empty, error, and success states as well as its populated view. Skeletons can indicate the shape of content while it loads; an empty state should explain why the list is empty and what a user can do next.",
          "Sorting, filtering, pagination, chart rendering, and data fetching are application responsibilities unless a component's documentation explicitly says otherwise. Neuctra UI includes table, stat, card, and feedback building blocks; choose a charting tool separately if your dashboard needs data visualizations.",
        ],
      },
      {
        heading: "Make dashboard tables work on smaller screens",
        paragraphs: [
          "Prioritize the columns users need most, avoid squeezing every field into a narrow viewport, and test long values and actions on mobile. Depending on the task, a horizontally scrollable table or a compact record layout may be easier to use.",
          "Keep focus states, labels, and action names understandable without relying on color alone. Check keyboard navigation and the component's documented accessibility behavior in your actual screen.",
        ],
      },
      {
        heading: "Explore the Neuctra UI building blocks",
        paragraphs: [
          "Neuctra UI provides React components for cards, containers, tables, stats, lists, buttons, dialogs, skeletons, and empty states. Review each component's props and examples before composing it into your dashboard.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Neuctra UI include a complete SaaS dashboard template?",
        answer:
          "Neuctra UI provides reusable React components for dashboard interfaces. You compose them around your own navigation, data, permissions, and product workflows.",
      },
      {
        question: "Does the Table component include sorting and pagination logic?",
        answer:
          "Check the current Table API for its supported display features. Data loading, sorting, filtering, and pagination behavior should be implemented by your application unless the documented API provides it.",
      },
      {
        question: "Does Neuctra UI include chart components?",
        answer:
          "The component catalog focuses on interface building blocks such as tables, stats, cards, and feedback. Use a charting library or a custom visualization for charts, and style it to match your theme.",
      },
    ],
    related: [
      { title: "Browse dashboard components", href: "/docs" },
      { title: "React Table component", href: "/docs/table" },
      { title: "Stat component", href: "/docs/stat" },
      { title: "Skeleton loading component", href: "/docs/skeleton" },
    ],
  },
  "react-tailwind-dark-mode-semantic-theme-tokens": {
    intro:
      "A maintainable React dark mode starts with a clear theme contract. Define semantic colors once, map them to Tailwind utilities, and switch the theme at the application root so components share the same light and dark values.",
    sections: [
      {
        heading: "Use semantic tokens instead of component-specific colors",
        paragraphs: [
          "Name colors by purpose—such as primary, background, foreground, border, muted, and destructive—instead of naming them after one screen or hard-coding a palette into each component. This lets a theme change update related interface surfaces together.",
          "Keep the meaning of each token stable across light and dark modes. For example, a card should use the card surface and foreground tokens in both themes rather than manually switching unrelated gray classes in every component.",
        ],
      },
      {
        heading: "Define light and dark values and map them to Tailwind",
        paragraphs: [
          "In a Tailwind CSS v4 stylesheet, define the semantic CSS variables for the default theme and override them under a `.dark` class. Map the variables in an `@theme` block so utilities such as `bg-background` and `text-foreground` resolve to the active values.",
        ],
        code: `:root {
  --background: #ffffff;
  --foreground: #09090b;
  --primary: #00c214;
}

.dark {
  --background: #09090b;
  --foreground: #fafafa;
  --primary: #00c214;
}

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
}`,
      },
      {
        heading: "Make dark utilities follow your theme class",
        paragraphs: [
          "If your app toggles a `.dark` class, configure Tailwind's dark variant to use that class. Otherwise, `dark:` utilities may follow the system preference while your app's saved theme follows a separate setting.",
        ],
        code: "@custom-variant dark (&:where(.dark, .dark *));",
      },
      {
        heading: "Apply the theme before users see the page",
        paragraphs: [
          "Choose the initial theme from a saved user preference or the system preference, then apply the class at the document root before the first visible paint where your framework allows. Test a fresh visit, a saved light preference, a saved dark preference, and a system preference change.",
          "Avoid keeping separate theme state in components that can drift apart. A single provider or root-level theme mechanism gives buttons, forms, dialogs, and custom UI one source of truth.",
        ],
      },
      {
        heading: "Use the same tokens in Neuctra UI and custom components",
        paragraphs: [
          "Neuctra UI components read semantic Tailwind theme utilities. Configure the variables and Tailwind mappings in your app's global stylesheet, then use the same token utilities in your own components for a consistent appearance.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I add dark mode to a React app with Tailwind CSS?",
        answer:
          "Define semantic CSS variables for light and dark themes, map them to Tailwind utilities, and toggle a theme class such as `.dark` at the app root. Keep the class behavior and theme state in sync.",
      },
      {
        question: "What are semantic color tokens?",
        answer:
          "Semantic tokens name a color's role—such as background, foreground, primary, or border—so components can use the same meaning while the actual color values change by theme.",
      },
      {
        question: "Does Neuctra UI set up the theme automatically?",
        answer:
          "The Neuctra UI CLI can generate the theme stylesheet and context for supported project structures. Review its output and save custom global CSS first because setup replaces the selected stylesheet.",
      },
    ],
    related: [
      { title: "Full React setup and theme guide", href: "/docs/full-setup" },
      { title: "Theme toggle component", href: "/docs/theme-toggle" },
      { title: "Neuctra UI CLI setup", href: "/docs/cli" },
    ],
  },
  "tailwind-v4-react-component-library-styles": {
    intro:
      "When a React component renders but looks unstyled, Tailwind may not have generated the utility classes used inside the installed library. Check the global stylesheet, source scanning, theme variables, and framework build before changing component markup.",
    sections: [
      {
        heading: "Confirm that Tailwind is imported by the app",
        paragraphs: [
          "For Tailwind CSS v4, the app's global stylesheet should import Tailwind. Confirm that the stylesheet is imported by the framework entry point or root layout and that the production build uses the expected CSS pipeline.",
        ],
        code: `@import "tailwindcss";`,
      },
      {
        heading: "Tell Tailwind to scan the installed library",
        paragraphs: [
          "Utilities used only inside a compiled package may not appear in your app's own source files. Add an `@source` directive for the installed package so Tailwind can discover those class names. The path is relative to the stylesheet, so adjust it for your app's CSS location.",
        ],
        code: `@source "../node_modules/@neuctra/ui";`,
      },
      {
        heading: "Check theme tokens separately from utility generation",
        paragraphs: [
          "If layout and spacing utilities work but colors do not, verify that the theme's CSS variables and Tailwind `@theme` mappings are defined. If dark mode does not match the app's toggle, configure the `dark:` variant to follow the class your theme provider controls.",
        ],
        code: `@custom-variant dark (&:where(.dark, .dark *));`,
      },
      {
        heading: "Check the stylesheet path in each framework",
        list: [
          "In Next.js App Router, import the global stylesheet from the root layout and confirm it contains the package scan directive.",
          "In Vite, confirm the stylesheet is imported by the app entry point and that the Tailwind Vite plugin is configured.",
          "Use the Tailwind v3 content configuration if the app is on Tailwind v3; v4 `@source` syntax is not a substitute for v3 configuration.",
          "Clear stale build output and rebuild after changing the CSS scan configuration.",
        ],
      },
      {
        heading: "Use the setup CLI carefully",
        paragraphs: [
          "The Neuctra UI CLI can write the theme stylesheet and setup providers in supported React project layouts. It replaces the selected global CSS file, so copy existing custom styles before running it and review any reported files it could not connect automatically.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why do my React component library components have no Tailwind styles?",
        answer:
          "Tailwind may not be scanning the installed package. For Tailwind v4, add an `@source` directive for the package path relative to your CSS file and verify the global stylesheet is loaded.",
      },
      {
        question: "Where should the Tailwind `@source` path point?",
        answer:
          "Point it at the installed component package, such as `../node_modules/@neuctra/ui`, using a path relative to the stylesheet that contains the directive.",
      },
      {
        question: "Does Tailwind v4 `@source` work in Tailwind v3?",
        answer:
          "No. Tailwind v3 uses its `content` configuration to scan the application and installed component package files.",
      },
    ],
    related: [
      { title: "Full setup guide for React frameworks", href: "/docs/full-setup" },
      { title: "Install with the Neuctra UI CLI", href: "/docs/cli" },
      { title: "Browse component documentation", href: "/docs" },
    ],
  },
  "react-form-components-saas-signup-verification": {
    intro:
      "SaaS signup and account forms need more than attractive input fields: labels, validation feedback, keyboard access, and clear next steps all matter. React form components provide the interface pieces while your app remains responsible for validation, identity, and data handling.",
    sections: [
      {
        heading: "Match each field to the information it collects",
        paragraphs: [
          "Use text and email inputs for short values, a select for a bounded choice, checkboxes for independent options, and a PIN input when users enter a short verification code. Keep labels visible and use helper text to explain requirements before submission.",
        ],
      },
      {
        heading: "Build a form around a clear user task",
        list: [
          "Group related fields and use a concise heading to explain the task.",
          "Mark required fields and describe password or format requirements before the user submits.",
          "Show validation messages beside the affected field and explain how to correct the value.",
          "Disable or indicate a pending submit state while the app processes the request.",
          "Confirm success or failure with clear feedback and preserve entered data when appropriate.",
        ],
      },
      {
        heading: "Keep authentication and validation in your application",
        paragraphs: [
          "A component library supplies UI controls; it does not create user accounts, send verification codes, validate credentials, or secure an API. Connect the form to your chosen authentication and validation systems, and validate sensitive values on the server as well as in the interface.",
          "For a verification flow, use a PIN input for the code and provide a way to request a new code, report an expired code, and return to the account email or phone number. Those actions depend on the authentication service behind the form.",
        ],
      },
      {
        heading: "Check accessibility and responsive behavior",
        paragraphs: [
          "Make every field reachable by keyboard, associate labels and errors with their inputs, keep focus visible, and avoid using color as the only signal for invalid or successful input. Test the form at narrow widths and with longer error messages.",
        ],
      },
      {
        heading: "Explore React form components in Neuctra UI",
        paragraphs: [
          "Neuctra UI includes inputs, textareas, selects, checkboxes, radio groups, switches, file uploads, and PIN inputs. Check the docs for each component's props and examples, then compose them around your application's form state and validation approach.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Neuctra UI include a complete authentication system?",
        answer:
          "No. It provides React form and feedback components that can be used to build authentication screens. Account creation, credential checks, verification delivery, and server-side security come from your application's authentication system.",
      },
      {
        question: "Which React components can I use for signup and verification forms?",
        answer:
          "Depending on the flow, use Input, Select, Checkbox, Button, ToastProvider, and PinInput. Check each component's documentation for its actual props and behavior.",
      },
      {
        question: "Should form validation happen only in the browser?",
        answer:
          "No. Client-side validation helps people correct mistakes quickly, but the server must validate submitted data and enforce authentication and authorization rules.",
      },
    ],
    related: [
      { title: "React Input component", href: "/docs/input" },
      { title: "PIN and verification code input", href: "/docs/pin-input" },
      { title: "React Select component", href: "/docs/select" },
      { title: "Toast and form feedback", href: "/docs/alert" },
    ],
  },
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
