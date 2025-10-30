import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Text } from "@neuctra/ui";

const TextDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Text Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Text</span>{" "}
            component provides a theme-aware, flexible, and highly customizable
            way to render text in any HTML tag. You can easily control size,
            color, alignment, transformations, and more — all while supporting
            dark mode and custom base colors.
          </p>
        </header>

        {/* Basic Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Text as="h1" size="xl" weight="bold" color="primary">
  Welcome to Neuctra UI 🚀
</Text>`}
            previewContent={
              <Text as="h1" size="xl" weight="bold" color="primary">
                Welcome to Neuctra UI 🚀
              </Text>
            }
          />
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Text Sizes</h2>
          <CodePreviewBlock
            language="jsx"
            code={`<>
  <Text size="xs">Extra Small Text</Text>
  <Text size="sm">Small Text</Text>
  <Text size="md">Medium Text</Text>
  <Text size="lg">Large Text</Text>
  <Text size="xl">Extra Large Text</Text>
  <Text size="2xl" weight="bold">2XL Text</Text>
</>`}
            previewContent={
              <>
                <Text darkMode size="xs">Extra Small Text</Text>
                <Text darkMode size="sm">Small Text</Text>
                <Text darkMode size="md">Medium Text</Text>
                <Text darkMode size="lg">Large Text</Text>
                <Text darkMode size="xl">Extra Large Text</Text>
                <Text darkMode size="2xl" weight="bold">
                  2XL Text
                </Text>
              </>
            }
          />
        </section>

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Color Variants
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<>
  <Text color="primary" weight="bold">Primary Text</Text>
  <Text color="secondary">Secondary Text</Text>
  <Text color="success">Success Text</Text>
  <Text color="danger">Danger Text</Text>
  <Text color="muted">Muted Text</Text>
</>`}
            previewContent={
              <>
                <Text color="primary" weight="bold">
                  Primary Text
                </Text>
                <Text color="secondary">Secondary Text</Text>
                <Text color="success">Success Text</Text>
                <Text color="danger">Danger Text</Text>
                <Text color="muted">Muted Text</Text>
              </>
            }
          />
        </section>

        {/* Text Transformations */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Text Transformations
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<>
  <Text transform="uppercase">uppercase text</Text>
  <Text transform="capitalize">capitalize text</Text>
  <Text transform="lowercase">LOWERCASE TEXT</Text>
  <Text italic>Italic Text Example</Text>
  <Text underline>Underlined Text</Text>
  <Text strikethrough>Strikethrough Text</Text>
</>`}
            previewContent={
              <>
                <Text darkMode transform="uppercase">uppercase text</Text>
                <Text darkMode transform="capitalize">capitalize text</Text>
                <Text darkMode transform="lowercase">LOWERCASE TEXT</Text>
                <Text darkMode italic>Italic Text Example</Text>
                <Text darkMode underline>Underlined Text</Text>
                <Text darkMode strikethrough>Strikethrough Text</Text>
              </>
            }
          />
        </section>

        {/* Truncate & Hover */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Truncate & Hover Effects
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Text truncate hoverable color="secondary" style={{ maxWidth: '250px' }}>
  This text will truncate when it's too long and will have a hover effect.
</Text>`}
            previewContent={
              <Text
                truncate
                hoverable
                darkMode
                style={{ maxWidth: "250px" }}
              >
                This text will truncate when it's too long and will have a hover
                effect.
              </Text>
            }
          />
        </section>

        {/* Custom Theme Colors */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Custom Base Color
          </h2>
          <p className="text-gray-400 mb-3">
            You can define a <code className="text-primary">baseColor</code> to
            generate a palette automatically for light and dark modes.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Text baseColor="#00c214" color="primary" size="xl" weight="bold">
  Themed Text Example
</Text>`}
            previewContent={
              <Text baseColor="#00c214" color="primary" size="xl" weight="bold">
                Themed Text Example
              </Text>
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
  );
};

export default TextDocs;
