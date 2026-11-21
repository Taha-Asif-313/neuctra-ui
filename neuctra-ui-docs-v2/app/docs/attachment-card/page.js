"use client";

import { useEffect, useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { AttachmentCard, Button, Card, CardBody } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const attachmentCardFaq = buildComponentFaq("AttachmentCard", { sizes: ["sm", "md"] });

const initialFiles = [
  { id: 1, name: "Q3-board-deck.pdf", size: "4.2 MB", status: "ready" },
  { id: 2, name: "revenue-by-region.xlsx", size: "860 KB", status: "uploading", progress: 0 },
  { id: 3, name: "launch-video.mp4", size: "128 MB", status: "error" },
];

function UploadQueueDemo() {
  const [files, setFiles] = useState(initialFiles);

  useEffect(() => {
    const timer = setInterval(() => {
      setFiles((current) =>
        current.map((file) => {
          if (file.status !== "uploading") return file;
          const progress = Math.min(100, (file.progress ?? 0) + 8);
          return progress >= 100 ? { ...file, progress, status: "ready" } : { ...file, progress };
        }),
      );
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const retry = (id) =>
    setFiles((current) =>
      current.map((file) => (file.id === id ? { ...file, status: "uploading", progress: 0 } : file)),
    );
  const remove = (id) => setFiles((current) => current.filter((file) => file.id !== id));

  return (
    <Card padding="sm" className="w-full max-w-md">
      <CardBody className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">Attachments</p>
          <Button size="xs" variant="ghost" onClick={() => setFiles(initialFiles)}>
            Reset
          </Button>
        </div>
        {files.length === 0 && (
          <p className="text-sm text-muted-foreground">No files attached.</p>
        )}
        {files.map((file) => (
          <AttachmentCard
            key={file.id}
            name={file.name}
            size={file.size}
            status={file.status}
            progress={file.progress}
            onRetry={() => retry(file.id)}
            onRemove={() => remove(file.id)}
          />
        ))}
      </CardBody>
    </Card>
  );
}

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
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const attachmentProps = [
  ["name", "string", "-", "File name, the primary label (required). Its extension picks the default icon."],
  ["size", "string", "-", 'Human-readable file size, e.g. "2.4 MB".'],
  ["progress", "number", "0", 'Upload progress from 0 to 100, shown while status is "uploading".'],
  ["status", '"uploading" | "ready" | "error"', '"ready"', "Current attachment state."],
  ["errorMessage", "ReactNode", '"Upload failed"', "Message shown in the error state; wraps to up to two lines."],
  ["thumbnail", "string", "-", "Image URL shown instead of the file icon."],
  ["icon", "ReactNode", "-", "Custom leading icon."],
  ["href", "string", "-", "Turns the file name into a link that opens in a new tab."],
  ["cardSize", '"sm" | "md"', '"md"', "Density preset."],
  ["disabled", "boolean", "false", "Disables the retry and remove actions."],
  ["onRetry", "() => void", "-", "Shows a retry button in the error state."],
  ["onRemove", "() => void", "-", "Shows a remove (or cancel upload) button."],
  ["className", "string", "-", "Styles the card root."],
  ["style", "CSSProperties", "-", "Inline styles for the card root."],
  ["thumbnailClassName", "string", "-", "Styles the thumbnail or icon tile."],
  ["nameClassName", "string", "-", "Styles the file name."],
  ["metaClassName", "string", "-", "Styles the status line."],
  ["progressClassName", "string", "-", "Styles the progress track (the inner Progress track)."],
  ["actionClassName", "string", "-", "Styles the retry and remove IconButtons."],
];

const AttachmentCardDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            AttachmentCard Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A compact file row for upload queues, message composers and
            document lists. Shows a type icon or thumbnail, upload progress,
            ready and error states, and retry or remove actions. It is built
            from the Neuctra Progress and IconButton components.
          </p>
        </header>

        <section aria-labelledby="AttachmentCard-import">
          <h2 id="AttachmentCard-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { AttachmentCard } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="AttachmentCard-example-0">
          <h2 id="AttachmentCard-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A ready file with its size. Pass href to make the name a link.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<AttachmentCard name="Q3-board-deck.pdf" size="4.2 MB" href="#" onRemove={() => {}} />`}
            previewContent={
              <div className="w-full max-w-md py-4">
                <AttachmentCard name="Q3-board-deck.pdf" size="4.2 MB" href="#" onRemove={() => {}} />
              </div>
            }
          />
        </section>

        <section aria-labelledby="AttachmentCard-example-1">
          <h2 id="AttachmentCard-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            States
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Uploading shows a progress bar, error shows a message and an
            optional retry button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<AttachmentCard name="revenue-by-region.xlsx" size="860 KB" status="uploading" progress={64} onRemove={() => {}} />
<AttachmentCard name="launch-video.mp4" status="error" errorMessage="File exceeds the 100 MB limit" onRetry={() => {}} onRemove={() => {}} />
<AttachmentCard name="contract-signed.pdf" size="312 KB" status="ready" disabled onRemove={() => {}} />`}
            previewContent={
              <div className="flex w-full max-w-md flex-col gap-3 py-4">
                <AttachmentCard name="revenue-by-region.xlsx" size="860 KB" status="uploading" progress={64} onRemove={() => {}} />
                <AttachmentCard
                  name="launch-video.mp4"
                  status="error"
                  errorMessage="File exceeds the 100 MB limit"
                  onRetry={() => {}}
                  onRemove={() => {}}
                />
                <AttachmentCard name="contract-signed.pdf" size="312 KB" status="ready" disabled onRemove={() => {}} />
              </div>
            }
          />
        </section>

        <section aria-labelledby="AttachmentCard-example-2">
          <h2 id="AttachmentCard-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes and Thumbnails
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            cardSize="sm" fits chat composers. thumbnail replaces the icon with
            an image preview.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<AttachmentCard cardSize="sm" name="api-schema.json" size="18 KB" onRemove={() => {}} />
<AttachmentCard
  name="homepage-hero.png"
  size="1.1 MB"
  thumbnail="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&h=120&fit=crop"
  onRemove={() => {}}
/>`}
            previewContent={
              <div className="flex w-full max-w-md flex-col gap-3 py-4">
                <AttachmentCard cardSize="sm" name="api-schema.json" size="18 KB" onRemove={() => {}} />
                <AttachmentCard
                  name="homepage-hero.png"
                  size="1.1 MB"
                  thumbnail="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=120&h=120&fit=crop"
                  onRemove={() => {}}
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="AttachmentCard-example-3">
          <h2 id="AttachmentCard-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Upload Queue
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A live queue: progress advances, failed uploads can be retried and
            any file can be removed.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const initialFiles = [
  { id: 1, name: "Q3-board-deck.pdf", size: "4.2 MB", status: "ready" },
  { id: 2, name: "revenue-by-region.xlsx", size: "860 KB", status: "uploading", progress: 0 },
  { id: 3, name: "launch-video.mp4", size: "128 MB", status: "error" },
];

const [files, setFiles] = useState(initialFiles);

useEffect(() => {
  const timer = setInterval(() => {
    setFiles((current) =>
      current.map((file) => {
        if (file.status !== "uploading") return file;
        const progress = Math.min(100, (file.progress ?? 0) + 8);
        return progress >= 100 ? { ...file, progress, status: "ready" } : { ...file, progress };
      }),
    );
  }, 400);
  return () => clearInterval(timer);
}, []);

const retry = (id) =>
  setFiles((current) =>
    current.map((file) => (file.id === id ? { ...file, status: "uploading", progress: 0 } : file)),
  );
const remove = (id) => setFiles((current) => current.filter((file) => file.id !== id));

<Card padding="sm" className="w-full max-w-md">
  <CardBody className="space-y-3">
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-semibold text-foreground">Attachments</p>
      <Button size="xs" variant="ghost" onClick={() => setFiles(initialFiles)}>Reset</Button>
    </div>
    {files.length === 0 && <p className="text-sm text-muted-foreground">No files attached.</p>}
    {files.map((file) => (
      <AttachmentCard
        key={file.id}
        name={file.name}
        size={file.size}
        status={file.status}
        progress={file.progress}
        onRetry={() => retry(file.id)}
        onRemove={() => remove(file.id)}
      />
    ))}
  </CardBody>
</Card>`}
            previewContent={
              <div className="w-full max-w-md py-4">
                <UploadQueueDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="AttachmentCard-props">
          <h2 id="AttachmentCard-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the AttachmentCard component.</p>
          <PropsTable rows={attachmentProps} />
        </section>

        <section aria-labelledby="AttachmentCard-a11y">
          <h2 id="AttachmentCard-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              The progress bar is a role="progressbar" with aria-valuenow and an
              "Uploading file name" label.
            </li>
            <li>The ready and error status line is a polite live region, so state changes are announced.</li>
            <li>
              Retry and remove are icon buttons with labels that include the
              file name ("Remove Q3-board-deck.pdf", "Cancel upload of ..." while uploading).
            </li>
            <li>All buttons and the file link show a visible focus ring; truncated names keep a title tooltip.</li>
            <li>Error messages wrap to two lines instead of being cut off on narrow layouts.</li>
          </ul>
        </section>

        <ComponentFaq qa={attachmentCardFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default AttachmentCardDocs;
