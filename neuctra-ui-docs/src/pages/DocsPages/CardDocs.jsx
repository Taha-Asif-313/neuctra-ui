"use client";
import React from "react";
import { Card } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const CardDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Card Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Card</span>{" "}
            component is a flexible container for grouping content. It supports
            different <code className="text-primary">variants</code>, hover
            effects, custom shadows, borders, padding, and more.
          </p>
        </header>

        {/* Basic Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Basic Card</h2>
          <p className="text-gray-300 mb-3">
            The default <code className="text-primary">elevated</code> card
            includes a subtle shadow and padding.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Card padding={20} width="250px">
  <h3>Card Title</h3>
  <p>This is a simple elevated card.</p>
</Card>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <Card padding={20} width="250px">
                  <h3 className="text-lg font-bold mb-2">Card Title</h3>
                  <p>This is a simple elevated card.</p>
                </Card>
              </div>
            }
          />
        </section>

        {/* Card Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Card Variants
          </h2>
          <p className="text-gray-300 mb-3">
            The <code className="text-primary">variant</code> prop supports{" "}
            <code>elevated</code>, <code>outline</code>, and <code>flat</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<>
  <Card variant="elevated" padding={16}>Elevated Card</Card>
  <Card variant="outline" padding={16} margin="16px 0">Outline Card</Card>
  <Card variant="flat" padding={16}>Flat Card</Card>
</>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl space-y-4">
                <Card variant="elevated" padding={16}>
                  Elevated Card
                </Card>
                <Card variant="outline" padding={16} margin="16px 0">
                  Outline Card
                </Card>
                <Card variant="flat" padding={16}>
                  Flat Card
                </Card>
              </div>
            }
          />
        </section>

        {/* Hover Effects */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Hover Effects
          </h2>
          <p className="text-gray-300 mb-3">
            Add <code className="text-primary">hoverShadow</code> or{" "}
            <code>hoverStyle</code> for interactive UI.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Card
  padding={16}
  width="220px"
  hoverShadow="0 8px 20px rgba(0,0,0,0.2)"
>
  Hover me!
</Card>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <Card
                  padding={16}
                  width="220px"
                  hoverShadow="0 8px 8px var(--primary)"
                >
                  Hover me!
                </Card>
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
            Customize <code className="text-primary">background</code>,{" "}
            <code>textColor</code>, <code>borderRadius</code>,{" "}
            <code>boxShadow</code>, <code>padding</code>, and more.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Card
  padding={16}
  width="250px"
  background="#1f2937"
  textColor="#fff"
  borderRadius={12}
  boxShadow="0 6px 16px rgba(0,0,0,0.3)"
>
  Custom Styled Card
</Card>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <Card
                  padding={16}
                  width="250px"
                  background="#1f2937"
                  textColor="#fff"
                  borderRadius={12}
                  boxShadow="0 6px 16px rgba(0,0,0,0.3)"
                >
                  Custom Styled Card
                </Card>
              </div>
            }
          />
        </section>

        {/* Clickable Card */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Clickable Card
          </h2>
          <p className="text-gray-300 mb-3">
            Use the <code className="text-primary">onClick</code> prop to make a
            card interactive.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Card
  padding={16}
  width="200px"
  onClick={() => alert("Card clicked!")}
>
  Click me!
</Card>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <Card
                  padding={16}
                  width="200px"
                  onClick={() => alert("Card clicked!")}
                >
                  Click me!
                </Card>
              </div>
            }
          />
        </section>

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default CardDocs;
