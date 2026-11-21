"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Bold, Italic, Underline, Link2, MessageSquarePlus, Sparkles, AlignLeft, AlignCenter, AlignRight, Download, Share2, Trash2, X } from "lucide-react";
import { FloatingToolbar, Card, CardBody, Checkbox } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const floatingToolbarFaq = buildComponentFaq("FloatingToolbar");

function FormattingToolbarDemo() {
  const [marks, setMarks] = useState({ bold: true, italic: false, underline: false });
  const toggle = (key) => () => setMarks((m) => ({ ...m, [key]: !m[key] }));
  return (
    <FloatingToolbar
      inline
      ariaLabel="Text formatting"
      items={[
        { icon: <Bold />, label: "Bold", active: marks.bold, onSelect: toggle("bold") },
        { icon: <Italic />, label: "Italic", active: marks.italic, onSelect: toggle("italic") },
        { icon: <Underline />, label: "Underline", active: marks.underline, onSelect: toggle("underline") },
        { icon: <Link2 />, label: "Insert link", separatorBefore: true, onSelect: () => {} },
        { icon: <MessageSquarePlus />, label: "Add comment", onSelect: () => {} },
        { icon: <Sparkles />, label: "Rewrite with AI", disabled: true, onSelect: () => {} },
      ]}
    />
  );
}

function BulkActionsDemo() {
  const files = ["Brand guidelines.pdf", "Launch plan.docx", "Hero banner.png"];
  const [selected, setSelected] = useState([]);
  return (
    <Card className="w-full max-w-md">
      <CardBody className="space-y-1 p-2">
        <Checkbox
          mode="group"
          aria-label="Files"
          options={files.map((name) => ({ label: name, value: name }))}
          selectedValues={selected}
          onChange={setSelected}
          containerClassName="gap-1"
          itemClassName="rounded-lg px-3 py-2 hover:bg-accent"
        />
        <p className="px-3 pt-1 text-xs text-muted-foreground">
          Select a file to show the toolbar at the bottom of the screen.
        </p>
      </CardBody>
      <FloatingToolbar
        open={selected.length > 0}
        ariaLabel="Selected file actions"
        items={[
          { icon: <Download />, label: "Download", onSelect: () => {} },
          { icon: <Share2 />, label: "Share", onSelect: () => {} },
          { icon: <Trash2 />, label: "Delete", danger: true, onSelect: () => setSelected([]) },
          { icon: <X />, label: "Clear selection", separatorBefore: true, onSelect: () => setSelected([]) },
        ]}
      >
        <span className="whitespace-nowrap px-2 text-sm text-muted-foreground">{selected.length} selected</span>
      </FloatingToolbar>
    </Card>
  );
}

const FloatingToolbarDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            FloatingToolbar Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A compact bar of icon actions. By default it floats at the bottom center of the viewport through a portal, which suits bulk actions on a selection; pass position for custom coordinates or inline to place it in the page, like a text formatting bar. It is a proper ARIA toolbar with a single tab stop and arrow-key navigation.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="FloatingToolbar-import">
          <h2
            id="FloatingToolbar-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { FloatingToolbar, FloatingToolbarItem } from "@neuctra/ui";`} />
        </section>

        {/* Example: Inline Formatting Bar */}
        <section aria-labelledby="FloatingToolbar-example-0">
          <h2
            id="FloatingToolbar-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Inline Formatting Bar
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            inline renders the bar in normal flow. active marks toggle buttons as pressed, separatorBefore adds a divider and disabled actions are skipped by the arrow keys.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function FormattingToolbarDemo() {
  const [marks, setMarks] = useState({ bold: true, italic: false, underline: false });
  const toggle = (key) => () => setMarks((m) => ({ ...m, [key]: !m[key] }));
  return (
    <FloatingToolbar
      inline
      ariaLabel="Text formatting"
      items={[
        { icon: <Bold />, label: "Bold", active: marks.bold, onSelect: toggle("bold") },
        { icon: <Italic />, label: "Italic", active: marks.italic, onSelect: toggle("italic") },
        { icon: <Underline />, label: "Underline", active: marks.underline, onSelect: toggle("underline") },
        { icon: <Link2 />, label: "Insert link", separatorBefore: true, onSelect: () => {} },
        { icon: <MessageSquarePlus />, label: "Add comment", onSelect: () => {} },
        { icon: <Sparkles />, label: "Rewrite with AI", disabled: true, onSelect: () => {} },
      ]}
    />
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FormattingToolbarDemo />
              </div>
            }
          />
        </section>

        {/* Example: Sizes */}
        <section aria-labelledby="FloatingToolbar-example-1">
          <h2
            id="FloatingToolbar-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size sets the button size: sm, md (default) or lg.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<FloatingToolbar
  inline
  size="sm"
  items={[
    { icon: <AlignLeft />, label: "Align left", onSelect: () => {} },
    { icon: <AlignCenter />, label: "Align center", onSelect: () => {} },
    { icon: <AlignRight />, label: "Align right", onSelect: () => {} },
  ]}
/>
<FloatingToolbar
  inline
  size="md"
  items={[
    { icon: <AlignLeft />, label: "Align left", onSelect: () => {} },
    { icon: <AlignCenter />, label: "Align center", onSelect: () => {} },
    { icon: <AlignRight />, label: "Align right", onSelect: () => {} },
  ]}
/>
<FloatingToolbar
  inline
  size="lg"
  items={[
    { icon: <AlignLeft />, label: "Align left", onSelect: () => {} },
    { icon: <AlignCenter />, label: "Align center", onSelect: () => {} },
    { icon: <AlignRight />, label: "Align right", onSelect: () => {} },
  ]}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FloatingToolbar
                  inline
                  size="sm"
                  items={[
                    { icon: <AlignLeft />, label: "Align left", onSelect: () => {} },
                    { icon: <AlignCenter />, label: "Align center", onSelect: () => {} },
                    { icon: <AlignRight />, label: "Align right", onSelect: () => {} },
                  ]}
                />
                <FloatingToolbar
                  inline
                  size="md"
                  items={[
                    { icon: <AlignLeft />, label: "Align left", onSelect: () => {} },
                    { icon: <AlignCenter />, label: "Align center", onSelect: () => {} },
                    { icon: <AlignRight />, label: "Align right", onSelect: () => {} },
                  ]}
                />
                <FloatingToolbar
                  inline
                  size="lg"
                  items={[
                    { icon: <AlignLeft />, label: "Align left", onSelect: () => {} },
                    { icon: <AlignCenter />, label: "Align center", onSelect: () => {} },
                    { icon: <AlignRight />, label: "Align right", onSelect: () => {} },
                  ]}
                />
              </div>
            }
          />
        </section>

        {/* Example: Bulk Actions on Selection */}
        <section aria-labelledby="FloatingToolbar-example-2">
          <h2
            id="FloatingToolbar-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Bulk Actions on Selection
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Without inline the bar is fixed to the bottom of the viewport. open shows and hides it with a short animation, here tied to the selection. Children render after the items.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function BulkActionsDemo() {
  const files = ["Brand guidelines.pdf", "Launch plan.docx", "Hero banner.png"];
  const [selected, setSelected] = useState([]);
  return (
    <Card className="w-full max-w-md">
      <CardBody className="space-y-1 p-2">
        <Checkbox
          mode="group"
          aria-label="Files"
          options={files.map((name) => ({ label: name, value: name }))}
          selectedValues={selected}
          onChange={setSelected}
          containerClassName="gap-1"
          itemClassName="rounded-lg px-3 py-2 hover:bg-accent"
        />
        <p className="px-3 pt-1 text-xs text-muted-foreground">
          Select a file to show the toolbar at the bottom of the screen.
        </p>
      </CardBody>
      <FloatingToolbar
        open={selected.length > 0}
        ariaLabel="Selected file actions"
        items={[
          { icon: <Download />, label: "Download", onSelect: () => {} },
          { icon: <Share2 />, label: "Share", onSelect: () => {} },
          { icon: <Trash2 />, label: "Delete", danger: true, onSelect: () => setSelected([]) },
          { icon: <X />, label: "Clear selection", separatorBefore: true, onSelect: () => setSelected([]) },
        ]}
      >
        <span className="whitespace-nowrap px-2 text-sm text-muted-foreground">{selected.length} selected</span>
      </FloatingToolbar>
    </Card>
  );
}`}
            previewContent={
              <div className="flex w-full items-center justify-center py-4">
                <BulkActionsDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="FloatingToolbar-props">
          <h2
            id="FloatingToolbar-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the FloatingToolbar components.
          </p>


          <h3 className="text-lg font-semibold text-white mb-3">
            FloatingToolbar
          </h3>
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
                    items
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    FloatingToolbarItemProps[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Ordered actions shown in the bar (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    open
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Shows or hides the bar with a short fade and slide.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    position
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    &#123; top?: number; left?: number &#125;
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Fixed viewport coordinates; omit for a bottom-centered bar. Ignored when inline.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    inline
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Renders in normal document flow, without a portal or fixed positioning.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md" | "lg"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"md"</td>
                  <td className="p-3">Button size.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ariaLabel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Floating toolbar"</td>
                  <td className="p-3">Accessible name of the toolbar.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Extra content after the items, such as a selection count.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the bar.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the bar.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every item button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    separatorClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every divider.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            FloatingToolbarItem
          </h3>
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
                    icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Icon rendered inside the button (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Accessible label and native tooltip (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onSelect
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    () =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Runs when the item is activated (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Disables the action.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    active
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Marks a toggle action as on and sets aria-pressed.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    danger
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Styles the action as destructive.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    separatorBefore
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Draws a vertical divider before the item (inside FloatingToolbar).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "sm" | "md" | "lg"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"md"</td>
                  <td className="p-3">Button size; the toolbar passes its own size down.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    tabIndex
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Tab index; the toolbar manages it for roving focus.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the item button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the item button.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="FloatingToolbar-a11y">
          <h2
            id="FloatingToolbar-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The bar is role="toolbar" with an accessible name from ariaLabel and aria-orientation="horizontal".</li>
            <li>Only one button is in the tab order. Arrow Left and Right move between enabled buttons and wrap, Home and End jump to the ends.</li>
            <li>Icon buttons get aria-label and a native title from label. Toggle actions expose aria-pressed through active.</li>
            <li>Every button has a visible focus ring; disabled buttons use the disabled attribute.</li>
            <li>The show and hide animation is reduced to a fade with reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={floatingToolbarFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default FloatingToolbarDocs;
