"use client";

import { useRef } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Badge, Button, Switch } from "@neuctra/ui";
import { useLoopingStages } from "@/components/patterns/useLoopingStages";
import { BRAND_COLORS, themeScope } from "./themeScope";
import { useScrub } from "./useScrub";

const OFFSET = ["start start", "end end"];
const SPRING = { type: "spring", stiffness: 200, damping: 20 };

/** Plays a diagram once it is on screen, whichever way the page scrolls. */
function useSeen() {
  const ref = useRef(null);
  return [ref, useInView(ref, { once: true, amount: 0.35 })];
}

const SETUP_CHAIN = [
  ["Framework", "Next.js, Vite, Remix, or React Router"],
  ["Language", "JavaScript or TypeScript"],
  ["Main color", "Neuctra Green or your own"],
  ["Ready", "Library, theme, and providers"],
];

function SetupDiagram() {
  const [ref, seen] = useSeen();

  return (
    <div ref={ref} className="w-full max-w-md">
      <p className="rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm text-foreground">
        <span className="text-primary">$</span> npx @neuctra/ui-cli init
      </p>
      <ol className="relative mt-4 flex flex-col gap-3">
        <span className="absolute bottom-5 left-[1.1875rem] top-5 w-px bg-border" />
        <motion.span
          data-reveal
          className="absolute bottom-5 left-[1.1875rem] top-5 w-px origin-top bg-primary"
          initial={{ scaleY: 0 }}
          animate={seen ? { scaleY: 1 } : undefined}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {SETUP_CHAIN.map(([name, detail], index) => (
          <motion.li
            key={name}
            data-reveal
            className="relative flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={seen ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.4, delay: index * 0.3 }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary bg-card text-primary">
              <Check size={15} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">{name}</span>
              <span className="block truncate text-xs text-muted-foreground">{detail}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

const LANES = [
  { x: 70, label: "You" },
  { x: 280, label: "AI tool" },
  { x: 490, label: "Neuctra UI" },
];

const MESSAGES = [
  { from: 70, to: 280, y: 92, text: "Build a sales dashboard" },
  { from: 280, to: 490, y: 142, text: "Which layout?" },
  { from: 490, to: 280, y: 192, text: "Analytics Dashboard", reply: true },
  { from: 280, to: 490, y: 242, text: "Which components?" },
  { from: 490, to: 280, y: 292, text: "Stat, Card, Table", reply: true },
  { from: 280, to: 70, y: 342, text: "Code for your review", reply: true },
];

function SequenceDiagram() {
  const [ref, seen] = useSeen();

  return (
    <svg
      ref={ref}
      viewBox="0 0 560 370"
      fill="none"
      role="img"
      aria-label="You ask your AI tool for a dashboard. It asks Neuctra UI for the right layout and components, then returns code for your review."
      className="w-full max-w-xl"
    >
      {LANES.map((lane) => (
        <g key={lane.label}>
          <rect
            x={lane.x - 58}
            y="10"
            width="116"
            height="38"
            rx="8"
            fill="var(--background)"
            stroke={lane.x === 490 ? "var(--primary)" : "var(--border)"}
          />
          <text x={lane.x} y="35" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--foreground)">
            {lane.label}
          </text>
          <path d={`M${lane.x} 48 V360`} stroke="var(--border)" strokeDasharray="3 6" />
        </g>
      ))}

      {MESSAGES.map((message, index) => {
        const direction = message.to > message.from ? 1 : -1;
        const tip = message.to - direction * 2;

        return (
          <motion.g
            key={message.y}
            data-reveal
            initial={{ opacity: 0 }}
            animate={seen ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.45 }}
          >
            <motion.path
              data-draw
              d={`M${message.from} ${message.y} H${tip}`}
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray={message.reply ? "6 5" : undefined}
              initial={message.reply ? undefined : { pathLength: 0 }}
              animate={seen && !message.reply ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.35, delay: 0.2 + index * 0.45 }}
            />
            <path
              d={`M${tip - direction * 9} ${message.y - 5} L${tip} ${message.y} L${tip - direction * 9} ${message.y + 5}`}
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <text
              x={(message.from + message.to) / 2}
              y={message.y - 9}
              textAnchor="middle"
              fontSize="13.5"
              fill="var(--secondary)"
            >
              {message.text}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

const GROUPS = [
  "Page structure",
  "Text and media",
  "Forms",
  "Buttons",
  "Data display",
  "Feedback",
  "Overlays",
  "Navigation",
];

function ComponentTree() {
  const [ref, seen] = useSeen();

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 380"
      fill="none"
      role="img"
      aria-label="The @neuctra/ui library branches into eight groups of components."
      className="w-full max-w-xl"
    >
      <rect x="4" y="160" width="148" height="60" rx="10" fill="var(--background)" stroke="var(--primary)" />
      <text x="78" y="186" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--foreground)">
        @neuctra/ui
      </text>
      <text x="78" y="206" textAnchor="middle" fontSize="12.5" fill="var(--muted-foreground)">
        79 named parts
      </text>

      {GROUPS.map((group, index) => {
        const y = 24 + index * 47.5;
        const delay = 0.1 + index * 0.1;

        return (
          <g key={group}>
            <motion.path
              data-draw
              d={`M152 190 C 230 190, 220 ${y}, 300 ${y}`}
              stroke="var(--primary)"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={seen ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.5, delay }}
            />
            <motion.g
              data-reveal
              initial={{ opacity: 0 }}
              animate={seen ? { opacity: 1 } : undefined}
              transition={{ duration: 0.3, delay: delay + 0.35 }}
            >
              <rect x="300" y={y - 18} width="200" height="36" rx="8" fill="var(--background)" stroke="var(--border)" />
              <text x="316" y={y + 5} fontSize="14" fill="var(--secondary)">
                {group}
              </text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}

function ThemeDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const { stage } = useLoopingStages({
    count: BRAND_COLORS.length,
    durationMs: 1800,
    inView,
  });
  const color = BRAND_COLORS[stage];

  return (
    <div
      ref={ref}
      style={themeScope({ primary: color.value, ring: color.value })}
      className="flex w-full max-w-md flex-col items-center"
    >
      <p className="flex w-full items-center justify-between gap-3 rounded-lg border border-primary bg-background px-4 py-3 font-mono text-sm text-foreground">
        --primary: {color.value}
        <span className="h-4 w-4 shrink-0 rounded-full bg-primary transition-colors duration-300" />
      </p>
      <svg aria-hidden="true" viewBox="0 0 300 60" fill="none" className="h-16 w-full" preserveAspectRatio="none">
        {["M150 0 C 150 40, 50 20, 50 60", "M150 0 V60", "M150 0 C 150 40, 250 20, 250 60"].map((wire) => (
          <path key={wire} d={wire} stroke="var(--primary)" strokeWidth="2" className="nx-flow" />
        ))}
      </svg>
      <div inert className="grid w-full grid-cols-3 items-center justify-items-center gap-2">
        <Button size="sm">Save</Button>
        <Badge text={color.label} variant="soft" size="sm" />
        <Switch mode="single" checked />
      </div>
    </div>
  );
}

const SHARES = [
  { title: "Neuctra UI brings", items: ["Components", "Theme system", "Setup", "AI guidance"], accent: true },
  { title: "Your app brings", items: ["Your data", "Sign-in", "Payments", "Business rules"] },
];

function ShipDiagram() {
  const [ref, seen] = useSeen();

  return (
    <div ref={ref} className="flex w-full max-w-lg flex-col items-center">
      <div className="grid w-full grid-cols-2 gap-3">
        {SHARES.map((share) => (
          <div
            key={share.title}
            className={`rounded-xl border bg-background p-4 ${
              share.accent ? "border-primary/50" : "border-border"
            }`}
          >
            <p className="text-sm font-semibold text-foreground">{share.title}</p>
            <ul className="mt-2 space-y-1 text-sm text-secondary">
              {share.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <svg aria-hidden="true" viewBox="0 0 300 60" fill="none" className="h-16 w-full" preserveAspectRatio="none">
        {["M75 0 C 75 40, 150 20, 150 60", "M225 0 C 225 40, 150 20, 150 60"].map((wire) => (
          <path key={wire} d={wire} stroke="var(--primary)" strokeWidth="2" className="nx-flow" />
        ))}
      </svg>
      <motion.p
        data-reveal
        className="relative rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={seen ? { opacity: 1, scale: 1 } : undefined}
        transition={{ ...SPRING, delay: 0.5 }}
      >
        <span className="nx-pulse absolute inset-0 rounded-full border border-primary" />
        Your finished product
      </motion.p>
    </div>
  );
}

const STATIONS = [
  {
    stage: "Set up",
    title: "One command prepares the project",
    text: "The setup tool asks three questions, then installs everything. It replaces your main style file, so save custom styles first.",
    fact: "Works with 4 React frameworks",
    Diagram: SetupDiagram,
  },
  {
    stage: "Describe",
    title: "Your AI tool checks before it writes",
    text: "Connect Neuctra UI to a coding assistant such as Claude Code or Cursor. It looks up layouts and real components instead of guessing.",
    fact: "6 AI tools and 49 page layout recipes",
    Diagram: SequenceDiagram,
  },
  {
    stage: "Compose",
    title: "Pick the parts your screen needs",
    text: "Forms, tables, popups, and navigation share one design system, so every screen you combine them into looks consistent.",
    fact: "Each component has docs with live examples",
    Diagram: ComponentTree,
  },
  {
    stage: "Theme",
    title: "Make it look like your brand",
    text: "Set your colors in one place. Every component follows, in light and dark mode, with no component edits.",
    fact: "Six starter colors, or any custom color",
    Diagram: ThemeDiagram,
  },
  {
    stage: "Ship",
    title: "Add what makes your product yours",
    text: "Neuctra UI builds the screens. Your app adds the data, sign-in, and payments. Review anything AI wrote, then launch.",
    fact: "Free for personal and commercial use",
    Diagram: ShipDiagram,
  },
];

export default function PipelineSection() {
  const ref = useRef(null);
  const { progress, reduced } = useScrub(ref, OFFSET);
  const x = useTransform(progress, [0, 1], ["0vw", "-218vw"]);
  const pinned = !reduced;

  return (
    <section
      ref={ref}
      id="pipeline"
      aria-labelledby="pipeline-heading"
      className={`relative z-10 ${pinned ? "lg:h-[460vh]" : ""}`}
    >
      <div
        className={`mx-auto flex flex-col justify-center px-4 py-16 sm:px-6 ${
          pinned
            ? "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:max-w-none lg:overflow-hidden lg:p-0"
            : "max-w-7xl lg:px-8"
        }`}
      >
        <div className={pinned ? "lg:pl-[6vw]" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            How it works
          </p>
          <h2
            id="pipeline-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            One line from idea to launch
          </h2>
        </div>

        <motion.div
          data-track
          style={pinned ? { "--track-x": x } : undefined}
          className={`relative mt-8 ${
            pinned
              ? "lg:flex lg:w-max lg:pl-[6vw] lg:[transform:translate3d(var(--track-x),0,0)]"
              : ""
          }`}
        >
          <span className={`absolute inset-x-0 top-[0.4375rem] h-px bg-border ${pinned ? "hidden lg:block" : "hidden"}`} />
          {pinned && (
            <motion.span
              style={{ scaleX: progress, originX: 0 }}
              className="absolute inset-x-0 top-[0.4375rem] hidden h-0.5 bg-primary lg:block"
            />
          )}

          {STATIONS.map((station, index) => (
            <Station key={station.stage} station={station} index={index} pinned={pinned} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Station({ station, index, pinned }) {
  const { Diagram } = station;

  return (
    <article className={`relative border-t border-border py-10 first:border-t-0 ${pinned ? "lg:w-[62vw] lg:shrink-0 lg:border-t-0 lg:py-0 lg:pr-[4vw]" : ""}`}>
      <span className={`absolute left-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background ${pinned ? "hidden lg:block" : "hidden"}`} />
      <div className={`grid gap-8 ${pinned ? "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:pt-10" : "md:grid-cols-2 md:items-center"}`}>
        <div>
          <p className="font-mono text-sm text-primary">
            0{index + 1} / {station.stage}
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground xl:text-3xl">
            {station.title}
          </h3>
          <p className="mt-3 leading-7 text-secondary">{station.text}</p>
          <p className="mt-4 border-l-2 border-primary pl-3 text-sm font-medium text-foreground">
            {station.fact}
          </p>
        </div>
        <div className="flex min-h-[20rem] items-center justify-center rounded-2xl border border-border bg-card p-4 sm:p-6 lg:min-h-[24rem]">
          <Diagram />
        </div>
      </div>
    </article>
  );
}
