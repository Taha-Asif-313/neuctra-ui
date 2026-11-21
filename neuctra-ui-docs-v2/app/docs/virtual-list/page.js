"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, SearchX } from "lucide-react";
import { VirtualList, Avatar, Badge, EmptyState } from "@neuctra/ui";

const virtualListFaq = buildComponentFaq("VirtualList", {
  variants: ["fixed row height", "estimated row height"],
});

const virtualListProps = [
  ["items", "T[]", "-", "Full data set; only the visible window is rendered (required)."],
  ["height", "number | string", "-", 'Viewport height. Numbers are pixels; strings such as "100%" are measured at runtime (required).'],
  ["estimateSize", "number | (index: number, item: T) => number", "48", "Row height in pixels, fixed or per row."],
  ["overscan", "number", "4", "Extra rows rendered above and below the viewport."],
  ["renderItem", "({ item, index, style }) => ReactNode", "-", "Renders one row. Spread style onto the row root (required)."],
  ["getKey", "(item: T, index: number) => Key", "-", "Stable key per row. Defaults to the index."],
  ["ariaLabel", "string", '"Virtualized list"', "Accessible label for the scroll region."],
  ["emptyState", "ReactNode", "-", "Shown instead of rows when items is empty."],
  ["onEndReached", "() => void", "-", "Fired once per data length when scrolling near the bottom."],
  ["endReachedThreshold", "number", "200", "Distance from the bottom in pixels that triggers onEndReached."],
  ["bordered", "boolean", "true", "Draws the bordered card surface around the viewport."],
  ["className", "string", "-", "Additional classes for the scroll container."],
  ["style", "CSSProperties", "-", "Inline styles for the scroll container."],
  ["innerClassName", "string", "-", "Additional classes for the inner sizing element."],
  ["emptyClassName", "string", "-", "Additional classes for the empty state wrapper."],
];

const people = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: ["Maya Chen", "Diego Ramos", "Priya Natarajan", "Tom Becker", "Ama Owusu"][i % 5],
  email: `user${i + 1}@acme.io`,
}));

const logLevels = ["info", "warn", "error"];
const logs = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  level: logLevels[i % 7 === 0 ? 2 : i % 3 === 0 ? 1 : 0],
  message:
    i % 4 === 0
      ? `Request to /api/orders/${1000 + i} took ${120 + (i % 900)}ms. Retrying with exponential backoff after an upstream timeout from the payments service.`
      : `GET /api/orders/${1000 + i} 200`,
}));

function InfiniteFeed() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 40 }, (_, i) => `Order #${48210 + i}`),
  );
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading || items.length >= 200) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 40 }, (_, i) => `Order #${48210 + prev.length + i}`),
      ]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <VirtualList
        ariaLabel="Recent orders"
        items={items}
        height={280}
        estimateSize={44}
        onEndReached={loadMore}
        renderItem={({ item, style }) => (
          <div
            style={style}
            className="flex items-center justify-between border-b border-border px-4 text-sm"
          >
            <span className="text-foreground">{item}</span>
            <span className="text-xs text-muted-foreground">Fulfilled</span>
          </div>
        )}
      />
      <p className="text-xs text-muted-foreground">
        {loading ? "Loading more orders..." : `${items.length} orders loaded`}
      </p>
    </div>
  );
}

const VirtualListDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            VirtualList Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Render thousands of rows smoothly by mounting only the rows near
            the viewport. VirtualList supports fixed or per row heights,
            overscan, measured string heights, infinite loading and empty
            states, with no dependencies.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="VirtualList-import">
          <h2
            id="VirtualList-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { VirtualList } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic */}
        <section aria-labelledby="VirtualList-example-0">
          <h2
            id="VirtualList-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            10,000 Contacts
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Give it a height, a row size and a renderItem. Always spread the
            provided style onto the row root so it is positioned correctly.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const people = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: ["Maya Chen", "Diego Ramos", "Priya Natarajan", "Tom Becker", "Ama Owusu"][i % 5],
  email: \`user\${i + 1}@acme.io\`,
}));

<VirtualList
  ariaLabel="Contacts"
  items={people}
  height={320}
  estimateSize={56}
  getKey={(person) => person.id}
  renderItem={({ item, style }) => (
    <div style={style} className="flex items-center gap-3 border-b border-border px-4">
      <Avatar size="sm" alt={item.name} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
        <p className="truncate text-xs text-muted-foreground">{item.email}</p>
      </div>
    </div>
  )}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <VirtualList
                  className="max-w-md"
                  ariaLabel="Contacts"
                  items={people}
                  height={320}
                  estimateSize={56}
                  getKey={(person) => person.id}
                  renderItem={({ item, style }) => (
                    <div
                      style={style}
                      className="flex items-center gap-3 border-b border-border px-4"
                    >
                      <Avatar size="sm" alt={item.name} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  )}
                />
              </div>
            }
          />
        </section>

        {/* Example: Variable */}
        <section aria-labelledby="VirtualList-example-1">
          <h2
            id="VirtualList-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Variable Row Heights
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass a function to estimateSize when rows differ, such as a log
            viewer where long messages wrap onto two lines.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<VirtualList
  ariaLabel="Request logs"
  items={logs}
  height={300}
  estimateSize={(index, log) => (log.message.length > 60 ? 64 : 40)}
  getKey={(log) => log.id}
  renderItem={({ item, style }) => (
    <div style={style} className="flex items-start gap-3 border-b border-border px-4 py-2.5 font-mono text-xs">
      <Badge size="sm" variant={item.level === "info" ? "outline" : "soft"} text={item.level} />
      <span className="line-clamp-2 text-secondary">{item.message}</span>
    </div>
  )}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <VirtualList
                  className="max-w-2xl"
                  ariaLabel="Request logs"
                  items={logs}
                  height={300}
                  estimateSize={(index, log) => (log.message.length > 60 ? 64 : 40)}
                  getKey={(log) => log.id}
                  renderItem={({ item, style }) => (
                    <div
                      style={style}
                      className="flex items-start gap-3 border-b border-border px-4 py-2.5 font-mono text-xs"
                    >
                      <Badge
                        size="sm"
                        variant={item.level === "info" ? "outline" : "soft"}
                        text={item.level}
                      />
                      <span className="line-clamp-2 text-secondary">
                        {item.message}
                      </span>
                    </div>
                  )}
                />
              </div>
            }
          />
        </section>

        {/* Example: Infinite */}
        <section aria-labelledby="VirtualList-example-2">
          <h2
            id="VirtualList-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Infinite Loading
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            onEndReached fires once when the user nears the bottom and is
            re-armed whenever items grows, so appending a page just works.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [items, setItems] = useState(() =>
  Array.from({ length: 40 }, (_, i) => \`Order #\${48210 + i}\`),
);
const [loading, setLoading] = useState(false);

const loadMore = () => {
  if (loading || items.length >= 200) return;
  setLoading(true);
  fetchNextPage().then((page) => {
    setItems((prev) => [...prev, ...page]);
    setLoading(false);
  });
};

<VirtualList
  ariaLabel="Recent orders"
  items={items}
  height={280}
  estimateSize={44}
  onEndReached={loadMore}
  renderItem={({ item, style }) => (
    <div style={style} className="flex items-center justify-between border-b border-border px-4 text-sm">
      <span className="text-foreground">{item}</span>
      <span className="text-xs text-muted-foreground">Fulfilled</span>
    </div>
  )}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <InfiniteFeed />
              </div>
            }
          />
        </section>

        {/* Example: Empty */}
        <section aria-labelledby="VirtualList-example-3">
          <h2
            id="VirtualList-example-3"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Empty State
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            emptyState replaces the rows when items is empty, for example
            after a search with no matches.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<VirtualList
  className="max-w-md"
  ariaLabel="Search results"
  items={[]}
  height={220}
  emptyClassName="p-0"
  emptyState={
    <EmptyState
      size="sm"
      icon={<SearchX />}
      title={'No contacts match "jordan"'}
      description="Check the spelling or search by email instead."
    />
  }
  renderItem={({ item, style }) => <div style={style}>{item}</div>}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <VirtualList
                  className="max-w-md"
                  ariaLabel="Search results"
                  items={[]}
                  height={220}
                  emptyClassName="p-0"
                  emptyState={
                    <EmptyState
                      size="sm"
                      icon={<SearchX />}
                      title={'No contacts match "jordan"'}
                      description="Check the spelling or search by email instead."
                    />
                  }
                  renderItem={({ item, style }) => <div style={style}>{item}</div>}
                />
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="VirtualList-props">
          <h2
            id="VirtualList-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the VirtualList component.
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
                {virtualListProps.map(([name, type, def, desc]) => (
                  <tr key={name}>
                    <td className="p-3 font-medium text-primary whitespace-nowrap">
                      {name}
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
        <section aria-labelledby="VirtualList-a11y">
          <h2
            id="VirtualList-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The scroll container is a focusable region named by ariaLabel,
              so keyboard users can scroll it with the arrow keys, Page Up,
              Page Down, Home and End.
            </li>
            <li>
              Rendered rows stay in the accessibility tree. Only rows far
              outside the viewport are unmounted, so screen readers read the
              visible window plus the overscan rows.
            </li>
            <li>
              Interactive rows should use real buttons or links so they are
              reachable with Tab.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={virtualListFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default VirtualListDocs;
