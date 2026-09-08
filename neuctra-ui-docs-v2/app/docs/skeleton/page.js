"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Skeleton } from "@neuctra/ui";
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
const skeletonFaq = buildComponentFaq("Skeleton", {
  variants: ["text", "circular", "rectangular"],
});

const SkeletonDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Skeleton Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React skeleton loading component with text, circular and
            rectangular variants, multi-line paragraphs and reduced-motion
            support — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Skeleton-import">
          <h2
            id="Skeleton-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Skeleton } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Skeleton-example-0">
          <h2
            id="Skeleton-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Three shapes cover most layouts: text, circular and rectangular.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Skeleton width={220} />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rectangular" width={220} height={96} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <Skeleton width={220} />
                  <Skeleton variant="circular" width={48} height={48} />
                  <Skeleton variant="rectangular" width={220} height={96} />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Paragraph Placeholder */}
        <section aria-labelledby="Skeleton-example-1">
          <h2
            id="Skeleton-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Paragraph Placeholder
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            lines renders a stacked paragraph with a shorter final line.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Skeleton lines={3} width={280} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Skeleton lines={3} width={280} />
              </div>
            }
          />
        </section>

        {/* Example: Composed Card Placeholder */}
        <section aria-labelledby="Skeleton-example-2">
          <h2
            id="Skeleton-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Composed Card Placeholder
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="flex items-center gap-3">
  <Skeleton variant="circular" width={40} height={40} />
  <div className="flex-1 space-y-2">
    <Skeleton width="60%" />
    <Skeleton width="40%" />
  </div>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-64 items-center gap-3">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                  </div>
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Skeleton-props">
          <h2
            id="Skeleton-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Skeleton component.
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
                    variant
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "text" | "circular" | "rectangular"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "text"
                  </td>
                  <td className="p-3">Placeholder shape</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    width
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number | string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Explicit width (px or any CSS value)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    height
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number | string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Explicit height</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    lines
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">1</td>
                  <td className="p-3">Stacked text lines (text variant)</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    animated
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    true
                  </td>
                  <td className="p-3">Toggle the pulse animation</td>
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
                    Styles each individual line when variant="text" and
                    lines &gt; 1.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Skeleton-a11y">
          <h2
            id="Skeleton-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Skeletons are aria-hidden — announce loading state separately
              (e.g. aria-busy on the container).
            </li>
            <li>
              The pulse animation is disabled automatically for users with
              prefers-reduced-motion.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={skeletonFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default SkeletonDocs;
