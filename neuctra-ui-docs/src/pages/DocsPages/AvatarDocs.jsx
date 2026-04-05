"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Avatar } from "@neuctra/ui";
import { User } from "lucide-react";

const AvatarDocs = () => {
  return (
    <>
      <Metadata
        title="Avatar Component — Neuctra UI"
        description="Learn how to use the Avatar component in Neuctra UI — customizable sizes, variants, online/offline status, rings, and fallbacks."
        keywords="Neuctra UI Avatar, React Avatar component, profile image, user avatar, status dot, UI library"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Avatar Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Avatar</span> component displays profile images, user initials, 
              or fallback icons. Supports multiple sizes, variants, online/offline status, rings, and click interactions.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="react"
              code={`import { Avatar } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />`}
              previewContent={<Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />}
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Advanced Usage</h2>
            <div className="space-y-6">

              <CodePreviewBlock
                language="jsx"
                code={`<Avatar size="lg" variant="rounded" isOnline />`}
                previewContent={<Avatar size="lg" variant="rounded" isOnline />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Avatar fallback="JS" ring ringColor="#10b981" />`}
                previewContent={<Avatar fallback="JS" ring ringColor="#10b981" />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Avatar src="https://i.pravatar.cc/150?img=3" statusPosition="top-left" isOffline />`}
                previewContent={<Avatar src="https://i.pravatar.cc/150?img=3" statusPosition="top-left" isOffline />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Avatar size="2xl" fallback="CR" onClick={() => alert("Avatar clicked")} />`}
                previewContent={<Avatar size="2xl" fallback="CR" onClick={() => alert("Avatar clicked")} />}
              />

            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Props Table</h2>
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Default</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr><td className="p-3">src</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Image URL for avatar</td></tr>
                  <tr><td className="p-3">alt</td><td className="p-3">string</td><td className="p-3">"User avatar"</td><td className="p-3">Alt text for image / accessibility label</td></tr>
                  <tr><td className="p-3">size</td><td className="p-3">"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "responsive"</td><td className="p-3">"md"</td><td className="p-3">Avatar size</td></tr>
                  <tr><td className="p-3">variant</td><td className="p-3">"circular" | "rounded" | "square"</td><td className="p-3">"circular"</td><td className="p-3">Avatar shape</td></tr>
                  <tr><td className="p-3">isOnline</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Show green status dot</td></tr>
                  <tr><td className="p-3">isOffline</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Show gray status dot</td></tr>
                  <tr><td className="p-3">ring</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Add a ring around avatar</td></tr>
                  <tr><td className="p-3">ringColor</td><td className="p-3">string</td><td className="p-3">"#3b82f6"</td><td className="p-3">Color of ring</td></tr>
                  <tr><td className="p-3">fallback</td><td className="p-3">string</td><td className="p-3">—</td><td className="p-3">Initials or letters if image fails</td></tr>
                  <tr><td className="p-3">onClick</td><td className="p-3">() ={`>`} void</td><td className="p-3">—</td><td className="p-3">Click handler</td></tr>
                  <tr><td className="p-3">statusPosition</td><td className="p-3">"top-left" | "top-right" | "bottom-left" | "bottom-right"</td><td className="p-3">"bottom-right"</td><td className="p-3">Position of status dot</td></tr>
                  <tr><td className="p-3">className</td><td className="p-3">string</td><td className="p-3">""</td><td className="p-3">Custom class for avatar wrapper</td></tr>
                  <tr><td className="p-3">statusClassName</td><td className="p-3">string</td><td className="p-3">""</td><td className="p-3">Custom class for status dot</td></tr>
                  <tr><td className="p-3">style</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Custom inline styles for avatar</td></tr>
                  <tr><td className="p-3">statusStyle</td><td className="p-3">CSSProperties</td><td className="p-3">—</td><td className="p-3">Custom inline styles for status dot</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Common Mistakes</h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-2 text-red-500">
                <span className="font-bold">⚠</span>
                <div>
                  <code>{'<Avatar size="2xl" fallback="AB" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Ensure fallback initials are short; too many letters will overflow.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-red-500">
                <span className="font-bold">⚠</span>
                <div>
                  <code>{'<Avatar isOnline isOffline />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Avoid using both online and offline simultaneously; choose one status.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-green-500">
                <span className="font-bold">✔</span>
                <div>
                  <code>{'<Avatar ring ringColor="#10b981" />'}</code>
                  <p className="text-gray-500 text-xs mt-1">Custom ring colors can highlight important avatars.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Use <code>fallback</code> to show user initials if image fails.</li>
              <li>Combine <code>ring</code> and <code>ringColor</code> for attention.</li>
              <li>Use <code>isOnline</code> or <code>isOffline</code> for presence indicators.</li>
              <li>Clickable avatars should have <code>tabIndex</code> and proper ARIA roles.</li>
              <li>Pick the right <code>variant</code> for design context: circular, rounded, or square.</li>
              <li>Responsive avatars can default to "md" but scale with CSS or parent container.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with <span className="text-primary">React</span>,{" "}
            <span className="text-primary">Tailwind CSS</span> &{" "}
            <span className="text-primary">TypeScript</span>.
          </footer>

        </div>
      </div>
    </>
  );
};

export default AvatarDocs;