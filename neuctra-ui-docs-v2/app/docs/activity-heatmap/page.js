"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { ActivityHeatmap, Card, CardBody, Badge } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const activityHeatmapFaq = buildComponentFaq("ActivityHeatmap", {
  sizes: ["sm", "md", "lg"],
});

// Deterministic sample data so server and client render the same grid.
function buildActivity(days, end = new Date(2026, 10, 20)) {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(end.getFullYear(), end.getMonth(), end.getDate() - (days - 1 - i));
    const weekday = date.getDay();
    const base = weekday === 0 || weekday === 6 ? 1 : 4;
    const count = (i * 7 + weekday * 3) % 11 < 3 ? 0 : ((i * 13) % 9) + base;
    return { date, count };
  });
}

const commits = buildActivity(26 * 7);
const deploys = buildActivity(12 * 7);

function ClickableHeatmapDemo() {
  const [selected, setSelected] = useState(null);
  return (
    <Card padding="sm" className="w-full max-w-xl">
      <CardBody className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">Deployments</p>
            <p className="text-xs text-muted-foreground">Last 12 weeks, production</p>
          </div>
          <Badge variant="soft" text="98.4% success" className="shrink-0 whitespace-nowrap" />
        </div>
        <ActivityHeatmap
          data={deploys}
          weeks={12}
          colorScale="success"
          size="lg"
          showWeekdayLabels
          onDayClick={(day) => setSelected(day)}
        />
        <p className="text-sm text-secondary" aria-live="polite">
          {selected
            ? `${selected.count} deploys on ${new Date(selected.date).toLocaleDateString()}`
            : "Select a day to see its deploy count."}
        </p>
      </CardBody>
    </Card>
  );
}

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

const heatmapProps = [
  ["data", "{ date: string | Date; count: number }[]", "-", "Daily activity records (required). Missing days count as 0; duplicate dates are summed."],
  ["weeks", "number", "-", "Number of trailing weeks to show, ending at the latest date. Defaults to the full data range."],
  ["endDate", "string | Date", "-", "Last day in the grid. Defaults to the latest date in data."],
  ["colorScale", '"primary" | "success" | "info"', '"primary"', "Semantic token family for the intensity ramp."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Cell size preset."],
  ["showLegend", "boolean", "true", "Shows the Less / More legend."],
  ["showWeekdayLabels", "boolean", "false", "Shows Mon / Wed / Fri labels beside the grid."],
  ["showMonthLabels", "boolean", "false", "Shows month labels above the grid."],
  ["formatLabel", "(day: { date: Date; count: number }) => string", "-", "Builds the accessible label and tooltip of each cell."],
  ["ariaLabel", "string", '"Activity heatmap"', "Accessible name of the whole heatmap."],
  ["onDayClick", "(day: { date: string | Date; count: number }) => void", "-", "Makes every cell a focusable button and fires on click."],
  ["className", "string", "-", "Styles the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["gridClassName", "string", "-", "Styles the scrollable grid wrapper."],
  ["cellClassName", "string", "-", "Styles every day cell."],
  ["labelClassName", "string", "-", "Styles the month and weekday labels."],
  ["legendClassName", "string", "-", "Styles the legend row."],
];

const dayProps = [
  ["date", "string | Date", "-", "Calendar date of the cell (required)."],
  ["count", "number", "-", "Activity count (required)."],
  ["level", "number", "0", "Intensity level from 0 to 4."],
  ["colorScale", '"primary" | "success" | "info"', '"primary"', "Token family for the fill."],
  ["colorClassName", "string", "-", "Custom background class; intensity then uses opacity instead of the token ramp."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Cell size preset."],
  ["label", "string", "-", 'Accessible label and tooltip. Defaults to "N contributions on <date>".'],
  ["onDayClick", "(day: { date: string | Date; count: number }) => void", "-", "Renders the cell as a button when set."],
  ["className", "string", "-", "Styles the cell."],
  ["style", "CSSProperties", "-", "Inline styles for the cell."],
];

const ActivityHeatmapDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ActivityHeatmap Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A calendar-aligned contribution grid for commits, deploys, logins or
            any daily metric. Every column is one week, every row is one
            weekday, and the intensity ramp is built from your theme tokens.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="ActivityHeatmap-import">
          <h2 id="ActivityHeatmap-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { ActivityHeatmap, HeatmapDay } from "@neuctra/ui";`} />
        </section>

        {/* Basic */}
        <section aria-labelledby="ActivityHeatmap-example-0">
          <h2 id="ActivityHeatmap-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass daily records. Dates can be ISO strings or Date objects, and
            days without a record render as empty cells.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const commits = [
  { date: "2026-11-18", count: 6 },
  { date: "2026-11-19", count: 2 },
  { date: "2026-11-20", count: 9 },
  // ...one entry per active day
];

<ActivityHeatmap data={commits} weeks={26} showMonthLabels />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ActivityHeatmap data={commits} weeks={26} showMonthLabels />
              </div>
            }
          />
        </section>

        {/* Sizes and scales */}
        <section aria-labelledby="ActivityHeatmap-example-1">
          <h2 id="ActivityHeatmap-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes and Color Scales
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size scales the cells; colorScale picks the primary, success or info
            token for the ramp.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ActivityHeatmap data={commits} weeks={12} size="sm" colorScale="primary" showLegend={false} />
<ActivityHeatmap data={commits} weeks={12} size="md" colorScale="info" showLegend={false} />
<ActivityHeatmap data={commits} weeks={12} size="lg" colorScale="success" showLegend={false} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-end gap-6 py-4">
                <ActivityHeatmap data={commits} weeks={12} size="sm" colorScale="primary" showLegend={false} />
                <ActivityHeatmap data={commits} weeks={12} size="md" colorScale="info" showLegend={false} />
                <ActivityHeatmap data={commits} weeks={12} size="lg" colorScale="success" showLegend={false} />
              </div>
            }
          />
        </section>

        {/* Profile card */}
        <section aria-labelledby="ActivityHeatmap-example-2">
          <h2 id="ActivityHeatmap-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Contributor Profile
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Inside a card with weekday and month labels and a custom tooltip
            via formatLabel. On narrow screens the grid scrolls horizontally
            and starts scrolled to the most recent weeks.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card padding="sm" className="w-full max-w-2xl">
  <CardBody className="space-y-4">
    <div>
      <p className="text-sm font-semibold text-foreground">1,284 contributions in the last 6 months</p>
      <p className="text-xs text-muted-foreground">Commits, reviews and merged pull requests</p>
    </div>
    <ActivityHeatmap
      data={commits}
      weeks={26}
      showWeekdayLabels
      showMonthLabels
      ariaLabel="Contributions in the last 6 months"
      formatLabel={({ date, count }) =>
        \`\${count} contributions on \${date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}\`
      }
    />
  </CardBody>
</Card>`}
            previewContent={
              <div className="w-full py-4">
                <Card padding="sm" className="w-full max-w-2xl">
                  <CardBody className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        1,284 contributions in the last 6 months
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Commits, reviews and merged pull requests
                      </p>
                    </div>
                    <ActivityHeatmap
                      data={commits}
                      weeks={26}
                      showWeekdayLabels
                      showMonthLabels
                      ariaLabel="Contributions in the last 6 months"
                      formatLabel={({ date, count }) =>
                        `${count} contributions on ${date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}`
                      }
                    />
                  </CardBody>
                </Card>
              </div>
            }
          />
        </section>

        {/* Clickable */}
        <section aria-labelledby="ActivityHeatmap-example-3">
          <h2 id="ActivityHeatmap-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Clickable Days
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            With onDayClick every cell becomes a focusable button. Without it,
            cells are static labelled images.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [selected, setSelected] = useState(null);

<Card padding="sm" className="w-full max-w-xl">
  <CardBody className="space-y-4">
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">Deployments</p>
        <p className="text-xs text-muted-foreground">Last 12 weeks, production</p>
      </div>
      <Badge variant="soft" text="98.4% success" className="shrink-0 whitespace-nowrap" />
    </div>
    <ActivityHeatmap
      data={deploys}
      weeks={12}
      colorScale="success"
      size="lg"
      showWeekdayLabels
      onDayClick={(day) => setSelected(day)}
    />
    <p className="text-sm text-secondary" aria-live="polite">
      {selected
        ? \`\${selected.count} deploys on \${new Date(selected.date).toLocaleDateString()}\`
        : "Select a day to see its deploy count."}
    </p>
  </CardBody>
</Card>`}
            previewContent={
              <div className="w-full py-4">
                <ClickableHeatmapDemo />
              </div>
            }
          />
        </section>

        {/* Empty */}
        <section aria-labelledby="ActivityHeatmap-example-4">
          <h2 id="ActivityHeatmap-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Empty Range
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Set endDate and weeks to render a fixed window even when there is
            no activity yet.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ActivityHeatmap data={[]} endDate="2026-11-20" weeks={8} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ActivityHeatmap data={[]} endDate="2026-11-20" weeks={8} />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="ActivityHeatmap-props">
          <h2 id="ActivityHeatmap-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the ActivityHeatmap component.</p>
          <PropsTable rows={heatmapProps} />
        </section>

        <section aria-labelledby="HeatmapDay-props">
          <h2 id="HeatmapDay-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            HeatmapDay Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">A single cell, exported for custom layouts.</p>
          <PropsTable rows={dayProps} />
        </section>

        {/* Accessibility */}
        <section aria-labelledby="ActivityHeatmap-a11y">
          <h2 id="ActivityHeatmap-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The root is a role="group" named by ariaLabel.</li>
            <li>
              Each in-range day has an aria-label and tooltip such as "6
              contributions on Nov 18, 2026" (customizable with formatLabel).
            </li>
            <li>
              With onDayClick, cells are native buttons: Tab moves between
              them, Enter and Space activate, and a visible focus ring is shown.
            </li>
            <li>Padding cells, labels and the legend are aria-hidden.</li>
            <li>The hover scale is disabled under prefers-reduced-motion.</li>
            <li>
              When the grid is wider than its container it starts scrolled to
              the newest weeks, and month labels without room are omitted
              instead of overflowing.
            </li>
          </ul>
        </section>

        <ComponentFaq qa={activityHeatmapFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ActivityHeatmapDocs;
