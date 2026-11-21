"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import {
  ColorPicker,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const colorPickerFaq = buildComponentFaq("ColorPicker");

const brandSwatches = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#111827"];

function ControlledDemo() {
  const [color, setColor] = useState("#0ea5e9");
  return (
    <div className="flex w-full flex-wrap items-start gap-6">
      <ColorPicker
        label="Accent color"
        value={color}
        onChange={setColor}
        swatches={brandSwatches}
      />
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Current value</p>
        <p className="font-mono text-sm text-foreground">{color}</p>
        <Button size="sm" variant="outline" onClick={() => setColor("#6366f1")}>
          Reset to default
        </Button>
      </div>
    </div>
  );
}

function BrandingDemo() {
  const [brand, setBrand] = useState("#6366f1");
  return (
    <Card className="w-full max-w-xl">
      <CardHeader
        title="Workspace branding"
        description="Used for buttons, links and the sidebar highlight."
      />
      <CardBody className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-4">
          <Input label="Workspace name" defaultValue="Acme Studio" />
          <div className="space-y-1.5">
            <p className="text-[13px] font-medium leading-none text-foreground">
              Preview
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-border p-3">
              <span
                aria-hidden="true"
                className="h-6 w-6 rounded-md"
                style={{ backgroundColor: brand }}
              />
              <span className="text-sm text-foreground">Acme Studio</span>
            </div>
          </div>
        </div>
        <ColorPicker
          label="Brand color"
          value={brand}
          onChange={setBrand}
          swatches={brandSwatches}
          formats={["hex"]}
          showChannels={false}
          helperText="Pick a swatch or paste a hex code."
        />
      </CardBody>
    </Card>
  );
}

const colorPickerProps = [
  ["value", "string", "-", "Controlled color string (hex or rgb)."],
  ["defaultValue", "string", '"#000000"', "Initial color when uncontrolled."],
  ["onChange", "(value: string) => void", "-", "Called with the newly committed color string."],
  ["formats", '("hex" | "rgb")[]', '["hex", "rgb"]', "Formats exposed by the toggle. Switching format re-emits the value in that format."],
  ["alpha", "boolean", "false", "Enables an alpha slider and RGBA / 8-digit HEX output."],
  ["swatches", "string[]", "[]", "Preset color strings shown as clickable swatches."],
  ["label", "string", "-", "Label rendered above the panel."],
  ["helperText", "string", "-", "Helper text rendered below the panel."],
  ["error", "string", "-", "Error message rendered below the panel."],
  ["disabled", "boolean", "false", "Disables every control in the picker."],
  ["showChannels", "boolean", "true", "Shows the R, G and B channel inputs."],
  ["ariaLabel", "string", '"Color value"', "Accessible label for the text field when no label is set."],
  ["className", "string", "-", "Additional classes for the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["labelClassName", "string", "-", "Additional classes for the label."],
  ["panelClassName", "string", "-", "Additional classes for the bordered panel."],
  ["previewClassName", "string", "-", "Additional classes for the preview swatch."],
  ["inputClassName", "string", "-", "Additional classes for the hex and channel fields (the inner Input elements)."],
  ["swatchClassName", "string", "-", "Additional classes for each preset swatch."],
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

const ColorPickerDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ColorPicker Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dependency-free color picker with HEX and RGB text entry, the
            native color dialog behind the preview swatch, per-channel inputs,
            an optional alpha slider and preset swatches.
          </p>
        </header>

        <section aria-labelledby="ColorPicker-import">
          <h2 id="ColorPicker-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { ColorPicker } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="ColorPicker-example-0">
          <h2 id="ColorPicker-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Type a color and press Enter or blur to commit it, or click the
            preview swatch to open the system color dialog.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ColorPicker label="Label color" defaultValue="#10b981" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ColorPicker label="Label color" defaultValue="#10b981" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ColorPicker-example-1">
          <h2 id="ColorPicker-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Alpha Channel
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Set alpha to add an opacity slider. Translucent colors are shown
            over a checkerboard and emitted as rgba or 8-digit hex.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ColorPicker
  label="Overlay tint"
  alpha
  defaultValue="rgba(99, 102, 241, 0.4)"
  helperText="Applied on top of the cover image."
/>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ColorPicker
                  label="Overlay tint"
                  alpha
                  defaultValue="rgba(99, 102, 241, 0.4)"
                  helperText="Applied on top of the cover image."
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ColorPicker-example-2">
          <h2 id="ColorPicker-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled with Swatches
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass value and onChange to own the color. Swatches show which one
            matches the current value.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [color, setColor] = useState("#0ea5e9");

<ColorPicker
  label="Accent color"
  value={color}
  onChange={setColor}
  swatches={["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#111827"]}
/>
<p className="font-mono text-sm text-foreground">{color}</p>
<Button size="sm" variant="outline" onClick={() => setColor("#6366f1")}>
  Reset to default
</Button>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ColorPicker-example-3">
          <h2 id="ColorPicker-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Invalid text input shows an inline error until a valid color is
            entered. Disabled pickers dim and ignore input.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ColorPicker label="Status color" defaultValue="#ef4444" error="This color fails contrast on white." />
<ColorPicker label="System color" defaultValue="#111827" disabled helperText="Managed by your organization." />`}
            previewContent={
              <div className="flex w-full flex-wrap items-start gap-4 py-4">
                <ColorPicker
                  label="Status color"
                  defaultValue="#ef4444"
                  error="This color fails contrast on white."
                />
                <ColorPicker
                  label="System color"
                  defaultValue="#111827"
                  disabled
                  helperText="Managed by your organization."
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ColorPicker-example-4">
          <h2 id="ColorPicker-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Workspace Branding
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A compact hex-only picker without channel inputs, driving a live
            preview in a settings card.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [brand, setBrand] = useState("#6366f1");

<Card className="w-full max-w-xl">
  <CardHeader
    title="Workspace branding"
    description="Used for buttons, links and the sidebar highlight."
  />
  <CardBody className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-4">
      <Input label="Workspace name" defaultValue="Acme Studio" />
      <div className="flex items-center gap-2 rounded-lg border border-border p-3">
        <span className="h-6 w-6 rounded-md" style={{ backgroundColor: brand }} />
        <span className="text-sm text-foreground">Acme Studio</span>
      </div>
    </div>
    <ColorPicker
      label="Brand color"
      value={brand}
      onChange={setBrand}
      swatches={brandSwatches}
      formats={["hex"]}
      showChannels={false}
      helperText="Pick a swatch or paste a hex code."
    />
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <BrandingDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ColorPicker-props">
          <h2 id="ColorPicker-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the ColorPicker component.
          </p>
          <PropsTable rows={colorPickerProps} />
        </section>

        <section aria-labelledby="ColorPicker-a11y">
          <h2 id="ColorPicker-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The panel is a labelled group; the text field is linked to the
              label and to the helper or error text with aria-describedby.
            </li>
            <li>
              Invalid input sets aria-invalid and announces the error with
              role="alert". Escape reverts the draft to the last valid color.
            </li>
            <li>
              The preview swatch is a real color input labelled "Open color
              dialog", so it is reachable with Tab and shows a focus ring.
            </li>
            <li>
              Format buttons and swatches expose aria-pressed; channel inputs
              are labelled Red, Green and Blue channel; the alpha control is a
              native range input.
            </li>
          </ul>
        </section>

        <ComponentFaq qa={colorPickerFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ColorPickerDocs;
