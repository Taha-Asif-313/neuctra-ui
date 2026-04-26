"use client";

import React, { useMemo, useState } from "react";
import { Button, Container, Select } from "@neuctra/ui";
import { Sparkles, Wand2, LayoutGrid } from "lucide-react";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";

const MODE_OPTIONS = [
  { label: "Flex Row", value: "flex-row", description: "Navbar and toolbars" },
  { label: "Flex Column", value: "flex-column", description: "Page sections" },
  { label: "Grid", value: "grid", description: "Cards and galleries" },
  { label: "Sidebar", value: "sidebar", description: "App shell layout" },
];
const MODE_SELECT_OPTIONS = MODE_OPTIONS.map((option) => ({
  label: option.label,
  value: option.value,
}));

const GAP_MAP = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
};

const GRID_MAP = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
};

const JUSTIFY_MAP = {
  start: "justify-start",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
};

const ALIGN_MAP = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};
const GRID_SELECT_OPTIONS = [
  { label: "2 columns", value: "2" },
  { label: "3 columns", value: "3" },
  { label: "4 columns", value: "4" },
];

const GAP_SELECT_OPTIONS = [
  { label: "Compact (gap-2)", value: "2" },
  { label: "Small (gap-3)", value: "3" },
  { label: "Normal (gap-4)", value: "4" },
  { label: "Large (gap-6)", value: "6" },
  { label: "Extra Large (gap-8)", value: "8" },
];

const JUSTIFY_SELECT_OPTIONS = [
  { label: "Start", value: "start" },
  { label: "Center", value: "center" },
  { label: "Between", value: "between" },
  { label: "Around", value: "around" },
];

const ALIGN_SELECT_OPTIONS = [
  { label: "Start", value: "start" },
  { label: "Center", value: "center" },
  { label: "End", value: "end" },
  { label: "Stretch", value: "stretch" },
];

const getModeClasses = ({ mode, columns, justify, align }) => {
  if (mode === "grid") {
    return `grid ${GRID_MAP[columns] || GRID_MAP[3]}`;
  }

  if (mode === "sidebar") {
    return "grid grid-cols-1 lg:grid-cols-[260px_1fr]";
  }

  if (mode === "flex-column") {
    return `flex flex-col ${JUSTIFY_MAP[justify]} ${ALIGN_MAP[align]}`;
  }

  return `flex flex-wrap ${JUSTIFY_MAP[justify]} ${ALIGN_MAP[align]}`;
};

const LayoutPlayground = () => {
  const [mode, setMode] = useState("grid");
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(4);
  const [justify, setJustify] = useState("between");
  const [align, setAlign] = useState("center");
  const [itemCount, setItemCount] = useState(6);

  const wrapperClassName = useMemo(() => {
    const modeClasses = getModeClasses({ mode, columns, justify, align });
    return `${modeClasses} ${GAP_MAP[gap] || "gap-4"} w-full`;
  }, [mode, columns, justify, align, gap]);

  const itemClassName = useMemo(() => {
    if (mode === "sidebar") {
      return "rounded-xl border border-zinc-700/80 bg-zinc-800/80 p-4";
    }

    if (mode === "flex-row") {
      return "min-w-[160px] rounded-xl border border-zinc-700/80 bg-zinc-800/80 p-4";
    }

    return "rounded-xl border border-zinc-700/80 bg-zinc-800/80 p-4";
  }, [mode]);

  const generatedCode = useMemo(() => {
    if (mode === "sidebar") {
      return `<Container className="${wrapperClassName}">
  <aside className="${itemClassName}">
    <h3 className="text-base font-semibold">Navigation</h3>
    <p className="text-sm text-zinc-300 mt-2">Links and filters</p>
  </aside>

  <main className="${itemClassName}">
    <h2 className="text-lg font-semibold">Main Content</h2>
    <p className="text-sm text-zinc-300 mt-2">
      Render cards, table, forms, or dashboards here.
    </p>
  </main>
</Container>`;
    }

    return `<Container className="${wrapperClassName}">
  ${Array.from({ length: itemCount })
    .map(
      (_, index) => `<div className="${itemClassName}">
    <h3 className="font-semibold">Block ${index + 1}</h3>
    <p className="text-sm text-zinc-300 mt-1">Reusable layout item.</p>
  </div>`,
    )
    .join("\n  ")}
</Container>`;
  }, [wrapperClassName, itemClassName, itemCount, mode]);

  const items = useMemo(
    () =>
      Array.from({ length: mode === "sidebar" ? 2 : itemCount }).map(
        (_, index) => index + 1,
      ),
    [itemCount, mode],
  );

  return (
    <>
      <Metadata
        title="Layout Playground — Neuctra UI"
        description="Interactive layout builder for Container-based flex and grid patterns."
      />

      <div className="space-y-8 min-h-screen">
        <header className="space-y-3">
          <h1 className="text-4xl font-extrabold text-white">
            Layout Playground
          </h1>
          <p className="text-gray-300 max-w-3xl text-sm leading-relaxed">
            Build modern flex and grid layouts with live controls, preview the
            result instantly, then copy production-ready JSX for your app.
          </p>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <Container className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 size={18} className="text-primary" />
                <h2 className="text-lg font-semibold text-white">Builder</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Select
                    label="Layout Mode"
                    options={MODE_SELECT_OPTIONS}
                    value={mode}
                    onValueChange={setMode}
                    placeholder="Select layout mode"
                  />
                  <p className="text-xs text-zinc-400 mt-2">
                    {MODE_OPTIONS.find((option) => option.value === mode)
                      ?.description || "Choose your layout style"}
                  </p>
                </div>

                {mode === "grid" && (
                  <div>
                    <Select
                      label="Columns"
                      options={GRID_SELECT_OPTIONS}
                      value={columns.toString()}
                      onValueChange={(value) => setColumns(Number(value))}
                      placeholder="Select columns"
                    />
                  </div>
                )}

                {mode !== "sidebar" && (
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
                      Number of Items
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={10}
                      value={itemCount}
                      onChange={(event) =>
                        setItemCount(Number(event.target.value))
                      }
                      className="w-full accent-primary"
                    />
                    <p className="text-xs text-zinc-400 mt-1">
                      {itemCount} items
                    </p>
                  </div>
                )}

                <div>
                  <Select
                    label="Gap"
                    options={GAP_SELECT_OPTIONS}
                    value={gap.toString()}
                    onValueChange={(value) => setGap(Number(value))}
                    placeholder="Select spacing"
                  />
                </div>

                {mode !== "grid" && mode !== "sidebar" && (
                  <>
                    <div>
                      <Select
                        label="Justify"
                        options={JUSTIFY_SELECT_OPTIONS}
                        value={justify}
                        onValueChange={setJustify}
                        placeholder="Select justify"
                      />
                    </div>

                    <div>
                      <Select
                        label="Align"
                        options={ALIGN_SELECT_OPTIONS}
                        value={align}
                        onValueChange={setAlign}
                        placeholder="Select align"
                      />
                    </div>
                  </>
                )}

                <div className="pt-1">
                  <p className="text-xs uppercase tracking-wide text-zinc-400 mb-2">
                    Quick Presets
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setMode("grid");
                        setColumns(3);
                        setGap(4);
                        setItemCount(6);
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setMode("sidebar");
                        setGap(6);
                      }}
                    >
                      App Shell
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <CodePreviewBlock
              language="jsx"
              code={generatedCode}
              previewContent={
                <Container className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-zinc-400">
                      Live canvas for your generated layout
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/90 px-3 py-1 text-xs text-zinc-300">
                      <LayoutGrid size={14} />
                      {mode}
                    </span>
                  </div>

                  <Container className={wrapperClassName}>
                    {mode === "sidebar" ? (
                      <>
                        <aside className={itemClassName}>
                          <h3 className="text-base font-semibold text-white">
                            Sidebar
                          </h3>
                          <ul className="text-sm text-zinc-300 mt-2 space-y-1">
                            <li>Overview</li>
                            <li>Analytics</li>
                            <li>Settings</li>
                          </ul>
                        </aside>
                        <main className={itemClassName}>
                          <h3 className="text-base font-semibold text-white">
                            Content Area
                          </h3>
                          <p className="text-sm text-zinc-300 mt-2">
                            Add cards, forms, charts, or tables here.
                          </p>
                        </main>
                      </>
                    ) : (
                      items.map((item) => (
                        <div key={item} className={itemClassName}>
                          <h3 className="font-semibold text-white">
                            Block {item}
                          </h3>
                          <p className="text-sm text-zinc-300 mt-1">
                            Clean reusable section for your UI.
                          </p>
                        </div>
                      ))
                    )}
                  </Container>
                </Container>
              }
            />

            <CodeBlock
              language="jsx"
              code={`// Generated wrapper classes
const layoutClassName = "${wrapperClassName}";

// Drop into your UI directly
<Container className={layoutClassName}>
  {/* your content */}
</Container>`}
            />

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-primary" />
                <h3 className="text-white text-base font-semibold">
                  Quick usage tips
                </h3>
              </div>
              <ul className="text-sm text-zinc-300 space-y-1.5">
                <li>Use Grid mode for card listings and dashboard sections.</li>
                <li>Use Sidebar mode to build modern app shells instantly.</li>
                <li>Switch to Flex Row for navigation and action bars.</li>
                <li>Copy the generated JSX and replace block content.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LayoutPlayground;
