"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { LiveAnnouncer, Button, Card, CardBody, Input } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const liveAnnouncerFaq = buildComponentFaq("LiveAnnouncer");

function CartDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const add = () => {
    const next = count + 1;
    setCount(next);
    setMessage(`Added to cart. ${next} item${next === 1 ? "" : "s"} in cart.`);
  };
  return (
    <Card className="w-full max-w-sm">
      <CardBody className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Wireless Headphones</p>
        <p className="text-sm text-secondary">Noise cancelling, 30 hour battery.</p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">Cart: {count}</span>
          <Button size="sm" onClick={add}>Add to cart</Button>
        </div>
        <LiveAnnouncer clearAfter={3000}>{message}</LiveAnnouncer>
      </CardBody>
    </Card>
  );
}

const products = ["Wireless Headphones", "Wireless Mouse", "Mechanical Keyboard", "USB-C Hub", "Webcam 4K"];

function SearchDemo() {
  const [query, setQuery] = useState("");
  const results = products.filter((p) => p.toLowerCase().includes(query.toLowerCase()));
  const summary = query ? `${results.length} result${results.length === 1 ? "" : "s"} for ${query}` : "";
  return (
    <div className="w-full max-w-sm space-y-3">
      <Input
        label="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try wireless"
      />
      <LiveAnnouncer visible delay={500} className="text-xs text-muted-foreground">
        {summary}
      </LiveAnnouncer>
      <Card padding="none">
        <CardBody>
          <ul className="divide-y divide-border text-sm text-foreground">
            {results.map((p) => (
              <li key={p} className="px-4 py-2.5">{p}</li>
            ))}
            {results.length === 0 && (
              <li className="px-4 py-2.5 text-muted-foreground">No products match.</li>
            )}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

function SaveDemo() {
  const [status, setStatus] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant="outline" onClick={() => setStatus("Draft saved at 10:42")}>
        Save draft
      </Button>
      <Button size="sm" variant="destructive" onClick={() => setStatus("Connection lost. Changes are not being saved.")}>
        Simulate disconnect
      </Button>
      <LiveAnnouncer
        visible
        politeness={status.startsWith("Connection") ? "assertive" : "polite"}
        className="text-sm text-muted-foreground"
      >
        {status}
      </LiveAnnouncer>
    </div>
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

const announcerProps = [
  ["children", "ReactNode", "-", "Message to announce. Change it to announce something new."],
  ["politeness", '"polite" | "assertive"', '"polite"', "polite waits for the user to be idle; assertive interrupts."],
  ["atomic", "boolean", "true", "Announces the whole region on each update."],
  ["relevant", '"additions" | "removals" | "text" | "all" | "additions text"', "-", "Which changes are announced (aria-relevant)."],
  ["delay", "number", "100", "Milliseconds before new content is written into the region."],
  ["clearAfter", "number", "-", "Clears the region this many ms after announcing, so the same message can repeat."],
  ["visible", "boolean", "false", "Shows the region on screen instead of screen-reader only."],
  ["className", "string", "-", "Styles the region."],
  ["style", "CSSProperties", "-", "Inline styles for the region."],
];

const LiveAnnouncerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            LiveAnnouncer Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            An aria-live region that reliably announces dynamic updates, such as
            cart changes, search result counts and save status, to screen reader
            users. Hidden by default, or visible as a status line.
          </p>
        </header>

        <section aria-labelledby="LiveAnnouncer-import">
          <h2 id="LiveAnnouncer-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { LiveAnnouncer } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="LiveAnnouncer-example-0">
          <h2 id="LiveAnnouncer-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Render it once and update its text. The region is visually hidden;
            turn on a screen reader to hear the cart update. clearAfter lets
            the same message be announced again.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [count, setCount] = useState(0);
const [message, setMessage] = useState("");

const add = () => {
  const next = count + 1;
  setCount(next);
  setMessage(\`Added to cart. \${next} item\${next === 1 ? "" : "s"} in cart.\`);
};

<Card className="w-full max-w-sm">
  <CardBody className="space-y-3">
    <p className="text-sm font-semibold text-foreground">Wireless Headphones</p>
    <p className="text-sm text-secondary">Noise cancelling, 30 hour battery.</p>
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">Cart: {count}</span>
      <Button size="sm" onClick={add}>Add to cart</Button>
    </div>
    <LiveAnnouncer clearAfter={3000}>{message}</LiveAnnouncer>
  </CardBody>
</Card>`}
            previewContent={
              <div className="w-full py-4">
                <CartDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="LiveAnnouncer-example-1">
          <h2 id="LiveAnnouncer-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Visible Result Count
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            visible renders the region as a normal status line. A longer delay
            waits for typing to settle before announcing.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const products = ["Wireless Headphones", "Wireless Mouse", "Mechanical Keyboard", "USB-C Hub", "Webcam 4K"];
const [query, setQuery] = useState("");
const results = products.filter((p) => p.toLowerCase().includes(query.toLowerCase()));
const summary = query ? \`\${results.length} result\${results.length === 1 ? "" : "s"} for \${query}\` : "";

<div className="w-full max-w-sm space-y-3">
  <Input label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try wireless" />
  <LiveAnnouncer visible delay={500} className="text-xs text-muted-foreground">
    {summary}
  </LiveAnnouncer>
  <Card padding="none">
    <CardBody>
      <ul className="divide-y divide-border text-sm text-foreground">
        {results.map((p) => <li key={p} className="px-4 py-2.5">{p}</li>)}
        {results.length === 0 && <li className="px-4 py-2.5 text-muted-foreground">No products match.</li>}
      </ul>
    </CardBody>
  </Card>
</div>`}
            previewContent={
              <div className="w-full py-4">
                <SearchDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="LiveAnnouncer-example-2">
          <h2 id="LiveAnnouncer-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Polite vs Assertive
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Use polite for routine updates. Reserve assertive for urgent
            problems that need immediate attention.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [status, setStatus] = useState("");

<div className="flex flex-wrap items-center gap-3">
  <Button size="sm" variant="outline" onClick={() => setStatus("Draft saved at 10:42")}>Save draft</Button>
  <Button size="sm" variant="destructive" onClick={() => setStatus("Connection lost. Changes are not being saved.")}>
    Simulate disconnect
  </Button>
  <LiveAnnouncer
    visible
    politeness={status.startsWith("Connection") ? "assertive" : "polite"}
    className="text-sm text-muted-foreground"
  >
    {status}
  </LiveAnnouncer>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <SaveDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="LiveAnnouncer-props">
          <h2 id="LiveAnnouncer-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the LiveAnnouncer component.</p>
          <PropsTable rows={announcerProps} />
        </section>

        <section aria-labelledby="LiveAnnouncer-a11y">
          <h2 id="LiveAnnouncer-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The region renders role="status" with aria-live="polite", or role="alert" with aria-live="assertive".</li>
            <li>
              It mounts empty and writes the message after delay, because most
              screen readers ignore content that is present when a live region
              first appears.
            </li>
            <li>Mount the announcer once and keep it mounted; change only its text.</li>
            <li>Hidden regions use the sr-only utility, so they stay in the accessibility tree.</li>
          </ul>
        </section>

        <ComponentFaq qa={liveAnnouncerFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default LiveAnnouncerDocs;
