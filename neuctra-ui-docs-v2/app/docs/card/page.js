"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { Settings, Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const cardFaq = buildComponentFaq("Card", {
  variants: ["default", "outline", "elevated", "ghost"],
});

const CardDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Card Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Composable React card component with header, body and footer
            sections. Supports outline, elevated and ghost variants, hover
            states and padding scales — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Card-import">
          <h2
            id="Card-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock
            code={`import { Card, CardHeader, CardBody, CardFooter } from "@neuctra/ui";`}
          />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="Card-example-0">
          <h2
            id="Card-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Compose a card from CardHeader, CardBody and CardFooter. Sections
            inherit the card's padding scale automatically.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card className="max-w-sm">
  <CardHeader
    title="Project Settings"
    description="Manage your project configuration"
    icon={<Settings />}
  />
  <CardBody>
    <p className="text-sm">Cards group related content and actions.</p>
  </CardBody>
  <CardFooter>
    <Button size="sm" variant="outline">Cancel</Button>
    <Button size="sm">Save</Button>
  </CardFooter>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Card className="max-w-sm">
                  <CardHeader
                    title="Project Settings"
                    description="Manage your project configuration"
                    icon={<Settings />}
                  />
                  <CardBody>
                    <p className="text-sm">
                      Cards group related content and actions.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                    <Button size="sm">Save</Button>
                  </CardFooter>
                </Card>
              </div>
            }
          />
        </section>

        {/* Variants */}
        <section aria-labelledby="Card-example-1">
          <h2
            id="Card-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Variants
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Four surface styles: default, outline, elevated and ghost.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card variant="default"><CardBody>Default</CardBody></Card>
<Card variant="outline"><CardBody>Outline</CardBody></Card>
<Card variant="elevated"><CardBody>Elevated</CardBody></Card>
<Card variant="ghost"><CardBody>Ghost</CardBody></Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Card variant="default" className="w-36">
                  <CardBody>Default</CardBody>
                </Card>
                <Card variant="outline" className="w-36">
                  <CardBody>Outline</CardBody>
                </Card>
                <Card variant="elevated" className="w-36">
                  <CardBody>Elevated</CardBody>
                </Card>
                <Card variant="ghost" className="w-36">
                  <CardBody>Ghost</CardBody>
                </Card>
              </div>
            }
          />
        </section>

        {/* Hoverable */}
        <section aria-labelledby="Card-example-2">
          <h2
            id="Card-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Hoverable
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Add hoverable for a lift effect on interactive cards.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card hoverable className="max-w-xs">
  <CardBody>Hover me</CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Card hoverable className="max-w-xs">
                  <CardBody>Hover me</CardBody>
                </Card>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Card-props">
          <h2
            id="Card-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Card component.
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
                    variant
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "default" | "outline" | "elevated" | "ghost"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "default"
                  </td>
                  <td className="p-3">Visual style of the card surface</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    padding
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "none" | "sm" | "md" | "lg"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "md"
                  </td>
                  <td className="p-3">
                    Padding scale inherited by all card sections
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    hoverable
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">
                    Lift the card with a shadow on hover
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.title
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Header heading content</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.description
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Muted line under the title</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.icon
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Leading icon slot</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.action
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Right-aligned action slot (menu, button…)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.iconClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the leading icon wrapper.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.titleClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the title heading.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.descriptionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the description text.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    CardHeader.actionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the right-aligned action wrapper.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className / style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string / CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Available on Card and every section; native div props are
                    forwarded
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Card-a11y">
          <h2
            id="Card-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Card renders a plain region — headings inside CardHeader use a
              semantic &lt;h3&gt;.
            </li>
            <li>
              All sections forward refs and native attributes (id, aria-*,
              data-*).
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={cardFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default CardDocs;
