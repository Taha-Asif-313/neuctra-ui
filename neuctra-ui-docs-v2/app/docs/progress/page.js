"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Progress } from "@neuctra/ui";
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
const progressFaq = buildComponentFaq("Progress", {
  variants: ["linear", "circular"],
  sizes: ["sm", "md", "lg"],
});

const ProgressDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Progress Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React progress component with linear and circular variants,
            determinate and indeterminate modes, value labels and full ARIA
            progressbar semantics.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Progress-import">
          <h2
            id="Progress-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Progress } from "@neuctra/ui";`} />
        </section>

        {/* Example: Linear */}
        <section aria-labelledby="Progress-example-0">
          <h2
            id="Progress-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Linear
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Progress value={30} />
<Progress value={65} showValue />
<Progress value={65} size="lg" colorClassName="bg-success" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-full max-w-sm flex-col gap-4">
                  <Progress value={30} />
                  <Progress value={65} showValue />
                  <Progress
                    value={65}
                    size="lg"
                    colorClassName="bg-success"
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Circular */}
        <section aria-labelledby="Progress-example-1">
          <h2
            id="Progress-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Circular
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Progress variant="circular" value={25} size="sm" />
<Progress variant="circular" value={60} showValue />
<Progress variant="circular" value={90} size="lg" showValue />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Progress variant="circular" value={25} size="sm" />
                <Progress variant="circular" value={60} showValue />
                <Progress variant="circular" value={90} size="lg" showValue />
              </div>
            }
          />
        </section>

        {/* Example: Indeterminate */}
        <section aria-labelledby="Progress-example-2">
          <h2
            id="Progress-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Indeterminate
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Omit value while the duration is unknown.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Progress label="Loading data" />
<Progress variant="circular" label="Loading" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-full max-w-sm items-center gap-6">
                  <Progress label="Loading data" />
                  <Progress variant="circular" label="Loading" />
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Progress-props">
          <h2
            id="Progress-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Progress component.
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
                    value
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Current value; omit for indeterminate
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    max
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">100</td>
                  <td className="p-3">Maximum value</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    variant
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "linear" | "circular"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "linear"
                  </td>
                  <td className="p-3">Bar or ring</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md" | "lg"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "md"
                  </td>
                  <td className="p-3">Track thickness / ring diameter</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    showValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Show the percentage</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Accessible name for the progressbar
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    colorClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    bg-primary / stroke-primary
                  </td>
                  <td className="p-3">Fill color class</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    trackClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the track behind the fill (the muted background).
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    fillClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the filled portion — the linear bar or circular
                    arc.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    valueClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the percentage text shown when showValue is set.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Progress-a11y">
          <h2
            id="Progress-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Renders role="progressbar" with aria-valuemin / aria-valuemax /
              aria-valuenow.
            </li>
            <li>
              aria-valuenow is omitted in indeterminate mode, as the ARIA
              spec requires.
            </li>
            <li>Pass label so the bar has an accessible name.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={progressFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default ProgressDocs;
