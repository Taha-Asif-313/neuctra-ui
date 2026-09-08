"use client";

import React from "react";
import { Callout } from "@neuctra/ui";
import { Rocket, Accessibility } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const calloutFaq = buildComponentFaq("Callout", {
  variants: ["soft", "outline"],
});

const CalloutDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Callout Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A static inline alert that lives in the page flow — use it for
            persistent messages, while the toast system (ToastProvider)
            handles transient notifications.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Callout-import">
          <h2
            id="Callout-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Callout } from "@neuctra/ui";`} />
        </section>

        {/* Example: Types */}
        <section aria-labelledby="Callout-example-0">
          <h2
            id="Callout-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Types
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Callout type="info" title="Heads up">A new version is available.</Callout>
<Callout type="success" title="Payment received">Your invoice has been settled.</Callout>
<Callout type="warning" title="Storage almost full">You have used 90% of your quota.</Callout>
<Callout type="error" title="Sync failed">We could not reach the server.</Callout>
<Callout type="neutral">A neutral note without a title.</Callout>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-full flex-col gap-3">
                  <Callout type="info" title="Heads up">
                    A new version is available.
                  </Callout>
                  <Callout type="success" title="Payment received">
                    Your invoice has been settled.
                  </Callout>
                  <Callout type="warning" title="Storage almost full">
                    You have used 90% of your quota.
                  </Callout>
                  <Callout type="error" title="Sync failed">
                    We could not reach the server.
                  </Callout>
                  <Callout type="neutral">
                    A neutral note without a title.
                  </Callout>
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Outline, Custom Icon & Dismissible */}
        <section aria-labelledby="Callout-example-1">
          <h2
            id="Callout-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Outline, Custom Icon & Dismissible
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Callout variant="outline" type="info" icon={<Rocket />} title="v0.4.0 shipped" dismissible>
  Eight new components, including DatePicker and Carousel.
</Callout>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Callout
                  variant="outline"
                  type="info"
                  icon={<Rocket />}
                  title="v0.4.0 shipped"
                  dismissible
                  className="w-full"
                >
                  Eight new components, including DatePicker and Carousel.
                </Callout>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Callout-props">
          <h2
            id="Callout-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Callout component.
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
                    type
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "info" | "success" | "warning" | "error" | "neutral"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "info"
                  </td>
                  <td className="p-3">Semantic color and default icon</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    variant
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "soft" | "outline"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "soft"
                  </td>
                  <td className="p-3">Tinted background or border-only</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    title
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Bold headline</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Body content</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode | null
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    type icon
                  </td>
                  <td className="p-3">Custom icon; null hides it</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    dismissible
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">
                    Show a close button; self-removes on click
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onDismiss
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    {"() => void"}
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired when dismissed</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the leading icon wrapper.</td>
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
                    Styles the wrapper around the title and body content.
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
                  <td className="p-3">Styles the title text.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    descriptionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the body content wrapper.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeButtonClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the dismiss/close button.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Callout-a11y">
          <h2
            id="Callout-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Error callouts render role="alert" (interruptive); all others
              role="status".
            </li>
            <li>
              The dismiss button is labelled and focus-ringed; icons are
              decorative.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={calloutFaq} />

        <DocsFooter />
      </div>
    </article>
  );
};

export default CalloutDocs;
