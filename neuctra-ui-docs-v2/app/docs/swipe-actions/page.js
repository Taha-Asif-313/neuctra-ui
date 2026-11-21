"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Archive, Bell, Flag, MailOpen, Pin, Trash2 } from "lucide-react";
import { SwipeActions, Avatar, Button } from "@neuctra/ui";

const swipeActionsFaq = buildComponentFaq("SwipeActions", {
  variants: ["left rail", "right rail", "destructive action"],
});

const swipeActionsProps = [
  ["children", "ReactNode", "-", "Foreground row content (required)."],
  ["left", "SwipeAction[]", "[]", "Actions revealed when swiping right."],
  ["right", "SwipeAction[]", "[]", "Actions revealed when swiping left."],
  ["threshold", "number", "56", "Horizontal travel in pixels needed to snap a rail open."],
  ["open", '"left" | "right" | null', "-", "Controlled open side."],
  ["defaultOpen", '"left" | "right" | null', "null", "Initial open side in uncontrolled mode."],
  ["onOpenChange", '(side: "left" | "right" | null) => void', "-", "Fired whenever the row opens or closes."],
  ["disabled", "boolean", "false", "Disables swiping and hides the actions."],
  ["className", "string", "-", "Additional classes for the outer container."],
  ["style", "CSSProperties", "-", "Inline styles for the outer container."],
  ["contentClassName", "string", "-", "Additional classes for the sliding foreground."],
  ["railClassName", "string", "-", "Additional classes for each action rail."],
  ["actionClassName", "string", "-", "Additional classes for every action button."],
];

const actionProps = [
  ["label", "string", "-", "Visible label and accessible name (required)."],
  ["icon", "ReactNode", "-", "Optional icon above the label."],
  ["onClick", "() => void", "-", "Called when the action is activated. The row closes afterwards."],
  ["destructive", "boolean", "-", 'Shorthand for color="destructive".'],
  ["color", '"neutral" | "primary" | "success" | "warning" | "destructive"', '"neutral"', "Fill color of the action button."],
];

const threads = [
  { id: 1, from: "Maya Chen", subject: "Q3 roadmap review", preview: "Can we move the sync to Thursday? Design needs one more day.", time: "9:41" },
  { id: 2, from: "Stripe", subject: "Payout of $4,820.00 sent", preview: "Your payout is on its way and should arrive in 2 business days.", time: "8:12" },
  { id: 3, from: "Diego Ramos", subject: "Re: onboarding copy", preview: "Left a few comments on the welcome screen, mostly tone.", time: "Yesterday" },
];

function Inbox() {
  const [items, setItems] = useState(threads);
  const [log, setLog] = useState("Swipe a row left or right, or Tab to its actions.");

  return (
    <div className="w-full max-w-md space-y-3">
      {items.map((thread) => (
        <SwipeActions
          key={thread.id}
          left={[
            { label: "Read", icon: <MailOpen />, color: "primary", onClick: () => setLog(`Marked "${thread.subject}" as read`) },
          ]}
          right={[
            { label: "Archive", icon: <Archive />, onClick: () => setLog(`Archived "${thread.subject}"`) },
            {
              label: "Delete",
              icon: <Trash2 />,
              destructive: true,
              onClick: () => setItems((prev) => prev.filter((t) => t.id !== thread.id)),
            },
          ]}
        >
          <div className="flex items-start gap-3 px-4 py-3">
            <Avatar size="sm" alt={thread.from} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-medium text-foreground">{thread.from}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{thread.time}</span>
              </div>
              <p className="truncate text-sm text-foreground">{thread.subject}</p>
              <p className="truncate text-xs text-muted-foreground">{thread.preview}</p>
            </div>
          </div>
        </SwipeActions>
      ))}
      <p className="text-xs text-muted-foreground">{log}</p>
    </div>
  );
}

function ControlledRow() {
  const [open, setOpen] = useState(null);
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="outline" onClick={() => setOpen("left")}>Open left</Button>
        <Button size="xs" variant="outline" onClick={() => setOpen("right")}>Open right</Button>
        <Button size="xs" variant="ghost" onClick={() => setOpen(null)}>Close</Button>
      </div>
      <SwipeActions
        open={open}
        onOpenChange={setOpen}
        left={[{ label: "Pin", icon: <Pin />, color: "warning" }]}
        right={[
          { label: "Snooze", icon: <Bell /> },
          { label: "Flag", icon: <Flag />, color: "success" },
        ]}
      >
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-foreground">Deploy to production</p>
          <p className="text-xs text-muted-foreground">Scheduled for Friday, 16:00 UTC</p>
        </div>
      </SwipeActions>
    </div>
  );
}

function PropsTable({ rows }) {
  return (
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
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">
                {name}
              </td>
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

const SwipeActionsDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            SwipeActions Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Reveal contextual actions behind a row with a horizontal swipe,
            like a mobile inbox. SwipeActions works with touch, pen and
            mouse, never blocks vertical scrolling, and keeps every action
            reachable from the keyboard.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="SwipeActions-import">
          <h2
            id="SwipeActions-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { SwipeActions } from "@neuctra/ui";`} />
        </section>

        {/* Example: Inbox */}
        <section aria-labelledby="SwipeActions-example-0">
          <h2
            id="SwipeActions-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Inbox Rows
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Swipe right for the left rail and left for the right rail. Drag
            past threshold to snap open; tap the row or click outside to
            close.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<SwipeActions
  left={[
    { label: "Read", icon: <MailOpen />, color: "primary", onClick: markRead },
  ]}
  right={[
    { label: "Archive", icon: <Archive />, onClick: archive },
    { label: "Delete", icon: <Trash2 />, destructive: true, onClick: remove },
  ]}
>
  <div className="flex items-start gap-3 px-4 py-3">
    <Avatar size="sm" alt="Maya Chen" />
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline justify-between gap-2">
        <p className="truncate text-sm font-medium text-foreground">Maya Chen</p>
        <span className="shrink-0 text-xs text-muted-foreground">9:41</span>
      </div>
      <p className="truncate text-sm text-foreground">Q3 roadmap review</p>
      <p className="truncate text-xs text-muted-foreground">
        Can we move the sync to Thursday? Design needs one more day.
      </p>
    </div>
  </div>
</SwipeActions>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Inbox />
              </div>
            }
          />
        </section>

        {/* Example: Controlled + colors */}
        <section aria-labelledby="SwipeActions-example-1">
          <h2
            id="SwipeActions-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Controlled State and Colors
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass open and onOpenChange to drive the row from outside, for
            example to close other rows when one opens. color picks the fill
            of each action.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [open, setOpen] = useState(null);

<Button size="xs" variant="outline" onClick={() => setOpen("left")}>Open left</Button>
<Button size="xs" variant="outline" onClick={() => setOpen("right")}>Open right</Button>
<Button size="xs" variant="ghost" onClick={() => setOpen(null)}>Close</Button>

<SwipeActions
  open={open}
  onOpenChange={setOpen}
  left={[{ label: "Pin", icon: <Pin />, color: "warning" }]}
  right={[
    { label: "Snooze", icon: <Bell /> },
    { label: "Flag", icon: <Flag />, color: "success" },
  ]}
>
  <div className="px-4 py-3">
    <p className="text-sm font-medium text-foreground">Deploy to production</p>
    <p className="text-xs text-muted-foreground">Scheduled for Friday, 16:00 UTC</p>
  </div>
</SwipeActions>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledRow />
              </div>
            }
          />
        </section>

        {/* Example: Disabled */}
        <section aria-labelledby="SwipeActions-example-2">
          <h2
            id="SwipeActions-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Disabled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            disabled turns off swiping and removes the actions, for rows the
            user cannot change.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<SwipeActions disabled right={[{ label: "Delete", destructive: true }]}>
  <div className="px-4 py-3">
    <p className="text-sm font-medium text-foreground">Workspace owner</p>
    <p className="text-xs text-muted-foreground">Transfer ownership before removing.</p>
  </div>
</SwipeActions>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <SwipeActions
                  className="w-full max-w-md"
                  disabled
                  right={[{ label: "Delete", destructive: true }]}
                >
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      Workspace owner
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Transfer ownership before removing.
                    </p>
                  </div>
                </SwipeActions>
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="SwipeActions-props">
          <h2
            id="SwipeActions-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the SwipeActions component.
          </p>
          <PropsTable rows={swipeActionsProps} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">
            SwipeAction
          </h3>
          <PropsTable rows={actionProps} />
        </section>

        {/* Accessibility */}
        <section aria-labelledby="SwipeActions-a11y">
          <h2
            id="SwipeActions-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Actions are Neuctra Buttons in the tab order. Focusing one opens
              its rail, so keyboard users never need to swipe. Closed rails are
              transparent and ignore pointer input.
            </li>
            <li>
              Escape, a click outside, or moving focus out of the row closes
              it.
            </li>
            <li>
              A swipe only starts after 8px of mostly horizontal movement, so
              taps on links and buttons inside the row still work and
              vertical scrolling is never blocked.
            </li>
            <li>
              The snap animation is disabled when the user prefers reduced
              motion.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={swipeActionsFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default SwipeActionsDocs;
