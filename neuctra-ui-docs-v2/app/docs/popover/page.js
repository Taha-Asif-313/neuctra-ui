"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Popover, Button, Divider } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const popoverFaq = buildComponentFaq("Popover");

const PopoverDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Popover Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React popover component with rich content, twelve placement
            combinations, outside-click and Escape dismissal, controlled
            and uncontrolled modes.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Popover-import">
          <h2
            id="Popover-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Popover } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Popover-example-0">
          <h2
            id="Popover-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Click the trigger to toggle. Clicking outside or pressing
            Escape closes it.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Popover trigger={<Button size="sm">Open popover</Button>}>
  <p className="font-medium text-foreground mb-1">Team plan</p>
  <p className="text-muted-foreground text-xs">
    Unlimited projects, priority support and SSO.
  </p>
</Popover>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Popover trigger={<Button size="sm">Open popover</Button>}>
                  <p className="mb-1 font-medium text-foreground">
                    Team plan
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Unlimited projects, priority support and SSO.
                  </p>
                </Popover>
              </div>
            }
          />
        </section>

        {/* Example: Placement */}
        <section aria-labelledby="Popover-example-1">
          <h2
            id="Popover-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Placement
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            position sets the side; align sets the edge alignment on that
            side.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Popover position="right" align="start" trigger={<Button size="xs" variant="outline">Right</Button>}>
  Right / start
</Popover>
<Popover position="top" align="center" trigger={<Button size="xs" variant="outline">Top</Button>}>
  Top / center
</Popover>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Popover
                  position="right"
                  align="start"
                  trigger={
                    <Button size="xs" variant="outline">
                      Right
                    </Button>
                  }
                >
                  Right / start
                </Popover>
                <Popover
                  position="top"
                  align="center"
                  trigger={
                    <Button size="xs" variant="outline">
                      Top
                    </Button>
                  }
                >
                  Top / center
                </Popover>
              </div>
            }
          />
        </section>

        {/* Example: Rich Content */}
        <section aria-labelledby="Popover-example-2">
          <h2
            id="Popover-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Rich Content
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Popover
  trigger={<Button size="sm" variant="outline">Share</Button>}
  contentClassName="w-64"
>
  <p className="font-medium text-foreground">Share this page</p>
  <Divider spacing="sm" />
  <div className="flex gap-2">
    <Button size="xs" fullWidth>Copy link</Button>
    <Button size="xs" variant="outline" fullWidth>Email</Button>
  </div>
</Popover>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Popover
                  trigger={
                    <Button size="sm" variant="outline">
                      Share
                    </Button>
                  }
                  contentClassName="w-64"
                >
                  <p className="font-medium text-foreground">
                    Share this page
                  </p>
                  <Divider spacing="sm" />
                  <div className="flex gap-2">
                    <Button size="xs" fullWidth>
                      Copy link
                    </Button>
                    <Button size="xs" variant="outline" fullWidth>
                      Email
                    </Button>
                  </div>
                </Popover>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Popover-props">
          <h2
            id="Popover-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Popover component.
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
                    trigger
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Element that toggles the popover (required)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Panel content (required)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    position
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "top" | "bottom" | "left" | "right"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "bottom"
                  </td>
                  <td className="p-3">Side of the trigger</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    align
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "start" | "center" | "end"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "center"
                  </td>
                  <td className="p-3">Alignment along that side</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    open / defaultOpen
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Controlled / uncontrolled open state
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onOpenChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (open: boolean) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired on every open/close</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeOnClickOutside
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    true
                  </td>
                  <td className="p-3">Dismiss when clicking outside</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeOnEscape
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    true
                  </td>
                  <td className="p-3">Dismiss with the Escape key</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Disable the trigger</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    triggerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the wrapper around the trigger element.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Popover-a11y">
          <h2
            id="Popover-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The trigger exposes aria-haspopup="dialog", aria-expanded and
              aria-controls.
            </li>
            <li>Enter and Space toggle the popover from the keyboard.</li>
            <li>
              Document listeners attach only while open, and never go
              stale on onOpenChange.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={popoverFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default PopoverDocs;
