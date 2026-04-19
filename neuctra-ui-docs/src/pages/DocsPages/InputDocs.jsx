"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Check, X } from "lucide-react";
import { Input } from "@neuctra/ui";

const InputDocs = () => {
  return (
    <>
      <Metadata
        title="Input Component — Neuctra UI"
        description="Learn how to use the Input component in Neuctra UI — supports text, password, number, email, and textarea inputs, with prefix/suffix icons, validation, and custom theming."
        keywords="Neuctra UI Input, React input component, Tailwind input, UI library, input validation, prefix suffix icons"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Input Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Input</span>{" "}
              component is a flexible form input primitive. Supports multiple
              types including text, password, email, number, and textarea. Also
              supports prefix/suffix icons, validation messages, helper text,
              custom colors, and password visibility toggle.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              language="react"
              code={`import { Input } from "@neuctra/ui";`}
              previewContent={<Input placeholder="Enter text..." />}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Input label="Name" placeholder="Enter your name" />`}
              previewContent={
                <Input label="Name" placeholder="Enter your name" />
              }
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Advanced Usage
            </h2>
            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Input
  type="password"
  label="Password"
  placeholder="Enter password"
  suffixIcon={<Eye />}
/>`}
                previewContent={
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Input
  type="number"
  label="Age"
  min={1}
  max={100}
  defaultValue="18"
/>`}
                previewContent={
                  <Input
                    type="number"
                    label="Age"
                    min={1}
                    max={100}
                    defaultValue="18"
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Input
  type="textarea"
  label="Message"
  placeholder="Enter your message"
  rows={6}
  helperText="Write something nice..."
/>`}
                previewContent={
                  <Input
                    type="textarea"
                    label="Message"
                    placeholder="Enter your message"
                    rows={6}
                    helperText="Write something nice..."
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Input
  label="Email"
  type="email"
  prefix="+"
  prefixIcon={MailIcon}
  error="Invalid email"
/>`}
                previewContent={
                  <Input
                    label="Currency"
                    type="text"
                    prefix="PKR"
                    error="Invalid currency"
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
              All available props for the Input component.
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
                    <td className="p-3">Label text for the input field.</td>
                  </tr>

                  <tr>
                    <td className="p-3">name</td>
                    <td className="p-3">string</td>
                    <td className="p-3">""</td>
                    <td className="p-3">Input name attribute.</td>
                  </tr>

                  <tr>
                    <td className="p-3">type</td>
                    <td className="p-3">
                      "text" | "password" | "email" | "number" | "textarea"
                    </td>
                    <td className="p-3">"text"</td>
                    <td className="p-3">Input type.</td>
                  </tr>

                  <tr>
                    <td className="p-3">placeholder</td>
                    <td className="p-3">string</td>
                    <td className="p-3">""</td>
                    <td className="p-3">Placeholder text inside the input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">value</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Controlled input value.</td>
                  </tr>

                  <tr>
                    <td className="p-3">defaultValue</td>
                    <td className="p-3">string</td>
                    <td className="p-3">""</td>
                    <td className="p-3">
                      Initial value for uncontrolled usage.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">onChange</td>
                    <td className="p-3">(event) ={`>`} void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when input value changes.</td>
                  </tr>

                  <tr>
                    <td className="p-3">required</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Marks field as required.</td>
                  </tr>

                  <tr>
                    <td className="p-3">disabled</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Disables the input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">readOnly</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Makes input read-only.</td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">string | boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Shows error state or message.</td>
                  </tr>

                  <tr>
                    <td className="p-3">success</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Displays success state.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperText</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Helper text below the input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">icon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed inside the label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">prefix</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Text shown before input value.</td>
                  </tr>

                  <tr>
                    <td className="p-3">prefixIcon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon before input content.</td>
                  </tr>

                  <tr>
                    <td className="p-3">suffixIcon</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Icon after input (ignored for password toggle).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">min / max / step</td>
                    <td className="p-3">number</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Constraints for number input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">rows</td>
                    <td className="p-3">number</td>
                    <td className="p-3">4</td>
                    <td className="p-3">Textarea rows.</td>
                  </tr>

                  <tr>
                    <td className="p-3">primaryTheme</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">true</td>
                    <td className="p-3">Enable default theme styles.</td>
                  </tr>

                  <tr>
                    <td className="p-3">primaryColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3">#3b82f6</td>
                    <td className="p-3">Custom color when theme disabled.</td>
                  </tr>

                  {/* 🔥 Customization Props */}
                  <tr>
                    <td className="p-3">wrapperClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">inputClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for input.</td>
                  </tr>

                  <tr>
                    <td className="p-3">textareaClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for textarea.</td>
                  </tr>

                  <tr>
                    <td className="p-3">prefixClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for prefix.</td>
                  </tr>

                  <tr>
                    <td className="p-3">suffixClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for suffix.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperTextClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom classes for helper text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">wrapperStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">inputStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for input/textarea.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Fallback wrapper class.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Input type="textarea" rows={0} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Rows must be greater than 0.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Input type="number" min={10} max={5} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Ensure min is less than max.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Input className="w-full" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Use className for custom sizing or spacing.
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
                <li>Use prefix/prefixIcon/suffixIcon for enhanced UX.</li>
                <li>Combine with flex/grid for form layouts.</li>
                <li>
                  Use type="password" with suffixIcon for visibility toggle.
                </li>
                <li>Use error/success/helperText for validation feedback.</li>
                <li>
                  Controlled vs uncontrolled usage: value vs defaultValue.
                </li>
                <li>Use primaryTheme and primaryColor for custom design.</li>
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

export default InputDocs;
