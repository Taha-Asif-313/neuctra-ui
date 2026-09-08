"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Rating } from "@neuctra/ui";
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
const ratingFaq = buildComponentFaq("Rating", {
  sizes: ["sm", "md", "lg"],
});

const ControlledDemo = () => {
  const [value, setValue] = useState(3);
  return (
    <div className="flex items-center gap-3">
      <Rating value={value} onChange={setValue} showValue />
      <span className="text-xs text-gray-400">
        click a star (again to clear)
      </span>
    </div>
  );
};

const RatingDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Rating Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React star rating component with keyboard-accessible radio
            semantics, hover preview, clearable selection and fractional
            read-only display (e.g. 4.3).
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Rating-import">
          <h2
            id="Rating-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Rating } from "@neuctra/ui";`} />
        </section>

        {/* Examples */}
        <section aria-labelledby="Rating-example-0">
          <h2
            id="Rating-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Interactive mode is a radiogroup of stars with hover preview.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} showValue />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Rating-example-1">
          <h2
            id="Rating-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Read-Only with Fractions
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Read-only mode supports fractional values via a clipped overlay.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Rating value={4.3} readOnly showValue />
<Rating value={2.5} readOnly max={5} size="sm" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Rating value={4.3} readOnly showValue />
                  <Rating value={2.5} readOnly max={5} size="sm" />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="Rating-example-2">
          <h2
            id="Rating-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes & Custom Max
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Rating defaultValue={2} size="sm" />
<Rating defaultValue={3} size="lg" />
<Rating defaultValue={6} max={10} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Rating defaultValue={2} size="sm" />
                  <Rating defaultValue={3} size="lg" />
                  <Rating defaultValue={6} max={10} />
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Rating-props">
          <h2
            id="Rating-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Rating component.
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
                    value / defaultValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">0</td>
                  <td className="p-3">Controlled / uncontrolled rating</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (value: number) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Fired with the selected star (or 0 on clear)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    max
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">5</td>
                  <td className="p-3">Number of stars</td>
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
                  <td className="p-3">Star size</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    readOnly
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">
                    Display mode; supports fractional values
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    allowClear
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    true
                  </td>
                  <td className="p-3">
                    Clicking the current value resets to 0
                  </td>
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
                  <td className="p-3">Dim and lock the control</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "Rating"
                  </td>
                  <td className="p-3">Accessible group label</td>
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
                  <td className="p-3">Numeric value next to the stars</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    starClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles every star icon, in addition to size/color/state
                    classes.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    emptyStarClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the unfilled star color/class.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    starWrapperClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the clickable wrapper around each star in
                    interactive mode.
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
                    Styles the numeric value shown when showValue is set.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Rating-a11y">
          <h2
            id="Rating-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Interactive stars are real radio inputs (sr-only) inside a
              radiogroup — keyboard and screen-reader selection work
              natively.
            </li>
            <li>
              Read-only mode renders role="img" with a text alternative like
              "Rating: 4.3 out of 5".
            </li>
            <li>
              A focus ring is shown on the focused star via
              peer-focus-visible.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={ratingFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default RatingDocs;
