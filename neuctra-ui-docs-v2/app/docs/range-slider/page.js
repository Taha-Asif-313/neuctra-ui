"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  RangeSlider,
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const rangeSliderFaq = buildComponentFaq("RangeSlider", {
  sizes: ["sm", "md", "lg"],
});

const formatPrice = (value) => `$${value}`;

function ControlledDemo() {
  const [budget, setBudget] = useState([200, 800]);
  const [committed, setCommitted] = useState([200, 800]);
  return (
    <div className="w-full max-w-md space-y-3">
      <RangeSlider
        label="Monthly budget"
        min={0}
        max={1000}
        step={50}
        minDistance={100}
        value={budget}
        onChange={setBudget}
        onChangeEnd={setCommitted}
        formatValue={formatPrice}
      />
      <p className="text-xs text-muted-foreground">
        Last saved: ${committed[0]} to ${committed[1]}
      </p>
    </div>
  );
}

function FiltersDemo() {
  const [price, setPrice] = useState([40, 240]);
  const [rating, setRating] = useState([3, 5]);
  const matches = Math.max(
    0,
    Math.round(((price[1] - price[0]) / 300) * 120 * ((rating[1] - rating[0] + 1) / 5)),
  );
  return (
    <Card className="w-full max-w-sm">
      <CardHeader
        title="Filters"
        description="Narrow down headphones by price and rating."
        action={<Badge text={`${matches} results`} variant="soft" size="sm" />}
      />
      <CardBody className="space-y-6">
        <RangeSlider
          label="Price"
          min={0}
          max={300}
          step={10}
          value={price}
          onChange={setPrice}
          formatValue={formatPrice}
          marks={[0, 100, 200, 300]}
        />
        <RangeSlider
          label="Rating"
          size="sm"
          min={1}
          max={5}
          value={rating}
          onChange={setRating}
          formatValue={(value) => `${value} stars`}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => {
              setPrice([0, 300]);
              setRating([1, 5]);
            }}
          >
            Reset
          </Button>
          <Button size="sm" fullWidth>
            Show results
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

const rangeSliderProps = [
  ["value", "[number, number]", "-", "Controlled [lower, upper] pair."],
  ["defaultValue", "[number, number]", "[min, max]", "Initial pair in uncontrolled mode."],
  ["onChange", "(value: [number, number]) => void", "-", "Fired with the next pair as either handle moves."],
  ["onChangeEnd", "(value: [number, number]) => void", "-", "Fired when a handle is released (pointer up or key up)."],
  ["min", "number", "0", "Lowest selectable value."],
  ["max", "number", "100", "Highest selectable value."],
  ["step", "number", "1", "Increment between values."],
  ["minDistance", "number", "0", "Smallest allowed gap between the handles."],
  ["formatValue", "(value: number) => string", "String", "Formats value labels, marks and aria-valuetext."],
  ["marks", "number[]", "-", "Values labelled below the track."],
  ["minLabel", "string", '"Minimum value"', "Accessible label for the lower handle."],
  ["maxLabel", "string", '"Maximum value"', "Accessible label for the upper handle."],
  ["label", "string", "-", "Label above the track. The values then show at the right of the label row."],
  ["showValues", "boolean", "true", "Shows the formatted values above the track."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Track and handle scale, same as Slider."],
  ["disabled", "boolean", "false", "Disables both handles."],
  ["name", "[string, string]", "-", "Form field names for the lower and upper inputs."],
  ["className", "string", "-", "Additional classes for the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["labelRowClassName", "string", "-", "Additional classes for the label/value row."],
  ["labelClassName", "string", "-", "Additional classes for the label text."],
  ["valueClassName", "string", "-", "Additional classes for the value text."],
  ["trackClassName", "string", "-", "Additional classes for the background track."],
  ["rangeClassName", "string", "-", "Additional classes for the filled range."],
  ["thumbClassName", "string", "-", "Additional classes for both range inputs (use thumb variants)."],
  ["marksClassName", "string", "-", "Additional classes for the marks row."],
  ["markClassName", "string", "-", "Additional classes for each mark."],
];

function PropsTable({ rows }) {
  return (
    <div className="border border-zinc-800 rounded-xl overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-zinc-900 text-gray-200">
          <tr>
            <th scope="col" className="text-left p-3">Prop</th>
            <th scope="col" className="text-left p-3">Type</th>
            <th scope="col" className="text-left p-3">Default</th>
            <th scope="col" className="text-left p-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 text-gray-300">
          {rows.map(([prop, type, def, description]) => (
            <tr key={prop}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{prop}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const RangeSliderDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            RangeSlider Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dual-handle slider built from two native range inputs, with a
            filled track that stays aligned under the handles, value
            formatting, marks, a minimum gap and the same size scale as
            Slider.
          </p>
        </header>

        <section aria-labelledby="RangeSlider-import">
          <h2 id="RangeSlider-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { RangeSlider } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="RangeSlider-example-0">
          <h2 id="RangeSlider-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Drag either handle or focus one and use the arrow keys. The
            handles cannot cross.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<RangeSlider label="Team size" min={1} max={50} defaultValue={[5, 20]} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-md">
                  <RangeSlider label="Team size" min={1} max={50} defaultValue={[5, 20]} />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="RangeSlider-example-1">
          <h2 id="RangeSlider-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Three track and handle scales for dense filters or touch friendly forms.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<RangeSlider size="sm" label="Small" defaultValue={[20, 60]} />
<RangeSlider size="md" label="Medium" defaultValue={[20, 60]} />
<RangeSlider size="lg" label="Large" defaultValue={[20, 60]} />`}
            previewContent={
              <div className="grid w-full max-w-md gap-6 py-4">
                <RangeSlider size="sm" label="Small" defaultValue={[20, 60]} />
                <RangeSlider size="md" label="Medium" defaultValue={[20, 60]} />
                <RangeSlider size="lg" label="Large" defaultValue={[20, 60]} />
              </div>
            }
          />
        </section>

        <section aria-labelledby="RangeSlider-example-2">
          <h2 id="RangeSlider-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Marks and Formatting
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            formatValue formats the labels, marks and the value announced to
            screen readers.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<RangeSlider
  label="Working hours"
  min={0}
  max={24}
  defaultValue={[9, 17]}
  marks={[0, 6, 12, 18, 24]}
  formatValue={(value) => \`\${String(value).padStart(2, "0")}:00\`}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-md">
                  <RangeSlider
                    label="Working hours"
                    min={0}
                    max={24}
                    defaultValue={[9, 17]}
                    marks={[0, 6, 12, 18, 24]}
                    formatValue={(value) => `${String(value).padStart(2, "0")}:00`}
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="RangeSlider-example-3">
          <h2 id="RangeSlider-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled with Minimum Gap
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            minDistance keeps the handles apart. onChangeEnd fires once on
            release, which is the right moment to save or refetch.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [budget, setBudget] = useState([200, 800]);
const [committed, setCommitted] = useState([200, 800]);

<RangeSlider
  label="Monthly budget"
  min={0}
  max={1000}
  step={50}
  minDistance={100}
  value={budget}
  onChange={setBudget}
  onChangeEnd={setCommitted}
  formatValue={(value) => \`$\${value}\`}
/>
<p className="text-xs text-muted-foreground">
  Last saved: \${committed[0]} to \${committed[1]}
</p>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="RangeSlider-example-4">
          <h2 id="RangeSlider-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Disabled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Disabled sliders dim and ignore pointer and keyboard input, while still showing the current range.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<RangeSlider label="Storage quota (GB)" disabled defaultValue={[10, 50]} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-md">
                  <RangeSlider label="Storage quota (GB)" disabled defaultValue={[10, 50]} />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="RangeSlider-example-5">
          <h2 id="RangeSlider-example-5" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Product Filters
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A storefront filter panel with price and rating ranges.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [price, setPrice] = useState([40, 240]);
const [rating, setRating] = useState([3, 5]);
const matches = Math.max(
  0,
  Math.round(((price[1] - price[0]) / 300) * 120 * ((rating[1] - rating[0] + 1) / 5)),
);

<Card className="w-full max-w-sm">
  <CardHeader
    title="Filters"
    description="Narrow down headphones by price and rating."
    action={<Badge text={\`\${matches} results\`} variant="soft" size="sm" />}
  />
  <CardBody className="space-y-6">
    <RangeSlider
      label="Price"
      min={0}
      max={300}
      step={10}
      value={price}
      onChange={setPrice}
      formatValue={(value) => \`$\${value}\`}
      marks={[0, 100, 200, 300]}
    />
    <RangeSlider
      label="Rating"
      size="sm"
      min={1}
      max={5}
      value={rating}
      onChange={setRating}
      formatValue={(value) => \`\${value} stars\`}
    />
    <div className="flex gap-2">
      <Button variant="outline" size="sm" fullWidth onClick={() => {
        setPrice([0, 300]);
        setRating([1, 5]);
      }}>
        Reset
      </Button>
      <Button size="sm" fullWidth>Show results</Button>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FiltersDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="RangeSlider-props">
          <h2 id="RangeSlider-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the RangeSlider component. Other div
            attributes are forwarded to the root element.
          </p>
          <PropsTable rows={rangeSliderProps} />
        </section>

        <section aria-labelledby="RangeSlider-a11y">
          <h2 id="RangeSlider-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Each handle is a native range input with its own aria-label
              (minLabel and maxLabel) and an aria-valuetext built from
              formatValue.
            </li>
            <li>
              Arrow keys move by step, Page Up and Page Down by larger jumps,
              Home and End to the bounds, all handled natively.
            </li>
            <li>
              The root is a role="group" named by the label. Each handle shows
              a focus ring on keyboard focus.
            </li>
            <li>
              When both handles meet at the top of the range, the lower handle
              is stacked on top so it can still be moved.
            </li>
          </ul>
        </section>

        <ComponentFaq qa={rangeSliderFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default RangeSliderDocs;
