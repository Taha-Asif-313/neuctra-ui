"use client";

import React from "react";
import Metadata from "../../MetaData";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import CodeBlock from "../../components/Docs/CodeBlock";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@neuctra/ui";
import { X } from "lucide-react";

const ModalDocs = () => {
  return (
    <>
      <Metadata
        title="Modal Component — Neuctra UI"
        description="Learn how to use the Modal component in Neuctra UI — overlay dialogs with headers, body, footer, and customizable close behavior."
        keywords="Neuctra UI Modal, React Modal component, overlay dialog, popup, UI library, ModalHeader, ModalBody, ModalFooter"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="mx-auto px-4 space-y-10">

          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Modal Component
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              The <span className="text-primary font-semibold">Modal</span> component provides an overlay dialog system with 
              optional header, body, and footer sections. Supports keyboard escape, overlay click dismissal, and accessibility.
            </p>
          </header>

          {/* Import */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Import Component
            </h2>
            <CodeBlock
              language="react"
              code={`import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@neuctra/ui";`}
            />
          </section>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Basic Example</h2>
            <CodePreviewBlock
              language="jsx"
              code={`
<Modal isOpen={true} onClose={() => alert("Closed!")}>
  <ModalContent>
    <ModalHeader title="Modal Title" icon={<X />} />
    <ModalBody>
      This is the content of the modal.
    </ModalBody>
    <ModalFooter>
      <button onClick={() => alert("Action!")}>Action</button>
    </ModalFooter>
  </ModalContent>
</Modal>
              `}
              previewContent={
                <Modal isOpen={false} onClose={() => alert("Closed!")}>
                  <ModalContent>
                    <ModalHeader title="Modal Title" icon={<X />} />
                    <ModalBody>
                      This is the content of the modal.
                    </ModalBody>
                    <ModalFooter>
                      <button className="px-4 py-2 bg-primary text-white rounded" onClick={() => alert("Action!")}>Action</button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              }
            />
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
                  <tr><td className="p-3">isOpen</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Controls visibility of modal</td></tr>
                  <tr><td className="p-3">onClose</td><td className="p-3">() ={`>`} void</td><td className="p-3">—</td><td className="p-3">Function called when modal closes (Escape or overlay)</td></tr>
                  <tr><td className="p-3">disableOverlayClose</td><td className="p-3">boolean</td><td className="p-3">false</td><td className="p-3">Prevent closing modal by clicking overlay</td></tr>
                  <tr><td className="p-3">children</td><td className="p-3">ReactNode</td><td className="p-3">—</td><td className="p-3">Modal content, typically <code>ModalContent</code></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Notes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Usage Notes</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Use <code>ModalContent</code> to wrap content and stop overlay click propagation.</li>
              <li><code>ModalHeader</code>, <code>ModalBody</code>, and <code>ModalFooter</code> provide structured layout.</li>
              <li>Modal automatically locks scroll when open.</li>
              <li>Supports Escape key to close modal.</li>
              <li>Overlay click closes modal unless <code>disableOverlayClose</code> is true.</li>
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

export default ModalDocs;