"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalTriggerButton,
} from "@neuctra/ui";
import { Trash2, User, X } from "lucide-react";

const ModalDocs = () => {
  return (
    <>
      <Metadata
        title="Modal Component — Neuctra UI"
        description="Learn how to use the Modal component in Neuctra UI — overlay dialogs with structured layout, actions, animations, and full customization."
        keywords="Neuctra UI Modal, React Modal component, overlay dialog, ModalButton, popup, UI library"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Modal Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Modal</span> component provides a flexible overlay system with structured sections, keyboard support, scroll locking, and fully customizable styling.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="react"
              code={`import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalTriggerButton
} from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`
<ModalTriggerButton
  variant="primary"
  modalContent={({ close }) => (
    <ModalContent onClose={close}>
      <ModalHeader title="Modal Title" icon={<X />} />

      <ModalBody>
        This is the content of the modal.
      </ModalBody>

      <ModalFooter>
        <ModalButton
          variant="primary"
          closeOnClick
          onClose={close}
          action={() => alert("Action executed")}
        >
          Confirm
        </ModalButton>
      </ModalFooter>
    </ModalContent>
  )}
>
  Open Modal
</ModalTriggerButton>
              `}
              previewContent={
                <ModalTriggerButton
                  variant="primary"
                  className="px-4 py-2 bg-primary text-white rounded"
                  modalContent={({ close }) => (
                    <ModalContent className="w-lg" onClose={close}>
                      <ModalHeader title="Modal Title" icon={<Trash2 className="text-red-500" />} />

                      <ModalBody>
                        This is the content of the modal.
                      </ModalBody>

                      <ModalFooter>
                        <ModalButton
                          className="px-4 py-2 bg-primary text-white rounded"
                          closeOnClick
                          onClose={close}
                          action={() => alert("Action executed")}
                        >
                          Confirm
                        </ModalButton>
                      </ModalFooter>
                    </ModalContent>
                  )}
                >
                  Open Modal
                </ModalTriggerButton>
              }
            />
          </section>

          {/* Modal Props */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Modal Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">isOpen</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Controls modal visibility</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">onClose</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Triggered on ESC or overlay click</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">disableOverlayClose</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Prevents closing on overlay click</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Overlay wrapper class</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Overlay wrapper styles</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">overlayClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Overlay background class</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">overlayStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Overlay inline styles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ModalButton Props */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ModalButton Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">onClick</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Runs before action</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">action</td>
                    <td className="p-3">() =&gt; void | Promise</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Async action before close</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">closeOnClick</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Closes modal after action</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">onClose</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Called after action completes</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">loading</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Shows loading state</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ModalContent Props */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ModalContent Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">onClose</td>
                    <td className="p-3">() =&gt; void</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Closes modal</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Container class</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Container styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">closeButtonClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Close button class</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">closeButtonStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Close button styles</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">contentClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inner content wrapper class</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">contentStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Inner content wrapper styles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ModalHeader */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ModalHeader Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">title</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Modal title</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">icon</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Optional icon</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">iconClassName</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon wrapper class</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">iconStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Icon styles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ModalBody */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ModalBody Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Modal body content</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Body wrapper class</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ModalFooter */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ModalFooter Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Footer actions</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Footer wrapper class</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ModalTriggerButton */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              ModalTriggerButton Props
            </h2>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800 text-gray-300">
                  <tr>
                    <td className="p-3 font-mono">children</td>
                    <td className="p-3">ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Trigger button label</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">modalContent</td>
                    <td className="p-3">(close) =&gt; ReactNode</td>
                    <td className="p-3">—</td>
                    <td className="p-3">Render function for modal content</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-mono">defaultOpen</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3">false</td>
                    <td className="p-3">Initial open state</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Notes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Usage Notes
            </h2>

            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Modal automatically locks scroll when open.</li>
              <li>Supports ESC key to close.</li>
              <li>Overlay click behavior is configurable.</li>
              <li>Use <code>ModalButton</code> for async-safe actions.</li>
              <li>Prefer <code>ModalTriggerButton</code> for simple modal flows.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            Built with React, Tailwind CSS & TypeScript.
          </footer>
        </div>
      </div>
    </>
  );
};

export default ModalDocs;