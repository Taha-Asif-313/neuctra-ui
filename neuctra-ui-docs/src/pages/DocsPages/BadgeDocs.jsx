"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Badge } from "@neuctra/ui";
import { Check, User, X } from "lucide-react";
import DocsFooter from "../../components/Docs/DocsFooter";

const BadgeDocs = () => {
  return (
    <>
      <Metadata
        title="Badge Component — Neuctra UI"
        description="Learn how to use the Badge component in Neuctra UI — customizable sizes, colors, icons, notification dots, and counts."
        keywords="Neuctra UI Badge, React Badge component, notification badge, icon badge, UI library"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Badge Component
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Badge</span>{" "}
              component is a versatile UI element for displaying text, counts,
              notification dots, and icons. Supports multiple sizes, rounded
              shapes, colors, and click interactions.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Badge } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Badge text="New" />`}
              previewContent={<Badge text="New" />}
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
                code={`<Badge text="Messages" notificationDot />`}
                previewContent={<Badge text="Messages" notificationDot />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Badge text="Alerts" count={5} dotColor="#EF4444" pulse />`}
                previewContent={
                  <Badge text="Alerts" count={5} dotColor="#EF4444" />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Badge
  text="Admin"
  variant="soft"
  icon={<User size={16} />}
  iconPosition="left"
  size="lg"
/>`}
                previewContent={
                  <Badge
                    text="Admin"
                    variant="soft"
                    icon={<User size={16} />}
                    iconPosition="left"
                    size="lg"
                  />
                }
              />
            </div>
          </section>

          {/* Variant Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Variants</h2>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Badge text="Solid" />
  <Badge text="Outline" variant="outline" />
  <Badge text="Soft" variant="soft" />
</>`}
              previewContent={
                <div className="flex gap-3">
                  <Badge text="Solid" />
                  <Badge text="Outline" variant="outline" />
                  <Badge text="Soft" variant="soft" />
                </div>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>
            <p className="text-gray-400 mb-3">
              All available props for the Badge component.
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
                    <td className="p-3 font-medium">text</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">Text displayed inside the badge</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">icon</td>
                    <td className="p-3">React.ReactNode</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Optional icon displayed alongside the text
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">variant</td>
                    <td className="p-3">"solid" | "outline" | "soft"</td>
                    <td className="p-3 text-gray-400">"solid"</td>
                    <td className="p-3">
                      Controls the visual style of the badge.
                      <br />
                      <span className="text-xs text-gray-500">
                        solid: filled • outline: bordered • soft: subtle
                        background
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">iconPosition</td>
                    <td className="p-3">"left" | "right"</td>
                    <td className="p-3 text-gray-400">"left"</td>
                    <td className="p-3">
                      Position of the icon relative to the text
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">size</td>
                    <td className="p-3">"sm" | "md" | "lg"</td>
                    <td className="p-3 text-gray-400">"md"</td>
                    <td className="p-3">
                      Size of the badge (affects padding and font size)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">rounded</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 text-gray-400">true</td>
                    <td className="p-3">
                      Whether the badge should be fully rounded (pill shape) or
                      slightly rounded
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">notificationDot</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 text-gray-400">false</td>
                    <td className="p-3">
                      Shows a small notification dot in the top-right corner
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">dotColor</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Custom color for the notification dot (overrides default
                      destructive color)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">count</td>
                    <td className="p-3">number | string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Displays a numeric or custom count badge (e.g., unread
                      messages)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">pulse</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 text-gray-400">false</td>
                    <td className="p-3">
                      Enables a pulsing animation on the notification dot
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">onClick</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Click handler. Makes the badge interactive with hover
                      effect
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Additional CSS classes for the badge container
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Inline styles for the badge container
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">dotClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Additional classes for the notification dot
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">dotStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Inline styles for the notification dot
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">countClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Additional classes for the count badge
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">countStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">Inline styles for the count badge</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Additional classes for the icon wrapper
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">iconStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">Inline styles for the icon wrapper</td>
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
                <X size={16} />
                <div>
                  <code>{"<Badge notificationDot count={5} />"}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    Using both <code>notificationDot</code> and{" "}
                    <code>count</code> at the same time can cause visual
                    overlap.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{'<Badge primaryColor="..." />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    The <code>primaryColor</code> prop does not exist. Use{" "}
                    <code>className</code> or <code>style</code> to customize
                    colors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{'<Badge dotColor="#ef4444" notificationDot />'}</code>
                  <p className="text-gray-500 text-xs mt-1">
                    <code>dotColor</code> is defined in props but currently not
                    used in the component. Use <code>dotStyle</code> or{" "}
                    <code>dotClassName</code> instead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>
                    {'<Badge text="New" icon={<Bell />} count={12} pulse />'}
                  </code>
                  <p className="text-gray-500 text-xs mt-1">
                    Combining icon, count, and pulse creates highly noticeable
                    badges.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>
                Use <code>count</code> for numeric indicators like unread
                messages or notifications.
              </li>
              <li>
                Combine <code>icon</code> with <code>iconPosition</code> for
                better context (e.g., status badges).
              </li>
              <li>
                Use <code>notificationDot</code> + <code>pulse</code> for urgent
                alerts.
              </li>
              <li>
                Customize appearance using <code>className</code> and{" "}
                <code>style</code> since the component uses Tailwind + CSS
                variables.
              </li>
              <li>
                Choose <code>rounded={false}</code> when you need a more
                rectangular badge shape.
              </li>
              <li>Keep text short — badges are meant to be compact.</li>
              <li>
                For clickable badges, ensure sufficient contrast and clear
                labeling for accessibility.
              </li>
            </ul>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default BadgeDocs;
