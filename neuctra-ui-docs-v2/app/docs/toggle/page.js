"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Toggle, ToggleGroup } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  LayoutGrid,
  Accessibility,
} from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const toggleGroupFaq = buildComponentFaq("ToggleGroup", {
  sizes: ["sm", "md", "lg"],
});

const GroupDemo = () => {
  const [align, setAlign] = useState("left");
  return (
    <ToggleGroup
      value={align}
      onChange={setAlign}
      options={[
        {
          value: "left",
          icon: <AlignLeft size={16} />,
          ariaLabel: "Align left",
        },
        {
          value: "center",
          icon: <AlignCenter size={16} />,
          ariaLabel: "Align center",
        },
        {
          value: "right",
          icon: <AlignRight size={16} />,
          ariaLabel: "Align right",
        },
      ]}
    />
  );
};

const ToggleDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Toggle & ToggleGroup Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React toggle button and segmented toggle group with single and
            multiple selection, icons, sizes and aria-pressed semantics —
            built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { Toggle, ToggleGroup } from "@neuctra/ui";`} />
        </section>

        {/* Example: Toggle — Basic Usage */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Toggle — Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A two-state button. Controlled via pressed/onPressedChange or
            uncontrolled with defaultPressed.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Toggle defaultPressed><Bold size={16} /> Bold</Toggle>
<Toggle variant="outline"><Italic size={16} /> Italic</Toggle>
<Toggle size="sm"><Underline size={16} /></Toggle>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Toggle defaultPressed>
                  <Bold size={16} /> Bold
                </Toggle>
                <Toggle variant="outline">
                  <Italic size={16} /> Italic
                </Toggle>
                <Toggle size="sm" aria-label="Underline">
                  <Underline size={16} />
                </Toggle>
              </div>
            }
          />
        </section>

        {/* Example: ToggleGroup — Single Selection */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            ToggleGroup — Single Selection
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A segmented control: exactly one value at a time (clicking the
            active one clears it).
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [align, setAlign] = useState("left");

<ToggleGroup
  value={align}
  onChange={setAlign}
  options={[
    { value: "left", icon: <AlignLeft size={16} />, ariaLabel: "Align left" },
    { value: "center", icon: <AlignCenter size={16} />, ariaLabel: "Align center" },
    { value: "right", icon: <AlignRight size={16} />, ariaLabel: "Align right" },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <GroupDemo />
              </div>
            }
          />
        </section>

        {/* Example: ToggleGroup — Multiple & Full Width */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            ToggleGroup — Multiple & Full Width
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<ToggleGroup
  type="multiple"
  defaultValue={["list"]}
  fullWidth
  options={[
    { value: "list", label: "List", icon: <List size={16} /> },
    { value: "grid", label: "Grid", icon: <LayoutGrid size={16} /> },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-xs">
                  <ToggleGroup
                    type="multiple"
                    defaultValue={["list"]}
                    fullWidth
                    options={[
                      { value: "list", label: "List", icon: <List size={16} /> },
                      {
                        value: "grid",
                        label: "Grid",
                        icon: <LayoutGrid size={16} />,
                      },
                    ]}
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Toggle & ToggleGroup component.
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
                    Toggle.pressed / defaultPressed
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Controlled / uncontrolled state</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Toggle.onPressedChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (pressed) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired with the next state</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    Toggle.variant
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "default" | "outline"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "default"
                  </td>
                  <td className="p-3">Borderless or bordered</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ToggleGroup.options
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ToggleGroupOption[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    {"{ value, label?, icon?, disabled?, ariaLabel? }"}
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ToggleGroup.type
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "single" | "multiple"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "single"
                  </td>
                  <td className="p-3">Selection model</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ToggleGroup.value / defaultValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string | string[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Controlled / uncontrolled selection</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ToggleGroup.onChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (value) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    String (single) or string[] (multiple)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ToggleGroup.fullWidth
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Stretch options evenly</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ToggleGroup.itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each option button</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ToggleGroup.iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the icon wrapper inside each option
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
                  <td className="p-3">Both components</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Every option is a real button with aria-pressed reflecting its
              state.
            </li>
            <li>
              Icon-only options should set ariaLabel; focus rings are inset
              so the segmented border stays clean.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={toggleGroupFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default ToggleDocs;
