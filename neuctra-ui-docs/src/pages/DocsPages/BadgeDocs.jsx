"use client";

import React from "react";
import { Badge } from "@neuctra/ui"; // your Badge component
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Bell, Star, Info, Heart } from "lucide-react";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const BadgeDocs = () => {
  return (
    <>
      <Metadata
        title="Badge Component — Neuctra UI"
        description="Learn how to use the Badge component in Neuctra UI to display statuses, notifications, counts, and highlights with customizable colors, icons, and styles."
        keywords="Neuctra UI Badge, React badge component, status badge, notification badge, count badge, UI indicators, React UI library, Neuctra components"
        image="https://ui.neuctra.com/og/badge-docs.png"
        ogTitle="Badge Component — Neuctra UI"
        ogDescription="Highlight important statuses, notifications, and alerts using the flexible and customizable Badge component from Neuctra UI — designed for React developers."
        twitterTitle="Badge Component — Neuctra UI"
        twitterDescription="Explore the Badge component from Neuctra UI — lightweight, customizable, and perfect for showing notifications or highlights in modern React apps."
        canonical="https://ui.neuctra.com/docs/badge"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Badge Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Badge</span> component is used to highlight statuses, notifications, counts, or special information. 
              It supports icons, colors, shapes, notification dots, counts, and animations.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
            <p className="text-gray-300 mb-3">
              Display a simple badge with text. You can use it to show new items or highlights.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Badge text="New" />
<Badge text="Success" primaryTheme={false} primaryColor="#16a34a" />
<Badge text="Alert" primaryTheme={false} primaryColor="#dc2626" />`}
              previewContent={
                <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                  <Badge text="New" />
                  <Badge text="Success" primaryTheme={false} primaryColor="#16a34a" />
                  <Badge text="Alert" primaryTheme={false} primaryColor="#dc2626" />
                </div>
              }
            />
          </section>

          {/* Badges with Icons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Badges with Icons</h2>
            <p className="text-gray-300 mb-3">
              Add icons to the badge using <code className="text-primary">icon</code>. Position them with <code className="text-primary">iconPosition</code> (left or right).
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Badge text="Info" icon={<Info size={14} />} />
<Badge text="Starred" primaryTheme={false} primaryColor="#facc15" icon={<Star size={14} />} iconPosition="right" />`}
              previewContent={
                <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                  <Badge text="Info" icon={<Info size={14} />} />
                  <Badge
                    text="Starred"
                    primaryTheme={false}
                    primaryColor="#facc15"
                    icon={<Star size={14} />}
                    iconPosition="right"
                  />
                </div>
              }
            />
          </section>

          {/* Notification & Count */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Notification & Count Badges</h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">notificationDot</code> to show an alert dot, or <code className="text-primary">count</code> to show numbers like unread messages.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Badge text="Inbox" icon={<Bell size={14} />} notificationDot />
<Badge icon={<Heart size={14} />} count={3} primaryTheme={false} primaryColor="#ef4444" />`}
              previewContent={
                <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                  <Badge text="Inbox" icon={<Bell size={14} />} notificationDot />
                  <Badge icon={<Heart size={14} />} count={3} primaryTheme={false} primaryColor="#ef4444" />
                </div>
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Sizes</h2>
            <p className="text-gray-300 mb-3">
              Control the badge size using <code className="text-primary">size</code>. Options: <code>sm</code>, <code>md</code>, <code>lg</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<>
  <Badge text="Small" size="sm" />
  <Badge text="Medium" size="md" />
  <Badge text="Large" size="lg" />
</>`}
              previewContent={
                <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                  <Badge text="Small" size="sm" />
                  <Badge text="Medium" size="md" />
                  <Badge text="Large" size="lg" />
                </div>
              }
            />
          </section>

          {/* Rounded & Shapes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Rounded & Shapes</h2>
            <p className="text-gray-300 mb-3">
              Control the shape using <code className="text-primary">rounded</code>. Rounded badges look like pills, while non-rounded have a rectangular shape.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Badge text="Rounded" rounded />
<Badge text="Rectangular" rounded={false} />`}
              previewContent={
                <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                  <Badge text="Rounded" rounded />
                  <Badge text="Rectangular" rounded={false} />
                </div>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Props Table</h2>
            <p className="text-gray-300 mb-3">
              All available props for the Badge component.
            </p>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-400">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-3">text</td>
                    <td className="p-3">string</td>
                    <td>The text displayed inside the badge</td>
                  </tr>
                  <tr>
                    <td className="p-3">icon</td>
                    <td className="p-3">ReactNode</td>
                    <td>Optional icon shown inside the badge</td>
                  </tr>
                  <tr>
                    <td className="p-3">iconPosition</td>
                    <td className="p-3">"left" | "right"</td>
                    <td>Position of the icon relative to the text</td>
                  </tr>
                  <tr>
                    <td className="p-3">primaryTheme</td>
                    <td className="p-3">boolean</td>
                    <td>Use the CSS theme color or a custom color</td>
                  </tr>
                  <tr>
                    <td className="p-3">primaryColor</td>
                    <td className="p-3">string</td>
                    <td>Custom background color when primaryTheme is false</td>
                  </tr>
                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">"sm" | "md" | "lg"</td>
                    <td>Controls padding and font size</td>
                  </tr>
                  <tr>
                    <td className="p-3">rounded</td>
                    <td className="p-3">boolean</td>
                    <td>Controls if badge has rounded pill shape</td>
                  </tr>
                  <tr>
                    <td className="p-3">notificationDot</td>
                    <td className="p-3">boolean</td>
                    <td>Shows a small dot for notifications</td>
                  </tr>
                  <tr>
                    <td className="p-3">dotColor</td>
                    <td className="p-3">string</td>
                    <td>Custom color for the notification dot</td>
                  </tr>
                  <tr>
                    <td className="p-3">count</td>
                    <td className="p-3">number | string</td>
                    <td>Shows a numeric badge, e.g., unread count</td>
                  </tr>
                  <tr>
                    <td className="p-3">pulse</td>
                    <td className="p-3">boolean</td>
                    <td>Adds a pulsing animation to the notification dot</td>
                  </tr>
                  <tr>
                    <td className="p-3">onClick</td>
                    <td className="p-3">() ={'>'} void</td>
                    <td>Optional click handler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default BadgeDocs;