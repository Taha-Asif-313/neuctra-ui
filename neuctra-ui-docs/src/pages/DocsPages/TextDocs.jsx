"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Text } from "@neuctra/ui";
import Metadata from "../../MetaData";

const TextDocs = () => {
  return (
    <>
      <Metadata
        title="Text Component — Neuctra UI"
        description="Learn how to use the Text component in Neuctra UI — a flexible, theme-aware, and highly customizable typography system for React."
        keywords="Neuctra UI Text, React typography, text component, UI library, Tailwind CSS, dark mode text"
        image="https://ui.neuctra.com/og/text-docs-preview.png"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">Text Component</h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Text</span> component is a flexible way to display text in your app. 
              You can choose the font size, color, style, alignment, and even support dark mode or hover effects — all without writing CSS.
            </p>
          </header>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
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
            <p className="text-gray-400 mb-3">
              Control how big or small your text looks using the <code className="text-primary">size</code> prop.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Text size="xs">Extra Small</Text>
  <Text size="sm">Small</Text>
  <Text size="md">Medium</Text>
  <Text size="lg">Large</Text>
  <Text size="xl">Extra Large</Text>
  <Text size="2xl" weight="bold">2XL Bold</Text>
</>`}
              previewContent={
                <>
                  <Text darkMode size="xs">Extra Small</Text>
                  <Text darkMode size="sm">Small</Text>
                  <Text darkMode size="md">Medium</Text>
                  <Text darkMode size="lg">Large</Text>
                  <Text darkMode size="xl">Extra Large</Text>
                  <Text darkMode size="2xl" weight="bold">2XL Bold</Text>
                </>
              }
            />
          </section>

          {/* Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Text Colors</h2>
            <p className="text-gray-400 mb-3">
              Use <code className="text-primary">color</code> to set your text’s color. Built-in options include primary, secondary, success, danger, and muted.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Text color="primary" weight="bold">Primary</Text>
  <Text color="secondary">Secondary</Text>
  <Text color="success">Success</Text>
  <Text color="danger">Danger</Text>
  <Text color="muted">Muted</Text>
</>`}
              previewContent={
                <>
                  <Text color="primary" weight="bold">Primary</Text>
                  <Text color="secondary">Secondary</Text>
                  <Text color="success">Success</Text>
                  <Text color="danger">Danger</Text>
                  <Text color="muted">Muted</Text>
                </>
              }
            />
          </section>

          {/* Text Styles */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Text Styles</h2>
            <p className="text-gray-400 mb-3">
              Add transformations and decorations like uppercase, italic, underline, or strikethrough.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Text transform="uppercase">Uppercase</Text>
  <Text transform="capitalize">Capitalize</Text>
  <Text transform="lowercase">Lowercase</Text>
  <Text italic>Italic</Text>
  <Text underline>Underline</Text>
  <Text strikethrough>Strikethrough</Text>
</>`}
              previewContent={
                <>
                  <Text darkMode transform="uppercase">Uppercase</Text>
                  <Text darkMode transform="capitalize">Capitalize</Text>
                  <Text darkMode transform="lowercase">Lowercase</Text>
                  <Text darkMode italic>Italic</Text>
                  <Text darkMode underline>Underline</Text>
                  <Text darkMode strikethrough>Strikethrough</Text>
                </>
              }
            />
          </section>

          {/* Truncate & Hover */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Truncate & Hover</h2>
            <p className="text-gray-400 mb-3">
              Cut long text and add a hover effect easily.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Text truncate hoverable color="secondary" style={{ maxWidth: '250px' }}>
  This text will truncate when it's too long and will have a hover effect.
</Text>`}
              previewContent={
                <Text truncate hoverable darkMode style={{ maxWidth: "250px" }}>
                  This text will truncate when it's too long and will have a hover effect.
                </Text>
              }
            />
          </section>

          {/* Custom Base Color */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Custom Base Color</h2>
            <p className="text-gray-400 mb-3">
              Pick a <code className="text-primary">baseColor</code> and the component will automatically generate a light/dark palette for your text.
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

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">All Props (Explained Simply)</h2>
            <div className="overflow-x-auto border border-zinc-800 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-400">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">What it does</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr><td className="p-3">as</td><td className="p-3">string</td><td>Choose which HTML tag to render (p, h1, span, etc.)</td></tr>
                  <tr><td className="p-3">children</td><td className="p-3">ReactNode</td><td>The text content or elements inside the Text component</td></tr>
                  <tr><td className="p-3">color</td><td className="p-3">string</td><td>Pick a text color (primary, secondary, success, danger, muted, or any hex)</td></tr>
                  <tr><td className="p-3">size</td><td className="p-3">string</td><td>Set text size (xs, sm, md, lg, xl, 2xl or custom)</td></tr>
                  <tr><td className="p-3">weight</td><td className="p-3">number | string</td><td>Set the font weight (normal, bold, 400, 700 etc.)</td></tr>
                  <tr><td className="p-3">align</td><td className="p-3">string</td><td>Align text (left, center, right)</td></tr>
                  <tr><td className="p-3">transform</td><td className="p-3">string</td><td>Change text casing (uppercase, lowercase, capitalize)</td></tr>
                  <tr><td className="p-3">italic</td><td className="p-3">boolean</td><td>Makes text italic</td></tr>
                  <tr><td className="p-3">underline</td><td className="p-3">boolean</td><td>Add underline to text</td></tr>
                  <tr><td className="p-3">strikethrough</td><td className="p-3">boolean</td><td>Add line-through to text</td></tr>
                  <tr><td className="p-3">truncate</td><td className="p-3">boolean</td><td>Cut long text with "..."</td></tr>
                  <tr><td className="p-3">selectable</td><td className="p-3">boolean</td><td>Allow user to select text</td></tr>
                  <tr><td className="p-3">hoverable</td><td className="p-3">boolean</td><td>Add a subtle hover effect</td></tr>
                  <tr><td className="p-3">darkMode</td><td className="p-3">boolean</td><td>Switch to dark mode automatically</td></tr>
                  <tr><td className="p-3">baseColor</td><td className="p-3">string</td><td>Custom base color to generate a color palette for text</td></tr>
                  <tr><td className="p-3">onClick</td><td className="p-3">function</td><td>Function to run when text is clicked</td></tr>
                  <tr><td className="p-3">style</td><td className="p-3">CSSProperties</td><td>Custom inline styles</td></tr>
                  <tr><td className="p-3">className</td><td className="p-3">string</td><td>Custom CSS class names</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with <span className="text-primary">React</span>, <span className="text-primary">Tailwind CSS</span> & <span className="text-primary">TypeScript</span>.
          </footer>

        </div>
      </div>
    </>
  );
};

export default TextDocs;