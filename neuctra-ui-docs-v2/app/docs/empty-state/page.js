"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { EmptyState, Button } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { SearchX, FolderOpen, Plus, Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const emptyStateFaq = buildComponentFaq("EmptyState", {
  sizes: ["sm", "md", "lg"],
});

const EmptyStateDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            EmptyState Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React empty state component with icon, title, description and
            call-to-action slot for no-results and empty-list screens — built
            with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="EmptyState-import">
          <h2
            id="EmptyState-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { EmptyState } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="EmptyState-example-0">
          <h2
            id="EmptyState-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <EmptyState
                  title="No projects yet"
                  description="Create your first project to get started."
                />
              </div>
            }
          />
        </section>

        {/* With Icon & Action */}
        <section aria-labelledby="EmptyState-example-1">
          <h2
            id="EmptyState-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            With Icon & Action
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<EmptyState
  icon={<FolderOpen />}
  title="No files uploaded"
  description="Drag and drop files here, or click the button below."
  action={<Button size="sm" iconBefore={<Plus size={14} />}>Upload file</Button>}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <EmptyState
                  icon={<FolderOpen />}
                  title="No files uploaded"
                  description="Drag and drop files here, or click the button below."
                  action={
                    <Button size="sm" iconBefore={<Plus size={14} />}>
                      Upload file
                    </Button>
                  }
                />
              </div>
            }
          />
        </section>

        {/* Search Results */}
        <section aria-labelledby="EmptyState-example-2">
          <h2
            id="EmptyState-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Search Results
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<EmptyState
  size="sm"
  icon={<SearchX />}
  title="No results for “tabel”"
  description="Check the spelling or try a different keyword."
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <EmptyState
                  size="sm"
                  icon={<SearchX />}
                  title="No results for “tabel”"
                  description="Check the spelling or try a different keyword."
                />
              </div>
            }
          />
        </section>

        {/* Props Table */}
        <section aria-labelledby="EmptyState-props">
          <h2
            id="EmptyState-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the EmptyState component.
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
                    title
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Headline (required)</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Supporting copy under the title</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    Inbox icon
                  </td>
                  <td className="p-3">Icon shown in the muted circle</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    action
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Call-to-action slot (usually a Button)
                  </td>
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
                  <td className="p-3">
                    Scales padding, icon and text together
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the icon wrapper circle.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    titleClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the title heading.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    descriptionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the description text.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    actionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the wrapper around the action slot.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="EmptyState-a11y">
          <h2
            id="EmptyState-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The title renders as a semantic &lt;h3&gt;; the icon is
              decorative (aria-hidden).
            </li>
            <li>
              Place focus on the action button after content loads empty, if
              the state is unexpected.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={emptyStateFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default EmptyStateDocs;
