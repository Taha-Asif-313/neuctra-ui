"use client";

import React from "react";
import Metadata from "../../../MetaData";
import CodePreviewBlock from "../components/CodePreviewBlock";
import CodeBlock from "../components/CodeBlock";
import { Avatar } from "@neuctra/ui";
import { AlertTriangle, Check, User, X } from "lucide-react";
import DocsFooter from "../components/DocsFooter";

const AvatarDocs = () => {
  return (
    <>
      <Metadata
        title="Avatar Component — Neuctra UI"
        description="Learn how to use the Avatar component in Neuctra UI — customizable sizes, variants, online/offline status, rings, and fallbacks."
        keywords="Neuctra UI Avatar, React Avatar component, profile image, user avatar, status dot, UI library"
      />

      <div className="font-primary min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Avatar Component
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Avatar</span>{" "}
              component displays profile images, user initials, or fallback
              icons. Supports multiple sizes, variants, online/offline status,
              rings, and click interactions.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component From Library
            </h2>
            <CodeBlock code={`import { Avatar } from "@neuctra/ui";`} />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage Code
            </h2>
            <p className="text-gray-300 mb-4">
              Start with a simple avatar. The component supports images, fallback
              text, and various sizes and variants for different use cases.
            </p>
            <CodeBlock
              language="jsx"
              code={`import { Avatar } from '@neuctra/ui';

function BasicExample() {
  return (
    <Avatar 
      src="https://i.pravatar.cc/150?img=1" 
      alt="User avatar"
      fallback="JD"
    />
  );
}`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />`}
              previewContent={
                <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" />
              }
            />
          </section>

          {/* Advanced Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Advanced Usage
            </h2>
            <div className="space-y-6">
              <CodePreviewBlock
                language="jsx"
                code={`<Avatar size="lg" variant="rounded" isOnline />`}
                previewContent={<Avatar size="lg" variant="rounded" isOnline />}
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Avatar fallback="JS" ring ringColor="#10b981" />`}
                previewContent={
                  <Avatar fallback="JS" ring ringColor="#10b981" />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Avatar src="https://i.pravatar.cc/150?img=3" statusPosition="top-left" isOffline />`}
                previewContent={
                  <Avatar
                    src="https://i.pravatar.cc/150?img=3"
                    statusPosition="top-left"
                    isOffline
                  />
                }
              />

              <CodePreviewBlock
                language="jsx"
                code={`<Avatar size="2xl" fallback="CR" onClick={() => alert("Avatar clicked")} />`}
                previewContent={
                  <Avatar
                    size="2xl"
                    fallback="CR"
                    onClick={() => alert("Avatar clicked")}
                  />
                }
              />
            </div>
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Props Table
            </h2>
            <p className="text-gray-400 mb-3">
              All available props for the Avatar component.
            </p>

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
                  <tr>
                    <td className="p-3 font-medium">src</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">Image source URL for the avatar</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">alt</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">"User avatar"</td>
                    <td className="p-3">
                      Accessibility label and alt text for the image
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">size</td>
                    <td className="p-3">
                      "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "responsive"
                    </td>
                    <td className="p-3 text-gray-400">"md"</td>
                    <td className="p-3">Size of the avatar</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">variant</td>
                    <td className="p-3">"circular" | "rounded" | "square"</td>
                    <td className="p-3 text-gray-400">"circular"</td>
                    <td className="p-3">Shape of the avatar</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">isOnline</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 text-gray-400">false</td>
                    <td className="p-3">
                      Shows a green status dot (online indicator)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">isOffline</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 text-gray-400">false</td>
                    <td className="p-3">
                      Shows a gray status dot (offline indicator)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">ring</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 text-gray-400">false</td>
                    <td className="p-3">Adds a ring around the avatar</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">fallback</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Custom fallback text (initials) when image fails to load
                      or no src is provided
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">onClick</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Click handler. Makes the avatar focusable and keyboard
                      accessible
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">statusPosition</td>
                    <td className="p-3">
                      "top-left" | "top-right" | "bottom-left" | "bottom-right"
                    </td>
                    <td className="p-3 text-gray-400">"bottom-right"</td>
                    <td className="p-3">Position of the status dot</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">""</td>
                    <td className="p-3">
                      Additional CSS classes for the avatar container
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">statusClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3 text-gray-400">""</td>
                    <td className="p-3">
                      Additional CSS classes for the status dot
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Custom inline styles for the avatar container
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium">statusStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3 text-gray-400">—</td>
                    <td className="p-3">
                      Custom inline styles for the status dot
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Common Mistakes
            </h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{"<Avatar isOnline isOffline />"}</code>
                  <p className="text-gray-200 text-xs mt-1">
                    Do not use both <code>isOnline</code> and{" "}
                    <code>isOffline</code> at the same time. Only one status
                    should be active.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{'<Avatar ring ringColor="#10b981" />'}</code>
                  <p className="text-gray-200 text-xs mt-1">
                    <code>ringColor</code> prop does not exist. Use{" "}
                    <code>style</code> or Tailwind classes to customize ring
                    color.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-red-500">
                <X size={16} />
                <div>
                  <code>{'<Avatar size="2xl" fallback="ABCD" />'}</code>
                  <p className="text-gray-200 text-xs mt-1">
                    Keep fallback initials short (max 2 characters) to prevent
                    overflow on smaller sizes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-green-500">
                <Check size={16} />
                <div>
                  <code>
                    {
                      '<Avatar src={image} fallback="JD" onClick={handleClick} />'
                    }
                  </code>
                  <p className="text-gray-200 text-xs mt-1">
                    Always provide a meaningful <code>fallback</code> for better
                    UX when images fail.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>
                Use <code>fallback</code> to display user initials when the
                image fails to load.
              </li>
              <li>
                Combine <code>ring</code> with custom <code>style</code> or
                Tailwind classes for colored rings.
              </li>
              <li>
                Use <code>isOnline</code> for presence indicators in
                chat/messaging UIs.
              </li>
              <li>
                Make avatars clickable by passing <code>onClick</code> — the
                component automatically handles keyboard accessibility.
              </li>
              <li>
                Choose the right <code>variant</code>: <code>circular</code> for
                profiles, <code>rounded</code> for teams, <code>square</code>{" "}
                for apps/icons.
              </li>
              <li>
                For fully responsive avatars, use <code>size="responsive"</code>{" "}
                and control size via parent container + Tailwind responsive
                classes.
              </li>
              <li>
                You can customize status dot appearance using{" "}
                <code>statusClassName</code> and <code>statusStyle</code>.
              </li>
            </ul>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default AvatarDocs;
