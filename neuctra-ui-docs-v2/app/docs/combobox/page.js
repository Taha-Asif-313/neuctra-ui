"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  Combobox,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const comboboxFaq = buildComponentFaq("Combobox", {
  sizes: ["xs", "sm", "md", "lg"],
});

const teammates = [
  { value: "maya", label: "Maya Chen", description: "Design lead" },
  { value: "omar", label: "Omar Farouk", description: "Frontend engineer" },
  { value: "lena", label: "Lena Fischer", description: "Product manager" },
  { value: "ravi", label: "Ravi Patel", description: "Backend engineer" },
  { value: "sofia", label: "Sofia Alves", description: "QA", disabled: true },
];

const issueLabels = [
  { value: "bug", label: "bug" },
  { value: "feature", label: "feature" },
  { value: "design", label: "design" },
  { value: "docs", label: "docs" },
  { value: "performance", label: "performance" },
];

const timezones = [
  { value: "America/New_York", label: "New York (UTC-5)", group: "Americas" },
  { value: "America/Sao_Paulo", label: "Sao Paulo (UTC-3)", group: "Americas" },
  { value: "Europe/London", label: "London (UTC+0)", group: "Europe" },
  { value: "Europe/Berlin", label: "Berlin (UTC+1)", group: "Europe" },
  { value: "Asia/Karachi", label: "Karachi (UTC+5)", group: "Asia" },
  { value: "Asia/Tokyo", label: "Tokyo (UTC+9)", group: "Asia" },
];

const repositories = [
  "neuctra/ui",
  "neuctra/authix",
  "neuctra/finance",
  "neuctra/docs",
  "neuctra/cli",
  "neuctra/website",
];

function searchRepositories(query) {
  const q = query.trim().toLowerCase();
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          repositories
            .filter((name) => name.includes(q))
            .map((name) => ({ value: name, label: name })),
        ),
      400,
    ),
  );
}

function LabelsDemo() {
  const [labels, setLabels] = useState(["bug"]);
  return (
    <div className="w-full max-w-sm space-y-2">
      <Combobox
        label="Labels"
        multiple
        creatable
        clearable
        options={issueLabels}
        value={labels}
        onChange={setLabels}
        placeholder="Add labels..."
        helperText="Type a new name and press Enter to create it."
      />
      <p className="text-xs text-muted-foreground">
        {labels.length} label{labels.length === 1 ? "" : "s"} applied
      </p>
    </div>
  );
}

function NewIssueDemo() {
  const [assignee, setAssignee] = useState("");
  return (
    <Card className="w-full max-w-md">
      <CardHeader
        title="New issue"
        description="Issues are visible to everyone in the workspace."
      />
      <CardBody className="space-y-4">
        <Input label="Title" placeholder="Checkout button overlaps footer" />
        <Combobox
          label="Assignee"
          options={teammates}
          value={assignee}
          onChange={setAssignee}
          placeholder="Search teammates..."
          clearable
        />
        <Combobox
          label="Labels"
          multiple
          options={issueLabels}
          defaultValue={["bug"]}
          placeholder="Add labels..."
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm" disabled={!assignee}>
            Create issue
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

const comboboxProps = [
  ["value", "string | string[]", "-", "Controlled value: a string, or an array in multiple mode."],
  ["defaultValue", "string | string[]", '"" or []', "Initial value in uncontrolled mode."],
  ["onChange", "(value: string | string[]) => void", "-", "Fired with the next value whenever the selection changes."],
  ["options", "ComboboxOption[]", "[]", "Static option list: { value, label, group?, description?, disabled? }."],
  ["loadOptions", "(query: string) => Promise<ComboboxOption[]>", "-", "Async loader, called while open whenever the query changes."],
  ["loadDebounce", "number", "250", "Delay in ms before loadOptions runs after typing."],
  ["multiple", "boolean", "false", "Allows more than one selected option, shown as chips."],
  ["creatable", "boolean", "false", "Shows a Create row for queries without an exact match."],
  ["onCreate", "(value: string) => void", "-", "Fired when a new value is created. onChange also receives it."],
  ["searchable", "boolean", "true", "Filters options by the typed query. When false the input is read only."],
  ["groupBy", "(option: ComboboxOption) => string", "-", "Groups options by the returned string. Falls back to option.group."],
  ["placeholder", "string", '"Search..."', "Placeholder shown in the input."],
  ["label", "string", "-", "Label rendered above the field."],
  ["helperText", "string", "-", "Helper text rendered below the field."],
  ["error", "string | boolean", "-", "Error state. A string is shown as the message."],
  ["success", "boolean", "false", "Applies success styling to the field."],
  ["required", "boolean", "false", "Marks the field as required and shows a * next to the label."],
  ["disabled", "boolean", "false", "Disables the field and prevents opening the list."],
  ["size", '"xs" | "sm" | "md" | "lg"', '"md"', "Field size. Matches Select and Input heights."],
  ["clearable", "boolean", "false", "Shows a clear button while something is selected."],
  ["name", "string", "-", "Name for hidden form inputs, one per selected value."],
  ["emptyMessage", "string", '"No options found"', "Text shown when no option matches."],
  ["loadingMessage", "string", '"Loading..."', "Text shown next to a Spinner while loadOptions is pending; also the spinner's screen reader label."],
  ["maxDropdownHeight", "string | number", "240", "Maximum height of the option list. Numbers are pixels."],
  ["className", "string", "-", "Additional classes for the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["labelClassName", "string", "-", "Additional classes for the label."],
  ["fieldClassName", "string", "-", "Additional classes for the bordered field."],
  ["fieldStyle", "CSSProperties", "-", "Inline styles for the bordered field."],
  ["inputClassName", "string", "-", "Additional classes for the text input."],
  ["dropdownClassName", "string", "-", "Additional classes for the floating option list."],
  ["dropdownStyle", "CSSProperties", "-", "Inline styles for the floating option list."],
  ["optionClassName", "string", "-", "Additional classes for each option row."],
  ["groupLabelClassName", "string", "-", "Additional classes for group headings."],
  ["chipClassName", "string", "-", "Additional classes for each chip in multiple mode."],
  ["emptyClassName", "string", "-", "Additional classes for the empty and loading messages."],
  ["helperClassName", "string", "-", "Additional classes for the helper/error text."],
];

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
          {rows.map(([prop, type, def, description]) => (
            <tr key={prop}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{prop}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ComboboxDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Combobox Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A searchable select that combines a text input with a filtered
            option list. It supports single and multiple selection, async
            results, grouped options and creating values on the fly, and it
            shares the label, helper text and size scale of Select and Input
            so it lines up in any form.
          </p>
        </header>

        <section aria-labelledby="Combobox-import">
          <h2 id="Combobox-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { Combobox } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="Combobox-example-0">
          <h2 id="Combobox-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Click or press Arrow Down to open, type to filter, and press Enter
            to pick. Options can carry a description and can be disabled.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const teammates = [
  { value: "maya", label: "Maya Chen", description: "Design lead" },
  { value: "omar", label: "Omar Farouk", description: "Frontend engineer" },
  { value: "lena", label: "Lena Fischer", description: "Product manager" },
  { value: "ravi", label: "Ravi Patel", description: "Backend engineer" },
  { value: "sofia", label: "Sofia Alves", description: "QA", disabled: true },
];

<Combobox
  label="Assignee"
  options={teammates}
  placeholder="Search teammates..."
  helperText="The assignee gets notified by email."
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <Combobox
                    label="Assignee"
                    options={teammates}
                    placeholder="Search teammates..."
                    helperText="The assignee gets notified by email."
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="Combobox-example-1">
          <h2 id="Combobox-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            The size scale matches Select and Input exactly, so mixed fields in
            one row share the same height.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Combobox size="xs" options={teammates} placeholder="Extra small" />
<Combobox size="sm" options={teammates} placeholder="Small" />
<Combobox size="md" options={teammates} placeholder="Medium" />
<Combobox size="lg" options={teammates} placeholder="Large" />`}
            previewContent={
              <div className="grid w-full max-w-sm gap-3 py-4">
                <Combobox size="xs" options={teammates} placeholder="Extra small" />
                <Combobox size="sm" options={teammates} placeholder="Small" />
                <Combobox size="md" options={teammates} placeholder="Medium" />
                <Combobox size="lg" options={teammates} placeholder="Large" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Combobox-example-2">
          <h2 id="Combobox-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Multiple and Creatable
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            In multiple mode selections render as removable chips inside the
            field. Backspace on an empty query removes the last chip. With
            creatable, unknown queries offer a Create row.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [labels, setLabels] = useState(["bug"]);

<Combobox
  label="Labels"
  multiple
  creatable
  clearable
  options={issueLabels}
  value={labels}
  onChange={setLabels}
  placeholder="Add labels..."
  helperText="Type a new name and press Enter to create it."
/>
<p className="text-xs text-muted-foreground">
  {labels.length} label{labels.length === 1 ? "" : "s"} applied
</p>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <LabelsDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Combobox-example-3">
          <h2 id="Combobox-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Grouped and Async Options
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Options with a group field are grouped automatically. Pass
            loadOptions to fetch results as the user types. Calls are
            debounced and stale responses are ignored.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Combobox
  label="Timezone"
  options={timezones}
  defaultValue="Europe/London"
  placeholder="Search timezones..."
/>

<Combobox
  label="Repository"
  loadOptions={(query) =>
    fetch(\`/api/repos?q=\${query}\`).then((res) => res.json())
  }
  placeholder="Search repositories..."
/>`}
            previewContent={
              <div className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-2">
                <Combobox
                  label="Timezone"
                  options={timezones}
                  defaultValue="Europe/London"
                  placeholder="Search timezones..."
                />
                <Combobox
                  label="Repository"
                  loadOptions={searchRepositories}
                  placeholder="Search repositories..."
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Combobox-example-4">
          <h2 id="Combobox-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Required, error and disabled states use the same tokens as every
            other Neuctra field.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Combobox label="Reviewer" required options={teammates} error="Pick a reviewer before merging." />
<Combobox label="Owner" options={teammates} defaultValue="lena" disabled helperText="Only admins can change the owner." />`}
            previewContent={
              <div className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-2">
                <Combobox
                  label="Reviewer"
                  required
                  options={teammates}
                  error="Pick a reviewer before merging."
                />
                <Combobox
                  label="Owner"
                  options={teammates}
                  defaultValue="lena"
                  disabled
                  helperText="Only admins can change the owner."
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Combobox-example-5">
          <h2 id="Combobox-example-5" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            In a Form
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A new issue form where Combobox sits next to Input with identical
            label, height and spacing.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [assignee, setAssignee] = useState("");

<Card className="w-full max-w-md">
  <CardHeader
    title="New issue"
    description="Issues are visible to everyone in the workspace."
  />
  <CardBody className="space-y-4">
    <Input label="Title" placeholder="Checkout button overlaps footer" />
    <Combobox
      label="Assignee"
      options={teammates}
      value={assignee}
      onChange={setAssignee}
      placeholder="Search teammates..."
      clearable
    />
    <Combobox
      label="Labels"
      multiple
      options={issueLabels}
      defaultValue={["bug"]}
      placeholder="Add labels..."
    />
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm" disabled={!assignee}>Create issue</Button>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <NewIssueDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Combobox-props">
          <h2 id="Combobox-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Combobox component. Other div
            attributes are forwarded to the root element.
          </p>
          <PropsTable rows={comboboxProps} />
        </section>

        <section aria-labelledby="Combobox-a11y">
          <h2 id="Combobox-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The input has role="combobox" with aria-expanded, aria-controls,
              aria-autocomplete="list" and aria-activedescendant pointing at
              the highlighted option.
            </li>
            <li>
              The list has role="listbox" (aria-multiselectable in multiple
              mode); options use role="option" with aria-selected and
              aria-disabled. Groups use role="group" with their name.
            </li>
            <li>
              Arrow Up and Down move through enabled options, Home and End
              jump to the ends, Enter selects, Escape closes, and Tab closes
              and moves on. Focus stays in the input the whole time.
            </li>
            <li>
              The label, helper and error text are linked with
              aria-labelledby and aria-describedby, and aria-invalid,
              aria-required and aria-busy reflect state.
            </li>
          </ul>
        </section>

        <ComponentFaq qa={comboboxFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ComboboxDocs;
