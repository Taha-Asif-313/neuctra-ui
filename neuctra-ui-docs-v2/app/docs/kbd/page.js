"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Kbd } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const kbdFaq = buildComponentFaq("Kbd", {
  sizes: ["sm", "md"],
});

const KbdDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Kbd Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React kbd component for rendering keyboard shortcuts and key
            combinations with a native <code>&lt;kbd&gt;</code> element,
            styled with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Kbd-import">
          <h2
            id="Kbd-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Kbd } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="Kbd-example-0">
          <h2
            id="Kbd-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<span>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search</span>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <span className="text-sm">
                  Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search
                </span>
              </div>
            }
          />
        </section>

        {/* Sizes & Combinations */}
        <section aria-labelledby="Kbd-example-1">
          <h2
            id="Kbd-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes & Combinations
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Kbd size="sm">Esc</Kbd>
<Kbd>Ctrl</Kbd> <Kbd>Shift</Kbd> <Kbd>P</Kbd>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex items-center gap-2 text-sm">
                  <Kbd size="sm">Esc</Kbd>
                  <span className="text-gray-500">·</span>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>Shift</Kbd>
                  <Kbd>P</Kbd>
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Kbd-props">
          <h2
            id="Kbd-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Kbd component.
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
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Key text (required)</td>
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
                  <td className="p-3">Key cap size</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Kbd-a11y">
          <h2
            id="Kbd-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Uses the semantic <code>&lt;kbd&gt;</code> element, announced
              as keyboard input by screen readers.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={kbdFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default KbdDocs;
