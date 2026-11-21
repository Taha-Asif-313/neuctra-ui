"use client";

import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import { CopyButton } from "./CopyButton";
import { cn } from "../../lib/cn";

/** Conversation role used to style and label a chat message. */
export type ChatMessageRole = "user" | "assistant" | "system";

export interface ChatMessageProps {
  /** Role of the message author; controls alignment and colors. */
  role: ChatMessageRole;
  /** Message content. Plain strings are also offered as a copy value. */
  children: React.ReactNode;
  /** Optional author name shown above the bubble. */
  author?: string;
  /** Optional avatar node rendered beside the bubble; defaults to an Avatar with the author's initial. */
  avatar?: React.ReactNode;
  /** Image URL for the default Avatar (ignored when `avatar` is set); falls back to the initial if it fails to load. */
  avatarSrc?: string;
  /** Optional formatted timestamp shown next to the author. */
  timestamp?: string;
  /** Machine-readable value for the timestamp's `<time dateTime>`. */
  dateTime?: string;
  /** Shows a blinking caret at the end of the content while streaming. */
  streaming?: boolean;
  /** Shows a "Thinking..." status line above the content. */
  thinking?: boolean;
  /** Extra controls rendered in the message header (right aligned). */
  actions?: React.ReactNode;
  /** Shows a copy button for string content. */
  copyable?: boolean;
  /** Text copied by the copy button; defaults to `children` when it is a string. */
  copyValue?: string;
  /** Additional classes for the outermost row. */
  className?: string;
  /** Inline styles for the outermost row. */
  style?: React.CSSProperties;
  /** Styles the avatar circle. */
  avatarClassName?: string;
  /** Styles the header row (author, timestamp, actions). */
  headerClassName?: string;
  /** Styles the message bubble. */
  bubbleClassName?: string;
}

const ROLE_LABELS: Record<ChatMessageRole, string> = {
  user: "You",
  assistant: "Assistant",
  system: "System",
};

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  function ChatMessage(
    {
      role,
      children,
      author,
      avatar,
      avatarSrc,
      timestamp,
      dateTime,
      streaming = false,
      thinking = false,
      actions,
      copyable = false,
      copyValue: copyValueProp,
      className,
      style,
      avatarClassName,
      headerClassName,
      bubbleClassName,
    },
    ref,
  ) {
    const isUser = role === "user";
    const isSystem = role === "system";
    const name = author ?? ROLE_LABELS[role] ?? ROLE_LABELS.assistant;
    const copyValue = copyValueProp ?? (typeof children === "string" ? children : null);
    const showCopy = copyable && copyValue !== null && copyValue !== "";

    const copyButton = showCopy ? (
      <CopyButton value={copyValue!} size="sm" aria-label="Copy message" />
    ) : null;

    if (isSystem) {
      return (
        <div
          ref={ref}
          role="article"
          data-role={role}
          aria-label={`${name} message`}
          style={style}
          className={cn("flex w-full flex-col items-center gap-1.5 text-center", className)}
        >
          <div
            className={cn(
              "max-w-full rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground",
              bubbleClassName,
            )}
          >
            {children}
          </div>
          {(copyButton || actions) && (
            <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", headerClassName)}>
              {copyButton}
              {actions}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="article"
        data-role={role}
        aria-label={`${name} message`}
        aria-busy={streaming || thinking || undefined}
        style={style}
        className={cn("flex w-full gap-3", isUser && "flex-row-reverse", className)}
      >
        {avatar !== undefined ? (
          <div
            aria-hidden="true"
            className={cn(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-semibold [&_img]:h-full [&_img]:w-full [&_img]:object-cover",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
              avatarClassName,
            )}
          >
            {avatar}
          </div>
        ) : (
          // Decorative: the article label and header already name the author.
          <div aria-hidden="true" className="mt-0.5 shrink-0">
            <Avatar
              size="sm"
              src={avatarSrc}
              alt={name}
              fallback={name.slice(0, 1).toUpperCase()}
              className={avatarClassName}
              fallbackClassName={cn(
                "text-xs",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
              )}
            />
          </div>
        )}

        <div
          className={cn(
            "flex min-w-0 max-w-[min(100%,36rem)] flex-col gap-1.5",
            isUser && "items-end",
          )}
        >
          <div
            className={cn(
              "flex min-h-7 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
              isUser && "flex-row-reverse",
              headerClassName,
            )}
          >
            <span className="font-medium text-foreground">{name}</span>
            {timestamp && <time dateTime={dateTime}>{timestamp}</time>}
            {(copyButton || actions) && (
              <span className={cn("flex items-center gap-1", isUser ? "mr-auto" : "ml-auto")}>
                {copyButton}
                {actions}
              </span>
            )}
          </div>

          {thinking && (
            <div role="status" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground motion-reduce:animate-none"
              />
              Thinking...
            </div>
          )}

          {(children !== null && children !== undefined && children !== "") || streaming ? (
            <div
              className={cn(
                "min-w-0 whitespace-pre-wrap break-words rounded-xl px-4 py-2.5 text-sm leading-relaxed",
                isUser
                  ? "rounded-tr-sm bg-primary text-primary-foreground"
                  : "rounded-tl-sm border border-border bg-card text-card-foreground",
                bubbleClassName,
              )}
            >
              {children}
              {streaming && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-text-bottom motion-reduce:animate-none"
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

ChatMessage.displayName = "ChatMessage";

export interface MessageListProps {
  /** Chat messages, typically <ChatMessage /> elements. */
  children?: React.ReactNode;
  /** Keeps the newest message in view while the reader is already at the bottom. */
  autoScroll?: boolean;
  /** Id of the message currently streaming; changing it triggers auto-scroll. */
  streamingId?: string;
  /** Content shown when there are no messages. */
  emptyState?: React.ReactNode;
  /** Accessible label for the scrollable log. */
  ariaLabel?: string;
  /** Additional classes for the scrollable container. */
  className?: string;
  /** Inline styles for the scrollable container. */
  style?: React.CSSProperties;
}

// Distance (px) from the bottom within which the list keeps following new content.
const STICK_THRESHOLD = 48;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  function MessageList(
    {
      children,
      autoScroll = true,
      streamingId,
      emptyState,
      ariaLabel = "Conversation",
      className,
      style,
    },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement | null>(null);
    // Starts true so the first render lands at the newest message.
    const stickToBottom = useRef(true);

    const isEmpty = React.Children.toArray(children).length === 0;

    // Only follow new content while the reader is at the bottom; scrolling up
    // to read history must not be yanked back down on every streamed token.
    useIsoLayoutEffect(() => {
      if (!autoScroll || !stickToBottom.current) return;
      const node = innerRef.current;
      if (node) node.scrollTop = node.scrollHeight;
    }, [autoScroll, children, streamingId]);

    return (
      <div
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="log"
        aria-label={ariaLabel}
        tabIndex={0}
        onScroll={(event) => {
          const node = event.currentTarget;
          stickToBottom.current =
            node.scrollHeight - node.scrollTop - node.clientHeight <= STICK_THRESHOLD;
        }}
        style={style}
        className={cn(
          "flex min-h-0 flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-card p-4",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        {isEmpty
          ? (emptyState ?? (
              <p className="m-auto py-8 text-center text-sm text-muted-foreground">
                No messages yet.
              </p>
            ))
          : children}
      </div>
    );
  },
);

MessageList.displayName = "MessageList";
