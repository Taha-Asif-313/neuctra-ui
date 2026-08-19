"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { FileUpload } from "@neuctra/ui";

const FileUploadDocs = () => (
  <ComponentDocPage
    name="FileUpload"
    title="FileUpload Component — React Drag & Drop Uploader | Neuctra UI"
    description="React file upload component with drag-and-drop, click-to-browse, accept filters, size and count limits, per-file errors and a removable file list."
    keywords="react file upload component, drag and drop uploader, dropzone react, file input tailwind, upload files ui, neuctra ui file upload"
    importCode={`import { FileUpload } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description:
          "Click or drop files; the built-in list shows name, size and a remove button.",
        code: `<FileUpload
  multiple
  onFilesChange={(files) => console.log(files)}
/>`,
        preview: (
          <div className="w-full max-w-md">
            <FileUpload multiple onFilesChange={() => {}} />
          </div>
        ),
      },
      {
        title: "Restrictions",
        description:
          "accept, maxSizeMB and maxFiles reject invalid files with an inline message and an onError callback.",
        code: `<FileUpload
  multiple
  accept="image/*"
  maxSizeMB={2}
  maxFiles={3}
  label="Upload product images"
  onError={(message, file) => console.warn(message, file)}
/>`,
        preview: (
          <div className="w-full max-w-md">
            <FileUpload
              multiple
              accept="image/*"
              maxSizeMB={2}
              maxFiles={3}
              label="Upload product images"
            />
          </div>
        ),
      },
      {
        title: "Single File",
        code: `<FileUpload accept=".pdf" label="Upload your CV" description="PDF only, max 5 MB" maxSizeMB={5} />`,
        preview: (
          <div className="w-full max-w-md">
            <FileUpload accept=".pdf" label="Upload your CV" description="PDF only, max 5 MB" maxSizeMB={5} />
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "onFilesChange", type: "(files: File[]) => void", default: "—", description: "Fired with the full current list on every change" },
      { prop: "onError", type: "(message, file) => void", default: "—", description: "Fired for each rejected file" },
      { prop: "multiple", type: "boolean", default: "false", description: "Allow multiple files" },
      { prop: "accept", type: "string", default: "—", description: 'Native accept filter, e.g. "image/*,.pdf"' },
      { prop: "maxSizeMB", type: "number", default: "—", description: "Per-file size limit" },
      { prop: "maxFiles", type: "number", default: "—", description: "Total file count limit" },
      { prop: "label", type: "string", default: '"Click to upload…"', description: "Headline inside the drop zone" },
      { prop: "description", type: "string", default: "auto", description: "Sub-line; defaults to a summary of the active limits" },
      { prop: "hideFileList", type: "boolean", default: "false", description: "Hide the built-in selected-files list" },
      { prop: "disabled", type: "boolean", default: "false", description: "Lock the drop zone" },
      { prop: "dropzoneClassName", type: "string", default: "—", description: "Styles the drop zone label/container." },
      { prop: "iconClassName", type: "string", default: "—", description: "Styles the upload icon wrapper." },
      { prop: "labelClassName", type: "string", default: "—", description: "Styles the headline text inside the drop zone." },
      { prop: "descriptionClassName", type: "string", default: "—", description: "Styles the sub-line description text." },
      { prop: "errorClassName", type: "string", default: "—", description: "Styles the inline rejection message." },
      { prop: "listClassName", type: "string", default: "—", description: "Styles the selected-files list container." },
      { prop: "fileItemClassName", type: "string", default: "—", description: "Styles each file row in the list." },
      { prop: "fileIconClassName", type: "string", default: "—", description: "Styles the file icon in each row." },
      { prop: "fileNameClassName", type: "string", default: "—", description: "Styles the file name text." },
      { prop: "fileSizeClassName", type: "string", default: "—", description: "Styles the file size text." },
      { prop: "removeButtonClassName", type: "string", default: "—", description: "Styles the per-file remove button." },
    ]}
    a11y={[
      "The drop zone is a real <label> wrapping a visually hidden file input — clicking and keyboard activation both open the browser dialog.",
      "A focus ring appears on the zone via focus-within when the hidden input is focused.",
      "Rejection messages render with role=alert; remove buttons are labelled per file.",
    ]}
  />
);

export default FileUploadDocs;
