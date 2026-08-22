import { createElement } from "react";
import CodeBlock from "../components/CodeBlock";
import Metadata from "../../../MetaData";
import {
  Bot,
  Download,
  Search,
  Wrench,
  Palette,
  Terminal,
  Settings,
  Code2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Container, Text } from "@neuctra/ui";

const McpDocPage = () => {
  return (
    <>
      <Metadata
        title="Neuctra UI MCP - AI Coding Assistant Integration"
        description="Connect Neuctra UI with AI coding assistants using the Neuctra UI MCP server. Give AI assistants accurate component APIs, theme rules, examples, and styling guidance without guessing."
        keywords="Neuctra UI MCP, Neuctra MCP, MCP server, Model Context Protocol, AI coding assistant, Claude Code Neuctra UI, Cursor Neuctra UI, Antigravity Neuctra UI, AI UI development, React AI tools"
      />

      <div className="min-h-screen">
        <div className="space-y-10">
          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-bold text-white">
              Neuctra UI <code className="text-primary">MCP</code>
            </h1>

            <p className="text-zinc-200 mt-2 max-w-3xl">
              Connect Neuctra UI with AI coding assistants and give them
              accurate knowledge about components, props, themes, examples, and
              styling rules.
            </p>
          </div>

          {/* WHAT IS MCP */}
          <DocSection
            icon={Bot}
            title="What Is Neuctra UI MCP?"
            description="Neuctra UI MCP gives AI coding assistants a direct way to understand the Neuctra UI component library."
          >
            <p className="text-zinc-200 text-sm leading-6">
              AI coding assistants are powerful, but when they don't know a
              library they may guess component APIs, invent props, or use
              styling patterns from other libraries.
            </p>

            <p className="text-zinc-200 text-sm leading-6">
              The Neuctra UI MCP server solves this by exposing structured
              information from Neuctra UI to MCP-compatible AI tools.
            </p>

            <p className="text-zinc-200 text-sm leading-6">
              Instead of guessing how a component works, the AI can ask the MCP
              server for the exact information it needs before generating code.
            </p>

            <div className="border border-border rounded-lg p-4 bg-background/40">
              <p className="text-sm text-zinc-200">
                <span className="text-primary font-semibold">
                  Think of MCP as a knowledge bridge:
                </span>{" "}
                your AI assistant can query Neuctra UI's actual component and
                theme information while working on your project.
              </p>
            </div>
          </DocSection>

          {/* WHY USE IT */}
          <DocSection
            icon={CheckCircle2}
            title="Why Use Neuctra UI MCP?"
            description="MCP helps AI assistants generate code that follows the actual Neuctra UI API."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Benefit
                title="No API Guessing"
                description="The AI can inspect the actual component API instead of inventing props based on other UI libraries."
              />

              <Benefit
                title="Real Component Knowledge"
                description="AI assistants can discover available components, categories, props, types, defaults, and examples."
              />

              <Benefit
                title="Theme Awareness"
                description="The AI can understand Neuctra UI's semantic color tokens and styling rules."
              />

              <Benefit
                title="Better Generated UI"
                description="The assistant can follow Neuctra UI conventions instead of producing generic library-independent designs."
              />
            </div>
          </DocSection>

          {/* HOW IT WORKS */}
          <DocSection
            icon={Code2}
            title="How It Works"
            description="The MCP server acts as a bridge between your AI assistant and Neuctra UI's component knowledge."
          >
            <CodeBlock
              language="text"
              code={`Your React Project
       │
       │  AI asks for UI help
       ▼
AI Coding Assistant
Claude Code / Cursor / Antigravity
       │
       │  MCP request
       ▼
@neuctra/ui-mcp
       │
       ├── Component information
       ├── Props and TypeScript types
       ├── Usage examples
       ├── Theme tokens
       └── Styling rules
       │
       ▼
AI receives accurate information
       │
       ▼
Correct Neuctra UI code`}
            />

            <p className="text-zinc-200 text-sm">
              The AI decides when it needs additional Neuctra UI knowledge. You
              don't have to manually copy documentation into every conversation.
            </p>
          </DocSection>

          {/* INSTALL */}
          <DocSection
            icon={Download}
            title="Step 1 — Install Neuctra UI MCP"
            description="The MCP server can be launched directly through npx."
          >
            <CodeBlock language="bash" code={`npx -y @neuctra/ui-mcp`} />

            <p className="text-zinc-200 text-sm">
              You normally don't need to install the package globally. MCP
              clients can launch the package automatically using{" "}
              <code>npx</code>.
            </p>
          </DocSection>

          {/* MCP CONCEPT */}
          <DocSection
            icon={Settings}
            title="Step 2 — Understand the MCP Connection"
            description="MCP clients start the Neuctra UI server and communicate with it through the MCP protocol."
          >
            <p className="text-zinc-200 text-sm leading-6">
              MCP-compatible applications generally need three pieces of
              information:
            </p>

            <div className="space-y-3">
              <InfoRow title="Server name" value="neuctra-ui" />

              <InfoRow title="Command" value="npx" />

              <InfoRow title="Arguments" value="-y @neuctra/ui-mcp" />
            </div>

            <CodeBlock
              language="json"
              code={`{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}`}
            />
          </DocSection>

          {/* CLAUDE CODE */}
          <DocSection
            icon={Terminal}
            title="Step 3 — Connect Claude Code"
            description="Add Neuctra UI MCP directly from the Claude Code CLI."
          >
            <CodeBlock
              language="bash"
              code={`claude mcp add --scope user neuctra-ui -- npx -y @neuctra/ui-mcp`}
            />

            <p className="text-zinc-200 text-sm">
              After adding the server, Claude Code can access Neuctra UI MCP
              tools during development.
            </p>

            <FrameworkTitle>Project Configuration</FrameworkTitle>

            <p className="text-zinc-200 text-sm">
              You can also configure the server in your project's{" "}
              <code>.mcp.json</code> file.
            </p>

            <CodeBlock
              language="json"
              code={`{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}`}
            />
          </DocSection>

          {/* CURSOR */}
          <DocSection
            icon={Code2}
            title="Step 4 — Connect Cursor"
            description="Add Neuctra UI MCP to Cursor's MCP configuration."
          >
            <p className="text-zinc-200 text-sm">
              Open Cursor's MCP settings and add a new server using the
              following configuration.
            </p>

            <CodeBlock
              language="json"
              code={`{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}`}
            />

            <p className="text-zinc-200 text-sm">
              Cursor will launch the server and make its tools available to the
              AI agent.
            </p>
          </DocSection>

          {/* ANTIGRAVITY */}
          <DocSection
            icon={Bot}
            title="Step 5 — Connect Antigravity"
            description="Use the same MCP server configuration with MCP-compatible development environments."
          >
            <p className="text-zinc-200 text-sm">
              Open your MCP server configuration in Antigravity and add Neuctra
              UI using the standard MCP command configuration.
            </p>

            <CodeBlock
              language="json"
              code={`{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}`}
            />

            <p className="text-zinc-200 text-sm">
              Once connected, the assistant can query Neuctra UI knowledge while
              generating or modifying your application.
            </p>
          </DocSection>

          {/* TOOLS */}
          <DocSection
            icon={Wrench}
            title="Available MCP Tools"
            description="Neuctra UI MCP provides focused tools so AI assistants can retrieve only the information they need."
          >
            <ToolCard
              name="list_components"
              description="Browse the available Neuctra UI components, optionally filtered by category."
              input={`{
  "category": "form"
}`}
              useCase="Useful when the AI needs to discover what components are available before choosing one."
            />

            <ToolCard
              name="get_component"
              description="Retrieve the complete specification for one component."
              input={`{
  "name": "Button"
}`}
              useCase="Useful when the AI needs exact props, types, defaults, descriptions, and an example before writing code."
            />

            <ToolCard
              name="search_components"
              description="Search components when the exact component name is unknown."
              input={`{
  "query": "date picker"
}`}
              useCase="Useful when the AI knows the UI functionality it needs but doesn't know which Neuctra UI component provides it."
            />

            <ToolCard
              name="get_theme"
              description="Retrieve Neuctra UI theme tokens, styling rules, and visual design guidance."
              input={`{}`}
              useCase="Useful when the AI needs to generate styling that follows the Neuctra UI design system."
            />
          </DocSection>

          {/* LIST COMPONENTS */}
          <DocSection
            icon={Search}
            title="list_components"
            description="Discover available components without retrieving their complete specifications."
          >
            <CodeBlock
              language="json"
              code={`{
  "category": "form"
}`}
            />

            <p className="text-zinc-200 text-sm">
              The category is optional. Without a category, the assistant can
              browse the complete component registry.
            </p>

            <CodeBlock
              language="json"
              code={`[
  {
    "name": "Calendar",
    "category": "form",
    "propCount": 9
  },
  {
    "name": "Checkbox",
    "category": "form",
    "propCount": 29
  },
  {
    "name": "DatePicker",
    "category": "form",
    "propCount": 15
  }
]`}
            />
          </DocSection>

          {/* GET COMPONENT */}
          <DocSection
            icon={Code2}
            title="get_component"
            description="Get the exact API and usage information for a specific component."
          >
            <CodeBlock
              language="json"
              code={`{
  "name": "Button"
}`}
            />

            <p className="text-zinc-200 text-sm">
              The response contains information such as:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-zinc-200 text-sm">
              <li>Component name</li>
              <li>Component category</li>
              <li>Component description</li>
              <li>Prop names</li>
              <li>TypeScript types</li>
              <li>Required and optional props</li>
              <li>Default values</li>
              <li>Prop descriptions</li>
              <li>Usage example</li>
            </ul>

            <p className="text-zinc-200 text-sm">
              This makes the tool especially useful before the AI writes code
              using a component it has not previously inspected.
            </p>
          </DocSection>

          {/* SEARCH */}
          <DocSection
            icon={Search}
            title="search_components"
            description="Find components using natural descriptions instead of exact component names."
          >
            <CodeBlock
              language="json"
              code={`{
  "query": "loading state"
}`}
            />

            <p className="text-zinc-200 text-sm">
              Search can use component names, categories, descriptions, and prop
              information to find relevant components.
            </p>

            <p className="text-zinc-200 text-sm">
              This is useful when an AI agent knows the UI it wants to build but
              doesn't know which Neuctra UI component should be used.
            </p>
          </DocSection>

          {/* THEME */}
          <DocSection
            icon={Palette}
            title="get_theme"
            description="Give AI assistants the Neuctra UI visual system instead of allowing them to invent arbitrary styling."
          >
            <CodeBlock language="json" code={`{}`} />

            <p className="text-zinc-200 text-sm">
              The theme information includes semantic color tokens and guidance
              for using them correctly.
            </p>

            <FrameworkTitle>Semantic Tokens</FrameworkTitle>

            <CodeBlock
              language="text"
              code={`bg-primary
text-primary
border-primary

bg-background
text-foreground

bg-muted
text-muted-foreground

bg-card
text-card-foreground

bg-destructive
bg-success
bg-warning
bg-info`}
            />

            <p className="text-zinc-200 text-sm">
              This helps the AI use the application's semantic theme rather than
              replacing the design system with arbitrary Tailwind palette
              colors.
            </p>

            <FrameworkTitle>Design Guidance</FrameworkTitle>

            <ul className="list-disc pl-5 space-y-2 text-zinc-200 text-sm">
              <li>Prefer semantic theme tokens.</li>
              <li>Avoid arbitrary hardcoded brand colors.</li>
              <li>Keep layouts clean and purposeful.</li>
              <li>Avoid unnecessary visual effects.</li>
              <li>Use actual UI components instead of recreating them.</li>
              <li>Follow the existing application's visual language.</li>
            </ul>
          </DocSection>

          {/* AI WORKFLOW */}
          <DocSection
            icon={Bot}
            title="How AI Uses MCP"
            description="The MCP server is designed to be queried during development rather than manually copied into every prompt."
          >
            <CodeBlock
              language="text"
              code={`User:
"Create a registration form using Neuctra UI."

        ↓

AI:
"I need to know which form components exist."

        ↓

search_components
        ↓

AI:
"I found Input, Checkbox and Button."

        ↓

get_component
        ↓

AI:
"Now I know the exact props and usage."

        ↓

get_theme
        ↓

AI:
"I know which semantic colors and styling rules to use."

        ↓

Generated React code
        ↓

Correct Neuctra UI implementation`}
            />

            <p className="text-zinc-200 text-sm">
              The important difference is that the AI can{" "}
              <span className="text-primary font-medium">
                ask for knowledge when it needs it
              </span>{" "}
              instead of relying entirely on its training data.
            </p>
          </DocSection>

          {/* EXAMPLE PROMPTS */}
          <DocSection
            icon={Bot}
            title="Example AI Requests"
            description="Once MCP is connected, you can ask your AI assistant to work naturally with Neuctra UI."
          >
            <CodeBlock
              language="text"
              code={`Create a login page using Neuctra UI.

Use Neuctra UI components for the form fields.

Find the best Neuctra UI component for selecting a date.

Build a dashboard using Neuctra UI.

Use the Neuctra UI theme tokens instead of hardcoded colors.

Create a responsive settings page using Neuctra UI.

Check the correct props for the Button component before
using it.

Find a component suitable for displaying loading states.`}
            />

            <p className="text-zinc-200 text-sm">
              You don't need to paste the component documentation into the
              prompt. The AI can retrieve the relevant information through MCP.
            </p>
          </DocSection>

          {/* LOCAL DEVELOPMENT */}
          <DocSection
            icon={Terminal}
            title="Local Development"
            description="You can also run the MCP server directly from a local checkout while developing the package."
          >
            <CodeBlock
              language="bash"
              code={`npm install
npm start`}
            />

            <p className="text-zinc-200 text-sm">
              An MCP server normally waits for an MCP client to communicate with
              it. Therefore, running it directly from your terminal may appear
              to do nothing. This is expected behavior.
            </p>

            <FrameworkTitle>Using a Local Server</FrameworkTitle>

            <CodeBlock
              language="json"
              code={`{
  "mcpServers": {
    "neuctra-ui": {
      "command": "node",
      "args": [
        "/absolute/path/to/neuctra-ui-mcp/bin/cli.mjs"
      ]
    }
  }
}`}
            />
          </DocSection>

          {/* REGISTRY */}
          <DocSection
            icon={Settings}
            title="Component Knowledge & Registry"
            description="Neuctra UI MCP uses structured component information rather than asking the AI to reverse-engineer source code."
          >
            <p className="text-zinc-200 text-sm leading-6">
              Component information is maintained in a registry containing
              metadata generated from the Neuctra UI component source.
            </p>

            <CodeBlock
              language="text"
              code={`Neuctra UI source
       │
       ▼
Component registry
       │
       ▼
MCP data
       │
       ▼
AI assistant`}
            />

            <p className="text-zinc-200 text-sm">
              This gives the MCP server a structured source of component
              knowledge that can be queried quickly during AI-assisted
              development.
            </p>
          </DocSection>

          {/* PROJECT STRUCTURE */}
          <DocSection
            icon={Code2}
            title="Project Structure"
            description="The MCP package contains the server entry point, tool definitions, and structured data."
          >
            <CodeBlock
              language="text"
              code={`neuctra-ui-mcp/
├── bin/
│   └── cli.mjs
│
├── src/
│   └── server.mjs
│
├── data/
│   ├── components.json
│   └── theme.json
│
├── scripts/
│   └── sync-registry.mjs
│
└── package.json`}
            />

            <p className="text-zinc-200 text-sm">
              The CLI starts the MCP server, while the server implementation
              registers the tools exposed to MCP clients.
            </p>
          </DocSection>

          {/* TROUBLESHOOTING */}
          <Container className="border-t border-border pt-5 space-y-8">
            <Text as="h2" size="2xl" weight={700}>
              Troubleshooting
            </Text>

            <div className="space-y-8">
              <Trouble
                title="MCP server is not appearing"
                description="Make sure your MCP configuration uses the correct command and package name."
              >
                <CodeBlock
                  language="json"
                  code={`{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}`}
                />
              </Trouble>

              <Trouble
                title="The server appears to do nothing in the terminal"
                description="This is normally expected. MCP servers communicate with clients over the protocol instead of displaying an interactive terminal interface."
              />

              <Trouble
                title="AI is still guessing component props"
                description="Make sure the MCP server is actually connected to your AI client and that the client has access to the Neuctra UI tools."
              />

              <Trouble
                title="Changes to Neuctra UI are not reflected"
                description="If you're developing the MCP package locally, make sure the component registry has been regenerated or synchronized after changing component APIs."
              />

              <Trouble
                title="MCP connection stopped working after configuration changes"
                description="Restart your AI coding application after modifying its MCP configuration. Many clients initialize MCP servers when they start."
              />
            </div>
          </Container>

          {/* FINAL */}
          <Container className="border-t border-border pt-6">
            <div className="flex items-start gap-3">
              {createElement(CheckCircle2, {
                className: "text-primary mt-1",
                size: 20,
              })}

              <div>
                <Text as="h2" size="xl" weight={700} className="mb-2">
                  You're Ready
                </Text>

                <Text size="sm" color="muted">
                  Once Neuctra UI MCP is connected, your AI coding assistant can
                  discover components, inspect APIs, understand the theme, and
                  generate Neuctra UI code with much less guesswork.
                </Text>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

/* =========================================================
   COMPONENTS
========================================================= */

const DocSection = ({ icon: Icon, title, description, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      {createElement(Icon, {
        className: "text-primary",
        size: 18,
      })}

      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>

    <p className="text-zinc-200 text-sm">{description}</p>

    <div className="space-y-4">{children}</div>
  </div>
);

const FrameworkTitle = ({ children }) => (
  <h3 className="pt-2 text-sm font-semibold text-primary">{children}</h3>
);

const Benefit = ({ title, description }) => (
  <div className="border border-border rounded-lg p-4 space-y-2">
    <h3 className="text-sm font-semibold text-white">{title}</h3>

    <p className="text-zinc-200 text-sm leading-6">{description}</p>
  </div>
);

const InfoRow = ({ title, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-border rounded-lg px-4 py-3">
    <span className="text-sm text-zinc-200">{title}</span>

    <code className="text-sm text-primary">{value}</code>
  </div>
);

const ToolCard = ({ name, description, input, useCase }) => (
  <div className="border border-border rounded-lg p-4 space-y-4">
    <div>
      <h3 className="text-base font-semibold text-primary">
        <code>{name}</code>
      </h3>

      <p className="text-zinc-200 text-sm mt-2 leading-6">{description}</p>
    </div>

    <CodeBlock language="json" code={input} />

    <p className="text-zinc-300 text-sm">
      <span className="font-semibold text-white">When to use:</span> {useCase}
    </p>
  </div>
);

const Trouble = ({ title, description, children }) => (
  <div>
    <Text
      as="h3"
      size="lg"
      weight={600}
      className="mb-2 flex items-center gap-2"
    >
      {title}
    </Text>

    <Text size="sm" color="muted" className="mb-3">
      {description}
    </Text>

    {children}
  </div>
);

export default McpDocPage;
