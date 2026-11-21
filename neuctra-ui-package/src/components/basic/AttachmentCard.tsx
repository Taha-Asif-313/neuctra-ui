"use client";

import React, { forwardRef } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileArchive,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Image as ImageIcon,
  RotateCw,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "../../lib/cn";
import { IconButton } from "./IconButton";
import { Progress } from "./Progress";

export interface AttachmentCardProps {
  /** File name displayed as the primary label. */
  name: string;
  /** Human-readable file size, e.g. "2.4 MB". */
  size?: string;
  /** Upload progress from 0 to 100; shown while `status` is "uploading". */
  progress?: number;
  /** Current attachment state. */
  status?: "uploading" | "ready" | "error";
  /** Message shown in the error state. */
  errorMessage?: React.ReactNode;
  /** Optional thumbnail URL shown instead of the file type icon. */
  thumbnail?: string;
  /** Custom leading icon; by default an icon is picked from the file extension. */
  icon?: React.ReactNode;
  /** Makes the file name a link (e.g. to preview or download the file). */
  href?: string;
  /** Card density preset. */
  cardSize?: "sm" | "md";
  /** Disables the retry and remove actions. */
  disabled?: boolean;
  /** Called when the retry action is pressed in the error state. */
  onRetry?: () => void;
  /** Called when the remove action is pressed. */
  onRemove?: () => void;
  /** Additional classes for the card root. */
  className?: string;
  /** Inline styles for the card root. */
  style?: React.CSSProperties;
  /** Styles the thumbnail or icon tile. */
  thumbnailClassName?: string;
  /** Styles the file name. */
  nameClassName?: string;
  /** Styles the status / meta line. */
  metaClassName?: string;
  /** Styles the progress track. */
  progressClassName?: string;
  /** Styles the retry and remove buttons. */
  actionClassName?: string;
}

const sizeConfig = {
  sm: { root: "gap-2.5 p-2", tile: "h-8 w-8 rounded-md [&_svg]:h-4 [&_svg]:w-4", name: "text-xs", action: "xs" },
  md: { root: "gap-3 p-3", tile: "h-10 w-10 rounded-lg [&_svg]:h-5 [&_svg]:w-5", name: "text-sm", action: "sm" },
} as const;

const EXTENSION_ICONS: Record<string, LucideIcon> = {
  png: ImageIcon, jpg: ImageIcon, jpeg: ImageIcon, gif: ImageIcon, webp: ImageIcon, svg: ImageIcon,
  mp4: FileVideo, mov: FileVideo, webm: FileVideo,
  mp3: FileAudio, wav: FileAudio, ogg: FileAudio,
  zip: FileArchive, rar: FileArchive, gz: FileArchive, "7z": FileArchive,
  csv: FileSpreadsheet, xls: FileSpreadsheet, xlsx: FileSpreadsheet,
  js: FileCode, ts: FileCode, tsx: FileCode, jsx: FileCode, json: FileCode, html: FileCode, css: FileCode,
};

function iconFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_ICONS[ext] ?? FileText;
}

// Muted ghost look for the trailing actions; IconButton supplies size, focus ring and disabled state.
const actionBase =
  "text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50";

/** Compact file row with upload progress, ready and error states. */
export const AttachmentCard = forwardRef<HTMLDivElement, AttachmentCardProps>(
  function AttachmentCard(
    {
      name,
      size,
      progress = 0,
      status = "ready",
      errorMessage = "Upload failed",
      thumbnail,
      icon,
      href,
      cardSize = "md",
      disabled = false,
      onRetry,
      onRemove,
      className,
      style,
      thumbnailClassName,
      nameClassName,
      metaClassName,
      progressClassName,
      actionClassName,
    },
    ref,
  ) {
    const sizes = sizeConfig[cardSize] ?? sizeConfig.md;
    const clamped = Math.min(100, Math.max(0, Number.isFinite(progress) ? progress : 0));
    const Icon = iconFor(name);
    const isError = status === "error";

    return (
      <div
        ref={ref}
        data-status={status}
        className={cn(
          "flex w-full min-w-0 items-center rounded-xl border bg-card",
          isError ? "border-destructive/40" : "border-border",
          sizes.root,
          className,
        )}
        style={style}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center overflow-hidden",
            isError ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary",
            sizes.tile,
            thumbnailClassName,
          )}
        >
          {thumbnail ? (
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          ) : (
            icon ?? <Icon aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              title={name}
              className={cn(
                "block truncate rounded-sm font-medium text-foreground underline-offset-4 hover:underline",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                sizes.name,
                nameClassName,
              )}
            >
              {name}
            </a>
          ) : (
            <p
              className={cn("truncate font-medium text-foreground", sizes.name, nameClassName)}
              title={name}
            >
              {name}
            </p>
          )}

          {status === "uploading" ? (
            <div className="mt-1.5">
              <Progress
                value={clamped}
                size="sm"
                label={`Uploading ${name}`}
                trackClassName={cn("h-1.5", progressClassName)}
                fillClassName="duration-200 motion-reduce:transition-none"
              />
              <p
                className={cn(
                  "mt-1 flex justify-between gap-2 text-xs tabular-nums text-muted-foreground",
                  metaClassName,
                )}
              >
                <span className="whitespace-nowrap">Uploading {Math.round(clamped)}%</span>
                {size && <span className="whitespace-nowrap">{size}</span>}
              </p>
            </div>
          ) : (
            <p
              aria-live="polite"
              className={cn(
                "mt-0.5 flex min-w-0 items-start gap-1 text-xs",
                isError ? "text-destructive" : "text-muted-foreground",
                metaClassName,
              )}
            >
              {isError ? (
                <AlertCircle aria-hidden="true" className="mt-px h-3 w-3 shrink-0" />
              ) : (
                <CheckCircle2 aria-hidden="true" className="mt-px h-3 w-3 shrink-0 text-success" />
              )}
              {/* Error copy wraps (up to two lines) instead of being cut off on narrow cards. */}
              <span className={cn("min-w-0", isError ? "line-clamp-2 break-words" : "truncate")}>
                {isError ? errorMessage : (size ?? "Ready")}
              </span>
            </p>
          )}
        </div>

        {((isError && onRetry) || onRemove) && (
          <div className="flex shrink-0 items-center gap-1">
            {isError && onRetry && (
              <IconButton
                variant="ghost"
                size={sizes.action}
                icon={<RotateCw />}
                onClick={onRetry}
                disabled={disabled}
                aria-label={`Retry upload for ${name}`}
                className={cn(actionBase, actionClassName)}
              />
            )}
            {onRemove && (
              <IconButton
                variant="ghost"
                size={sizes.action}
                icon={<X />}
                onClick={onRemove}
                disabled={disabled}
                aria-label={status === "uploading" ? `Cancel upload of ${name}` : `Remove ${name}`}
                className={cn(actionBase, actionClassName)}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);
AttachmentCard.displayName = "AttachmentCard";
