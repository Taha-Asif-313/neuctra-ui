"use client";
import React from "react";
import { Flexbox } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const FlexboxDocs = () => {
  return (
    <>
      <Metadata
        title="Flexbox Component — Neuctra UI"
        description="Master responsive layouts with Neuctra UI’s Flexbox component — a flexible and powerful layout utility for React. Control direction, alignment, spacing, wrapping, and more with simple props."
        keywords="Neuctra UI Flexbox, React Flexbox component, responsive layout, CSS Flexbox, UI components, layout system, Neuctra components, Tailwind layout, align justify, React UI library"
        image="https://ui.neuctra.com/og/flexbox-docs-preview.png"
        ogTitle="Flexbox Component — Neuctra UI"
        ogDescription="Design responsive layouts in React effortlessly using Neuctra UI’s Flexbox component with alignment, spacing, and wrapping controls."
        twitterTitle="Flexbox Component | Neuctra UI"
        twitterDescription="Build flexible, responsive layouts in React with Neuctra UI’s Flexbox component — direction, alignment, and spacing made easy."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Flexbox Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Flexbox</span>{" "}
              component is a responsive layout wrapper that provides full
              control over direction, alignment, spacing, and wrapping behavior
              — all dynamically adjustable across screen sizes.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">Flexbox</code> to arrange
              elements in a row or column. It automatically adapts to screen
              sizes if configured with responsive props.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Flexbox gap={16} backgroundColor="#111" padding={16}>
  <div style={{ background: "#2563eb", padding: "12px 24px", borderRadius: 8 }}>Item 1</div>
  <div style={{ background: "#22c55e", padding: "12px 24px", borderRadius: 8 }}>Item 2</div>
  <div style={{ background: "#eab308", padding: "12px 24px", borderRadius: 8 }}>Item 3</div>
</Flexbox>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <Flexbox gap={16} backgroundColor="#111" padding={16}>
                    <div className="bg-blue-600 rounded-lg px-6 py-3">
                      Item 1
                    </div>
                    <div className="bg-green-500 rounded-lg px-6 py-3">
                      Item 2
                    </div>
                    <div className="bg-yellow-500 rounded-lg px-6 py-3">
                      Item 3
                    </div>
                  </Flexbox>
                </div>
              }
            />
          </section>

          {/* Responsive Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Responsive Direction
            </h2>
            <p className="text-gray-300 mb-3">
              The <code className="text-primary">direction</code> prop accepts
              an object to define layout per breakpoint — <code>sm</code>,{" "}
              <code>md</code>, and <code>lg</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Flexbox
  direction={{ sm: "column", md: "row", lg: "row" }}
  gap={12}
  backgroundColor="#1f2937"
  padding={12}
>
  <div style={{ background: "#3b82f6", padding: "12px 24px", borderRadius: 8 }}>Mobile → Column</div>
  <div style={{ background: "#10b981", padding: "12px 24px", borderRadius: 8 }}>Desktop → Row</div>
</Flexbox>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <Flexbox
                    direction={{ sm: "column", md: "row", lg: "row" }}
                    gap={12}
                    backgroundColor="#1f2937"
                    padding={12}
                  >
                    <div className="bg-blue-500 rounded-lg px-6 py-3">
                      Mobile → Column
                    </div>
                    <div className="bg-emerald-500 rounded-lg px-6 py-3">
                      Desktop → Row
                    </div>
                  </Flexbox>
                </div>
              }
            />
          </section>

          {/* Alignment Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Alignment & Justification
            </h2>
            <p className="text-gray-300 mb-3">
              Control layout alignment using{" "}
              <code className="text-primary">align</code> and{" "}
              <code className="text-primary">justify</code> props.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Flexbox
  align="center"
  justify="space-around"
  height="120px"
  backgroundColor="#0f172a"
>
  <div style={{ background: "#f87171", padding: "12px 24px", borderRadius: 8 }}>Left</div>
  <div style={{ background: "#60a5fa", padding: "12px 24px", borderRadius: 8 }}>Center</div>
  <div style={{ background: "#34d399", padding: "12px 24px", borderRadius: 8 }}>Right</div>
</Flexbox>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <Flexbox
                    align="center"
                    justify="space-around"
                    height="120px"
                    backgroundColor="#0f172a"
                  >
                    <div className="bg-red-400 rounded-lg px-6 py-3">Left</div>
                    <div className="bg-blue-400 rounded-lg px-6 py-3">
                      Center
                    </div>
                    <div className="bg-green-400 rounded-lg px-6 py-3">
                      Right
                    </div>
                  </Flexbox>
                </div>
              }
            />
          </section>

          {/* Custom Styling Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling & Shadows
            </h2>
            <p className="text-gray-300 mb-3">
              Apply borders, shadows, or overflow behavior to create card
              layouts or scrollable flex containers.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Flexbox
  gap={10}
  padding={16}
  border="1px solid #333"
  borderRadius="12px"
  boxShadow="0 4px 12px rgba(0,0,0,0.2)"
  overflow="auto"
  height="160px"
>
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} style={{ background: "#22d3ee", padding: "12px 24px", borderRadius: 8 }}>
      Item {i + 1}
    </div>
  ))}
</Flexbox>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <Flexbox
                    gap={10}
                    padding={16}
                    border="1px solid #333"
                    borderRadius="12px"
                    boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                    overflow="auto"
                    height="160px"
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-cyan-400 text-black rounded-lg px-6 py-3"
                      >
                        Item {i + 1}
                      </div>
                    ))}
                  </Flexbox>
                </div>
              }
            />
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default FlexboxDocs;
