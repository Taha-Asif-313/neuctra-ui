"use client";
import React from "react";
import { GridView } from "@neuctra/ui"; // adjust path to your component
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const GridViewDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            GridView Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">GridView</span>{" "}
            component provides a flexible and responsive grid layout system.
            It supports custom columns, adaptive breakpoints, spacing, and alignment
            similar to CSS Grid — all managed directly through props.
          </p>
        </header>

        {/* Basic Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
          <p className="text-gray-300 mb-3">
            Create a simple grid with three columns using{" "}
            <code className="text-primary">columns</code> and{" "}
            <code className="text-primary">gap</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<GridView columns={3} gap={12} backgroundColor="#111827" padding={16}>
  {[1, 2, 3, 4, 5, 6].map(i => (
    <div key={i} style={{
      backgroundColor: "#2563eb",
      color: "white",
      padding: "1rem",
      borderRadius: 8,
      textAlign: "center"
    }}>
      Item {i}
    </div>
  ))}
</GridView>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <GridView columns={3} gap={12} backgroundColor="#111827" padding={16}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-blue-600 text-white rounded-lg p-4 text-center"
                    >
                      Item {i}
                    </div>
                  ))}
                </GridView>
              </div>
            }
          />
        </section>

        {/* Responsive Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Responsive Layout</h2>
          <p className="text-gray-300 mb-3">
            You can define different column counts per screen size using{" "}
            <code className="text-primary">{`{ sm, md, lg }`}</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<GridView
  columns={{ sm: 1, md: 2, lg: 4 }}
  gap={20}
  padding="1rem"
  backgroundColor="#1e293b"
>
  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
    <div key={i} style={{
      backgroundColor: "#334155",
      color: "white",
      padding: "1rem",
      borderRadius: 6,
      textAlign: "center"
    }}>
      Box {i}
    </div>
  ))}
</GridView>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <GridView
                  columns={{ sm: 1, md: 2, lg: 4 }}
                  gap={20}
                  padding="1rem"
                  backgroundColor="#1e293b"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-700 text-white rounded-md p-4 text-center"
                    >
                      Box {i}
                    </div>
                  ))}
                </GridView>
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
            Use <code className="text-primary">alignItems</code> and{" "}
            <code className="text-primary">justifyItems</code> to control the placement of grid children.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<GridView
  columns={3}
  alignItems="center"
  justifyItems="center"
  height="200px"
  backgroundColor="#0f172a"
  gap={10}
>
  {[1, 2, 3].map(i => (
    <div key={i} style={{
      backgroundColor: "#22c55e",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: 8
    }}>
      Centered {i}
    </div>
  ))}
</GridView>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <GridView
                  columns={3}
                  alignItems="center"
                  justifyItems="center"
                  height="200px"
                  backgroundColor="#0f172a"
                  gap={10}
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-green-500 text-white rounded-lg px-6 py-3"
                    >
                      Centered {i}
                    </div>
                  ))}
                </GridView>
              </div>
            }
          />
        </section>

        {/* Custom Styling */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Custom Styling</h2>
          <p className="text-gray-300 mb-3">
            You can fully style the grid using{" "}
            <code className="text-primary">style</code> or{" "}
            <code className="text-primary">className</code> props.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<GridView
  columns={2}
  gap="1.5rem"
  style={{
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    padding: "2rem",
    borderRadius: "16px",
  }}
>
  <div style={{ backgroundColor: "white", color: "#111", padding: "1rem", borderRadius: 8 }}>Custom 1</div>
  <div style={{ backgroundColor: "white", color: "#111", padding: "1rem", borderRadius: 8 }}>Custom 2</div>
</GridView>`}
            previewContent={
              <GridView
                columns={2}
                gap="1.5rem"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  padding: "2rem",
                  borderRadius: "16px",
                }}
              >
                <div className="bg-white text-black rounded-lg p-4 text-center font-medium">
                  Custom 1
                </div>
                <div className="bg-white text-black rounded-lg p-4 text-center font-medium">
                  Custom 2
                </div>
              </GridView>
            }
          />
        </section>

        {/* Props Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Props</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-zinc-800 text-sm">
              <thead className="bg-zinc-900 text-gray-300">
                <tr>
                  <th className="px-4 py-2 border-r border-zinc-800">Prop</th>
                  <th className="px-4 py-2 border-r border-zinc-800">Type</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-4 py-2 text-primary">columns</td>
                  <td className="px-4 py-2">number | Record&lt;ScreenSize, number&gt;</td>
                  <td className="px-4 py-2">
                    Number of columns or responsive mapping for sm, md, lg.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">gap</td>
                  <td className="px-4 py-2">number | string</td>
                  <td className="px-4 py-2">Grid spacing between items.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">alignItems</td>
                  <td className="px-4 py-2">"start" | "center" | "end" | "stretch"</td>
                  <td className="px-4 py-2">Vertical alignment of grid children.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">justifyItems</td>
                  <td className="px-4 py-2">"start" | "center" | "end" | "stretch"</td>
                  <td className="px-4 py-2">Horizontal alignment of grid children.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">backgroundColor</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">Grid background color.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">width</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">Width of the grid container.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">maxWidth</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">Maximum width of grid container.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">style</td>
                  <td className="px-4 py-2">React.CSSProperties</td>
                  <td className="px-4 py-2">Custom inline styles.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">children</td>
                  <td className="px-4 py-2">ReactNode</td>
                  <td className="px-4 py-2">Grid content elements.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default GridViewDocs;
