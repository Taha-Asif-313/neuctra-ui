"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Sparkles } from "lucide-react";
import { AnnouncementBar, Button } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const announcementBarFaq = buildComponentFaq("AnnouncementBar", {
  variants: ["solid", "soft"],
  sizes: ["sm", "md"],
});

function ControlledBarDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full space-y-3">
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <AnnouncementBar
          open={open}
          tone="warning"
          dismissible
          onDismiss={() => setOpen(false)}
        >
          Scheduled maintenance on Sunday, 02:00 to 04:00 UTC. Exports may be delayed.
        </AnnouncementBar>
        <div className="px-4 py-6 text-sm text-secondary">Dashboard content</div>
      </div>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)} disabled={open}>
        Show announcement again
      </Button>
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

const barProps = [
  ["children", "ReactNode", "-", "Announcement copy (required)."],
  ["tone", '"info" | "warning" | "success" | "destructive"', '"info"', "Semantic color tone."],
  ["variant", '"solid" | "soft"', '"solid"', "Solid fill, or a tinted background with regular text."],
  ["size", '"sm" | "md"', '"md"', "Height and text size preset."],
  ["dismissible", "boolean", "false", "Shows a dismiss button."],
  ["storageKey", "string", "-", "localStorage key that remembers a dismissal across visits."],
  ["open", "boolean", "-", "Controlled visibility. When set, dismiss only calls onDismiss."],
  ["action", "ReactNode", "-", "Trailing action, usually a link or small button."],
  ["icon", "ReactNode", "-", "Leading icon. Defaults to a tone icon; pass null to hide it."],
  ["onDismiss", "() => void", "-", "Called when the user dismisses the bar."],
  ["ariaLabel", "string", '"Announcement"', "Accessible name of the region."],
  ["className", "string", "-", "Styles the bar root."],
  ["style", "CSSProperties", "-", "Inline styles for the bar root."],
  ["iconClassName", "string", "-", "Styles the icon wrapper."],
  ["contentClassName", "string", "-", "Styles the message text."],
  ["actionClassName", "string", "-", "Styles the action wrapper."],
  ["dismissButtonClassName", "string", "-", "Styles the dismiss IconButton."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Other div attributes, forwarded to the root."],
];

const AnnouncementBarDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            AnnouncementBar Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A full-width strip for launches, maintenance windows and billing
            notices. Four semantic tones, solid or soft styling, an optional
            action and a dismissal that can be remembered across visits.
          </p>
        </header>

        <section aria-labelledby="AnnouncementBar-import">
          <h2 id="AnnouncementBar-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { AnnouncementBar } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="AnnouncementBar-example-0">
          <h2 id="AnnouncementBar-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Place it at the very top of your layout, above the navbar.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<AnnouncementBar
  icon={<Sparkles />}
  action={<a href="/changelog">Read the changelog</a>}
>
  Workflows 2.0 is here: branching, retries and scheduled runs.
</AnnouncementBar>`}
            previewContent={
              <div className="w-full overflow-hidden rounded-xl border border-border py-0">
                <AnnouncementBar icon={<Sparkles />} action={<a href="#">Read the changelog</a>}>
                  Workflows 2.0 is here: branching, retries and scheduled runs.
                </AnnouncementBar>
              </div>
            }
          />
        </section>

        <section aria-labelledby="AnnouncementBar-example-1">
          <h2 id="AnnouncementBar-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Tones and Variants
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Solid bars grab attention; soft bars are calmer and keep regular
            text color with a tinted icon. The action slot takes a link or a
            small Button. On phones the icon stays beside left-aligned text;
            from the sm breakpoint up the message is centered on one line.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<AnnouncementBar tone="info">New: export reports as CSV from any table.</AnnouncementBar>
<AnnouncementBar tone="success">All systems operational.</AnnouncementBar>
<AnnouncementBar tone="warning" variant="soft">Your trial ends in 3 days.</AnnouncementBar>
<AnnouncementBar
  tone="destructive"
  variant="soft"
  action={<Button size="xs" variant="destructive">Update card</Button>}
>
  Payment failed. Update your card to avoid interruption.
</AnnouncementBar>`}
            previewContent={
              <div className="flex w-full flex-col gap-3 py-4">
                <AnnouncementBar tone="info">New: export reports as CSV from any table.</AnnouncementBar>
                <AnnouncementBar tone="success">All systems operational.</AnnouncementBar>
                <AnnouncementBar tone="warning" variant="soft">Your trial ends in 3 days.</AnnouncementBar>
                <AnnouncementBar
                  tone="destructive"
                  variant="soft"
                  action={<Button size="xs" variant="destructive">Update card</Button>}
                >
                  Payment failed. Update your card to avoid interruption.
                </AnnouncementBar>
              </div>
            }
          />
        </section>

        <section aria-labelledby="AnnouncementBar-example-2">
          <h2 id="AnnouncementBar-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<AnnouncementBar size="sm" variant="soft">Compact bar for dense app shells.</AnnouncementBar>
<AnnouncementBar size="md" variant="soft">Default bar for marketing sites.</AnnouncementBar>`}
            previewContent={
              <div className="flex w-full flex-col gap-3 py-4">
                <AnnouncementBar size="sm" variant="soft">Compact bar for dense app shells.</AnnouncementBar>
                <AnnouncementBar size="md" variant="soft">Default bar for marketing sites.</AnnouncementBar>
              </div>
            }
          />
        </section>

        <section aria-labelledby="AnnouncementBar-example-3">
          <h2 id="AnnouncementBar-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Dismissible and Persisted
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            With storageKey, a dismissed bar stays hidden on future visits. Use
            a new key when the message changes.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<AnnouncementBar
  tone="success"
  dismissible
  storageKey="promo-black-friday-2026"
  action={<a href="/pricing">See plans</a>}
>
  Black Friday: 40% off annual plans until Dec 1.
</AnnouncementBar>`}
            previewContent={
              <div className="w-full py-4">
                <AnnouncementBar
                  tone="success"
                  dismissible
                  storageKey="docs-demo-promo-black-friday-2026"
                  action={<a href="#">See plans</a>}
                >
                  Black Friday: 40% off annual plans until Dec 1.
                </AnnouncementBar>
              </div>
            }
          />
        </section>

        <section aria-labelledby="AnnouncementBar-example-4">
          <h2 id="AnnouncementBar-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled Visibility
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass open to own the visibility, for example to show the bar again
            when a status changes.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [open, setOpen] = useState(true);

<div className="w-full space-y-3">
  <div className="overflow-hidden rounded-xl border border-border bg-background">
    <AnnouncementBar open={open} tone="warning" dismissible onDismiss={() => setOpen(false)}>
      Scheduled maintenance on Sunday, 02:00 to 04:00 UTC. Exports may be delayed.
    </AnnouncementBar>
    <div className="px-4 py-6 text-sm text-secondary">Dashboard content</div>
  </div>
  <Button size="sm" variant="outline" onClick={() => setOpen(true)} disabled={open}>
    Show announcement again
  </Button>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledBarDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="AnnouncementBar-props">
          <h2 id="AnnouncementBar-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the AnnouncementBar component.</p>
          <PropsTable rows={barProps} />
        </section>

        <section aria-labelledby="AnnouncementBar-a11y">
          <h2 id="AnnouncementBar-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The bar is a labelled role="region" landmark ("Announcement" by default).</li>
            <li>The tone icon is aria-hidden; meaning is always carried by the text.</li>
            <li>The dismiss control is a Neuctra IconButton (a native button) labelled "Dismiss announcement" with a visible focus ring.</li>
            <li>Links in the action slot are underlined and get a focus ring.</li>
            <li>The collapse animation becomes a plain fade under prefers-reduced-motion.</li>
          </ul>
        </section>

        <ComponentFaq qa={announcementBarFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default AnnouncementBarDocs;
