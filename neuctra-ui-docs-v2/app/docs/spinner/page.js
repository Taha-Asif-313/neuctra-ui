"use client";

import CodeBlock from "@/components/CodeBlock";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Spinner } from "@neuctra/ui";
import { Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const spinnerFaq = buildComponentFaq("Spinner", {
  sizes: ["xs", "sm", "md", "lg", "xl"],
});

const SpinnerDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Spinner Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Accessible React spinner component with five sizes, theme-aware
            colors and a screen-reader label — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Spinner-import">
          <h2
            id="Spinner-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Spinner } from "@neuctra/ui";`} />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="Spinner-example-0">
          <h2
            id="Spinner-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Spinner size="xs" />
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </div>
            }
          />
        </section>

        {/* Example: Custom Color & Label */}
        <section aria-labelledby="Spinner-example-1">
          <h2
            id="Spinner-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Custom Color & Label
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            colorClassName accepts any text-* class; label is announced to
            screen readers.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Spinner colorClassName="text-foreground" label="Saving changes…" />
<Spinner colorClassName="text-destructive" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Spinner
                  colorClassName="text-foreground"
                  label="Saving changes…"
                />
                <Spinner colorClassName="text-destructive" />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="Spinner-props">
          <h2
            id="Spinner-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Spinner component.
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
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "xs" | "sm" | "md" | "lg" | "xl"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "md"
                  </td>
                  <td className="p-3">
                    Spinner diameter; stroke width scales with it
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "Loading…"
                  </td>
                  <td className="p-3">Screen-reader-only status text</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    colorClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "text-primary"
                  </td>
                  <td className="p-3">
                    Tailwind text color class for the stroke
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
                    Styles the visually-hidden (sr-only) accessible label.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Spinner-a11y">
          <h2
            id="Spinner-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Renders role="status" with a visually hidden label, so loading
              is announced.
            </li>
            <li>The spinning circle itself is aria-hidden.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={spinnerFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default SpinnerDocs;
