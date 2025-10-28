"use client";

import React from "react";
import { User } from "lucide-react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { Avatar, AvatarGroup } from "@neuctra/ui"; // Adjust if needed

const AvatarDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const avatarProps = [
    {
      prop: "src",
      type: "string",
      default: "undefined",
      description: "Image URL for the avatar.",
    },
    {
      prop: "alt",
      type: "string",
      default: `"User Avatar"`,
      description: "Alt text for the image and fallback initials.",
    },
    {
      prop: "size",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`,
      default: `"md"`,
      description: "Controls avatar dimension and font size.",
    },
    {
      prop: "variant",
      type: `"circular" | "rounded" | "square"`,
      default: `"circular"`,
      description: "Border radius shape of avatar.",
    },
    {
      prop: "isOnline",
      type: "boolean",
      default: "false",
      description: "Shows green online status dot.",
    },
    {
      prop: "isOffline",
      type: "boolean",
      default: "false",
      description: "Shows gray offline status dot.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Additional CSS classes.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles for avatar container.",
    },
    {
      prop: "statusClassName",
      type: "string",
      default: `""`,
      description: "CSS classes for status dot.",
    },
    {
      prop: "statusStyle",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles for status dot.",
    },
    {
      prop: "statusPosition",
      type: `"top-left" | "top-right" | "bottom-left" | "bottom-right"`,
      default: `"bottom-right"`,
      description: "Position of status dot.",
    },
    {
      prop: "fallback",
      type: "string",
      default: "undefined",
      description: "Fallback initials if image fails to load or no src.",
    },
    {
      prop: "ring",
      type: "boolean",
      default: "false",
      description: "Adds colored ring around avatar.",
    },
    {
      prop: "ringColor",
      type: "string",
      default: `"#3b82f6"`,
      description: "Ring color if enabled.",
    },
    {
      prop: "onClick",
      type: "() => void",
      default: "undefined",
      description: "Click handler, makes avatar interactive.",
    },
  ];

  const avatarGroupProps = [
    {
      prop: "avatars",
      type: "AvatarProps[]",
      default: "—",
      description: "Array of avatar props.",
    },
    {
      prop: "max",
      type: "number",
      default: "4",
      description: "Max avatars shown; excess shown as +N.",
    },
    {
      prop: "size",
      type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`,
      default: `"md"`,
      description: "Size for all avatars in group.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Additional CSS classes.",
    },
    {
      prop: "style",
      type: "React.CSSProperties",
      default: "undefined",
      description: "Inline styles for group container.",
    },
    {
      prop: "spacing",
      type: `"tight" | "normal" | "loose"`,
      default: `"normal"`,
      description: "Spacing between avatars.",
    },
    {
      prop: "direction",
      type: `"left" | "right"`,
      default: `"left"`,
      description: "Stacking direction.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">Avatar</span> &{" "}
        <span className="text-primary">AvatarGroup</span> Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="tsx"
          code={`import { Avatar, AvatarGroup } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Examples</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Avatar
  src="https://randomuser.me/api/portraits/men/32.jpg"
  alt="John Doe"
  size="lg"
  isOnline
  ring
  ringColor="#10b981"
  onClick={() => alert("Avatar clicked!")}
/>

<Avatar fallback="JD" size="md" variant="rounded" />

<AvatarGroup
  avatars={[
    { src: "https://randomuser.me/api/portraits/women/44.jpg", alt: "Jane" },
    { fallback: "MK", isOnline: true },
    { src: "https://randomuser.me/api/portraits/men/55.jpg", alt: "Mike" },
    { fallback: "AN", isOffline: true },
    { fallback: "TS" },
  ]}
  max={4}
  size="md"
  spacing="tight"
  direction="left"
/>`}
          previewContent={
            <>
              <div className="flex space-x-6 mb-8">
                <Avatar
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="John Doe"
                  size="lg"
                  isOnline
                  ring
                  ringColor="#10b981"
                  onClick={() => alert("Avatar clicked!")}
                />
                <Avatar fallback="JD" size="md" variant="rounded" />
              </div>
              <AvatarGroup
                avatars={[
                  {
                    src: "https://randomuser.me/api/portraits/men/32.jpg",
                    alt: "Jane",
                  },
                  { fallback: "MK", isOnline: true },
                  {
                    src: "https://randomuser.me/api/portraits/men/55.jpg",
                    alt: "Mike",
                  },
                  { fallback: "AN", isOffline: true },
                  { fallback: "TS" },
                ]}
                max={4}
                size="md"
                spacing="tight"
                direction="left"
              />
            </>
          }
        />
      </section>

      {/* Avatar Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Avatar Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {avatarProps.map(({ prop, type, default: def, description }) => (
              <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                <td className="border border-primary px-3 py-2 font-mono">
                  {prop}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {type}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {def}
                </td>
                <td className="border border-primary px-3 py-2">
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* AvatarGroup Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">AvatarGroup Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {avatarGroupProps.map(
              ({ prop, type, default: def, description }) => (
                <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                  <td className="border border-primary px-3 py-2 font-mono">
                    {prop}
                  </td>
                  <td className="border border-primary px-3 py-2 font-mono">
                    {type}
                  </td>
                  <td className="border border-primary px-3 py-2 font-mono">
                    {def}
                  </td>
                  <td className="border border-primary px-3 py-2">
                    {description}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      {/* Behavior Details */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <code>Avatar</code> automatically displays fallback initials if the
            image fails to load or <code>src</code> is not provided.
          </li>
          <li>
            Status dots indicate online (<code>isOnline</code>) or offline (
            <code>isOffline</code>) states and can be positioned on any corner.
          </li>
          <li>
            The avatar supports different shapes through <code>variant</code>{" "}
            prop: circular, rounded, or square.
          </li>
          <li>
            Clicking an avatar triggers <code>onClick</code> if provided and
            makes the avatar keyboard accessible.
          </li>
          <li>
            <code>AvatarGroup</code> handles overlapping avatars with
            configurable spacing and shows a "+N" count if avatars exceed the{" "}
            <code>max</code> prop.
          </li>
          <li>
            Avatars in the group have subtle hover translation and z-index boost
            for better UX.
          </li>
        </ul>
      </section>

      {/* Icons usage */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fallback Icon</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<Avatar fallback="Ta" size="lg" />`}
          previewContent={<Avatar fallback="Ta" size="lg" />}
        />
        <p>
          When no image or fallback initials are provided, a default user icon (
          <span>
            <User className="inline" />
          </span>
          ) is displayed.
        </p>
      </section>
    </div>
  );
};

export default AvatarDocs;
