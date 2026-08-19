"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { TagInput } from "@neuctra/ui";

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

const TagInputDocs = () => (
  <ComponentDocPage
    name="TagInput"
    title="TagInput Component — React Tags Field | Neuctra UI"
    description="React tag input with Enter/comma commit, Backspace removal, duplicate filtering, max-tag limits, validation hook and error states — built with Tailwind CSS."
    keywords="react tag input, tags field component, multi value input react, keywords input ui, tailwind tag input, neuctra ui tag input"
    importCode={`import { TagInput } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "Enter or comma commits a tag; Backspace on an empty field removes the last one.",
        code: `const [tags, setTags] = useState(["react", "tailwind"]);

<TagInput
  label="Technologies"
  value={tags}
  onChange={setTags}
  placeholder="Type and press Enter…"
  maxTags={6}
/>`,
        preview: <ControlledDemo />,
      },
      {
        title: "Validation",
        description: "Reject entries before they are added with validate.",
        code: `<TagInput
  label="Emails"
  placeholder="name@company.com"
  validate={(tag) => /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(tag)}
  helperText="Only valid email addresses are accepted"
/>`,
        preview: (
          <div className="w-full max-w-sm">
            <TagInput
              label="Emails"
              placeholder="name@company.com"
              validate={(tag) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(tag)}
              helperText="Only valid email addresses are accepted"
            />
          </div>
        ),
      },
      {
        title: "Sizes & Error",
        code: `<TagInput size="sm" defaultValue={["compact"]} />
<TagInput size="lg" defaultValue={["spacious"]} />
<TagInput defaultValue={["oops"]} error="At least 3 tags are required" />`,
        preview: (
          <div className="flex w-full max-w-sm flex-col gap-4">
            <TagInput size="sm" defaultValue={["compact"]} />
            <TagInput size="lg" defaultValue={["spacious"]} />
            <TagInput defaultValue={["oops"]} error="At least 3 tags are required" />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "value / defaultValue", type: "string[]", default: "[]", description: "Controlled / uncontrolled tag list" },
      { prop: "onChange", type: "(tags: string[]) => void", default: "—", description: "Fired with the full next list" },
      { prop: "label", type: "string", default: "—", description: "Label above the field" },
      { prop: "placeholder", type: "string", default: '"Add a tag…"', description: "Inline input placeholder" },
      { prop: "maxTags", type: "number", default: "—", description: "Hard limit; shows a live counter" },
      { prop: "validate", type: "(tag: string) => boolean", default: "—", description: "Return false to reject a tag" },
      { prop: "addOnBlur", type: "boolean", default: "true", description: "Commit the pending text on blur" },
      { prop: "error / helperText", type: "string", default: "—", description: "Feedback line under the field" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Field and chip scale" },
      { prop: "disabled", type: "boolean", default: "false", description: "Lock the field" },
      { prop: "labelClassName", type: "string", default: "—", description: "Styles the field label." },
      { prop: "chipClassName", type: "string", default: "—", description: "Styles each tag chip wrapper." },
      { prop: "chipRemoveClassName", type: "string", default: "—", description: "Styles the remove (\"x\") button inside a chip." },
      { prop: "inputClassName", type: "string", default: "—", description: "Styles the inline text input." },
      { prop: "helperClassName", type: "string", default: "—", description: "Styles the helper text / error message." },
      { prop: "countClassName", type: "string", default: "—", description: "Styles the tag count indicator (e.g. \"2/5\")." },
    ]}
    a11y={[
      'Every chip\'s remove button has an explicit aria-label ("Remove {tag}").',
      "The whole surface is click-to-focus; focus-within paints the ring on the container.",
      "Errors are announced via role=alert and linked with aria-describedby.",
    ]}
  />
);

export default TagInputDocs;
