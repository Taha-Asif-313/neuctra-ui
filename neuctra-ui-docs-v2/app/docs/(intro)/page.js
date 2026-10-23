import CodeBlock from "@/components/CodeBlock";
import { Rocket, Palette, Component, Terminal, ArrowRight, Lightbulb, Bot, Globe } from "lucide-react";
import Link from "next/link";

const IntroductionDocPage = () => {
  return (
    <div className="text-gray-200 min-h-screen">
      <div className="space-y-12">
        {/* ================= HERO ================= */}
        <section>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Use Neuctra UI in your React project
          </h1>

          <p className="mt-4 text-zinc-200 max-w-2xl leading-relaxed">
            Neuctra UI is a developer toolkit built around a React component
            library, setup CLI, and AI assistant integrations. Use its
            components in React apps, and connect compatible coding assistants
            to structured UI knowledge through local or hosted MCP servers.
          </p>
        </section>

        {/* ================= CLI INTRO ================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="text-primary" size={18} />
            <h2 className="text-xl font-semibold text-white">
              Quick Setup (CLI Recommended)
            </h2>
          </div>

          <p className="text-zinc-200 text-sm">
            The CLI installs the UI library, checks React and Tailwind
            dependencies, configures the global theme stylesheet, creates a
            theme context, and connects providers when it recognizes your app
            structure.
          </p>

          <CodeBlock language="bash" code={`npx @neuctra/ui-cli@latest init`} />
        </section>

        <section className="space-y-4 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6">
          <div className="flex items-center gap-2"><Bot className="text-primary" size={19}/><h2 className="text-2xl font-semibold text-white">Meet the Neuctra UI Assistant</h2></div>
          <p className="text-zinc-300 leading-7">Give your AI coding tool access to component discovery, verified props and examples, theme tokens, design rules, page planning, and SEO guidance. Choose a local stdio server or a hosted HTTP connection to fit your MCP client.</p>
          <CodeBlock language="json" code={`{\n  "mcpServers": {\n    "neuctra-ui": {\n      "command": "npx",\n      "args": ["-y", "@neuctra/ui-mcp"]\n    }\n  }`} />
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/docs/ai-assistant" className="inline-flex items-center gap-2 text-primary">AI assistant overview <ArrowRight size={15}/></Link>
            <Link href="/docs/mcp-http" className="inline-flex items-center gap-2 text-primary"><Globe size={15}/>Remote MCP guide</Link>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Why Neuctra UI?
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Feature
              icon={Rocket}
              title="Fast Development"
              desc="Prebuilt components let you ship faster without repetitive UI work."
            />
            <Feature
              icon={Palette}
              title="Fully Customizable"
              desc="Control everything using CSS variables and Tailwind tokens."
            />
            <Feature
              icon={Component}
              title="Reusable System"
              desc="Composable components designed for scalability and clean architecture."
            />
          </div>
        </section>

        {/* ================= WHAT IT IS ================= */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            What is Neuctra UI?
          </h2>

          <p className="text-zinc-200 leading-relaxed">
            Neuctra UI is not just a component library - it&apos;s a complete UI
            system. It combines design tokens, accessibility, and developer
            experience into a single cohesive ecosystem.
          </p>

          <p className="text-zinc-200 leading-relaxed">
            Every component is built with performance, customization, and
            consistency in mind - making it suitable for both small projects
            and enterprise apps.
          </p>
        </section>

        {/* ================= EXAMPLE USAGE ================= */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Basic Usage Example
          </h2>

          <CodeBlock
            tabs={[
              {
                name: "JavaScript",
                language: "jsx",
                code: `import { Button } from "@neuctra/ui";

export default function App() {
  return (
    <div className="p-6">
      <Button>
        Hello Neuctra UI
      </Button>
    </div>
  );
}`,
              },
              {
                name: "TypeScript",
                language: "tsx",
                code: `import { Button } from "@neuctra/ui";

export default function App(): JSX.Element {
  return (
    <div className="p-6">
      <Button>
        Hello Neuctra UI
      </Button>
    </div>
  );
}`,
              },
            ]}
          />
        </section>

        {/* ================= NEXT STEP ================= */}
        <section className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-primary" size={18} />
            <h3 className="text-lg font-semibold text-white">What&apos;s Next?</h3>
          </div>

          <p className="text-zinc-200 text-sm">
            Move to <span className="text-white">Quick Start</span> to install
            and configure Neuctra UI in your project step by step.
          </p>

          {/* CTA Button */}
          <Link
            href="/docs/full-setup"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg
             bg-primary text-white text-sm font-medium
             hover:opacity-90 transition"
          >
            Go to full setup guide
            <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  );
};

/* ================= FEATURE CARD ================= */
const Feature = ({ icon: Icon, title, desc }) => (
  <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 hover:border-zinc-700 transition">
    <Icon className="text-primary mb-3" size={18} />
    <p className="text-white font-semibold">{title}</p>
    <p className="text-zinc-200 text-sm mt-1">{desc}</p>
  </div>
);

export default IntroductionDocPage;
