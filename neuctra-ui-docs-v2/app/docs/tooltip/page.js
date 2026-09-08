"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Tooltip, Button, Kbd } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const tooltipFaq = buildComponentFaq("Tooltip");

const TooltipDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Tooltip Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Accessible React tooltip shown on hover and keyboard focus. Four
            positions, show delay, Escape dismissal and WCAG-friendly
            behavior — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Tooltip-import">
          <h2
            id="Tooltip-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Tooltip } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Tooltip-example-0">
          <h2
            id="Tooltip-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Wraps its child; appears on hover and on keyboard focus.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Tooltip content="Save your changes">
  <Button size="sm">Save</Button>
</Tooltip>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Tooltip content="Save your changes">
                  <Button size="sm">Save</Button>
                </Tooltip>
              </div>
            }
          />
        </section>

        {/* Example: Positions */}
        <section aria-labelledby="Tooltip-example-1">
          <h2
            id="Tooltip-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Positions
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Tooltip content="Top" position="top"><Button size="xs" variant="outline">Top</Button></Tooltip>
<Tooltip content="Bottom" position="bottom"><Button size="xs" variant="outline">Bottom</Button></Tooltip>
<Tooltip content="Left" position="left"><Button size="xs" variant="outline">Left</Button></Tooltip>
<Tooltip content="Right" position="right"><Button size="xs" variant="outline">Right</Button></Tooltip>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Tooltip content="Top" position="top">
                  <Button size="xs" variant="outline">
                    Top
                  </Button>
                </Tooltip>
                <Tooltip content="Bottom" position="bottom">
                  <Button size="xs" variant="outline">
                    Bottom
                  </Button>
                </Tooltip>
                <Tooltip content="Left" position="left">
                  <Button size="xs" variant="outline">
                    Left
                  </Button>
                </Tooltip>
                <Tooltip content="Right" position="right">
                  <Button size="xs" variant="outline">
                    Right
                  </Button>
                </Tooltip>
              </div>
            }
          />
        </section>

        {/* Example: Rich Content & Delay */}
        <section aria-labelledby="Tooltip-example-2">
          <h2
            id="Tooltip-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Rich Content & Delay
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Tooltip
  delay={400}
  content={<span>Search <Kbd size="sm">⌘K</Kbd></span>}
>
  <Button size="sm" variant="ghost">Hover me (400ms)</Button>
</Tooltip>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Tooltip
                  delay={400}
                  content={
                    <span>
                      Search <Kbd size="sm">⌘K</Kbd>
                    </span>
                  }
                >
                  <Button size="sm" variant="ghost">
                    Hover me (400ms)
                  </Button>
                </Tooltip>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Tooltip-props">
          <h2
            id="Tooltip-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Tooltip component.
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
                    content
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Tooltip content (required)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Trigger element (required)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    position
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "top" | "bottom" | "left" | "right"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "top"
                  </td>
                  <td className="p-3">Placement relative to the trigger</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    delay
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">150</td>
                  <td className="p-3">Show delay in milliseconds</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Never show the tooltip</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    contentClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Extra classes for the bubble</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    arrowClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Extra classes for the triangular pointer
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Tooltip-a11y">
          <h2
            id="Tooltip-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Uses role="tooltip" linked to the trigger with
              aria-describedby while visible.
            </li>
            <li>
              Opens on keyboard focus, not just hover, and closes on Escape
              (WCAG 1.4.13).
            </li>
            <li>
              The bubble is pointer-events-none, so it never blocks the
              cursor.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={tooltipFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default TooltipDocs;
