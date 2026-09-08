"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Stat } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { DollarSign, Users, Activity, Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const statFaq = buildComponentFaq("Stat");

const StatDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Stat Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React stat component for dashboards: KPI value, label, icon,
            trend indicator with up/down arrows and helper text — built with
            Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Stat-import">
          <h2
            id="Stat-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Stat } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="Stat-example-0">
          <h2
            id="Stat-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Stat
  label="Total Revenue"
  value="$45,231"
  icon={<DollarSign />}
  trend="up"
  trendValue="+20.1%"
  description="vs last month"
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Stat
                  className="w-64"
                  label="Total Revenue"
                  value="$45,231"
                  icon={<DollarSign />}
                  trend="up"
                  trendValue="+20.1%"
                  description="vs last month"
                />
              </div>
            }
          />
        </section>

        {/* Dashboard Grid */}
        <section aria-labelledby="Stat-example-1">
          <h2
            id="Stat-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Dashboard Grid
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Stats compose naturally into a responsive grid.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="grid gap-4 sm:grid-cols-3">
  <Stat label="Revenue" value="$45,231" icon={<DollarSign />} trend="up" trendValue="+20.1%" />
  <Stat label="Active Users" value="2,338" icon={<Users />} trend="down" trendValue="-4.3%" />
  <Stat label="Uptime" value="99.98%" icon={<Activity />} trend="neutral" trendValue="0.0%" />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="grid w-full gap-4 sm:grid-cols-3">
                  <Stat
                    label="Revenue"
                    value="$45,231"
                    icon={<DollarSign />}
                    trend="up"
                    trendValue="+20.1%"
                  />
                  <Stat
                    label="Active Users"
                    value="2,338"
                    icon={<Users />}
                    trend="down"
                    trendValue="-4.3%"
                  />
                  <Stat
                    label="Uptime"
                    value="99.98%"
                    icon={<Activity />}
                    trend="neutral"
                    trendValue="0.0%"
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Borderless */}
        <section aria-labelledby="Stat-example-2">
          <h2
            id="Stat-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Borderless
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Stat bordered={false} label="Downloads" value="18.2k" trend="up" trendValue="+8%" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Stat
                  bordered={false}
                  label="Downloads"
                  value="18.2k"
                  trend="up"
                  trendValue="+8%"
                />
              </div>
            }
          />
        </section>

        {/* Props Table */}
        <section aria-labelledby="Stat-props">
          <h2
            id="Stat-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Stat component.
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
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Metric name (required)</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    value
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Metric value (required)</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Icon shown in a tinted square</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    trend
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "up" | "down" | "neutral"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Direction of change; controls arrow and color
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    trendValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Change amount, e.g. "+12.5%"</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Muted helper text next to the trend</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    bordered
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    true
                  </td>
                  <td className="p-3">Wrap the stat in a card surface</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    headerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the header row wrapping the label and icon.
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
                  <td className="p-3">Styles the label text.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the tinted icon wrapper.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    valueClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the metric value text.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    footerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the footer row wrapping trend and description.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    trendClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the trend badge.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    trendIconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the trend arrow icon.</td>
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
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Stat-a11y">
          <h2
            id="Stat-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Values use tabular numerals so columns of stats align.
            </li>
            <li>
              Trend colors pair with arrow icons, so meaning never relies on
              color alone.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={statFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default StatDocs;
