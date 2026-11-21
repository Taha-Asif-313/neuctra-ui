"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { Sparkline, Card, CardBody } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const sparklineFaq = buildComponentFaq("Sparkline");

const revenue = [12, 18, 15, 24, 22, 31, 28, 40];

const metrics = [
  { label: "Monthly revenue", value: "$48,210", change: "+12.4%", tone: "success", data: [30, 32, 31, 36, 38, 37, 42, 48] },
  { label: "Active users", value: "8,942", change: "+3.1%", tone: "primary", data: [80, 82, 81, 84, 86, 85, 88, 89] },
  { label: "Churn rate", value: "2.8%", change: "+0.6%", tone: "destructive", data: [2.1, 2.2, 2.0, 2.4, 2.5, 2.6, 2.7, 2.8] },
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
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sparklineProps = [
  ["data", "number[]", "-", "Values to plot (required). Non-finite values are skipped."],
  ["width", "number", "120", "SVG width in pixels."],
  ["height", "number", "40", "SVG height in pixels."],
  ["tone", '"primary" | "muted" | "success" | "destructive" | "warning" | "info"', '"primary"', "Semantic token used for the line, area and point."],
  ["strokeWidth", "number", "2", "Line thickness in pixels."],
  ["fill", "boolean", "false", "Fills the area under the line with a translucent tone."],
  ["showLastPoint", "boolean", "false", "Draws a dot on the last value (not shown when responsive)."],
  ["responsive", "boolean", "false", "Stretches the chart to the container width."],
  ["min", "number", "-", "Lower bound of the y-axis. Defaults to the smallest value."],
  ["max", "number", "-", "Upper bound of the y-axis. Defaults to the largest value."],
  ["ariaLabel", "string", '"Trend chart"', "Accessible name announced by screen readers."],
  ["className", "string", "-", "Styles the SVG element."],
  ["style", "CSSProperties", "-", "Inline styles for the SVG element."],
  ["lineClassName", "string", "-", "Styles the line path."],
  ["areaClassName", "string", "-", "Styles the area path."],
  ["pointClassName", "string", "-", "Styles the last-point dot."],
  ["...rest", "SVGAttributes<SVGSVGElement>", "-", "Any other SVG attribute except children and fill."],
];

const SparklineDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Sparkline Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dependency-free SVG trend line for KPI tiles, tables and lists.
            Colors come from semantic theme tokens, with an optional area fill,
            end point and responsive width.
          </p>
        </header>

        <section aria-labelledby="Sparkline-import">
          <h2 id="Sparkline-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { Sparkline } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="Sparkline-example-0">
          <h2 id="Sparkline-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass an array of numbers and a descriptive ariaLabel.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const revenue = [12, 18, 15, 24, 22, 31, 28, 40];

<Sparkline data={revenue} width={160} height={48} ariaLabel="Revenue trend, last 8 weeks" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Sparkline data={revenue} width={160} height={48} ariaLabel="Revenue trend, last 8 weeks" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Sparkline-example-1">
          <h2 id="Sparkline-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Tones, Fill and End Point
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            tone maps to a theme token. fill adds a soft area and showLastPoint
            marks the latest value.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Sparkline data={revenue} tone="primary" fill />
<Sparkline data={revenue} tone="success" fill showLastPoint />
<Sparkline data={[...revenue].reverse()} tone="destructive" showLastPoint />
<Sparkline data={revenue} tone="warning" strokeWidth={1.5} />
<Sparkline data={revenue} tone="muted" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-6 py-4">
                <Sparkline data={revenue} tone="primary" fill />
                <Sparkline data={revenue} tone="success" fill showLastPoint />
                <Sparkline data={[...revenue].reverse()} tone="destructive" showLastPoint />
                <Sparkline data={revenue} tone="warning" strokeWidth={1.5} />
                <Sparkline data={revenue} tone="muted" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Sparkline-example-2">
          <h2 id="Sparkline-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            KPI Tiles
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A realistic dashboard row. The responsive prop stretches each line
            to the width of its card.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const metrics = [
  { label: "Monthly revenue", value: "$48,210", change: "+12.4%", tone: "success", data: [30, 32, 31, 36, 38, 37, 42, 48] },
  { label: "Active users", value: "8,942", change: "+3.1%", tone: "primary", data: [80, 82, 81, 84, 86, 85, 88, 89] },
  { label: "Churn rate", value: "2.8%", change: "+0.6%", tone: "destructive", data: [2.1, 2.2, 2.0, 2.4, 2.5, 2.6, 2.7, 2.8] },
];

<div className="grid w-full gap-4 sm:grid-cols-3">
  {metrics.map((metric) => (
    <Card key={metric.label}>
      <CardBody className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-2xl font-bold tabular-nums text-foreground">{metric.value}</p>
          <span className="text-xs text-muted-foreground">{metric.change}</span>
        </div>
        <Sparkline
          data={metric.data}
          tone={metric.tone}
          height={36}
          responsive
          fill
          ariaLabel={\`\${metric.label} trend\`}
        />
      </CardBody>
    </Card>
  ))}
</div>`}
            previewContent={
              <div className="grid w-full gap-4 py-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <Card key={metric.label}>
                    <CardBody className="space-y-3">
                      <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-2xl font-bold tabular-nums text-foreground">{metric.value}</p>
                        <span className="text-xs text-muted-foreground">{metric.change}</span>
                      </div>
                      <Sparkline
                        data={metric.data}
                        tone={metric.tone}
                        height={36}
                        responsive
                        fill
                        ariaLabel={`${metric.label} trend`}
                      />
                    </CardBody>
                  </Card>
                ))}
              </div>
            }
          />
        </section>

        <section aria-labelledby="Sparkline-example-3">
          <h2 id="Sparkline-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Fixed Axis and Edge Cases
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Set min and max to compare several lines on the same scale. A flat
            series sits in the middle, and a single value draws a flat line.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Sparkline data={[20, 35, 30, 45]} min={0} max={100} ariaLabel="CPU usage, 0 to 100%" />
<Sparkline data={[5, 5, 5, 5]} tone="muted" ariaLabel="No change" />
<Sparkline data={[42]} tone="info" ariaLabel="Single reading" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-6 py-4">
                <Sparkline data={[20, 35, 30, 45]} min={0} max={100} ariaLabel="CPU usage, 0 to 100%" />
                <Sparkline data={[5, 5, 5, 5]} tone="muted" ariaLabel="No change" />
                <Sparkline data={[42]} tone="info" ariaLabel="Single reading" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Sparkline-props">
          <h2 id="Sparkline-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the Sparkline component.</p>
          <PropsTable rows={sparklineProps} />
        </section>

        <section aria-labelledby="Sparkline-a11y">
          <h2 id="Sparkline-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The SVG has role="img" and an aria-label, so it is read as a single image.</li>
            <li>
              Describe the trend in ariaLabel (for example "Revenue up 12% over
              8 weeks"), since the shape itself is not announced.
            </li>
            <li>Colors use theme tokens, so contrast follows your light and dark palettes.</li>
            <li>Pair the line with a visible value: never rely on the line color alone.</li>
          </ul>
        </section>

        <ComponentFaq qa={sparklineFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default SparklineDocs;
