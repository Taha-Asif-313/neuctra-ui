"use client";
import React from "react";
import { Stack, HStack, VStack } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const StackDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Stack Components
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Stack</span>,{" "}
            <span className="text-primary font-semibold">HStack</span>, and{" "}
            <span className="text-primary font-semibold">VStack</span>{" "}
            components are responsive flex layout wrappers. They allow easy
            control over direction, spacing, alignment, and wrapping behavior,
            and support responsive properties for different screen sizes.
          </p>
        </header>

        {/* Basic Stack Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Stack
          </h2>
          <p className="text-gray-300 mb-3">
            Use <code className="text-primary">Stack</code> to layout items
            either vertically or horizontally. The default direction is
            responsive: vertical on mobile, horizontal on larger screens.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Stack gap={16} padding={16} backgroundColor="#111">
  <div style={{ background: "#2563eb", padding: "12px 24px", borderRadius: 8 }}>Item 1</div>
  <div style={{ background: "#22c55e", padding: "12px 24px", borderRadius: 8 }}>Item 2</div>
  <div style={{ background: "#eab308", padding: "12px 24px", borderRadius: 8 }}>Item 3</div>
</Stack>`}
            previewContent={
              <Stack gap={16} padding={16} backgroundColor="#111">
                <div className="bg-blue-600 rounded-lg px-6 py-3">Item 1</div>
                <div className="bg-green-500 rounded-lg px-6 py-3">Item 2</div>
                <div className="bg-yellow-500 rounded-lg px-6 py-3">Item 3</div>
              </Stack>
            }
          />
        </section>

        {/* HStack Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">HStack</h2>
          <p className="text-gray-300 mb-3">
            <code className="text-primary">HStack</code> is a shortcut for{" "}
            <code>Stack</code> with horizontal layout.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<HStack gap={12} padding={12} backgroundColor="#1f2937">
  <div style={{ background: "#3b82f6", padding: "12px 24px", borderRadius: 8 }}>Left</div>
  <div style={{ background: "#10b981", padding: "12px 24px", borderRadius: 8 }}>Center</div>
  <div style={{ background: "#facc15", padding: "12px 24px", borderRadius: 8 }}>Right</div>
</HStack>`}
            previewContent={
              <HStack gap={12} padding={12} backgroundColor="#1f2937">
                <div className="bg-blue-500 rounded-lg px-6 py-3">Left</div>
                <div className="bg-green-500 rounded-lg px-6 py-3">Center</div>
                <div className="bg-yellow-400 rounded-lg px-6 py-3">Right</div>
              </HStack>
            }
          />
        </section>

        {/* VStack Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">VStack</h2>
          <p className="text-gray-300 mb-3">
            <code className="text-primary">VStack</code> is a shortcut for{" "}
            <code>Stack</code> with vertical layout.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<VStack gap={10} padding={12} backgroundColor="#111">
  <div style={{ background: "#f87171", padding: "12px 24px", borderRadius: 8 }}>Top</div>
  <div style={{ background: "#60a5fa", padding: "12px 24px", borderRadius: 8 }}>Middle</div>
  <div style={{ background: "#34d399", padding: "12px 24px", borderRadius: 8 }}>Bottom</div>
</VStack>`}
            previewContent={
              <VStack gap={10} padding={12} backgroundColor="#111">
                <div className="bg-red-400 rounded-lg px-6 py-3">Top</div>
                <div className="bg-blue-400 rounded-lg px-6 py-3">Middle</div>
                <div className="bg-green-400 rounded-lg px-6 py-3">Bottom</div>
              </VStack>
            }
          />
        </section>

        {/* Responsive Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Responsive Gap & Direction
          </h2>
          <p className="text-gray-300 mb-3">
            All props support responsive values using objects per breakpoint:{" "}
            <code>sm</code>, <code>md</code>, and <code>lg</code>.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Stack
  direction={{ sm: "vertical", md: "horizontal" }}
  gap={{ sm: 8, md: 16 }}
  padding={12}
  backgroundColor="#1e293b"
>
  <div style={{ background: "#3b82f6", padding: "12px 24px", borderRadius: 8 }}>Item A</div>
  <div style={{ background: "#10b981", padding: "12px 24px", borderRadius: 8 }}>Item B</div>
  <div style={{ background: "#facc15", padding: "12px 24px", borderRadius: 8 }}>Item C</div>
</Stack>`}
            previewContent={
              <Stack
                direction={{ sm: "vertical", md: "horizontal" }}
                gap={{ sm: 8, md: 16 }}
                padding={12}
                backgroundColor="#1e293b"
              >
                <div className="bg-blue-500 rounded-lg px-6 py-3">Item A</div>
                <div className="bg-green-500 rounded-lg px-6 py-3">Item B</div>
                <div className="bg-yellow-400 rounded-lg px-6 py-3">Item C</div>
              </Stack>
            }
          />
        </section>

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default StackDocs;
