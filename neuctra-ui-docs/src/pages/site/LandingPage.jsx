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
  Gauge,
  LockKeyhole,
  TableProperties,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import Metadata from "../../MetaData";

const seoKeywords = [
  "React UI library for SaaS",
  "SaaS dashboard UI React Tailwind",
  "React authentication UI Tailwind",
  "Tailwind admin dashboard React",
  "React form builder Tailwind",
  "Tailwind React components for SaaS",
  "SaaS admin dashboard components",
  "React SaaS component library",
].join(", ");

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
        {/* Animated Circuit Node */}
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

// Data Stream Component
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

// Floating Particles
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

// Grid Background
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

// Feature Card
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <Motion.div
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
    </Motion.div>
  );
};

const componentGroups = [
  {
    title: "React UI Library for SaaS",
    description:
      "Buttons, inputs, badges, avatar, typography, and layout primitives for polished SaaS product screens.",
    items: ["Button", "Input", "Textarea", "Badge", "Avatar", "Container"],
  },
  {
    title: "SaaS Dashboard UI React Tailwind",
    description:
      "Tables, lists, selects, accordions, and dropdowns for metrics, customers, billing, and admin workflows.",
    items: ["Table", "List", "Accordion", "Dropdown", "Select"],
  },
  {
    title: "React Authentication UI Tailwind",
    description:
      "Accessible form controls, modals, drawers, toasts, checkboxes, and radio groups for login and onboarding flows.",
    items: ["Toast", "Modal", "Drawer", "Checkbox Group", "Radio Group"],
  },
];

const buildFlow = [
  {
    title: "Install a SaaS-ready React UI library",
    text: "Add Neuctra UI, import only the Tailwind React components you need, and keep product pages lean.",
  },
  {
    title: "Compose dashboard and admin interfaces",
    text: "Build SaaS dashboard UI in React and Tailwind by combining small primitives into reusable screens.",
  },
  {
    title: "Customize authentication and form flows",
    text: "Use className and design tokens to create React authentication UI and React form builder layouts.",
  },
  {
    title: "Ship with Core Web Vitals in mind",
    text: "Use documented patterns, accessible defaults, and lightweight components for reliable production releases.",
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

const seoUseCases = [
  {
    icon: <TableProperties className="h-6 w-6 text-primary" />,
    title: "Tailwind admin dashboard React",
    text: "Create admin panels with responsive tables, filters, sidebars, empty states, badges, and action menus that feel consistent across every product area.",
  },
  {
    icon: <LockKeyhole className="h-6 w-6 text-primary" />,
    title: "React authentication UI Tailwind",
    text: "Design login, signup, password reset, OTP, profile, and account security screens with reusable React form controls and accessible feedback.",
  },
  {
    icon: <Workflow className="h-6 w-6 text-primary" />,
    title: "React form builder Tailwind",
    text: "Assemble product forms, settings pages, onboarding steps, and internal workflows with inputs, textareas, selects, checkboxes, radio groups, modals, and toasts.",
  },
  {
    icon: <Gauge className="h-6 w-6 text-primary" />,
    title: "Performance-focused SaaS UI",
    text: "Use composable components, stable layouts, semantic content, optimized motion, and readable markup to support strong Core Web Vitals scores.",
  },
];

const streamPositions = [8, 18, 31, 44, 57, 70, 83, 94];
const particlePositions = [
  4, 11, 17, 23, 29, 34, 41, 48, 53, 59, 64, 69, 74, 79, 84, 88, 92, 95, 97, 99,
];

// Main Page
const LandingPage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <Metadata
        title="React UI Library for SaaS | SaaS Dashboard UI React Tailwind"
        description="Neuctra UI is a React UI library for SaaS teams building SaaS dashboard UI, React authentication UI, Tailwind admin dashboards, and React form builder interfaces."
        keywords={seoKeywords}
        ogTitle="Neuctra UI - React UI Library for SaaS"
        ogDescription="Build SaaS dashboard UI with React and Tailwind components for authentication, admin dashboards, form builders, and production-ready app screens."
        twitterTitle="React UI Library for SaaS - Neuctra UI"
        twitterDescription="Tailwind React components for SaaS dashboard UI, authentication screens, admin panels, and form builder workflows."
        image="https://ui.neuctra.com/og-image.png"
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

        {/* Hero Section */}
        <div className="relative z-10 min-h-screen md:px-0 px-4 py-10 flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-2 items-center">
              {/* Left Content */}
              <div>
                <Motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mb-2"
                >
                  <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-semibold mb-1">
                    React UI library for SaaS teams
                  </span>
                </Motion.div>

                <Motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="text-5xl md:text-6xl font-bold tracking-tight mb-2 leading-tight"
                >
                  Build <span className="text-primary">SaaS Dashboard UI</span>{" "}
                  with React and Tailwind
                </Motion.h1>

                <Motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-gray-200 mb-4 text-sm leading-relaxed"
                >
                  Neuctra UI helps teams ship SaaS dashboard UI React Tailwind
                  screens, React authentication UI Tailwind flows, Tailwind
                  admin dashboard React layouts, and React form builder Tailwind
                  workflows with reusable, accessible components.
                </Motion.p>

                <Motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                </Motion.div>

                <Motion.div
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
                </Motion.div>

                <Motion.div
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
                </Motion.div>
              </div>

              {/* Right 3D Logo Animation */}
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
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <img
                        src={"/logo.png"}
                        alt="Neuctra UI logo"
                        className="w-16 z-20 h-16 text-black"
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

        {/* Features */}
        <div className="relative z-10 max-w-6xl mx-auto md:px-0 px-4 py-20">
          <Motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Why Choose <span className="text-primary">Neuctra</span>?
          </Motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Core Web Vitals Friendly"
              description="Built with lightweight React components, stable layouts, reduced decorative work, and performance-minded defaults for fast SaaS pages."
              delay={0.2}
            />
            <FeatureCard
              icon={<Code className="w-8 h-8" />}
              title="Developer First React APIs"
              description="Clean component APIs, TypeScript-friendly usage, and predictable Tailwind customization for fast product development."
              delay={0.4}
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="SaaS Brand Customization"
              description="Adapt colors, typography, spacing, dark mode, and interaction states to match your SaaS design system."
              delay={0.6}
            />
            <FeatureCard
              icon={<Layout className="w-8 h-8" />}
              title="Responsive SaaS Screens"
              description="Create dashboards, admin pages, auth flows, and forms that work across mobile, tablet, and desktop layouts."
              delay={0.8}
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8" />}
              title="Design System Ready"
              description="Integrate brand tokens and reusable patterns for consistent SaaS dashboard UI and admin interfaces."
              delay={1.0}
            />
            <FeatureCard
              icon={<Component className="w-8 h-8" />}
              title="Composable Product Components"
              description="Create complex SaaS interfaces from small building blocks that stay consistent across projects and teams."
              delay={1.2}
            />
          </div>
        </div>

        {/* Full Overview Sections */}
        <div className="relative z-10 max-w-6xl mx-auto md:px-0 px-4 pb-24 space-y-24">
          <section className="space-y-6">
            <Motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center"
            >
              Complete <span className="text-primary">SaaS React UI</span>{" "}
              Overview
            </Motion.h3>
            <p className="text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed">
              Neuctra UI gives SaaS teams a complete React UI foundation: core
              primitives, Tailwind admin dashboard React patterns, structured
              data components, React authentication UI Tailwind flows, and
              production-ready interactive states.
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
                  <h4 className="text-white font-semibold mb-2">
                    {group.title}
                  </h4>
                  <p className="text-zinc-400 text-sm mb-4">
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

          <section className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Built Around the SaaS UI Searches That Matter
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                From SaaS dashboard UI React Tailwind pages to React form
                builder Tailwind workflows, Neuctra UI gives you practical
                components for the screens real software teams ship every week.
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

          {/* Workflow & Quality Pillars  */}
          <section className="relative z-10 grid lg:grid-cols-1 gap-8 xl:gap-10 items-start">
            {/* ---------------- Workflow ---------------- */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8">
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <span className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                      Development Flow
                    </span>

                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      Build Faster. Ship Cleaner.
                    </h3>
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
                      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-primary to-primary/20 opacity-70" />

                      <div className="flex gap-4">
                        {/* Step Number */}
                        <div className="relative flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-white shadow-lg shadow-primary/20">
                            {index + 1}
                          </div>

                          {index !== buildFlow.length - 1 && (
                            <div className="absolute left-1/2 top-12 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 to-transparent" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white transition-colors group-hover/item:text-primary">
                            {step.title}
                          </h4>

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

            {/* ---------------- Quality Pillars ---------------- */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8">
              {/* Glow */}
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-70" />

              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <span className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                      Quality Standards
                    </span>

                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      Built for Modern SaaS Teams
                    </h3>
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
                      {/* Hover Glow */}
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

                {/* Bottom Highlight */}
                <div className="mt-8 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4">
                  <p className="text-sm leading-7 text-zinc-300">
                    Designed for scalable products, rapid iteration, and premium
                    user experiences across dashboards, authentication, forms,
                    and admin interfaces.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#09090B] px-6 py-8 md:px-10 md:py-12">

            {/* Floating Glow */}
            <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
              {/* ---------------- Left Content ---------------- */}
              <div>
                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium capitalize tracking-[0.18em] text-primary">
                  <Layers3 className="h-4 w-4" />
                  Product-Focused UI System
                </div>

                {/* Heading */}
                <h3 className="max-w-2xl text-4xl md:text-5xl font-bold leading-tight text-white">
                  Designed for
                  <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                    {" "}
                    Modern Products
                  </span>
                </h3>

                {/* Description */}
                <p className="mt-6 max-w-2xl text-[15px] md:text-base leading-8 text-zinc-400">
                  Build polished SaaS dashboard interfaces, scalable admin
                  panels, authentication flows, documentation systems, and
                  advanced React workflows with production-ready UI primitives
                  engineered for speed, consistency, and modern product
                  experiences.
                </p>

                {/* Stats / Highlights */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {[
                    "React + Tailwind",
                    "Production Ready",
                    "Dark Mode Native",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
                    >
                      <span className="text-sm font-medium text-zinc-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---------------- Right Use Cases ---------------- */}
              <div className="relative">
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                  {/* Header */}
                  <div className="relative mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium capitalize tracking-[0.18em] text-primary">
                        Use Cases
                      </p>
                      <h4 className="mt-2 text-2xl font-bold text-white">
                        Ready for Any Workflow
                      </h4>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                      <Layers3 className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="relative grid gap-3">
                    {[
                      "SaaS dashboards",
                      "Admin panels",
                      "Documentation portals",
                      "Marketing websites",
                      "Design system foundations",
                    ].map((useCase, index) => (
                      <div
                        key={useCase}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-zinc-900"
                      >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative flex items-center gap-4">
                          {/* Number */}
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                            0{index + 1}
                          </div>

                          {/* Text */}
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

          <section className="text-center rounded-2xl border border-primary/30 bg-primary/5 p-8 space-y-5">
            <h3 className="text-3xl font-bold">
              Ready to build with Neuctra UI?
            </h3>
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
