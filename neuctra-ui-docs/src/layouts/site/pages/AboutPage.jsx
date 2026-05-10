import React from "react";
import {
  Code,
  Rocket,
  Palette,
  Cpu,
  Zap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Container } from "@neuctra/ui";
import Metadata from "../../../MetaData";

const features = [
  {
    icon: <Code className="h-5 w-5 text-primary" />,
    title: "Developer-first APIs",
    description:
      "Clear component APIs with TypeScript support for fast implementation and safer refactors.",
  },
  {
    icon: <Palette className="h-5 w-5 text-primary" />,
    title: "Consistent Design Language",
    description:
      "Reusable primitives and patterns that keep your product visually cohesive across pages.",
  },
  {
    icon: <Cpu className="h-5 w-5 text-primary" />,
    title: "Performance-minded",
    description:
      "Lightweight, tree-shakeable exports that help teams avoid unnecessary UI overhead.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Accessible by Default",
    description:
      "Keyboard-friendly and semantic building blocks so your interfaces work for more users.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Reliable Foundation",
    description:
      "Production-ready components designed for dashboards, docs, SaaS products, and admin apps.",
  },
  {
    icon: <Rocket className="h-5 w-5 text-primary" />,
    title: "Ship Faster",
    description:
      "Spend less time rebuilding common patterns and more time delivering product features.",
  },
];

const principles = [
  "Simple APIs over unnecessary complexity",
  "Strong defaults with full customization",
  "Composable components for real product workflows",
  "Practical documentation with copy-ready examples",
];

const techStack = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Radix UI",
  "Framer Motion",
  "Lucide Icons",
  "ESBuild",
  "Jest",
];

const AboutPage = () => {
  return (
    <>
      <Metadata
        title="About — Neuctra UI"
        description="Learn what Neuctra UI is, the principles behind it, and why teams use it to ship modern interfaces faster."
      />

      <div className="font-primary text-gray-200 min-h-screen pt-14 pb-16">
        <Container className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 space-y-16">
          <section className="relative overflow-hidden rounded-2xl  border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 md:p-10">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(0,194,20,0.14),transparent_45%)]" />
            <div className="relative space-y-6">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                About the project
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Building modern interfaces with{" "}
                <span className="text-primary">Neuctra UI</span>
              </h1>
              <p className="text-base md:text-lg text-zinc-200 leading-relaxed">
                Neuctra UI is a modern React component library focused on
                usability, performance, and consistency. It helps teams build
                polished product interfaces quickly without sacrificing control.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link to="/docs">
                  <Button iconAfter={<ArrowRight size={16} />}>
                    Explore Docs
                  </Button>
                </Link>
                <a
                  href="https://www.neuctra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Visit Neuctra</Button>
                </a>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-7">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Our Mission
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  We created Neuctra UI to solve a common problem: teams need UI
                  components that are fast to use, easy to customize, and
                  cleanly typed.
                </p>
                <p>
                  The goal is to provide practical building blocks that work in
                  real products, from startup MVPs to enterprise dashboards.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-7">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Core Principles
              </h2>
              <ul className="space-y-3">
                {principles.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">
              Why teams choose Neuctra UI
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold text-white">Tech Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-center"
                >
                  <span className="font-mono text-sm text-zinc-200">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-primary/30 bg-gradient-to-r from-zinc-900 to-zinc-900/70 p-8 text-center space-y-5">
            <h2 className="text-2xl font-semibold text-white">
              Join the Neuctra UI community
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Neuctra UI is open-source and community-driven. Contributions,
              feedback, and issue reports help shape the next releases.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.neuctra.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Visit Neuctra</Button>
              </a>
              <Link to="/contact">
                <Button>Contact the Team</Button>
              </Link>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default AboutPage;
