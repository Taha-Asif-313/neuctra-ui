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
        description="Learn how to use the modern Input component in Neuctra UI — supports text, password, email, number, url, tel, search, and textarea inputs, with validation states, multiple sizes, and prefix/suffix icons."
        keywords="Neuctra UI Input, React input component, Tailwind input, UI library, input validation, form component, modern input"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Input Component
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Input</span>{" "}
              component is a flexible, modern form input with support for
              multiple types (text, password, email, number, url, tel, search,
              textarea). Features include prefix/suffix icons, inline validation
              states, helper text, multiple sizes, and a password visibility
              toggle.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Input } from "@neuctra/ui";`} />
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

          {/* Input Types */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Input Types
            </h2>

            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
/>`}
                previewContent={
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Input
  type="password"
  label="Password"
  placeholder="Enter password"
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
  placeholder="Enter age"
  min={1}
  max={100}
  defaultValue="18"
/>`}
                previewContent={
                  <Input
                    type="number"
                    label="Age"
                    placeholder="Enter age"
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
  placeholder="Write your message..."
  rows={4}
  helperText="Supports multiline input"
/>`}
                previewContent={
                  <Input
                    type="textarea"
                    label="Message"
                    placeholder="Write your message..."
                    rows={4}
                    helperText="Supports multiline input"
                  />
                }
              />
            </div>
          </section>

          {/* States & Validation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              States & Validation
            </h2>

            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Input
  label="Error state"
  placeholder="Enter value"
  error="This field is required"
/>`}
                previewContent={
                  <Input
                    label="Error state"
                    placeholder="Enter value"
                    error="This field is required"
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Input
  label="Success state"
  placeholder="Valid input"
  success
  helperText="Looks good!"
/>`}
                previewContent={
                  <Input
                    label="Success state"
                    placeholder="Valid input"
                    success
                    helperText="Looks good!"
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Input
  label="Disabled input"
  placeholder="Disabled"
  disabled
/>`}
                previewContent={
                  <Input
                    label="Disabled input"
                    placeholder="Disabled"
                    disabled
                  />
                }
              />
            </div>
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Sizes</h2>
            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Input size="sm" label="Small" placeholder="Compact input" />\n<Input size="md" label="Medium" placeholder="Default size" />\n<Input size="lg" label="Large" placeholder="Spacious input" />`}
                previewContent={
                  <div className="space-y-4">
                    <Input
                      size="sm"
                      label="Small"
                      placeholder="Compact input"
                    />
                    <Input
                      size="md"
                      label="Medium"
                      placeholder="Default size"
                    />
                    <Input
                      size="lg"
                      label="Large"
                      placeholder="Spacious input"
                    />
                  </div>
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
                      "text" | "password" | "email" | "number" | "url" | "tel" |
                      "search" | "textarea"
                    </td>
                    <td className="p-3">"text"</td>
                    <td className="p-3">Input type.</td>
                  </tr>

                  <tr>
                    <td className="p-3">id</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      HTML id attribute for accessibility.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">description</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Descriptive text shown next to label.
                    </td>
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
                    <td className="p-3">onFocus</td>
                    <td className="p-3">(event) ={`>`} void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when input gains focus.</td>
                  </tr>

                  <tr>
                    <td className="p-3">onBlur</td>
                    <td className="p-3">(event) ={`>`} void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered when input loses focus.</td>
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
                    <td className="p-3">maxLength</td>
                    <td className="p-3">number</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Maximum character length.</td>
                  </tr>

                  <tr>
                    <td className="p-3">rows</td>
                    <td className="p-3">number</td>
                    <td className="p-3">4</td>
                    <td className="p-3">Textarea rows.</td>
                  </tr>

                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">"sm" | "md" | "lg"</td>
                    <td className="p-3">"md"</td>
                    <td className="p-3">Input size variant.</td>
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
                    rows must be {">="} 1 for textarea rendering.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} className="mt-1" />
                <div>
                  <code>{'<Input type="number" min={10} max={5} />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    min should always be less than max.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} className="mt-1" />
                <div>
                  <code>{'<Input id="email" label="Email" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Always use label + id for accessibility.
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
                <li>
                  Use <code className="text-primary">size</code> prop for
                  responsive layouts (sm, md, lg).
                </li>
                <li>
                  Use <code className="text-primary">prefix/prefixIcon</code>{" "}
                  for visual context (currency, domain, etc).
                </li>
                <li>
                  Combine <code className="text-primary">error/success</code>{" "}
                  with <code className="text-primary">helperText</code> for user
                  feedback.
                </li>
                <li>
                  Always provide <code className="text-primary">id</code> and{" "}
                  <code className="text-primary">label</code> for accessibility.
                </li>
                <li>
                  Use <code className="text-primary">description</code> prop to
                  show optional/required hints.
                </li>
                <li>
                  Password inputs automatically include visibility toggle via
                  Eye icon.
                </li>
                <li>
                  Controlled vs uncontrolled: use{" "}
                  <code className="text-primary">value</code> or{" "}
                  <code className="text-primary">defaultValue</code>.
                </li>
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
