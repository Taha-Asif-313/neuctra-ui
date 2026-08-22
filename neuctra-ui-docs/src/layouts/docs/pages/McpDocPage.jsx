import { createElement } from "react";
import CodeBlock from "../components/CodeBlock";
import Metadata from "../../../MetaData";
import {
  Bot,
  Search,
  Wrench,
  Palette,
  Terminal,
  Settings,
  Code2,
  CheckCircle2,
  Globe,
  Copy,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Container, Text } from "@neuctra/ui";

const REMOTE_MCP_URL = "https://mcp.ui.neuctra.com/mcp";

const McpDocPage = () => {
  return (
    <>
      <Metadata
        title="Neuctra UI MCP - Connect AI to Neuctra UI"
        description="Connect AI coding assistants to Neuctra UI using the remote MCP server. Let AI discover components, props, examples, theme tokens, and styling rules automatically."
        keywords="Neuctra UI MCP, Neuctra MCP, remote MCP, MCP server, Model Context Protocol, AI coding assistant, Claude Code, Cursor, Antigravity, React UI, Neuctra UI"
      />

      <div className="min-h-screen">
        <div className="space-y-12">

          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-zinc-300">
                <Sparkles size={13} className="text-primary" />
                AI Integration
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                Neuctra UI <code className="text-primary">MCP</code>
              </h1>

              <p className="text-zinc-200 mt-3 max-w-3xl leading-7">
                Give your AI coding assistant direct access to Neuctra UI's
                components, props, examples, theme tokens, and design
                guidelines.
              </p>
            </div>
          </div>

          {/* =====================================================
              QUICK START
          ====================================================== */}

          <DocSection
            icon={Globe}
            title="Connect Neuctra UI MCP"
            description="The easiest way to use Neuctra UI with an AI coding assistant is through the hosted remote MCP server."
          >
            <div className="border border-primary/30 rounded-xl p-5 bg-primary/5 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2
                    size={17}
                    className="text-primary"
                  />

                  <h3 className="text-base font-semibold text-white">
                    Remote MCP — Recommended
                  </h3>
                </div>

                <p className="text-zinc-300 text-sm leading-6">
                  If your AI tool supports remote MCP servers or MCP
                  connectors, use the URL below. No package installation
                  is required.
                </p>
              </div>

              <CodeBlock
                language="text"
                code={REMOTE_MCP_URL}
              />

              <p className="text-zinc-300 text-sm leading-6">
                Add this URL as a remote MCP server in your AI coding
                assistant. Once connected, the assistant can query Neuctra UI
                whenever it needs component or design-system information.
              </p>
            </div>
          </DocSection>

          {/* =====================================================
              WHAT IS MCP
          ====================================================== */}

          <DocSection
            icon={Bot}
            title="What Is Neuctra UI MCP?"
            description="MCP connects your AI coding assistant to Neuctra UI's structured component knowledge."
          >
            <p className="text-zinc-200 text-sm leading-6">
              AI coding assistants can generate React interfaces very quickly,
              but they may sometimes guess component names, props, or styling
              when they don't know a library.
            </p>

            <p className="text-zinc-200 text-sm leading-6">
              Neuctra UI MCP gives the AI a direct way to ask Neuctra UI for
              the information it needs.
            </p>

            <CodeBlock
              language="text"
              code={`Your Project
     │
     ▼
AI Coding Assistant
     │
     │  MCP request
     ▼
Neuctra UI MCP
     │
     ├── Components
     ├── Props
     ├── TypeScript types
     ├── Examples
     ├── Theme tokens
     └── Design guidelines
     │
     ▼
AI generates Neuctra UI code`}
            />

            <div className="border border-border rounded-lg p-4 bg-background/40">
              <p className="text-sm text-zinc-200 leading-6">
                <span className="text-primary font-semibold">
                  Think of MCP as a knowledge bridge.
                </span>{" "}
                Your AI can look up Neuctra UI information instead of relying
                only on its training data.
              </p>
            </div>
          </DocSection>

          {/* =====================================================
              WHY MCP
          ====================================================== */}

          <DocSection
            icon={CheckCircle2}
            title="Why Use It?"
            description="MCP helps your AI assistant work with the real Neuctra UI API."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Benefit
                title="Less Guessing"
                description="The AI can check the actual Neuctra UI API instead of inventing component props."
              />

              <Benefit
                title="Component Discovery"
                description="The AI can find components based on names, categories, or what you want to build."
              />

              <Benefit
                title="Correct Props"
                description="The AI can inspect TypeScript types, required props, optional props, defaults, and descriptions."
              />

              <Benefit
                title="Theme Awareness"
                description="The AI can use Neuctra UI semantic tokens and follow the design system."
              />
            </div>
          </DocSection>

          {/* =====================================================
              REMOTE MCP
          ====================================================== */}

          <DocSection
            icon={Globe}
            title="Remote MCP"
            description="Use the hosted Neuctra UI MCP server without installing anything."
          >
            <p className="text-zinc-200 text-sm leading-6">
              The remote MCP server is already hosted by Neuctra. Your AI
              application connects directly to it over the MCP protocol.
            </p>

            <InfoRow
              title="Remote MCP URL"
              value={REMOTE_MCP_URL}
            />

            <p className="text-zinc-200 text-sm leading-6">
              This is the recommended option for MCP clients that support
              remote HTTP-based MCP servers.
            </p>

            <div className="border border-border rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">
                You don't need to:
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-zinc-300 text-sm">
                <li>Install Node.js packages for the MCP server.</li>
                <li>Run the MCP server manually.</li>
                <li>Clone the Neuctra UI MCP repository.</li>
                <li>Maintain a local MCP process.</li>
              </ul>
            </div>
          </DocSection>

          {/* =====================================================
              CLAUDE CODE
          ====================================================== */}

          <DocSection
            icon={Terminal}
            title="Claude Code"
            description="Connect Claude Code to the hosted Neuctra UI MCP server."
          >
            <p className="text-zinc-200 text-sm leading-6">
              If your Claude Code version supports remote MCP servers, add the
              Neuctra UI MCP endpoint as a remote server.
            </p>

            <CodeBlock
              language="bash"
              code={`claude mcp add --scope user neuctra-ui --transport http ${REMOTE_MCP_URL}`}
            />

            <p className="text-zinc-300 text-sm leading-6">
              The{" "}
              <code className="text-primary">--scope user</code>{" "}
              option makes the MCP server available across your projects for
              your user account.
            </p>

            <div className="border border-border rounded-lg p-4 bg-background/40">
              <p className="text-sm text-zinc-300 leading-6">
                <span className="text-white font-semibold">
                  Prefer local MCP?
                </span>{" "}
                You can also run the Neuctra UI MCP package locally. See{" "}
                <span className="text-primary">
                  Local MCP
                </span>{" "}
                below.
              </p>
            </div>
          </DocSection>

          {/* =====================================================
              CURSOR
          ====================================================== */}

          <DocSection
            icon={Code2}
            title="Cursor"
            description="Add Neuctra UI MCP to Cursor using the remote server URL."
          >
            <p className="text-zinc-200 text-sm leading-6">
              Open Cursor's MCP settings and add a new remote MCP server.
            </p>

            <InfoRow
              title="Server name"
              value="neuctra-ui"
            />

            <InfoRow
              title="Server URL"
              value={REMOTE_MCP_URL}
            />

            <p className="text-zinc-300 text-sm leading-6">
              Once connected, Cursor can use Neuctra UI MCP tools while
              generating and modifying your application.
            </p>
          </DocSection>

          {/* =====================================================
              ANTIGRAVITY
          ====================================================== */}

          <DocSection
            icon={Bot}
            title="Antigravity"
            description="Connect Antigravity to the hosted Neuctra UI MCP server."
          >
            <p className="text-zinc-200 text-sm leading-6">
              Open the MCP configuration in Antigravity and add the remote
              Neuctra UI MCP endpoint.
            </p>

            <InfoRow
              title="Server name"
              value="neuctra-ui"
            />

            <InfoRow
              title="Server URL"
              value={REMOTE_MCP_URL}
            />

            <p className="text-zinc-300 text-sm leading-6">
              After connecting, the AI can query Neuctra UI information while
              building your application.
            </p>
          </DocSection>

          {/* =====================================================
              CHATGPT / CONNECTORS
          ====================================================== */}

          <DocSection
            icon={Bot}
            title="AI Apps With MCP Connectors"
            description="Some AI applications allow you to connect remote MCP servers as connectors or integrations."
          >
            <p className="text-zinc-200 text-sm leading-6">
              If your AI application provides a remote MCP or connector
              interface, use the Neuctra UI MCP URL:
            </p>

            <CodeBlock
              language="text"
              code={REMOTE_MCP_URL}
            />

            <p className="text-zinc-300 text-sm leading-6">
              Look for an option such as{" "}
              <span className="text-white font-medium">
                Connect MCP
              </span>
              ,{" "}
              <span className="text-white font-medium">
                Remote MCP
              </span>
              , or{" "}
              <span className="text-white font-medium">
                MCP Connector
              </span>
              .
            </p>

            <div className="border border-border rounded-lg p-4">
              <p className="text-sm text-zinc-300 leading-6">
                The exact UI and setup process depends on the AI application
                and its current MCP support.
              </p>
            </div>
          </DocSection>

          {/* =====================================================
              WHAT AI CAN DO
          ====================================================== */}

          <DocSection
            icon={Sparkles}
            title="What Can the AI Do?"
            description="After connecting MCP, you can work with Neuctra UI naturally."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Benefit
                title="Find Components"
                description="Ask the AI to find the best Neuctra UI component for a specific UI requirement."
              />

              <Benefit
                title="Check Props"
                description="Ask the AI to inspect the correct props before using a component."
              />

              <Benefit
                title="Build Interfaces"
                description="Ask the AI to create pages and features using actual Neuctra UI components."
              />

              <Benefit
                title="Follow the Theme"
                description="Ask the AI to use Neuctra UI semantic colors and design rules."
              />
            </div>
          </DocSection>

          {/* =====================================================
              AVAILABLE TOOLS
          ====================================================== */}

          <DocSection
            icon={Wrench}
            title="Available MCP Tools"
            description="Neuctra UI MCP exposes focused tools that the AI can use when it needs information."
          >
            <ToolCard
              name="list_components"
              description="List available Neuctra UI components."
              input={`{
  "category": "form"
}`}
              useCase="Use this when the AI needs to discover available components."
            />

            <ToolCard
              name="get_component"
              description="Get the complete specification for a specific component."
              input={`{
  "name": "Button"
}`}
              useCase="Use this when the AI needs exact props, types, defaults, and examples."
            />

            <ToolCard
              name="search_components"
              description="Search for components using a natural-language query."
              input={`{
  "query": "date picker"
}`}
              useCase="Use this when the AI knows what it wants to build but doesn't know the component name."
            />

            <ToolCard
              name="get_theme"
              description="Get Neuctra UI theme tokens and design guidance."
              input={`{}`}
              useCase="Use this when the AI needs to style an interface according to Neuctra UI."
            />
          </DocSection>

          {/* =====================================================
              COMPONENT SEARCH
          ====================================================== */}

          <DocSection
            icon={Search}
            title="Component Discovery"
            description="The AI can discover components before writing your code."
          >
            <FrameworkTitle>
              list_components
            </FrameworkTitle>

            <CodeBlock
              language="json"
              code={`{
  "category": "form"
}`}
            />

            <p className="text-zinc-200 text-sm leading-6">
              The category is optional. Without a category, the AI can browse
              the complete component registry.
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

            <FrameworkTitle>
              search_components
            </FrameworkTitle>

            <CodeBlock
              language="json"
              code={`{
  "query": "loading state"
}`}
            />

            <p className="text-zinc-200 text-sm leading-6">
              This allows the AI to search using functionality, descriptions,
              categories, component names, and prop information.
            </p>
          </DocSection>

          {/* =====================================================
              COMPONENT DETAILS
          ====================================================== */}

          <DocSection
            icon={Code2}
            title="Get Component Details"
            description="The AI can inspect a component before using it."
          >
            <CodeBlock
              language="json"
              code={`{
  "name": "Button"
}`}
            />

            <p className="text-zinc-200 text-sm">
              The response can provide information such as:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-zinc-200 text-sm">
              <li>Component name</li>
              <li>Category</li>
              <li>Description</li>
              <li>Props</li>
              <li>TypeScript types</li>
              <li>Required and optional props</li>
              <li>Default values</li>
              <li>Prop descriptions</li>
              <li>Usage examples</li>
            </ul>

            <p className="text-zinc-300 text-sm leading-6">
              This is especially useful when the AI has never used a particular
              Neuctra UI component before.
            </p>
          </DocSection>

          {/* =====================================================
              THEME
          ====================================================== */}

          <DocSection
            icon={Palette}
            title="Theme & Design System"
            description="Help AI-generated interfaces follow the Neuctra UI visual system."
          >
            <p className="text-zinc-200 text-sm leading-6">
              The{" "}
              <code className="text-primary">
                get_theme
              </code>{" "}
              tool provides theme information and styling guidance.
            </p>

            <CodeBlock
              language="json"
              code={`{}`}
            />

            <FrameworkTitle>
              Semantic Tokens
            </FrameworkTitle>

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

            <p className="text-zinc-200 text-sm leading-6">
              Semantic tokens allow the AI to work with your application's
              theme instead of randomly choosing colors from a Tailwind
              palette.
            </p>

            <FrameworkTitle>
              Design Guidelines
            </FrameworkTitle>

            <ul className="list-disc pl-5 space-y-2 text-zinc-200 text-sm">
              <li>Prefer semantic theme tokens.</li>
              <li>Avoid unnecessary hardcoded brand colors.</li>
              <li>Use existing Neuctra UI components.</li>
              <li>Keep layouts clean and purposeful.</li>
              <li>Avoid unnecessary visual effects.</li>
              <li>Follow the application's existing visual language.</li>
            </ul>
          </DocSection>

          {/* =====================================================
              AI WORKFLOW
          ====================================================== */}

          <DocSection
            icon={Bot}
            title="How AI Uses MCP"
            description="The AI can query Neuctra UI whenever it needs additional information."
          >
            <CodeBlock
              language="text"
              code={`User:
"Create a registration form using Neuctra UI."

        ↓

AI searches for relevant components

        ↓

search_components

        ↓

AI finds Input, Checkbox and Button

        ↓

get_component

        ↓

AI checks the exact props and examples

        ↓

get_theme

        ↓

AI checks the correct theme tokens

        ↓

AI generates the React implementation`}
            />

            <p className="text-zinc-200 text-sm leading-6">
              You don't have to manually paste Neuctra UI documentation into
              every prompt. The AI can retrieve the information it needs
              through MCP.
            </p>
          </DocSection>

          {/* =====================================================
              EXAMPLES
          ====================================================== */}

          <DocSection
            icon={Sparkles}
            title="Example Requests"
            description="After connecting MCP, you can simply ask your AI assistant to use Neuctra UI."
          >
            <CodeBlock
              language="text"
              code={`Create a login page using Neuctra UI.

Build a registration form using Neuctra UI components.

Find the best Neuctra UI component for selecting a date.

Create a dashboard using Neuctra UI.

Use Neuctra UI semantic theme tokens instead of hardcoded colors.

Create a responsive settings page using Neuctra UI.

Check the correct props for the Button component before using it.

Find a Neuctra UI component suitable for displaying a loading state.`}
            />
          </DocSection>

          {/* =====================================================
              LOCAL MCP
          ====================================================== */}

          <DocSection
            icon={Terminal}
            title="Advanced: Local MCP"
            description="Run the MCP server locally when you need a local development setup."
          >
            <p className="text-zinc-200 text-sm leading-6">
              Most users should use the remote MCP server. A local installation
              is mainly useful when you are developing or testing the MCP
              package locally.
            </p>

            <CodeBlock
              language="bash"
              code={`npx -y @neuctra/ui-mcp`}
            />

            <p className="text-zinc-300 text-sm leading-6">
              MCP clients can launch the package automatically, so you normally
              don't need to install it globally.
            </p>

            <FrameworkTitle>
              Example Local Configuration
            </FrameworkTitle>

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

          {/* =====================================================
              LOCAL DEVELOPMENT
          ====================================================== */}

          <DocSection
            icon={Settings}
            title="Developing the MCP Server"
            description="Contributors can run the MCP package directly from a local checkout."
          >
            <CodeBlock
              language="bash"
              code={`npm install
npm start`}
            />

            <p className="text-zinc-200 text-sm leading-6">
              An MCP server normally waits for an MCP client to communicate
              with it. Seeing little or no output in the terminal can therefore
              be normal.
            </p>

            <FrameworkTitle>
              Local Server Configuration
            </FrameworkTitle>

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

          {/* =====================================================
              REGISTRY
          ====================================================== */}

          <DocSection
            icon={Settings}
            title="Component Registry"
            description="Neuctra UI MCP uses structured component information to provide reliable answers."
          >
            <p className="text-zinc-200 text-sm leading-6">
              Neuctra UI component information is maintained in a structured
              registry. The MCP server uses this data when responding to AI
              requests.
            </p>

            <CodeBlock
              language="text"
              code={`Neuctra UI source
       │
       ▼
Component registry
       │
       ▼
Neuctra UI MCP
       │
       ▼
AI assistant`}
            />

            <p className="text-zinc-300 text-sm leading-6">
              This allows the AI to query structured component knowledge rather
              than trying to reverse-engineer the library from scratch.
            </p>
          </DocSection>

          {/* =====================================================
              TROUBLESHOOTING
          ====================================================== */}

          <Container className="border-t border-border pt-6 space-y-8">
            <div className="flex items-center gap-3">
              <HelpCircle
                className="text-primary"
                size={18}
              />

              <Text as="h2" size="2xl" weight={700}>
                Troubleshooting
              </Text>
            </div>

            <Trouble
              title="The remote MCP server isn't connecting"
              description="Check that your AI application supports remote MCP servers and that you entered the complete endpoint."
            >
              <CodeBlock
                language="text"
                code={REMOTE_MCP_URL}
              />
            </Trouble>

            <Trouble
              title="The AI isn't using Neuctra UI"
              description="Make sure the MCP connection is active and ask the AI explicitly to use Neuctra UI components."
            />

            <Trouble
              title="The AI is guessing component props"
              description="Ask the AI to inspect the component through MCP before generating the implementation. Also verify that the MCP tools are visible to the AI client."
            />

            <Trouble
              title="The local MCP server doesn't show anything"
              description="This can be normal. MCP servers wait for an MCP client instead of behaving like interactive terminal applications."
            />

            <Trouble
              title="Local changes aren't reflected"
              description="If you're developing the MCP package locally, regenerate or synchronize the component registry after changing component APIs."
            />

            <Trouble
              title="MCP stopped working after configuration changes"
              description="Restart your AI application after changing MCP configuration so it can initialize the connection again."
            />
          </Container>

          {/* =====================================================
              FINAL
          ====================================================== */}

          <Container className="border-t border-border pt-6">
            <div className="flex items-start gap-3">
              {createElement(CheckCircle2, {
                className: "text-primary mt-1",
                size: 20,
              })}

              <div>
                <Text
                  as="h2"
                  size="xl"
                  weight={700}
                  className="mb-2"
                >
                  You're Ready
                </Text>

                <Text
                  size="sm"
                  color="muted"
                  className="leading-6"
                >
                  Connect the remote Neuctra UI MCP server to your AI coding
                  assistant and let it discover components, inspect APIs,
                  understand the theme, and build with Neuctra UI.
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

const DocSection = ({
  icon: Icon,
  title,
  description,
  children,
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      {createElement(Icon, {
        className: "text-primary",
        size: 18,
      })}

      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>
    </div>

    <p className="text-zinc-200 text-sm leading-6">
      {description}
    </p>

    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const FrameworkTitle = ({ children }) => (
  <h3 className="pt-2 text-sm font-semibold text-primary">
    {children}
  </h3>
);

const Benefit = ({
  title,
  description,
}) => (
  <div className="border border-border rounded-lg p-4 space-y-2">
    <h3 className="text-sm font-semibold text-white">
      {title}
    </h3>

    <p className="text-zinc-200 text-sm leading-6">
      {description}
    </p>
  </div>
);

const InfoRow = ({
  title,
  value,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-border rounded-lg px-4 py-3">
    <span className="text-sm text-zinc-200">
      {title}
    </span>

    <code className="text-sm text-primary break-all">
      {value}
    </code>
  </div>
);

const ToolCard = ({
  name,
  description,
  input,
  useCase,
}) => (
  <div className="border border-border rounded-lg p-4 space-y-4">
    <div>
      <h3 className="text-base font-semibold text-primary">
        <code>{name}</code>
      </h3>

      <p className="text-zinc-200 text-sm mt-2 leading-6">
        {description}
      </p>
    </div>

    <CodeBlock
      language="json"
      code={input}
    />

    <p className="text-zinc-300 text-sm leading-6">
      <span className="font-semibold text-white">
        When to use:
      </span>{" "}
      {useCase}
    </p>
  </div>
);

const Trouble = ({
  title,
  description,
  children,
}) => (
  <div>
    <Text
      as="h3"
      size="lg"
      weight={600}
      className="mb-2"
    >
      {title}
    </Text>

    <Text
      size="sm"
      color="muted"
      className="mb-3 leading-6"
    >
      {description}
    </Text>

    {children}
  </div>
);

export default McpDocPage;