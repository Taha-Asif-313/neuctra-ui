"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { AvatarGroup, Avatar } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const avatarGroupFaq = buildComponentFaq("AvatarGroup", {
  sizes: ["sm", "md", "lg"],
});

const people = [
  "https://i.pravatar.cc/80?img=1",
  "https://i.pravatar.cc/80?img=2",
  "https://i.pravatar.cc/80?img=3",
  "https://i.pravatar.cc/80?img=4",
  "https://i.pravatar.cc/80?img=5",
];

const AvatarGroupDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            AvatarGroup Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React avatar group with overlapping stack, background rings and
            an automatic +N overflow counter — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="AvatarGroup-import">
          <h2
            id="AvatarGroup-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { AvatarGroup, Avatar } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="AvatarGroup-example-0">
          <h2
            id="AvatarGroup-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Wrap any avatars; max collapses the rest into a +N counter.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<AvatarGroup max={3}>
  <Avatar src="/u1.jpg" alt="Ana Silva" size="md" />
  <Avatar src="/u2.jpg" alt="Ben Cole" size="md" />
  <Avatar src="/u3.jpg" alt="Cara Diaz" size="md" />
  <Avatar src="/u4.jpg" alt="Dev Patel" size="md" />
  <Avatar src="/u5.jpg" alt="Eve Wong" size="md" />
</AvatarGroup>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <AvatarGroup max={3}>
                  {people.map((src, i) => (
                    <Avatar
                      key={i}
                      src={src}
                      alt={`Team member ${i + 1}`}
                      size="md"
                    />
                  ))}
                </AvatarGroup>
              </div>
            }
          />
        </section>

        {/* Spacing */}
        <section aria-labelledby="AvatarGroup-example-1">
          <h2
            id="AvatarGroup-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Spacing
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<AvatarGroup spacing="tight" max={4}>…</AvatarGroup>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <AvatarGroup spacing="tight" max={4}>
                  {people.map((src, i) => (
                    <Avatar
                      key={i}
                      src={src}
                      alt={`Team member ${i + 1}`}
                      size="sm"
                    />
                  ))}
                </AvatarGroup>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="AvatarGroup-props">
          <h2
            id="AvatarGroup-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the AvatarGroup component.
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
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Avatar elements (required)</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    max
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Visible limit; the rest becomes “+N”
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
                  <td className="p-3">
                    Size of the overflow counter (match your avatars)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    spacing
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "tight" | "normal"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "normal"
                  </td>
                  <td className="p-3">Overlap amount</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    itemClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the wrapper span around each visible avatar item.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    counterClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the "+N" overflow counter.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="AvatarGroup-a11y">
          <h2
            id="AvatarGroup-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Each avatar keeps its own alt text; the overflow counter is
              labelled “N more”.
            </li>
            <li>
              Rings use the background token, so the stack works in both
              themes.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={avatarGroupFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default AvatarGroupDocs;
