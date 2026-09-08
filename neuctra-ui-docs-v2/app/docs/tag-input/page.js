"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { TagInput } from "@neuctra/ui";
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
const tagInputFaq = buildComponentFaq("TagInput", {
  sizes: ["sm", "md", "lg"],
});

const ControlledDemo = () => {
  const [tags, setTags] = useState(["react", "tailwind"]);
  return (
    <div className="w-full max-w-sm">
      <TagInput
        label="Technologies"
        value={tags}
        onChange={setTags}
        placeholder="Type and press Enter…"
        maxTags={6}
      />
    </div>
  );
};

const TagInputDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            TagInput Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React tag input with Enter/comma commit, Backspace removal,
            duplicate filtering, max-tag limits, validation hook and error
            states — built with Tailwind CSS.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="TagInput-import">
          <h2
            id="TagInput-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { TagInput } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="TagInput-example-0">
          <h2
            id="TagInput-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Enter or comma commits a tag; Backspace on an empty field removes
            the last one.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [tags, setTags] = useState(["react", "tailwind"]);

<TagInput
  label="Technologies"
  value={tags}
  onChange={setTags}
  placeholder="Type and press Enter…"
  maxTags={6}
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        {/* Example: Validation */}
        <section aria-labelledby="TagInput-example-1">
          <h2
            id="TagInput-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Validation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Reject entries before they are added with validate.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<TagInput
  label="Emails"
  placeholder="name@company.com"
  validate={(tag) => /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(tag)}
  helperText="Only valid email addresses are accepted"
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <TagInput
                    label="Emails"
                    placeholder="name@company.com"
                    validate={(tag) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(tag)}
                    helperText="Only valid email addresses are accepted"
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Sizes & Error */}
        <section aria-labelledby="TagInput-example-2">
          <h2
            id="TagInput-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes & Error
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<TagInput size="sm" defaultValue={["compact"]} />
<TagInput size="lg" defaultValue={["spacious"]} />
<TagInput defaultValue={["oops"]} error="At least 3 tags are required" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex w-full max-w-sm flex-col gap-4">
                  <TagInput size="sm" defaultValue={["compact"]} />
                  <TagInput size="lg" defaultValue={["spacious"]} />
                  <TagInput
                    defaultValue={["oops"]}
                    error="At least 3 tags are required"
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="TagInput-props">
          <h2
            id="TagInput-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the TagInput component.
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
                    value / defaultValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">[]</td>
                  <td className="p-3">Controlled / uncontrolled tag list</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (tags: string[]) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired with the full next list</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    label
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Label above the field</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    placeholder
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    "Add a tag…"
                  </td>
                  <td className="p-3">Inline input placeholder</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    maxTags
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Hard limit; shows a live counter</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    validate
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (tag: string) =&gt; boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Return false to reject a tag</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    addOnBlur
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    true
                  </td>
                  <td className="p-3">Commit the pending text on blur</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    error / helperText
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Feedback line under the field</td>
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
                  <td className="p-3">Field and chip scale</td>
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
                  <td className="p-3">Lock the field</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    labelClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the field label.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    chipClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each tag chip wrapper.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    chipRemoveClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the remove ("x") button inside a chip.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    inputClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the inline text input.</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    helperClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the helper text / error message.
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    countClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">
                    Styles the tag count indicator (e.g. "2/5").
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="TagInput-a11y">
          <h2
            id="TagInput-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              {'Every chip\'s remove button has an explicit aria-label ("Remove {tag}").'}
            </li>
            <li>
              The whole surface is click-to-focus; focus-within paints the
              ring on the container.
            </li>
            <li>
              Errors are announced via role=alert and linked with
              aria-describedby.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={tagInputFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default TagInputDocs;
