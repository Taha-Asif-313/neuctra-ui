"use client";

import React, { useState } from "react";
import CodePreviewBlock from "../../components/docs/CodePreviewBlock";
import { Textarea } from "@neuctra/ui";
import Metadata from "../../MetaData";
import CodeBlock from "../../components/docs/CodeBlock";
import { Check, Code, X } from "lucide-react";
import DocsFooter from "../../components/docs/DocsFooter";

const TextareaDocs = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <Metadata
        title="Textarea Component — Neuctra UI"
        description="Modern auto-resizing textarea component with chat-style behavior, keyboard interactions, and full customization."
        keywords="Neuctra UI Textarea, React textarea auto resize, chat input textarea, Tailwind textarea, UI component"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-12">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Textarea Component
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Textarea</span>{" "}
              component is a modern, flexible multiline input built for
              real-world applications. It supports{" "}
              <span className="text-primary">auto-resizing behavior</span>,{" "}
              <span className="text-primary">ChatGPT-like input handling</span>{" "}
              with Enter-to-submit support, character counting, validation
              states, and full styling customization. Designed for chat apps,
              forms, and content-heavy inputs.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock
              language="tsx"
              code={`import { Textarea } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>

            <CodeBlock
              language="tsx"
              code={`<Textarea
  label="Description"
  placeholder="Enter text..."
/>`}

            />
          </section>

          {/* Basic */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Textarea
  label="Description"
  placeholder="Enter text..."
/>`}
              previewContent={
                <Textarea label="Description" placeholder="Enter text..." />
              }
            />
          </section>

          {/* Auto Resize */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Auto Resize (Core Feature)
            </h2>

            <p className="text-gray-400 mb-4">
              Automatically grows with content like modern chat apps. Stops at a
              max height and becomes scrollable.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`<Textarea
  placeholder="Start typing..."
  autoResize
  minRows={2}
  maxRows={8}
/>`}
              previewContent={
                <Textarea
                  placeholder="Start typing..."
                  autoResize
                  minRows={2}
                  maxRows={8}
                />
              }
            />
          </section>

          {/* Chat Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Chat-style Input (Enter to Send)
            </h2>

            <p className="text-gray-400 mb-4">
              Behaves like ChatGPT: press Enter to submit, Shift + Enter for new
              line.
            </p>

            <CodePreviewBlock
              language="tsx"
              code={`const [message, setMessage] = useState("");

<Textarea
  placeholder="Type a message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  autoResize
  submitOnEnter
  onSubmit={() => {
    console.log(message);
    setMessage("");
  }}
/>`}
              previewContent={
                <Textarea
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  autoResize
                  submitOnEnter
                  onSubmit={() => {
                    alert("Sent: " + message);
                    setMessage("");
                  }}
                />
              }
            />
          </section>

          {/* Validation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Validation States
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Textarea
  label="Comment"
  placeholder="Write your comment..."
  error
  helperText="This field is required"
/>

<Textarea
  label="Success"
  placeholder="Everything looks fine..."
  success
  helperText="Looks good!"
/>`}
              previewContent={
                <div className="space-y-4">
                  <Textarea
                    label="Comment"
                    placeholder="Write your comment..."
                    error
                    helperText="This field is required"
                  />
                  <Textarea
                    label="Success"
                    placeholder="Everything looks fine..."
                    success
                    helperText="Looks good!"
                  />
                </div>
              }
            />
          </section>

          {/* Character Count */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Character Limit
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Textarea
  maxLength={120}
  placeholder="Max 120 characters"
/>`}
              previewContent={
                <Textarea maxLength={120} placeholder="Max 120 characters" />
              }
            />
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Styling
            </h2>

            <CodePreviewBlock
              language="tsx"
              code={`<Textarea
  label="Styled"
  className="rounded-xl !border-blue-500"
  labelClassName="text-blue-400"
  placeholder="Custom styling using Tailwind overrides"
/>`}
              previewContent={
                <Textarea
                  label="Styled"
                  className="rounded-xl !border-blue-500"
                  labelClassName="!text-blue-500"
                  placeholder="Custom styling using Tailwind overrides"
                />
              }
            />
          </section>

          {/* Props */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3">label</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Optional label displayed above the textarea.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">icon</td>
                    <td className="p-3">React.ElementType</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon displayed next to the label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperText</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Helper or validation message shown below.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">error</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Applies error styles (destructive border/text).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">success</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Applies success styles (primary border).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">maxLength</td>
                    <td className="p-3">number</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Maximum character limit. Shows counter when used.
                    </td>
                  </tr>

                  {/* Auto Resize */}
                  <tr>
                    <td className="p-3">autoResize</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">true</td>
                    <td className="p-3">
                      Enables dynamic height resizing based on content.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">minRows</td>
                    <td className="p-3">number</td>
                    <td className="p-3">1</td>
                    <td className="p-3">
                      Minimum visible rows when autoResize is enabled.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">maxRows</td>
                    <td className="p-3">number</td>
                    <td className="p-3">6</td>
                    <td className="p-3">
                      Maximum rows before vertical scroll appears.
                    </td>
                  </tr>

                  {/* Chat Behavior */}
                  <tr>
                    <td className="p-3">submitOnEnter</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">
                      Press Enter to submit. Use Shift + Enter for newline.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">onSubmit</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Callback triggered when submitting via Enter.
                    </td>
                  </tr>

                  {/* Styling */}
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Custom classes for textarea element.
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">containerClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Classes for outer wrapper.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom label styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom helper text styling.</td>
                  </tr>

                  <tr>
                    <td className="p-3">countClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Custom character counter styling.</td>
                  </tr>

                  {/* Styles */}
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for textarea.</td>
                  </tr>

                  <tr>
                    <td className="p-3">containerStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for container.</td>
                  </tr>

                  <tr>
                    <td className="p-3">labelStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for label.</td>
                  </tr>

                  <tr>
                    <td className="p-3">helperStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inline styles for helper text.</td>
                  </tr>

                  <tr>
                    <td className="p-3">countStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      Inline styles for character counter.
                    </td>
                  </tr>

                  {/* Theme */}
                  <tr>
                    <td className="p-3">darkMode</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">system</td>
                    <td className="p-3">
                      Force dark/light mode. Defaults to system preference.
                    </td>
                  </tr>

                  {/* Native */}
                  <tr>
                    <td className="p-3">...rest</td>
                    <td className="p-3">
                      React.TextareaHTMLAttributes&lt;HTMLTextAreaElement&gt;
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      All native textarea props (value, onChange, placeholder,
                      etc).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{'<Textarea rows="5" />'}</code>
                  <p className="text-gray-500 text-xs">
                    Avoid rows when using autoResize.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>{"<Textarea maxRows={6} />"}</code>
                  <p className="text-gray-500 text-xs">
                    Use minRows / maxRows instead.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default TextareaDocs;
