"use client";

import React, { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { NumberInput } from "@neuctra/ui";
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
const numberInputFaq = buildComponentFaq("NumberInput", {
  sizes: ["sm", "md", "lg"],
});

const ControlledDemo = () => {
  const [qty, setQty] = useState(2);
  return (
    <div className="w-full max-w-45">
      <NumberInput
        label="Quantity"
        value={qty}
        onChange={setQty}
        min={1}
        max={10}
      />
    </div>
  );
};

const NumberInputDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            NumberInput Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React number input with increment/decrement steppers, min/max
            clamping, arrow-key support, decimal input and spinbutton
            semantics — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="NumberInput-import">
          <h2
            id="NumberInput-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { NumberInput } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="NumberInput-example-0">
          <h2
            id="NumberInput-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            onChange receives the parsed number, or null while the field is
            empty.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [qty, setQty] = useState(2);

<NumberInput label="Quantity" value={qty} onChange={setQty} min={1} max={10} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        {/* Example: Step & Decimals */}
        <section aria-labelledby="NumberInput-example-1">
          <h2
            id="NumberInput-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Step & Decimals
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<NumberInput label="Price" defaultValue={9.99} step={0.5} min={0} />
<NumberInput label="Team size" defaultValue={5} step={5} min={0} max={100}
  helperText="Increments of 5" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-full max-w-md flex-wrap gap-4">
                  <div className="w-40">
                    <NumberInput
                      label="Price"
                      defaultValue={9.99}
                      step={0.5}
                      min={0}
                    />
                  </div>
                  <div className="w-44">
                    <NumberInput
                      label="Team size"
                      defaultValue={5}
                      step={5}
                      min={0}
                      max={100}
                      helperText="Increments of 5"
                    />
                  </div>
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Sizes & Error */}
        <section aria-labelledby="NumberInput-example-2">
          <h2
            id="NumberInput-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes & Error
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<NumberInput size="sm" defaultValue={1} />
<NumberInput size="lg" defaultValue={1} />
<NumberInput defaultValue={99} error="Value exceeds your plan limit" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-full max-w-md flex-col gap-4">
                  <div className="w-36">
                    <NumberInput size="sm" defaultValue={1} />
                  </div>
                  <div className="w-44">
                    <NumberInput size="lg" defaultValue={1} />
                  </div>
                  <div className="w-56">
                    <NumberInput
                      defaultValue={99}
                      error="Value exceeds your plan limit"
                    />
                  </div>
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="NumberInput-props">
          <h2
            id="NumberInput-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the NumberInput component.
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
                    number | null / number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Controlled / uncontrolled value</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (value: number | null) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Parsed number, null when empty</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    min / max
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Clamped on blur and by the steppers</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    step
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">1</td>
                  <td className="p-3">Stepper and arrow-key increment</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Label above the field</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    error
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Error message; paints the border and announces via
                    role=alert
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    helperText
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Muted helper line</td>
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
                  <td className="p-3">Field height and button scale</td>
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
                  <td className="p-3">Disable the field and steppers</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    labelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the label above the field.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    inputWrapperClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the bordered control wrapping the decrement
                    button, input, and increment button.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    decrementButtonClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the decrement (minus) button.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    incrementButtonClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the increment (plus) button.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    helperTextClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the helper/error text below the field.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="NumberInput-a11y">
          <h2
            id="NumberInput-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The input exposes role="spinbutton" with aria-valuenow / min /
              max.
            </li>
            <li>
              ArrowUp / ArrowDown nudge the value by step; steppers are
              excluded from the tab order (tabIndex -1) so keyboard users
              aren't forced through three stops.
            </li>
            <li>
              Errors link to the field with aria-describedby and
              aria-invalid.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={numberInputFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default NumberInputDocs;
