"use client";
import React from "react";
import { Container } from "@neuctra/ui"; // adjust path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const ContainerDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Container Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Container</span> component is a flexible,
            responsive wrapper inspired by Tailwind’s container utility. It helps you manage width, padding,
            background, and layout alignment consistently across your app.
          </p>
        </header>

        {/* Example: Basic Container */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
          <p className="text-gray-300 mb-3">
            By default, the container is centered and uses the <code className="text-primary">lg</code> size.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Container size="lg" padding="2rem" backgroundColor="#111827" borderRadius={8}>
  <h2 style={{ color: "white" }}>Hello from Container</h2>
  <p style={{ color: "#9ca3af" }}>This is a simple content box.</p>
</Container>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <Container
                  size="lg"
                  padding="2rem"
                  backgroundColor="#111827"
                  borderRadius={8}
                >
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

        {/* Example: Container Sizes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Container Sizes
          </h2>
          <p className="text-gray-300 mb-3">
            Choose from predefined sizes (<code>sm</code>, <code>md</code>,{" "}
            <code>lg</code>, <code>xl</code>, <code>2xl</code>,{" "}
            <code>full</code>) for consistent layouts.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<>
  <Container size="sm" backgroundColor="#1e293b" padding="1rem">Small</Container>
  <Container size="md" backgroundColor="#334155" padding="1rem">Medium</Container>
  <Container size="xl" backgroundColor="#475569" padding="1rem">Extra Large</Container>
</>`}
            previewContent={
              <div className="space-y-4">
                <Container size="sm" backgroundColor="#1e293b" padding="1rem">
                  <p className="text-gray-200">Small Container (640px)</p>
                </Container>
                <Container size="md" backgroundColor="#334155" padding="1rem">
                  <p className="text-gray-200">Medium Container (768px)</p>
                </Container>
                <Container size="xl" backgroundColor="#475569" padding="1rem">
                  <p className="text-gray-200">Extra Large Container (1280px)</p>
                </Container>
              </div>
            }
          />
        </section>

        {/* Example: Custom Width and Center */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Custom Width and Centering
          </h2>
          <p className="text-gray-300 mb-3">
            You can override width manually and control centering using{" "}
            <code>center</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Container width="80%" center={false} backgroundColor="#0f172a" padding="1.5rem">
  <p style={{ color: "white" }}>This container takes 80% width and isn’t centered.</p>
</Container>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <Container
                  width="80%"
                  center={false}
                  backgroundColor="#0f172a"
                  padding="1.5rem"
                >
                  <p className="text-white">
                    This container takes 80% width and isn’t centered.
                  </p>
                </Container>
              </div>
            }
          />
        </section>

        {/* Example: Custom Styling */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Custom Styling
          </h2>
          <p className="text-gray-300 mb-3">
            You can pass custom <code>style</code> and <code>className</code>{" "}
            props for complete flexibility.
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
                  background:
                    "linear-gradient(135deg, #3b82f6, #06b6d4)",
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
                  <td className="px-4 py-2">Sets max-width using predefined breakpoints.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">padding</td>
                  <td className="px-4 py-2">number | string</td>
                  <td className="px-4 py-2">Sets container padding (e.g., 16, "2rem").</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">margin</td>
                  <td className="px-4 py-2">number | string</td>
                  <td className="px-4 py-2">Defines container margin (e.g., "auto").</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">backgroundColor</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">Sets background color.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">center</td>
                  <td className="px-4 py-2">boolean</td>
                  <td className="px-4 py-2">Centers the container horizontally.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">width</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">Custom width override.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">height</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">Optional height property.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">borderRadius</td>
                  <td className="px-4 py-2">number | string</td>
                  <td className="px-4 py-2">Sets border radius of container.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">style</td>
                  <td className="px-4 py-2">React.CSSProperties</td>
                  <td className="px-4 py-2">Inline custom styles.</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-primary">className</td>
                  <td className="px-4 py-2">string</td>
                  <td className="px-4 py-2">Additional class names (e.g. Tailwind utilities).</td>
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
  );
};

export default ContainerDocs;
