"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Slider } from "@neuctra/ui";
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
const sliderFaq = buildComponentFaq("Slider", {
  sizes: ["sm", "md", "lg"],
});

const DESCRIPTION =
  "React slider component built on the native range input: labels, live value, custom formatting, tick marks and three sizes with full keyboard support.";

const ControlledDemo = () => {
  const [value, setValue] = useState(40);
  return (
    <div className="w-full max-w-sm">
      <Slider
        label="Volume"
        value={value}
        onChange={setValue}
        showValue
        formatValue={(v) => `${v}%`}
      />
    </div>
  );
};

const SliderDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Slider Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            {DESCRIPTION}
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Slider-import">
          <h2
            id="Slider-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Slider } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Slider-example-0">
          <h2
            id="Slider-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Controlled with value + onChange, or uncontrolled with
            defaultValue.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [value, setValue] = useState(40);

<Slider
  label="Volume"
  value={value}
  onChange={setValue}
  showValue
  formatValue={(v) => \`\${v}%\`}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        {/* Example: Steps, Range & Marks */}
        <section aria-labelledby="Slider-example-1">
          <h2
            id="Slider-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Steps, Range & Marks
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Slider
  label="Price limit"
  defaultValue={250}
  min={0}
  max={1000}
  step={50}
  showValue
  formatValue={(v) => \`$\${v}\`}
  marks={[
    { value: 0, label: "$0" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1000" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm pb-4">
                  <Slider
                    label="Price limit"
                    defaultValue={250}
                    min={0}
                    max={1000}
                    step={50}
                    showValue
                    formatValue={(v) => `$${v}`}
                    marks={[
                      { value: 0, label: "$0" },
                      { value: 500, label: "$500" },
                      { value: 1000, label: "$1000" },
                    ]}
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Sizes & Disabled */}
        <section aria-labelledby="Slider-example-2">
          <h2
            id="Slider-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes & Disabled
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Slider size="sm" defaultValue={30} />
<Slider size="lg" defaultValue={70} />
<Slider defaultValue={50} disabled />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-full max-w-sm flex-col gap-5">
                  <Slider size="sm" defaultValue={30} />
                  <Slider size="lg" defaultValue={70} />
                  <Slider defaultValue={50} disabled />
                </div>
              </div>
            }
          />
        </section>

        {/* Props Table */}
        <section aria-labelledby="Slider-props">
          <h2
            id="Slider-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Slider component.
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
                  <td className="p-3 text-gray-400 whitespace-nowrap">min</td>
                  <td className="p-3">Controlled / uncontrolled value</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (value: number) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired with the numeric value</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    min / max
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    0 / 100
                  </td>
                  <td className="p-3">Range bounds</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    step
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">1</td>
                  <td className="p-3">Increment size</td>
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
                    Label above the track, linked with htmlFor
                  </td>
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
                  <td className="p-3">Show the live value beside the label</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    formatValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (v: number) =&gt; ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Format the displayed value</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    marks
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    {"{ value, label? }[]"}
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Tick labels under the track</td>
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
                  <td className="p-3">Track and thumb scale</td>
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
                  <td className="p-3">Disable interaction</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    labelRowClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the row wrapping the label and the current-value
                    text.
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
                  <td className="p-3">Styles the label text above the track.</td>
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
                    Styles the live value text shown when showValue is set.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    marksClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the wrapper around the tick marks rendered under
                    the track.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    markClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each individual tick mark.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Slider-a11y">
          <h2
            id="Slider-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Built on the native {'<input type="range">'}, so arrow keys,
              Home/End and screen-reader value announcements work out of the
              box.
            </li>
            <li>
              The label is associated via htmlFor; a visible focus ring
              appears on keyboard focus.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={sliderFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default SliderDocs;
