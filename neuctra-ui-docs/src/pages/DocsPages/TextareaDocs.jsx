"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Textarea } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Check, X } from "lucide-react";

const TextareaDocs = () => {
  return (
    <>
      <Metadata
        title="Textarea Component — Neuctra UI"
        description="Learn how to use the Textarea component in Neuctra UI — customizable, responsive, theme-aware textareas with labels, icons, helper text, error and success states."
        keywords="Neuctra UI Textarea, React textarea component, Tailwind textarea, responsive textarea, UI library, React form component"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Textarea Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Textarea</span>{" "}
              component is a flexible, responsive textarea primitive. Supports
              labels, icons, error and success states, helper text, character
              count, and theme-aware styling — fully customizable with className
              and style props.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              language="react"
              code={`import { Textarea } from "@neuctra/ui";`}
              previewContent={<Textarea placeholder="Type here..." />}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Textarea label="Description" placeholder="Enter text..." />`}
              previewContent={<Textarea label="Description" placeholder="Enter text..." />}
            />
          </section>

          {/* Advanced Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Advanced Usage
            </h2>
            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Textarea
  label="Bio"
  icon={UserIcon}
  value={value}
  onChange={handleChange}
  helperText="Tell us about yourself"
  maxLength={150}
/>`}
                previewContent={
                  <Textarea
                    label="Bio"
                    placeholder="Tell us about yourself"
                    helperText="You can write up to 150 characters"
                    maxLength={150}
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Textarea
  label="Comment"
  error
  helperText="This field is required"
  rows={5}
  className="border-red-500"
  darkMode
/>`}
                previewContent={
                  <Textarea
                    label="Comment"
                    rows={5}
                    error
                    helperText="This field is required"
                    darkMode
                  />
                }
              />
            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>
            <p className="text-gray-400 mb-3">
              All available props for the Textarea component.
            </p>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Optional label displayed above the textarea.</td>
                  </tr>
                  <tr>
                    <td className="p-3">icon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Optional icon displayed next to the label.</td>
                  </tr>
                  <tr>
                    <td className="p-3">helperText</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text displayed below the textarea (e.g., instructions or errors).</td>
                  </tr>
                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Shows error state and red border.</td>
                  </tr>
                  <tr>
                    <td className="p-3">success</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Shows success state and green border.</td>
                  </tr>
                  <tr>
                    <td className="p-3">maxLength</td>
                    <td className="p-3">number</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Maximum allowed characters; shows counter if provided.</td>
                  </tr>
                  <tr>
                    <td className="p-3">rows</td>
                    <td className="p-3">number</td>
                    <td className="p-3">3</td>
                    <td className="p-3">Number of visible textarea rows.</td>
                  </tr>
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom Tailwind or CSS classes for the textarea.</td>
                  </tr>
                  <tr>
                    <td className="p-3">containerClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for outer container div.</td>
                  </tr>
                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for the label element.</td>
                  </tr>
                  <tr>
                    <td className="p-3">helperClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for helper text.</td>
                  </tr>
                  <tr>
                    <td className="p-3">countClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for character count text.</td>
                  </tr>
                  <tr>
                    <td className="p-3">darkMode</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">undefined</td>
                    <td className="p-3">Force dark or light mode; defaults to system preference.</td>
                  </tr>
                  <tr>
                    <td className="p-3">style / containerStyle / labelStyle / helperStyle / countStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for each part.</td>
                  </tr>
                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">TextareaHTMLAttributes&lt;HTMLTextAreaElement&gt;</td>
                    <td className="p-3">—</td>
                    <td className="p-3">All native textarea props like onChange, placeholder, disabled, etc.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Common Mistakes</h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Textarea rows="10" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use a number, not a string, for rows.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Textarea maxLength="100" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    maxLength must be a number, not a string.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Textarea className="w-full p-4" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use className for custom sizing, spacing, and styling.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <div className="text-gray-200 space-y-3">
              <ul className="list-disc list-inside space-y-1">
                <li>Combine with flex/grid for layout alignment.</li>
                <li>Use helperText to give clear instructions or validation messages.</li>
                <li>Use error/success states for better UX feedback.</li>
                <li>Use darkMode prop to override system theme if needed.</li>
                <li>Use maxLength and character count for controlled text input.</li>
                <li>Use label and icon for better semantic accessibility.</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span> &{" "}
            <span className="text-primary">TypeScript</span>.
          </footer>
        </div>
      </div>
    </>
  );
};

export default TextareaDocs;