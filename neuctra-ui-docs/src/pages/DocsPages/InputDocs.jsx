"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Input } from "@neuctra/ui";
import { Mail, Lock } from "lucide-react";
import Metadata from "../../MetaData";

const InputDocs = () => {
  return (
    <>
    <Metadata
  title="Input Component — Neuctra UI"
  description="Learn how to use the Input component from Neuctra UI — a customizable, accessible, and theme-ready React input field with icons, password visibility, textarea mode, and validation states."
  keywords="Neuctra UI Input, React input component, password field, textarea, form input, Tailwind CSS input, custom input styles, input validation, UI components, Neuctra library"
  image="https://ui.neuctra.com/og/input-docs-preview.png"
  ogTitle="Input Component — Neuctra UI"
  ogDescription="A fully customizable React input field with icons, password toggle, validation states, and Tailwind theming — from Neuctra UI."
  twitterTitle="Input Component | Neuctra UI"
  twitterDescription="Modern, accessible input fields for React — with icons, password visibility, and full Tailwind customization. Learn more on Neuctra UI docs."
  canonical="https://ui.neuctra.com/docs/input"
/>

    
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Input Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Input</span>{" "}
            component is a fully customizable, accessible, and modern input
            field for forms. It supports <strong>password toggles</strong>,{" "}
            <strong>icons</strong>, <strong>textarea mode</strong>,{" "}
            <strong>dynamic borders</strong>, and{" "}
            <strong>complete style overrides</strong> for every part of the
            input.
          </p>
        </header>

        {/* Basic Input */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Input label="Username" placeholder="Enter your username" />`}
            previewContent={
              <Input
                labelColor="#fff"
                label="Username"
                placeholder="Enter your username"
              />
            }
          />
        </section>

        {/* Input with Icons */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Input with Icons
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  iconLeft={<Mail size={16} />}
/>`}
            previewContent={
              <Input
                label="Email"
                type="email"
                labelColor="#fff"
                placeholder="you@example.com"
                iconLeft={<Mail size={16} />}
              />
            }
          />
        </section>

        {/* Password Input */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Password Input with Visibility Toggle
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Input
  label="Password"
  type="password"
  placeholder="Enter your password"
/>`}
            previewContent={
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                labelColor="#ffffff"
              />
            }
          />
        </section>

        {/* Textarea Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Textarea Example
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Input
  label="Message"
  type="textarea"
  placeholder="Write something..."
  maxLength={150}
  showCharacterCount
/>`}
            previewContent={
              <Input
                label="Message"
                type="textarea"
                labelColor="#fff"
                placeholder="Write something..."
                maxLength={150}
                showCharacterCount
              />
            }
          />
        </section>

        {/* Custom Styling Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Custom Theme & Colors
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Input
  label="Custom Field"
  placeholder="Stylish input ✨"
  borderColor="#9333ea"
  focusBorderColor="#a855f7"
  backgroundColor="#1e1b4b"
  textColor="#e0e7ff"
  placeholderColor="#818cf8"
  shadow="0 0 12px rgba(147,51,234,0.3)"
/>`}
            previewContent={
              <Input
                label="Custom Field"
                placeholder="Stylish input ✨"
                borderColor="#9333ea"
                focusBorderColor="#a855f7"
                backgroundColor="#1e1b4b"
                textColor="#ffffff"
                labelColor="#9333ea"
                placeholderColor="#818cf8"
                shadow="0 0 12px rgba(147,51,234,0.3)"
              />
            }
          />
        </section>

        {/* Validation Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Validation States
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<>
  <Input label="Email" placeholder="Invalid email" error="Invalid format" />
  <Input label="Username" placeholder="Valid username" success />
</>`}
            previewContent={
              <div className="space-y-4">
                <Input
                  labelColor="#fff"
                  label="Email"
                  placeholder="Invalid email"
                  error="Invalid format"
                />
                <Input
                  labelColor="#fff"
                  label="Username"
                  placeholder="Valid username"
                  success
                />
              </div>
            }
          />
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span>, and{" "}
            <span className="text-primary">Lucide Icons</span>. Designed for
            modern UI flexibility and accessibility.
          </p>
        </footer>
      </div>
    </div>
    </>
  );
};

export default InputDocs;
