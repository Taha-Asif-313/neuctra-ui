import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Zap,
  Code,
  Sparkles,
  Component,
  Palette,
  Layout,
  ShieldCheck,
  Layers3,
  BookOpenText,
  Workflow,
  Rocket,
  Gauge,
  LockKeyhole,
  TableProperties,
  RocketIcon,
  Bot,
  Copy,
  Check,
  Terminal,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import Metadata from "../../../MetaData";

const seoKeywords = [
  "Neuctra UI",
  "React UI library",
  "React component library",
  "React UI library for SaaS",
  "Tailwind CSS React components",
  "React Tailwind UI components",
  "SaaS UI library",
  "React design system",
  "React dashboard components",
  "Tailwind dashboard UI",
  "React admin dashboard",
  "React authentication UI",
  "React form components",
  "AI coding assistant UI library",
  "MCP UI library",
  "Neuctra UI MCP",
  "Model Context Protocol UI",
].join(", ");

/* -------------------------------------------------------------------------- */
/* Circuit Line                                                               */
/* -------------------------------------------------------------------------- */

const CircuitLine = ({
  top = 0,
  left = 0,
  delay = 0,
  width = 200,
  height = 200,
  color = "#00c214",
}) => {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute pointer-events-none"
      style={{ top, left }}
      aria-hidden="true"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <Motion.path
          d={`M0 ${height / 2} H${width} M${width / 2} 0 V${height}`}
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <Motion.circle
          cx={width / 2}
          cy={height / 2}
          r="3"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{
            duration: 2,
            delay: delay + 1,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </svg>
    </Motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Data Stream                                                                */
/* -------------------------------------------------------------------------- */

const DataStream = ({ delay = 0, left = 0, duration = 4 }) => {
  return (
    <Motion.div
      className="absolute w-px bg-gradient-to-b from-transparent via-primary to-transparent"
      style={{ height: "100vh", left: `${left}%` }}
      initial={{ top: "-100vh" }}
      animate={{ top: "100vh" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    />
  );
};

/* -------------------------------------------------------------------------- */
/* Floating Particles                                                         */
/* -------------------------------------------------------------------------- */

const FloatingParticle = ({ delay = 0, x = 0, duration = 7 }) => {
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  return (
    <Motion.div
      className="absolute w-1 h-1 bg-primary rounded-full"
      style={{ left: `${x}%`, bottom: 0 }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: -windowHeight,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    />
  );
};

/* -------------------------------------------------------------------------- */
/* Grid Background                                                            */
/* -------------------------------------------------------------------------- */

const GridBackground = () => {
  return (
    <div className="absolute inset-0 opacity-20" aria-hidden="true">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Feature Card                                                               */
/* -------------------------------------------------------------------------- */

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />

      <div className="relative h-full bg-zinc-950/80 backdrop-blur-sm border border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-all duration-300">
        <div className="text-primary mb-4">{icon}</div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>

        <p className="text-gray-400 text-sm leading-6">{description}</p>
      </div>
    </Motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const componentGroups = [
  {
    title: "Foundations",
    description:
      "Start with the building blocks used throughout modern React products.",
    items: [
      "Button",
      "Text",
      "Container",
      "Card",
      "Divider",
      "Badge",
      "Chip",
      "Kbd",
    ],
  },
  {
    title: "Data & Navigation",
    description:
      "Build interfaces for dashboards, settings, products, users, and other data-heavy screens.",
    items: ["List", "Table", "Accordion", "Stat", "Timeline", "Carousel"],
  },
  {
    title: "Feedback & Interaction",
    description:
      "Handle actions, states, empty screens, alerts, and interactive product workflows.",
    items: ["Alert", "Empty State", "Modal", "Drawer", "Toast", "Dropdown"],
  },
];

const buildFlow = [
  {
    title: "Install Neuctra UI",
    text: "Add the library to your React project and start composing interfaces from reusable components.",
  },
  {
    title: "Build your product screens",
    text: "Combine primitives into dashboards, settings pages, forms, authentication flows, landing pages, and internal tools.",
  },
  {
    title: "Customize the system",
    text: "Adapt colors, typography, spacing, states, and component styling to match your own product.",
  },
  {
    title: "Give your AI coding tool context",
    text: "Connect the Neuctra UI MCP server so compatible AI development tools can work with your component library knowledge.",
  },
];

const qualityPillars = [
  "React-first component APIs",
  "Tailwind CSS friendly",
  "Accessible interaction patterns",
  "Composable primitives",
  "Responsive by design",
  "Dark mode ready",
];

const seoUseCases = [
  {
    icon: <TableProperties className="h-6 w-6 text-primary" />,
    title: "SaaS dashboards",
    text: "Build analytics, billing, customer, project, and administration screens from consistent tables, cards, lists, stats, and layout primitives.",
  },
  {
    icon: <LockKeyhole className="h-6 w-6 text-primary" />,
    title: "Authentication flows",
    text: "Create polished login, signup, account, verification, password, and security interfaces using reusable form and feedback components.",
  },
  {
    icon: <Workflow className="h-6 w-6 text-primary" />,
    title: "Product workflows",
    text: "Compose settings pages, onboarding flows, forms, modals, drawers, notifications, and interactive states without rebuilding every pattern.",
  },
  {
    icon: <Gauge className="h-6 w-6 text-primary" />,
    title: "Design systems",
    text: "Use reusable primitives as a foundation for a consistent product interface instead of maintaining isolated UI patterns across every screen.",
  },
];

const streamPositions = [8, 18, 31, 44, 57, 70, 83, 94];

const particlePositions = [
  4, 11, 17, 23, 29, 34, 41, 48, 53, 59, 64, 69, 74, 79, 84, 88, 92, 95, 97, 99,
];

/* -------------------------------------------------------------------------- */
/* MCP Installation                                                           */
/* -------------------------------------------------------------------------- */

const MCP_COMMAND = "npx @neuctra/ui-mcp@latest";

const INIT_COMMAND = "npx @neuctra/ui-cli@latest init";

const MCPConfig = `{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp@latest"]
    }
  }
}`;

/* -------------------------------------------------------------------------- */
/* Main Page                                                                  */
/* -------------------------------------------------------------------------- */

const LandingPage = () => {
  const shouldReduceMotion = useReducedMotion();

  const [copiedCommand, setCopiedCommand] = useState(false);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(MCP_COMMAND);
      setCopiedCommand(true);

      setTimeout(() => {
        setCopiedCommand(false);
      }, 2000);
    } catch {
      setCopiedCommand(false);
    }
  };

  return (
    <>
      <Metadata
        title="Neuctra UI — React UI Library & MCP for Modern Products"
        description="Neuctra UI is a React UI library for building SaaS products, dashboards, admin panels, forms, authentication flows, and responsive interfaces with reusable components. Connect Neuctra UI MCP to give AI coding tools context about your UI system."
        keywords={seoKeywords}
      />

      <div className="relative bg-black text-white w-full overflow-hidden">
        <GridBackground />

        {!shouldReduceMotion &&
          streamPositions.map((left, i) => (
            <DataStream
              key={left}
              left={left}
              delay={i * 0.45}
              duration={3.5 + (i % 3) * 0.5}
            />
          ))}

        {!shouldReduceMotion &&
          particlePositions.map((x, i) => (
            <FloatingParticle
              key={x}
              x={x}
              delay={i * 0.25}
              duration={6 + (i % 5)}
            />
          ))}

        <CircuitLine top="5%" left="5%" delay={0.2} width={150} height={150} />

        <CircuitLine top="5%" left="85%" delay={0.4} width={150} height={150} />

        <CircuitLine top="85%" left="5%" delay={0.8} width={150} height={150} />

        <CircuitLine
          top="85%"
          left="85%"
          delay={1.2}
          width={150}
          height={150}
        />

        <CircuitLine top="45%" left="0%" delay={1.5} width={200} height={100} />

        <CircuitLine
          top="45%"
          left="92%"
          delay={2.0}
          width={200}
          height={100}
        />

        {/* ------------------------------------------------------------------ */}
        {/* HERO                                                               */}
        {/* ------------------------------------------------------------------ */}

        <div className="relative z-10 min-h-screen px-4 py-10 flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-2 items-center">
              {/* Left Content */}

              <div>
                <Motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mb-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-semibold">
                      <Component className="h-3.5 w-3.5" />
                      React UI Library
                    </span>

                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-950 border border-zinc-800 rounded-full text-zinc-300 text-xs font-semibold">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                      MCP Ready
                    </span>
                  </div>
                </Motion.div>

                <Motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-none"
                >
                  Build better
                  <span className="text-primary"> React interfaces.</span>
                </Motion.h1>

                <Motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-gray-300 mb-5 text-sm md:text-base max-w-xl"
                >
                  Neuctra UI is a reusable React component library for
                  dashboards, SaaS products, admin panels, forms, authentication
                  flows, and modern web interfaces.
                </Motion.p>

                {/* MCP Hero Callout */}

                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative group mb-5 max-w-xl"
                >
                  <div className="absolute inset-0 bg-primary/10 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300" />

                  <div className="relative rounded-xl border border-primary/20 bg-zinc-950/90 backdrop-blur-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-primary" />

                        <span className="text-sm font-semibold text-white">
                          Neuctra UI CLI
                        </span>

                        <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          Quick Setup
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-zinc-300 mb-3">
                        Set up Neuctra UI in your React project automatically
                        with the official CLI. It configures the required
                        dependencies, Tailwind CSS, theme system, and project
                        files for you.
                      </p>

                      <div className="flex items-center gap-2 rounded-lg bg-black border border-zinc-800 px-3 py-2.5">
                        <Terminal className="h-4 w-4 text-primary shrink-0" />

                        <code className="text-xs md:text-sm text-zinc-200 overflow-x-auto whitespace-nowrap flex-1">
                          {INIT_COMMAND}
                        </code>

                        <button
                          type="button"
                          onClick={copyCommand}
                          aria-label="Copy Neuctra UI setup command"
                          className="shrink-0 p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          {copiedCommand ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Motion.div>

                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="flex flex-wrap gap-3 text-sm"
                >
                  <Link
                    to="/docs"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 font-medium"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <Link
                    to="/docs/mcp"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200 font-medium"
                  >
                    <Bot className="h-5 w-5 text-primary" />
                    Explore MCP
                  </Link>

                  <a
                    href="https://www.neuctra.com/space?tag=neuctra%20space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-900 bg-zinc-950 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200 font-medium"
                  >
                    <RocketIcon className="h-5 w-5" />
                    Neuctra Space
                  </a>
                </Motion.div>

                <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="flex flex-wrap gap-8 mt-6"
                >
                  <div>
                    <div className="text-3xl font-bold text-primary">20+</div>
                    <div className="text-xs text-gray-500">Components</div>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-primary">React</div>
                    <div className="text-xs text-gray-500">First</div>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-primary">MCP</div>
                    <div className="text-xs text-gray-500">AI Ready</div>
                  </div>
                </Motion.div>
              </div>

              {/* Right Logo Animation */}

              <Motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative hidden lg:flex items-center justify-center"
              >
                <div className="relative w-96 h-96">
                  <Motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <Motion.div
                    className="absolute inset-8 border-2 border-primary/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Motion.div
                      className="w-32 z-50 h-32 bg-gradient-to-br from-zinc-950 to-black rounded-2xl flex items-center justify-center shadow-2xl"
                      animate={{
                        boxShadow: [
                          "0 0 20px var(--primary)",
                          "0 0 60px var(--primary)",
                          "0 0 20px var(--primary)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    >
                      <img
                        src="/logo.png"
                        alt="Neuctra UI React component library logo"
                        className="w-16 z-20 h-16"
                        width="64"
                        height="64"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </Motion.div>
                  </div>

                  {[...Array(8)].map((_, i) => (
                    <Motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-primary rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        marginTop: "-6px",
                        marginLeft: "-6px",
                      }}
                      animate={{
                        x: [0, Math.cos((i * Math.PI) / 4) * 180],
                        y: [0, Math.sin((i * Math.PI) / 4) * 180],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </Motion.div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FEATURES                                                           */}
        {/* ------------------------------------------------------------------ */}

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <Motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-5"
          >
            Everything you need to build
            <span className="text-primary"> product UI.</span>
          </Motion.h2>

          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
            Neuctra UI gives you the reusable pieces needed to move from an
            empty React project to a consistent product interface.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Build Faster"
              description="Skip repetitive UI work and spend more time on the product logic that actually makes your application different."
              delay={0.2}
            />

            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="React First"
              description="Use predictable component APIs that fit naturally into modern React applications and existing project structures."
              delay={0.4}
            />

            <FeatureCard
              icon={<Palette className="w-8 h-8" />}
              title="Make It Yours"
              description="Shape the components around your brand instead of forcing your product into someone else's visual system."
              delay={0.6}
            />

            <FeatureCard
              icon={<Layout className="w-8 h-8" />}
              title="Responsive Interfaces"
              description="Build interfaces that remain useful and readable across mobile, tablet, and desktop screens."
              delay={0.8}
            />

            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Accessible Patterns"
              description="Start from reusable interaction patterns designed with keyboard navigation, states, and usability in mind."
              delay={1.0}
            />

            <FeatureCard
              icon={<Bot className="w-8 h-8" />}
              title="AI-Aware Workflow"
              description="Connect the Neuctra UI MCP server so compatible AI coding tools can work with your UI library context."
              delay={1.2}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* COMPONENT OVERVIEW                                                 */}
        {/* ------------------------------------------------------------------ */}

        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-24 space-y-24">
          <section className="space-y-6">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center"
            >
              A component library that grows with your product
            </Motion.h2>

            <p className="text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed">
              Start with simple primitives and combine them into complete
              product interfaces. Neuctra UI is designed around composition, so
              your components can evolve with the rest of your application.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {componentGroups.map((group, index) => (
                <Motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5"
                >
                  <h3 className="text-white font-semibold mb-2">
                    {group.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mb-4 leading-6">
                    {group.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs border border-zinc-700 bg-zinc-900 px-2.5 py-1 rounded-full text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Motion.div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* MCP SECTION                                                      */}
          {/* ---------------------------------------------------------------- */}

          <section className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-primary/[0.04] px-6 py-8 md:px-10 md:py-12">
            <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  <Bot className="h-4 w-4" />
                  Model Context Protocol
                </div>

                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  Your AI coding tool can
                  <span className="text-primary"> understand Neuctra UI.</span>
                </h2>

                <p className="mt-5 text-zinc-400 text-sm md:text-base leading-7 max-w-xl">
                  The Neuctra UI MCP server brings your UI library context into
                  compatible AI development workflows. Instead of repeatedly
                  explaining component names, patterns, and usage, connect the
                  MCP server and let your coding assistant work with that
                  context directly.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/docs/mcp"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 font-medium"
                  >
                    MCP Documentation
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/docs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200 font-medium"
                  >
                    View Components
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-zinc-800 bg-black overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-primary" />

                      <span className="text-xs text-zinc-400">Install MCP</span>
                    </div>

                    <button
                      type="button"
                      onClick={copyCommand}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedCommand ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-primary" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="overflow-x-auto">
                      <code className="text-sm text-zinc-200 whitespace-nowrap">
                        <span className="text-primary">$</span> {MCP_COMMAND}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-4 w-4 text-primary" />

                    <span className="text-sm font-semibold">
                      MCP configuration
                    </span>
                  </div>

                  <pre className="overflow-x-auto text-xs leading-6 text-zinc-400">
                    <code>{MCPConfig}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* USE CASES                                                        */}
          {/* ---------------------------------------------------------------- */}

          <section className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Built for the interfaces you actually ship
              </h2>

              <p className="text-zinc-400 leading-relaxed">
                From the first dashboard screen to a complete SaaS product,
                Neuctra UI gives you reusable building blocks instead of
                isolated templates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {seoUseCases.map((item, index) => (
                <Motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5"
                >
                  <div className="mb-4">{item.icon}</div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-400">
                    {item.text}
                  </p>
                </Motion.article>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* WORKFLOW                                                         */}
          {/* ---------------------------------------------------------------- */}

          <section className="relative z-10 grid lg:grid-cols-1 gap-8 xl:gap-10 items-start">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8">
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <span className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                      Development Flow
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      From idea to interface
                    </h2>
                  </div>

                  <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <Workflow className="h-7 w-7 text-primary" />
                  </div>
                </div>

                <div className="space-y-5">
                  {buildFlow.map((step, index) => (
                    <div
                      key={step.title}
                      className="group/item relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-zinc-900"
                    >


                      <div className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                            {index + 1}
                          </div>

                       
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white transition-colors group-hover/item:text-primary">
                            {step.title}
                          </h3>

                          <p className="mt-2 text-sm leading-7 text-zinc-400">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality */}

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8">
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-70" />

              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <span className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                      Quality Standards
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      A foundation, not a cage
                    </h2>
                  </div>

                  <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <ShieldCheck className="h-7 w-7 text-primary" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {qualityPillars.map((pillar, index) => (
                    <div
                      key={pillar}
                      className="group/pillar relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-zinc-900"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/pillar:opacity-100" />

                      <div className="relative flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <span className="text-sm font-bold">
                            0{index + 1}
                          </span>
                        </div>

                        <div>
                          <p className="text-sm font-medium leading-6 text-zinc-200">
                            {pillar}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4">
                  <p className="text-sm leading-7 text-zinc-300">
                    Use Neuctra UI where it makes sense, customize what you
                    need, and keep ownership of your product's visual identity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* PRODUCT SECTION                                                   */}
          {/* ---------------------------------------------------------------- */}

          <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#09090B] px-6 py-8 md:px-10 md:py-12">
            <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium capitalize tracking-[0.18em] text-primary">
                  <Layers3 className="h-4 w-4" />
                  Product-Focused UI System
                </div>

                <h2 className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight text-white">
                  Your product should own the design.
                </h2>

                <p className="mt-6 max-w-2xl text-[15px] md:text-base leading-8 text-zinc-400">
                  Neuctra UI gives developers a solid starting point without
                  taking over the identity of the application. Build consistent
                  interfaces, introduce your own brand, and keep your components
                  working together as the product grows.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  {["React + Tailwind", "Reusable Components", "MCP Ready"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
                      >
                        <span className="text-sm font-medium text-zinc-200">
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                  <div className="relative mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium capitalize tracking-[0.18em] text-primary">
                        Use Cases
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-white">
                        Start anywhere
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <Layers3 className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="relative grid gap-3">
                    {[
                      "SaaS dashboards",
                      "Admin panels",
                      "Authentication flows",
                      "Documentation websites",
                      "Marketing interfaces",
                    ].map((useCase, index) => (
                      <div
                        key={useCase}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-zinc-900"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                            0{index + 1}
                          </div>

                          <p className="text-sm md:text-base font-medium text-zinc-200">
                            {useCase}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* FINAL CTA                                                        */}
          {/* ---------------------------------------------------------------- */}

          <section className="text-center rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-10 space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold">
              Build your next interface with Neuctra UI.
            </h2>

            <p className="text-zinc-400 max-w-2xl mx-auto leading-7">
              Explore the components, read the documentation, or connect the MCP
              server and bring Neuctra UI into your AI-assisted development
              workflow.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/docs/introduction"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 font-medium"
              >
                <BookOpenText className="h-5 w-5" />
                Read Documentation
              </Link>

              <Link
                to="/docs/mcp"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200 font-medium"
              >
                <Bot className="h-5 w-5 text-primary" />
                Setup MCP
              </Link>

              <Link
                to="/docs/layout-playground"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200 font-medium"
              >
                <Rocket className="h-5 w-5" />
                Open Playground
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
