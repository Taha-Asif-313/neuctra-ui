"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { CopyButton } from "@neuctra/ui";
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
const copyButtonFaq = buildComponentFaq("CopyButton", {
  sizes: ["sm", "md", "lg"],
});

const CopyButtonDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            CopyButton Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React copy-to-clipboard button with success feedback,
            secure-context fallback, sizes and label support — built with
            Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="CopyButton-import">
          <h2
            id="CopyButton-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { CopyButton } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="CopyButton-example-0">
          <h2
            id="CopyButton-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Click to copy; the icon flips to a check for 1.5s.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<CopyButton value="npm install @neuctra/ui" label="Copy command" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5">
                  <code className="text-xs text-gray-300">
                    npm install @neuctra/ui
                  </code>
                  <CopyButton size="sm" value="npm install @neuctra/ui" />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: With Label & Callback */}
        <section aria-labelledby="CopyButton-example-1">
          <h2
            id="CopyButton-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            With Label & Callback
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<CopyButton
  value="https://ui.neuctra.com"
  label="Copy link"
  onCopied={(v) => console.log("copied", v)}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <CopyButton value="https://ui.neuctra.com" label="Copy link" />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="CopyButton-props">
          <h2
            id="CopyButton-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the CopyButton component.
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
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Text placed on the clipboard (required)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Visible label; becomes "Copied" during feedback
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    feedbackDuration
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    1500
                  </td>
                  <td className="p-3">How long the check state shows (ms)</td>
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
                  <td className="p-3">Button scale</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onCopied
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (value: string) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired after a successful copy</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the copy/check icon.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    labelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the visible label text.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="CopyButton-a11y">
          <h2
            id="CopyButton-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              aria-label switches between “Copy to clipboard” and “Copied”,
              with aria-live so the change is announced.
            </li>
            <li>
              Falls back to a hidden textarea + execCommand outside secure
              contexts.
            </li>
            <li>The feedback timer is cleaned up on unmount.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={copyButtonFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default CopyButtonDocs;
