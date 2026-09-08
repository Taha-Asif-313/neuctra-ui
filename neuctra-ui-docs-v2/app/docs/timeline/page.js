"use client";

import CodeBlock from "@/components/CodeBlock";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Timeline } from "@neuctra/ui";
import { Rocket, GitCommit, Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const timelineFaq = buildComponentFaq("Timeline", {
  sizes: ["sm", "md"],
});

const TimelineDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Timeline Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React timeline component for activity feeds, order tracking and
            changelogs. Done/active/pending statuses, custom icons and
            timestamps — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Timeline-import">
          <h2
            id="Timeline-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Timeline } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Timeline-example-0">
          <h2
            id="Timeline-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Each item carries a status: done, active or pending.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Timeline
  items={[
    { title: "Order placed", time: "09:12", status: "done" },
    { title: "Payment confirmed", time: "09:14", status: "done" },
    { title: "Out for delivery", time: "12:40", status: "active",
      description: "Your package is on its way." },
    { title: "Delivered", status: "pending" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Timeline
                  className="w-full max-w-sm"
                  items={[
                    { title: "Order placed", time: "09:12", status: "done" },
                    {
                      title: "Payment confirmed",
                      time: "09:14",
                      status: "done",
                    },
                    {
                      title: "Out for delivery",
                      time: "12:40",
                      status: "active",
                      description: "Your package is on its way.",
                    },
                    { title: "Delivered", status: "pending" },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Example: Custom Icons & Compact Size */}
        <section aria-labelledby="Timeline-example-1">
          <h2
            id="Timeline-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Custom Icons & Compact Size
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Timeline
  size="sm"
  items={[
    { title: "v0.3.0 released", time: "Today", status: "done", icon: <Rocket /> },
    { title: "24 commits merged", time: "Yesterday", status: "done", icon: <GitCommit /> },
    { title: "Next milestone", status: "pending" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Timeline
                  className="w-full max-w-sm"
                  size="sm"
                  items={[
                    {
                      title: "v0.3.0 released",
                      time: "Today",
                      status: "done",
                      icon: <Rocket />,
                    },
                    {
                      title: "24 commits merged",
                      time: "Yesterday",
                      status: "done",
                      icon: <GitCommit />,
                    },
                    { title: "Next milestone", status: "pending" },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="Timeline-props">
          <h2
            id="Timeline-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Timeline component.
          </p>

          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    TimelineItem[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Entries to render (required)</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items[].title
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Entry heading</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items[].description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Muted body text</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items[].time
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Timestamp shown at the right edge</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items[].icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    check / dot
                  </td>
                  <td className="p-3">Custom marker icon</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    items[].status
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "done" | "active" | "pending"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "pending"
                  </td>
                  <td className="p-3">Controls marker and text emphasis</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "md"
                  </td>
                  <td className="p-3">Density of the list</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each entry's row</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    connectorClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the vertical connector line</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    dotClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the status marker/dot</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    contentClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the title/time/description wrapper
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    titleClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the entry title</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    timeClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the timestamp text</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    descriptionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the entry description</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Timeline-a11y">
          <h2
            id="Timeline-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Renders an ordered list (&lt;ol&gt;), so sequence is conveyed to
              screen readers.
            </li>
            <li>
              Connector lines and markers are decorative (aria-hidden);
              titles carry the meaning.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={timelineFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default TimelineDocs;
