"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@neuctra/ui";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const ModalDocs = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Metadata
        title="Modal Component — Neuctra UI"
        description="Learn how to use the Modal component from Neuctra UI — a responsive, accessible, and customizable dialog system for React apps."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Modal Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              A flexible, composable modal system built for modern apps. Fully
              responsive, accessible, and easy to customize using compound
              components.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>

            <p className="text-gray-400 mb-4">
              Use <code>Modal</code> as the wrapper and compose your UI with{" "}
              <code>ModalContent</code>, <code>ModalHeader</code>,{" "}
              <code>ModalBody</code>, and <code>ModalFooter</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal isOpen={open} onClose={() => setOpen(false)}>
  <ModalContent onClose={() => setOpen(false)}>
    <ModalHeader title="Demo Modal" />

    <ModalBody>
      This is a demo modal. You can place any content here.
    </ModalBody>

    <ModalFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={() => alert("Action!")}>
        Confirm
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>`}
              previewContent={
                <>
                  <Button onClick={() => setIsOpen(true)}>
                    Open Modal
                  </Button>

                  <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  >
                    <ModalContent onClose={() => setIsOpen(false)}>
                      <ModalHeader title="Demo Modal" />

                      <ModalBody>
                        This is a modern modal built with Neuctra UI.
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          variant="ghost"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => alert("Action executed!")}
                        >
                          Confirm
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              }
            />
          </section>

          {/* Structure */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Component Structure
            </h2>

            <p className="text-gray-400 mb-4">
              The modal is built using composable parts:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>
                <code>Modal</code> — Handles overlay, escape key, and state
              </li>
              <li>
                <code>ModalContent</code> — Main container (size, layout)
              </li>
              <li>
                <code>ModalHeader</code> — Title and optional icon
              </li>
              <li>
                <code>ModalBody</code> — Main content area
              </li>
              <li>
                <code>ModalFooter</code> — Actions (buttons)
              </li>
            </ul>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Features
            </h2>

            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Overlay click to close</li>
              <li>Escape key support</li>
              <li>Scroll lock when open</li>
              <li>Fully responsive design</li>
              <li>Dark mode support</li>
              <li>Composable architecture</li>
              <li>Smooth animations</li>
            </ul>
          </section>

          {/* Props */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Modal Props
            </h2>

            <div className="overflow-x-auto border border-zinc-800 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-400">
                  <tr>
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-3">isOpen</td>
                    <td className="p-3">boolean</td>
                    <td>Controls modal visibility</td>
                  </tr>
                  <tr>
                    <td className="p-3">onClose</td>
                    <td className="p-3">() =&gt; void</td>
                    <td>Called when modal closes</td>
                  </tr>
                  <tr>
                    <td className="p-3">disableOverlayClose</td>
                    <td className="p-3">boolean</td>
                    <td>Disable closing on overlay click</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default ModalDocs;