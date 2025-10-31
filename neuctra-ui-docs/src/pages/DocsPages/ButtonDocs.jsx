import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Button } from "@neuctra/ui";
import { ArrowRight, Rocket } from "lucide-react";
import Metadata from "../../MetaData";

const ButtonDocs = () => {
  return (
    <>
      <Metadata
        title="Button Component — Neuctra UI"
        description="Explore the Button component in Neuctra UI — a modern, theme-aware React button with support for icons, loading states, custom colors, and responsive designs."
        keywords="Neuctra UI Button, React button component, custom button, UI library, Neuctra components, button with icon, loading button, Tailwind React UI, Neuctra docs"
        image="https://ui.neuctra.com/og/button-docs.png"
        ogTitle="Button Component — Neuctra UI"
        ogDescription="Learn how to use the powerful Button component from Neuctra UI — customizable, theme-aware, and perfect for any React interface."
        twitterTitle="Button Component — Neuctra UI"
        twitterDescription="Build modern interfaces with Neuctra UI’s Button component — supports icons, themes, full width, loading states, and more."
        canonical="https://ui.neuctra.com/docs/button"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Button Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Button</span>{" "}
              component is a customizable and theme-aware element designed for
              all types of user interactions. It supports multiple sizes,
              colors, rounded corners, loading states, icons, and dark mode —
              making it perfect for modern interfaces.
            </p>
          </header>

          {/* Example 1: Basic Button */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Button>Click Me</Button>`}
              previewContent={<Button>Click Me</Button>}
            />
          </section>

          {/* Example 2: Button Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Button Sizes
            </h2>
            <p className="text-gray-300 mb-3">
              Adjust the button size with the{" "}
              <code className="text-primary">size</code> prop. Available
              options:
              <code className="text-primary mx-1">"sm"</code>,
              <code className="text-primary mx-1">"md"</code>, and
              <code className="text-primary mx-1">"lg"</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</>`}
              previewContent={
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              }
            />
          </section>

          {/* Example 3: Loading State */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Loading State
            </h2>
            <p className="text-gray-300 mb-3">
              Use the <code className="text-primary">loading</code> prop to show
              a spinner and optional loading text while an action is in
              progress.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Button loading>Processing...</Button>`}
              previewContent={<Button loading>Processing...</Button>}
            />
          </section>

          {/* Example 4: Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Buttons with Icons
            </h2>
            <p className="text-gray-300 mb-3">
              Add icons using <code className="text-primary">iconBefore</code>{" "}
              or <code className="text-primary">iconAfter</code> props.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Button iconBefore="🚀">Launch</Button>
  <Button iconAfter="➡️">Continue</Button>
</>`}
              previewContent={
                <div className="flex flex-wrap gap-4">
                  <Button iconBefore={<Rocket size={16} />}>Launch</Button>
                  <Button iconAfter={<ArrowRight size={16} />}>Continue</Button>
                </div>
              }
            />
          </section>

          {/* Example 5: Custom Theme */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Theme Color
            </h2>
            <p className="text-gray-300 mb-3">
              You can easily create custom-themed buttons using the{" "}
              <code className="text-primary">baseColor</code> prop to generate a
              new color palette automatically.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Button baseColor="#10b981">Success</Button>`}
              previewContent={<Button baseColor="#10b981">Success</Button>}
            />
          </section>

          {/* Example 6: Disabled and Full Width */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Disabled & Full Width
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Button disabled>Disabled</Button>
  <Button fullWidth>Full Width</Button>
</>`}
              previewContent={
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              }
            />
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            <p>
              Built with <span className="text-primary">React</span>,{" "}
              <span className="text-primary">Tailwind CSS</span> &{" "}
              <span className="text-primary">TypeScript</span>.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ButtonDocs;
