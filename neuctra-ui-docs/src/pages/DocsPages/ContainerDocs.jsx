"use client";

import React from "react";
import { Container } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const ContainerDocs = () => {
  return (
    <>
      <Metadata
        title="Container Component — Neuctra UI"
        description="Learn how to use the Container component in Neuctra UI — a responsive, customizable layout wrapper inspired by Tailwind’s container utility."
        keywords="Neuctra UI Container, React container component, Tailwind container, responsive layout, layout wrapper, React UI components"
        image="https://ui.neuctra.com/og/container-docs-preview.png"
        ogTitle="Container Component — Neuctra UI"
        ogDescription="Build clean and consistent layouts with the Container component from Neuctra UI. Control width, padding, alignment, and background effortlessly."
        twitterTitle="Container Component | Neuctra UI"
        twitterDescription="A flexible and responsive layout wrapper for React apps. Learn how to use the Neuctra UI Container for consistent designs."
        canonical="https://ui.neuctra.com/docs/container"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Container Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Container</span>{" "}
              component is a flexible, responsive wrapper inspired by Tailwind’s
              container utility. It helps manage width, padding, alignment, and layout consistently across your app.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <p className="text-gray-300 mb-3">
              By default, the container is centered and uses the <code className="text-primary">lg</code> size.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Container size="lg" padding="1.5rem">
  <h2>Hello from Container</h2>
  <p>This is a simple content box.</p>
</Container>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <Container center size="full" padding="md">
                    <h2 className="text-white text-lg font-medium">
                      Hello from Container
                    </h2>
                    <p className="text-gray-400 text-sm">
                      This is a simple content box.
                    </p>
                  </Container>
                </div>
              }
            />
          </section>

          {/* Container Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Container Sizes
            </h2>
            <p className="text-gray-300 mb-3">
              Choose from predefined sizes: <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>2xl</code>, or <code>full</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Container size="sm" padding="1rem">Small</Container>
  <Container size="md" padding="1rem">Medium</Container>
  <Container size="xl" padding="1rem">Extra Large</Container>
</>`}
              previewContent={
                <div className="space-y-4">
                  <Container center className="bg-red-500" size="sm" padding="md">
                    <p className="text-gray-200">Small Container (sm)</p>
                  </Container>
                  <Container center className="bg-amber-500" size="md" padding="md">
                    <p className="text-gray-200">Medium Container (md)</p>
                  </Container>
                  <Container center className="bg-teal-500" size="xl" padding="md">
                    <p className="text-gray-200">Extra Large Container (xl)</p>
                  </Container>
                </div>
              }
            />
          </section>

          {/* Custom Width & Center */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Width & Centering
            </h2>
            <p className="text-gray-300 mb-3">
              Override width manually and control centering with <code>center</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Container width="80%" center={false} padding="1.5rem">
  <p>This container takes 80% width and isn’t centered.</p>
</Container>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <Container width="80%" center={false} padding="1.5rem">
                    <p className="text-white">
                      This container takes 80% width and isn’t centered.
                    </p>
                  </Container>
                </div>
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling
            </h2>
            <p className="text-gray-300 mb-3">
              Use <code>style</code> and <code>className</code> for full control.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Container
  className="shadow-lg hover:shadow-xl transition-all"
  style={{
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    color: "white",
    padding: "2rem",
    borderRadius: "12px",
  }}
>
  <h3>Gradient Container</h3>
</Container>`}
              previewContent={
                <Container
                  className="shadow-lg hover:shadow-xl transition-all"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    color: "white",
                    padding: "2rem",
                    borderRadius: "12px",
                  }}
                >
                  <h3 className="font-semibold">Gradient Container</h3>
                </Container>
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
                    <td className="px-4 py-2 text-primary">size</td>
                    <td className="px-4 py-2">"sm" | "md" | "lg" | "xl" | "2xl" | "full"</td>
                    <td className="px-4 py-2">Predefined container width size.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">padding</td>
                    <td className="px-4 py-2">string | number</td>
                    <td className="px-4 py-2">Padding inside the container.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">center</td>
                    <td className="px-4 py-2">boolean</td>
                    <td className="px-4 py-2">Centers container horizontally if true.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">width</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">Custom width override.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">height</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">Optional height.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">borderRadius</td>
                    <td className="px-4 py-2">string | number</td>
                    <td className="px-4 py-2">Border radius of the container.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">style</td>
                    <td className="px-4 py-2">React.CSSProperties</td>
                    <td className="px-4 py-2">Inline styles for customization.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">className</td>
                    <td className="px-4 py-2">string</td>
                    <td className="px-4 py-2">Extra class names (Tailwind utilities).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-primary">children</td>
                    <td className="px-4 py-2">ReactNode</td>
                    <td className="px-4 py-2">Content inside the container.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ContainerDocs;