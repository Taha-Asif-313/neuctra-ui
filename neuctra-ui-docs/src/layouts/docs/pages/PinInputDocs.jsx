"use client";

import React, { useState } from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { PinInput } from "@neuctra/ui";

const OtpDemo = () => {
  const [done, setDone] = useState("");
  return (
    <div className="flex flex-col items-start gap-2">
      <PinInput length={6} onComplete={setDone} />
      <span className="text-xs text-gray-400">
        {done ? `Completed: ${done}` : "Fill all six boxes (paste works too)"}
      </span>
    </div>
  );
};

const PinInputDocs = () => (
  <ComponentDocPage
    name="PinInput"
    title="PinInput Component — React OTP Code Field | Neuctra UI"
    description="React PIN / OTP input with auto-advance, smart Backspace, full-code paste, numeric or alphanumeric modes, masking and one-time-code autofill."
    keywords="react otp input, pin code component, verification code ui, one time password react, otp boxes tailwind, neuctra ui pin input"
    importCode={`import { PinInput } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "Typing auto-advances; Backspace clears and steps back; pasting distributes the whole code.",
        code: `<PinInput length={6} onComplete={(code) => verify(code)} />`,
        preview: <OtpDemo />,
      },
      {
        title: "Masked & Alphanumeric",
        code: `<PinInput length={4} mask />
<PinInput length={5} type="alphanumeric" />`,
        preview: (
          <div className="flex flex-col gap-4">
            <PinInput length={4} mask />
            <PinInput length={5} type="alphanumeric" />
          </div>
        ),
      },
      {
        title: "Sizes & Error",
        code: `<PinInput length={4} size="sm" />
<PinInput length={4} size="lg" />
<PinInput length={4} error defaultValue="1234" />`,
        preview: (
          <div className="flex flex-col gap-4">
            <PinInput length={4} size="sm" />
            <PinInput length={4} size="lg" />
            <PinInput length={4} error defaultValue="1234" />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "length", type: "number", default: "4", description: "Number of character boxes" },
      { prop: "value / defaultValue", type: "string", default: '""', description: "Controlled / uncontrolled code" },
      { prop: "onChange", type: "(value: string) => void", default: "—", description: "Fired on every keystroke" },
      { prop: "onComplete", type: "(value: string) => void", default: "—", description: "Fired once all boxes are filled" },
      { prop: "type", type: '"numeric" | "alphanumeric"', default: '"numeric"', description: "Accepted characters (sets the mobile keyboard too)" },
      { prop: "mask", type: "boolean", default: "false", description: "Render dots instead of characters" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Box size" },
      { prop: "error", type: "boolean", default: "false", description: "Destructive border state" },
      { prop: "autoFocus", type: "boolean", default: "false", description: "Focus the first box on mount" },
      { prop: "disabled", type: "boolean", default: "false", description: "Lock all boxes" },
      { prop: "boxClassName", type: "string", default: "—", description: "Styles each individual character box." },
    ]}
    a11y={[
      'Each box has an aria-label ("Character 2 of 6") inside a labelled group.',
      'The first box sets autocomplete="one-time-code" so iOS/Android offer SMS autofill.',
      "Arrow keys move between boxes; focus selects the existing character for easy overwrite.",
    ]}
  />
);

export default PinInputDocs;
