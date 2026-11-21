"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import {
  Accessibility,
  CreditCard,
  GitPullRequest,
  Inbox,
} from "lucide-react";
import { NotificationCenter, Button, Badge } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const notificationCenterFaq = buildComponentFaq("NotificationCenter");

const initialItems = [
  {
    id: "n1",
    title: "Maya Chen mentioned you",
    description: "Can you review the onboarding copy before Friday's release?",
    timestamp: "2m",
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    avatarName: "Maya Chen",
    group: "Today",
  },
  {
    id: "n2",
    title: "PR #482 was approved",
    description: "feat: add usage-based billing to the Team plan",
    timestamp: "1h",
    icon: <GitPullRequest />,
    group: "Today",
  },
  {
    id: "n3",
    title: "Invoice INV-2041 paid",
    description: "$1,240.00 from Northwind Traders",
    timestamp: "Mon",
    icon: <CreditCard />,
    read: true,
    group: "Earlier",
  },
  {
    id: "n4",
    title: "Jordan joined Acme Workspace",
    timestamp: "Sun",
    avatarName: "Jordan Lee",
    read: true,
    group: "Earlier",
  },
];

function InboxDemo() {
  const [items, setItems] = useState(initialItems);
  return (
    <NotificationCenter
      items={items}
      groups={["Today", "Earlier"]}
      onMarkRead={(id) =>
        setItems((current) => current.map((n) => (n.id === id ? { ...n, read: true } : n)))
      }
      onMarkAllRead={() => setItems((current) => current.map((n) => ({ ...n, read: true })))}
      footer={
        <Button variant="ghost" size="sm" fullWidth>
          View all notifications
        </Button>
      }
    />
  );
}

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <NotificationCenter
        open={open}
        onOpenChange={setOpen}
        closeOnSelect
        items={initialItems.slice(0, 2)}
      />
      <span className="text-sm text-muted-foreground">Panel is {open ? "open" : "closed"}</span>
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

const centerProps = [
  ["items", "NotificationItemData[]", "-", "Notifications in display order (required)."],
  ["trigger", "ReactNode", "-", "Custom trigger content. Must not be a button: the wrapper is already one."],
  ["unreadCount", "number", "-", "Overrides the computed unread count."],
  ["onMarkRead", "(id: string) => void", "-", "Fired when a notification is activated."],
  ["onMarkAllRead", "() => void", "-", 'Shows the "Mark all read" action when set.'],
  ["groups", "string[]", "-", "Group order. Unlisted groups follow; ungrouped items render first."],
  ["title", "ReactNode", '"Notifications"', "Panel heading."],
  ["emptyState", "ReactNode", "-", "Content shown when items is empty."],
  ["footer", "ReactNode", "-", 'Panel footer, e.g. a "View all" button.'],
  ["open", "boolean", "-", "Controlled open state."],
  ["defaultOpen", "boolean", "false", "Initial open state in uncontrolled mode."],
  ["onOpenChange", "(open: boolean) => void", "-", "Fired when the panel opens or closes."],
  ["closeOnSelect", "boolean", "false", "Closes the panel after a notification is activated."],
  ["align", '"start" | "center" | "end"', '"end"', "Panel alignment relative to the trigger."],
  ["className", "string", "-", "Styles the root wrapper."],
  ["style", "CSSProperties", "-", "Inline styles for the root wrapper."],
  ["triggerClassName", "string", "-", "Styles the focusable trigger wrapper."],
  ["panelClassName", "string", "-", "Styles the floating panel."],
  ["itemClassName", "string", "-", "Styles every notification row."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Other div attributes (except title), forwarded to the root."],
];

const itemProps = [
  ["id", "string", "-", "Stable id passed to onMarkRead (required)."],
  ["title", "ReactNode", "-", "Primary text (required)."],
  ["description", "ReactNode", "-", "Secondary text, clamped to two lines."],
  ["timestamp", "ReactNode", "-", "Relative or absolute time."],
  ["read", "boolean", "-", "Read rows lose the bold title, tint and unread dot."],
  ["icon", "ReactNode", "-", "Leading icon."],
  ["avatarSrc", "string", "-", "Image URL for a leading Avatar (takes precedence over icon)."],
  ["avatarName", "string", "-", "Person's name, used for the Avatar initials when there is no image."],
  ["onClick", "() => void", "-", "Fired when the row is activated."],
  ["group", "string", "-", "Group heading the item belongs to."],
];

const NotificationCenterDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            NotificationCenter Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A bell button with an unread badge that opens a grouped inbox
            panel. Supports mark-read callbacks, custom triggers, footers,
            empty states and keyboard navigation between rows.
          </p>
        </header>

        <section aria-labelledby="NotificationCenter-import">
          <h2 id="NotificationCenter-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { NotificationCenter } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="NotificationCenter-example-0">
          <h2 id="NotificationCenter-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Product Inbox
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            An app header with the inbox on the right. Keep read state in your
            store and update it from onMarkRead and onMarkAllRead. The unread
            Badge counts automatically, and rows with avatarSrc or avatarName
            show the person behind the notification.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [items, setItems] = useState([
  { id: "n1", title: "Maya Chen mentioned you", description: "Can you review the onboarding copy before Friday's release?", timestamp: "2m", avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", avatarName: "Maya Chen", group: "Today" },
  { id: "n2", title: "PR #482 was approved", description: "feat: add usage-based billing to the Team plan", timestamp: "1h", icon: <GitPullRequest />, group: "Today" },
  { id: "n3", title: "Invoice INV-2041 paid", description: "$1,240.00 from Northwind Traders", timestamp: "Mon", icon: <CreditCard />, read: true, group: "Earlier" },
  { id: "n4", title: "Jordan joined Acme Workspace", timestamp: "Sun", avatarName: "Jordan Lee", read: true, group: "Earlier" },
]);

<header className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
  <span className="truncate text-sm font-semibold text-foreground">Acme Workspace</span>
  <NotificationCenter
    items={items}
    groups={["Today", "Earlier"]}
    onMarkRead={(id) =>
      setItems((current) => current.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }
    onMarkAllRead={() => setItems((current) => current.map((n) => ({ ...n, read: true })))}
    footer={<Button variant="ghost" size="sm" fullWidth>View all notifications</Button>}
  />
</header>`}
            previewContent={
              <div className="w-full py-4">
                <header className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
                  <span className="truncate text-sm font-semibold text-foreground">Acme Workspace</span>
                  <InboxDemo />
                </header>
              </div>
            }
          />
        </section>

        <section aria-labelledby="NotificationCenter-example-1">
          <h2 id="NotificationCenter-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Empty State
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            With no items the panel shows an "all caught up" message, or your
            own emptyState.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<NotificationCenter items={[]} align="start" />
<NotificationCenter
  items={[]}
  title="Inbox"
  align="start"
  emptyState={
    <div className="px-3 py-8 text-center">
      <p className="text-sm font-medium text-foreground">No new activity</p>
      <p className="text-xs text-muted-foreground">Mentions and approvals show up here.</p>
    </div>
  }
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <NotificationCenter items={[]} align="start" />
                <NotificationCenter
                  items={[]}
                  title="Inbox"
                  align="start"
                  emptyState={
                    <div className="px-3 py-8 text-center">
                      <p className="text-sm font-medium text-foreground">No new activity</p>
                      <p className="text-xs text-muted-foreground">Mentions and approvals show up here.</p>
                    </div>
                  }
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="NotificationCenter-example-2">
          <h2 id="NotificationCenter-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Custom Trigger
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            trigger replaces the bell. Pass non-interactive content (a span),
            since the wrapper is already the focusable button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<NotificationCenter
  items={items}
  align="start"
  trigger={
    <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-accent">
      <Inbox className="h-4 w-4" aria-hidden="true" />
      Inbox
      <Badge text="2" size="sm" />
    </span>
  }
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <NotificationCenter
                  items={initialItems}
                  align="start"
                  trigger={
                    <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-accent">
                      <Inbox className="h-4 w-4" aria-hidden="true" />
                      Inbox
                      <Badge text="2" size="sm" />
                    </span>
                  }
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="NotificationCenter-example-3">
          <h2 id="NotificationCenter-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Own the open state, and close the panel when a row is picked with
            closeOnSelect.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [open, setOpen] = useState(false);

<div className="flex items-center gap-3">
  <NotificationCenter open={open} onOpenChange={setOpen} closeOnSelect items={items.slice(0, 2)} />
  <span className="text-sm text-muted-foreground">Panel is {open ? "open" : "closed"}</span>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="NotificationCenter-props">
          <h2 id="NotificationCenter-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the NotificationCenter component.</p>
          <PropsTable rows={centerProps} />
        </section>

        <section aria-labelledby="NotificationItemData-props">
          <h2 id="NotificationItemData-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            NotificationItemData
          </h2>
          <p className="text-sm text-gray-400 mb-4">Shape of each entry in items.</p>
          <PropsTable rows={itemProps} />
        </section>

        <section aria-labelledby="NotificationCenter-a11y">
          <h2 id="NotificationCenter-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The trigger is a single focusable button with aria-haspopup,
              aria-expanded and a name such as "Notifications, 2 unread".
            </li>
            <li>Opening moves focus to the first notification; Arrow Up / Down, Home and End move between rows.</li>
            <li>Escape or an outside click closes the panel and focus returns to the trigger.</li>
            <li>Each row is a native button that announces its read or unread state; groups are labelled role="group".</li>
            <li>Rows and actions have visible focus rings.</li>
          </ul>
        </section>

        <ComponentFaq qa={notificationCenterFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default NotificationCenterDocs;
