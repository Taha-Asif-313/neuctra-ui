import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import {
  Rocket,
  Palette,
  Component,
  Terminal,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

const IntroductionDocPage = () => {
  return (
    <>
      <Metadata
        title="Introduction — React UI Library for SaaS | Neuctra UI"
        description="Discover Neuctra UI, the modern React UI library for SaaS applications. Learn how our Tailwind React components help build SaaS dashboard UI and authentication interfaces."
      />

      <div className="text-gray-200 min-h-screen">
        <div className="space-y-12">
          {/* ================= HERO ================= */}
          <section>
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Build modern UIs with <code className="text-primary">@neuctra/ui</code>
            </h1>

            <p className="mt-4 text-zinc-200 max-w-2xl leading-relaxed">
              Neuctra UI is a modern React UI library for SaaS applications, powered by Tailwind
              CSS. It helps developers build clean, scalable SaaS dashboard UI, authentication forms, 
              and customizable interfaces without wasting time on repetitive UI work. Perfect for 
              startups looking for reusable SaaS components React.
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
              The fastest way to start is using the official CLI. It
              automatically: installs packages, configures Tailwind, sets up
              theme system, and wraps your app with providers.
            </p>

            <CodeBlock
              language="bash"
              code={`npx @neuctra/ui-cli@latest init`}
            />
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
              Neuctra UI is not just a component library — it's a complete UI
              system. It combines design tokens, accessibility, and developer
              experience into a single cohesive ecosystem.
            </p>

            <p className="text-zinc-200 leading-relaxed">
              Every component is built with performance, customization, and
              consistency in mind — making it suitable for both small projects
              and enterprise apps.
            </p>
          </section>

          {/* ================= EXAMPLE USAGE ================= */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Basic Usage Example
            </h2>

            <CodeBlock
              language="tsx"
              code={`import { Button } from "@neuctra/ui";

export default function App() {
  return (
    <div className="p-6">
      <Button>
        Hello Neuctra UI
      </Button>
    </div>
  );
}`}
            />
          </section>

          {/* ================= NEXT STEP ================= */}
          <section className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-primary" size={18} />
              <h3 className="text-lg font-semibold text-white">What’s Next?</h3>
            </div>

            <p className="text-zinc-200 text-sm">
              Move to <span className="text-white">Quick Start</span> to install
              and configure Neuctra UI in your project step by step.
            </p>

            {/* CTA Button */}
            <Link
              to="/docs/quick-start"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg 
               bg-primary text-white text-sm font-medium 
               hover:opacity-90 transition"
            >
              Go to Quick Guide
              <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </div>
    </>
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
