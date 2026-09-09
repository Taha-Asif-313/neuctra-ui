"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Pagination } from "@neuctra/ui";
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
const paginationFaq = buildComponentFaq("Pagination", {
  sizes: ["sm", "md", "lg"],
});

const InteractiveDemo = ({ size, siblingCount, totalPages = 20 }) => {
  const [page, setPage] = useState(5);
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      size={size}
      siblingCount={siblingCount}
    />
  );
};

const PaginationDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Pagination Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Accessible React pagination with smart ellipsis, sibling count
            control, three sizes and full keyboard support — built with
            Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Pagination-import">
          <h2
            id="Pagination-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Pagination } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Pagination-example-0">
          <h2
            id="Pagination-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Controlled by page + onPageChange. Ellipses appear automatically
            for long ranges.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [page, setPage] = useState(5);

<Pagination page={page} totalPages={20} onPageChange={setPage} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <InteractiveDemo />
              </div>
            }
          />
        </section>

        {/* Example: Sibling Count */}
        <section aria-labelledby="Pagination-example-1">
          <h2
            id="Pagination-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sibling Count
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            siblingCount controls how many pages flank the current one.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Pagination page={page} totalPages={30} siblingCount={2} onPageChange={setPage} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <InteractiveDemo siblingCount={2} totalPages={30} />
              </div>
            }
          />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="Pagination-example-2">
          <h2
            id="Pagination-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Pagination size="sm" page={2} totalPages={5} />
<Pagination size="lg" page={2} totalPages={5} />`}
            previewContent={
              <div className="flex w-full flex-col gap-3 py-4">
                <InteractiveDemo size="sm" totalPages={5} />
                <InteractiveDemo size="lg" totalPages={5} />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Pagination-props">
          <h2
            id="Pagination-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Pagination component.
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
                {[
                  ["page", "number", "—", "Current page, 1-based (required)"],
                  ["totalPages", "number", "—", "Total number of pages (required)"],
                  ["onPageChange", "(page: number) => void", "—", "Fired with the next page"],
                  ["siblingCount", "number", "1", "Pages shown on each side of the current page"],
                  ["size", '"sm" | "md" | "lg"', '"md"', "Button size scale"],
                  ["disabled", "boolean", "false", "Disable all controls"],
                  ["prevButtonClassName", "string", "—", "Styles the previous-page button"],
                  ["nextButtonClassName", "string", "—", "Styles the next-page button"],
                  ["pageButtonClassName", "string", "—", "Styles every numbered page button, in addition to the active/inactive styling"],
                  ["activePageButtonClassName", "string", "—", "Styles the currently active page button"],
                  ["ellipsisClassName", "string", "—", "Styles the ellipsis (…) indicator"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {prop}
                    </td>
                    <td className="p-3 font-mono text-xs text-gray-300">
                      {type}
                    </td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">
                      {def}
                    </td>
                    <td className="p-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Pagination-a11y">
          <h2
            id="Pagination-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Wrapped in {'<nav aria-label="Pagination">'}; every button has
              an aria-label.
            </li>
            <li>The active page carries aria-current="page".</li>
            <li>
              Prev/next disable automatically at the range edges; all
              buttons show a focus-visible ring.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={paginationFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default PaginationDocs;
