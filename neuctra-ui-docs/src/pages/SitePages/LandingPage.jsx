import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Zap,
  Code,
  Sparkles,
  Component,
  Palette,
  Layout,
  CheckCircle2,
  ShieldCheck,
  Layers3,
  BookOpenText,
  Workflow,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Metadata from "../../MetaData";

// Enhanced Circuit Line Component with animated nodes
const CircuitLine = ({
  top = 0,
  left = 0,
  delay = 0,
  width = 200,
  height = 200,
  color = "#00c214",
}) => {
  return (
    <motion.div
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
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <motion.path
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
        {/* Animated Circuit Node */}
        <motion.circle
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
    </motion.div>
  );
};

// Data Stream Component
const DataStream = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-px bg-gradient-to-b from-transparent via-primary to-transparent"
      style={{ height: "100vh", left: `${Math.random() * 100}%` }}
      initial={{ top: "-100vh" }}
      animate={{ top: "100vh" }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Glitch Text Effect
const GlitchText = ({ children, className = "" }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      {glitch && (
        <>
          <span
            className="absolute top-0 left-0 text-red-500 opacity-70"
            style={{ transform: "translate(-2px, -2px)" }}
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 text-cyan-500 opacity-70"
            style={{ transform: "translate(2px, 2px)" }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

// Floating Particles
const FloatingParticle = ({ delay = 0 }) => {
  const [windowHeight, setWindowHeight] = useState(1000);
  const x = Math.random() * 100;
  const duration = 5 + Math.random() * 5;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  return (
    <motion.div
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
    />
  );
};

// Grid Background
const GridBackground = () => {
  return (
    <div className="absolute inset-0 opacity-20">
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

// Feature Card
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative bg-zinc-950/80 backdrop-blur-sm border border-primary/30 rounded-lg p-6 hover:border-primary/60 transition-all duration-300">
        <div className="text-primary mb-3">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const componentGroups = [
  {
    title: "Foundational Components",
    description:
      "Buttons, inputs, badges, avatar, typography, and utility building blocks for everyday UI.",
    items: ["Button", "Input", "Textarea", "Badge", "Avatar", "Container"],
  },
  {
    title: "Data & Structure",
    description:
      "Components that organize and present information clearly for docs, dashboards, and apps.",
    items: ["Table", "List", "Accordion", "Dropdown", "Select"],
  },
  {
    title: "Interaction & Feedback",
    description:
      "Interactive primitives for user actions, states, and messaging in production workflows.",
    items: ["Toast", "Modal", "Drawer", "Checkbox Group", "Radio Group"],
  },
];

const buildFlow = [
  {
    title: "Install & Import",
    text: "Add Neuctra UI, import only what you need, and keep your bundle lean.",
  },
  {
    title: "Compose Interfaces",
    text: "Build pages by combining small primitives into reusable sections and screens.",
  },
  {
    title: "Customize Fast",
    text: "Use className and your design tokens for brand-consistent styling.",
  },
  {
    title: "Ship Confidently",
    text: "Use documented patterns and accessible defaults for reliable releases.",
  },
];

const qualityPillars = [
  "TypeScript-friendly APIs",
  "Accessible interaction patterns",
  "Reusable composable primitives",
  "Docs-first developer onboarding",
  "Modern dark-mode ready aesthetics",
  "Scalable for startups and enterprise",
];

// Main Page
const LandingPage = () => {
  return (
    <>
      <Metadata
        title="Neuctra UI — React UI Library for SaaS | Tailwind React Components"
        description="Build SaaS applications faster with Neuctra UI - the modern React UI library for SaaS. Get Tailwind React components for SaaS dashboard UI, authentication forms, and admin interfaces."
      />

      <div className="relative bg-black text-white w-full overflow-hidden">
        <GridBackground />

        {[...Array(8)].map((_, i) => (
          <DataStream key={i} delay={i * 0.5} />
        ))}

        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} />
        ))}

        <CircuitLine top="5%" left="5%" delay={0.2} width={150} height={150} />
        <CircuitLine top="5%" left="85%" delay={0.4} width={150} height={150} />
        <CircuitLine top="85%" left="5%" delay={0.8} width={150} height={150} />
        <CircuitLine top="85%" left="85%" delay={1.2} width={150} height={150} />
        <CircuitLine top="45%" left="0%" delay={1.5} width={200} height={100} />
        <CircuitLine top="45%" left="92%" delay={2.0} width={200} height={100} />

        {/* Hero Section */}
        <div className="relative z-10 min-h-screen md:px-0 px-4 py-10 flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-2 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-2"
              >
                <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-semibold mb-1">
                  Next-Gen UI Library
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold tracking-tight mb-2 leading-tight"
              >
                Craft{" "}
                <GlitchText>
                  <span className="text-primary">Stunning</span>
                </GlitchText>{" "}
                Interfaces with Ease
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-gray-200 mb-4 text-sm leading-relaxed"
              >
                Unlock the power of a next-generation UI component library
                designed for React and Next.js. Lightning-fast, visually
                polished, and endlessly customizable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex flex-wrap gap-4 text-sm"
              >
                <Link
                  to={"/docs"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 font-medium"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  to={"/templates"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-200 font-medium"
                >
                  <Code className="h-5 w-5" />
                  View Templates
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex gap-8 mt-4"
              >
                <div>
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-xs text-gray-500">Components</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1k+</div>
                  <div className="text-xs text-gray-500">Downloads</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">99%</div>
                  <div className="text-xs text-gray-500">Satisfaction</div>
                </div>
              </motion.div>
            </div>

            {/* Right 3D Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-96 h-96">
                <motion.div
                  className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute inset-8 border-2 border-primary/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-32 z-50 h-32 bg-gradient-to-br from-zinc-950 to-black rounded-2xl flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px var(--primary)",
                        "0 0 60px var(--primary)",
                        "0 0 20px var(--primary)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <img
                      src={"/logo.png"}
                      className="w-16 z-20 h-16 text-black"
                    />
                  </motion.div>
                </div>

                {[...Array(8)].map((_, i) => (
                  <motion.div
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
            </motion.div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 max-w-6xl mx-auto md:px-0 px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Why Choose <span className="text-primary">Neuctra</span>?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Lightning Fast"
              description="Optimized for performance with minimal bundle size and maximum efficiency — built with speed at its core."
              delay={0.2}
            />
            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="Developer First"
              description="Built with DX in mind. Clean APIs, full TypeScript support, and intuitive architecture for rapid building."
              delay={0.4}
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Fully Customizable"
              description="Adapt every component to your design system. Change colors, typography, and motion with ease."
              delay={0.6}
            />
            <FeatureCard
              icon={<Layout className="w-8 h-8" />}
              title="Responsive by Design"
              description="Every component is responsive out-of-the-box — from mobile to desktop, Neuctra UI just works."
              delay={0.8}
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8" />}
              title="Design System Ready"
              description="Seamlessly integrate your brand’s colors, fonts, and themes. Built to scale with your design tokens."
              delay={1.0}
            />
            <FeatureCard
              icon={<Component className="w-8 h-8" />}
              title="Composable Components"
              description="Create complex interfaces from small, reusable building blocks that stay consistent across projects."
              delay={1.2}
            />
          </div>
        </div>

        {/* Full Overview Sections */}
        <div className="relative z-10 max-w-6xl mx-auto md:px-0 px-4 pb-24 space-y-24">
          <section className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center"
            >
              Complete <span className="text-primary">Neuctra UI</span> Overview
            </motion.h3>
            <p className="text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed">
              Neuctra UI gives teams a complete UI foundation: core primitives,
              composable layout utilities, structured data components, and
              production-ready interactive patterns.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {componentGroups.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5"
                >
                  <h4 className="text-white font-semibold mb-2">{group.title}</h4>
                  <p className="text-zinc-400 text-sm mb-4">{group.description}</p>
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
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Workflow className="h-6 w-6 text-primary" />
                Build Workflow
              </h3>
              <div className="space-y-4">
                {buildFlow.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <span className="mt-0.5 h-6 min-w-6 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-white font-medium">{step.title}</p>
                      <p className="text-zinc-400 text-sm">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Quality Pillars
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {qualityPillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm text-zinc-300">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-950 to-zinc-900 p-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold mb-3 flex items-center gap-2">
                  <Layers3 className="h-7 w-7 text-primary" />
                  Designed for Real Products
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Whether you are building a SaaS dashboard, product website,
                  admin panel, internal tool, or design system starter,
                  Neuctra UI helps your team move from idea to production
                  faster with reliable building blocks.
                </p>
              </div>
              <div className="space-y-2">
                {[
                  "SaaS dashboards",
                  "Admin panels",
                  "Documentation portals",
                  "Marketing websites",
                  "Design system foundations",
                ].map((useCase) => (
                  <div
                    key={useCase}
                    className="rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-300"
                  >
                    {useCase}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="text-center rounded-2xl border border-primary/30 bg-primary/5 p-8 space-y-5">
            <h3 className="text-3xl font-bold">Ready to build with Neuctra UI?</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Start with the docs, explore component APIs, and integrate
              reusable patterns into your current React workflow.
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
