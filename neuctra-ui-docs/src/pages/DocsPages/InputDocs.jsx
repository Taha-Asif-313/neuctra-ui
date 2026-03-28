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
              component is a flexible, modern, and accessible input field. 
              Features include:
            </p>
            <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
              <li>Password visibility toggle</li>
              <li>Icons on label, prefix, or suffix</li>
              <li>Textarea support</li>
              <li>Validation states (error/success)</li>
              <li>Full style and theme customization</li>
            </ul>
          </header>

          {/* Basic Input */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Input
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Input label="Username" placeholder="Enter your username" />`}
              previewContent={
                <Input
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
            <p className="text-gray-400 mb-3">
              Add icons on the label, prefix, or suffix for better UI.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  prefixIcon={Mail}
/>`}
              previewContent={
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  prefixIcon={Mail}
                />
              }
            />
          </section>

          {/* Password Input */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Password Input
            </h2>
            <p className="text-gray-400 mb-3">
              Password fields include a toggle to show or hide the password.
            </p>
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
                />
              }
            />
          </section>

          {/* Textarea Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Textarea
            </h2>
            <p className="text-gray-400 mb-3">
              Switch to textarea mode for multi-line input.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Input
  label="Message"
  type="textarea"
  placeholder="Write something..."
  rows={5}
/>`}
              previewContent={
                <Input
                  label="Message"
                  type="textarea"
                  placeholder="Write something..."
                  rows={5}
                />
              }
            />
          </section>

          {/* Validation States */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Validation States
            </h2>
            <p className="text-gray-400 mb-3">
              Show errors or success messages to guide users.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Input label="Email" placeholder="Invalid email" error="Invalid format" />
  <Input label="Username" placeholder="Valid username" success />
</>`}
              previewContent={
                <div className="space-y-4">
                  <Input
                    label="Email"
                    placeholder="Invalid email"
                    error="Invalid format"
                  />
                  <Input
                    label="Username"
                    placeholder="Valid username"
                    success
                  />
                </div>
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styles & Theme
            </h2>
            <p className="text-gray-400 mb-3">
              Fully customize colors, borders, and shadows to match your UI.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Input
  label="Custom Field"
  placeholder="Stylish input ✨"
  primaryTheme={false}
  primaryColor="#9333ea"
/>`}
              previewContent={
                <Input
                  label="Custom Field"
                  placeholder="Stylish input ✨"
                  primaryTheme={false}
                  primaryColor="#9333ea"
                />
              }
            />
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            <p>
              Built with <span className="text-primary">React</span>,{" "}
              <span className="text-primary">Tailwind CSS</span>, and{" "}
              <span className="text-primary">Lucide Icons</span>.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default InputDocs;