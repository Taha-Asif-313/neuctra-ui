"use client";

import React, { forwardRef, useId, useRef, useState } from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface FileUploadProps {
  /** Fired with the full current file list on every change. */
  onFilesChange?: (files: File[]) => void;
  /** Fired for each rejected file with the reason. */
  onError?: (message: string, file: File) => void;
  multiple?: boolean;
  /** Native accept string, e.g. "image/*,.pdf". */
  accept?: string;
  maxSizeMB?: number;
  maxFiles?: number;
  label?: string;
  description?: string;
  disabled?: boolean;
  /** Hide the built-in selected-files list. */
  hideFileList?: boolean;
  id?: string;
  className?: string;
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload(
    {
      onFilesChange,
      onError,
      multiple = false,
      accept,
      maxSizeMB,
      maxFiles,
      label = "Click to upload or drag and drop",
      description,
      disabled = false,
      hideFileList = false,
      id,
      className,
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const addFiles = (incoming: FileList | File[]) => {
      if (disabled) return;
      setMessage(null);

      let next = multiple ? [...files] : [];
      for (const file of Array.from(incoming)) {
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
          const msg = `"${file.name}" exceeds the ${maxSizeMB} MB limit`;
          setMessage(msg);
          onError?.(msg, file);
          continue;
        }
        if (maxFiles && next.length >= maxFiles) {
          const msg = `Maximum of ${maxFiles} files`;
          setMessage(msg);
          onError?.(msg, file);
          break;
        }
        // Skip duplicates by name + size.
        if (next.some((f) => f.name === file.name && f.size === file.size)) {
          continue;
        }
        next.push(file);
        if (!multiple) break;
      }

      setFiles(next);
      onFilesChange?.(next);
    };

    const removeFile = (index: number) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      onFilesChange?.(next);
    };

    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={inputId}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
            dragging
              ? "border-primary bg-primary/5"
              : "border-border bg-transparent hover:border-muted-foreground/50 hover:bg-accent/30",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
          )}
        >
          <input
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            id={inputId}
            type="file"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              // Allow re-selecting the same file.
              e.target.value = "";
            }}
            className="sr-only"
          />

          <span
            aria-hidden="true"
            className="rounded-full bg-muted p-3 text-muted-foreground"
          >
            <UploadCloud className="h-6 w-6" />
          </span>

          <p className="text-sm font-medium text-foreground">{label}</p>

          <p className="text-xs text-muted-foreground">
            {description ??
              [
                accept ? `Accepted: ${accept}` : null,
                maxSizeMB ? `Max ${maxSizeMB} MB` : null,
                maxFiles ? `Up to ${maxFiles} files` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
          </p>
        </label>

        {message && (
          <p role="alert" className="mt-2 text-xs font-medium text-destructive">
            {message}
          </p>
        )}

        {!hideFileList && files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${file.size}-${i}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
              >
                <FileIcon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeFile(i)}
                  className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
