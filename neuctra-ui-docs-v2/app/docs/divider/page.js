"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Divider } from "@neuctra/ui";
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
const dividerFaq = buildComponentFaq("Divider");

const DividerDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Divider Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React divider component for separating content. Horizontal and
            vertical orientation, optional centered label, dashed style and
            spacing scales — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Divider-import">
          <h2
            id="Divider-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Divider } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="Divider-example-0">
          <h2
            id="Divider-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<p>Above</p>
<Divider />
<p>Below</p>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm text-sm">
                  <p>Above</p>
                  <Divider />
                  <p>Below</p>
                </div>
              </div>
            }
          />
        </section>

        {/* With Label */}
        <section aria-labelledby="Divider-example-1">
          <h2
            id="Divider-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            With Label
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A centered label between two hairlines — great for auth forms.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Divider label="OR" />
<Divider label="Continue with" dashed />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <Divider label="OR" />
                  <Divider label="Continue with" dashed />
                </div>
              </div>
            }
          />
        </section>

        {/* Vertical */}
        <section aria-labelledby="Divider-example-2">
          <h2
            id="Divider-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Vertical
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Use inside a flex row; it stretches to the row height.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="flex items-center h-8">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex h-8 items-center text-sm">
                  <span>Left</span>
                  <Divider orientation="vertical" />
                  <span>Right</span>
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Divider-props">
          <h2
            id="Divider-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Divider component.
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
                    orientation
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "horizontal" | "vertical"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "horizontal"
                  </td>
                  <td className="p-3">Direction of the separator</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Centered label (horizontal only)</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    dashed
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Dashed line style</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    spacing
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "none" | "sm" | "md" | "lg"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "md"
                  </td>
                  <td className="p-3">Outer margin along the axis</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    lineClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the hairline segments (labeled horizontal variant
                    only).
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    labelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the centered label (labeled horizontal variant
                    only).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Divider-a11y">
          <h2
            id="Divider-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Renders role="separator" with the correct aria-orientation.
            </li>
            <li>Decorative hairlines around the label are aria-hidden.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={dividerFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default DividerDocs;
