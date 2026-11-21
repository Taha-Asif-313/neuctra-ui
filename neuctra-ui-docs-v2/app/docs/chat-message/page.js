"use client";

import { useEffect, useRef, useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, RotateCcw } from "lucide-react";
import { ChatMessage, MessageList, Button, Input } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const chatMessageFaq = buildComponentFaq("ChatMessage", {
  variants: ["user", "assistant", "system"],
});

const REPLY =
  "Your Pro plan renews on December 3. You can switch to annual billing from Settings, Billing to save 20%.";

function StreamingChatDemo() {
  const [messages, setMessages] = useState([
    { id: "m1", role: "assistant", text: "Hi Sara, how can I help with your workspace today?" },
  ]);
  const [draft, setDraft] = useState("When does my plan renew?");
  const [streaming, setStreaming] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const send = (event) => {
    event.preventDefault();
    if (!draft.trim() || streaming) return;
    const replyId = `r${Date.now()}`;
    setMessages((current) => [
      ...current,
      { id: `u${Date.now()}`, role: "user", text: draft.trim() },
      { id: replyId, role: "assistant", text: "" },
    ]);
    setDraft("");
    setStreaming(replyId);
    let index = 0;
    timer.current = setInterval(() => {
      index += 4;
      setMessages((current) =>
        current.map((m) => (m.id === replyId ? { ...m, text: REPLY.slice(0, index) } : m)),
      );
      if (index >= REPLY.length) {
        clearInterval(timer.current);
        setStreaming(null);
      }
    }, 40);
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <MessageList className="h-80" streamingId={streaming ?? undefined}>
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            role={m.role}
            author={m.role === "assistant" ? "Support bot" : "Sara"}
            thinking={m.id === streaming && m.text === ""}
            streaming={m.id === streaming && m.text !== ""}
            copyable={m.role === "assistant" && m.id !== streaming}
          >
            {m.text}
          </ChatMessage>
        ))}
      </MessageList>
      <form onSubmit={send} className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about billing, seats or invoices"
          label="Message"
          labelClassName="sr-only"
          wrapperClassName="flex-1 space-y-0"
        />
        <Button type="submit" disabled={!draft.trim() || Boolean(streaming)}>
          Send
        </Button>
      </form>
    </div>
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

const chatMessageProps = [
  ["role", '"user" | "assistant" | "system"', "-", "Author role; controls alignment and colors (required)."],
  ["children", "ReactNode", "-", "Message content (required)."],
  ["author", "string", "-", 'Author name. Defaults to "You", "Assistant" or "System".'],
  ["avatar", "ReactNode", "-", "Custom avatar node. Defaults to a Neuctra Avatar showing the author initial."],
  ["avatarSrc", "string", "-", "Image URL for the default Avatar (ignored when avatar is set). Falls back to the initial if it fails to load."],
  ["timestamp", "string", "-", "Formatted time shown next to the author."],
  ["dateTime", "string", "-", "Machine-readable value for the time element."],
  ["streaming", "boolean", "false", "Shows a blinking caret after the content."],
  ["thinking", "boolean", "false", 'Shows a "Thinking..." status line.'],
  ["actions", "ReactNode", "-", "Extra controls in the header."],
  ["copyable", "boolean", "false", "Shows a copy button (string content or copyValue)."],
  ["copyValue", "string", "-", "Text to copy. Defaults to children when it is a string."],
  ["className", "string", "-", "Styles the outer row."],
  ["style", "CSSProperties", "-", "Inline styles for the outer row."],
  ["avatarClassName", "string", "-", "Styles the avatar (the custom avatar wrapper or the default Avatar root)."],
  ["headerClassName", "string", "-", "Styles the author / timestamp row."],
  ["bubbleClassName", "string", "-", "Styles the message bubble."],
];

const messageListProps = [
  ["children", "ReactNode", "-", "ChatMessage elements."],
  ["autoScroll", "boolean", "true", "Follows new messages while the reader is at the bottom."],
  ["streamingId", "string", "-", "Id of the streaming message; changes trigger auto-scroll."],
  ["emptyState", "ReactNode", "-", 'Shown when there are no children. Defaults to "No messages yet."'],
  ["ariaLabel", "string", '"Conversation"', "Accessible name of the log."],
  ["className", "string", "-", "Styles the scroll container."],
  ["style", "CSSProperties", "-", "Inline styles for the scroll container."],
];

const ChatMessageDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ChatMessage Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Role-aware chat bubbles for support widgets and AI assistants, with
            thinking and streaming states, copy actions, and a MessageList that
            keeps the newest message in view.
          </p>
        </header>

        <section aria-labelledby="ChatMessage-import">
          <h2 id="ChatMessage-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { ChatMessage, MessageList } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="ChatMessage-example-0">
          <h2 id="ChatMessage-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Roles
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            user messages align right in the primary color, assistant messages
            sit on a card surface, and system messages render as a centered
            note. avatarSrc shows a photo in the built-in Avatar; without it
            the author initial is used.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ChatMessage role="system">Sara joined the conversation</ChatMessage>
<ChatMessage role="user" author="Sara" timestamp="9:41 AM" avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop">
  Can I add two more seats to our workspace?
</ChatMessage>
<ChatMessage role="assistant" author="Support bot" timestamp="9:41 AM" copyable>
  Yes. Go to Settings, Members and click Add seats. You are billed pro rata for the rest of the cycle.
</ChatMessage>`}
            previewContent={
              <div className="flex w-full max-w-xl flex-col gap-4 py-4">
                <ChatMessage role="system">Sara joined the conversation</ChatMessage>
                <ChatMessage role="user" author="Sara" timestamp="9:41 AM" avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop">
                  Can I add two more seats to our workspace?
                </ChatMessage>
                <ChatMessage role="assistant" author="Support bot" timestamp="9:41 AM" copyable>
                  Yes. Go to Settings, Members and click Add seats. You are billed pro rata for the rest of the cycle.
                </ChatMessage>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ChatMessage-example-1">
          <h2 id="ChatMessage-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Thinking, Streaming and Actions
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            thinking shows a status line before the first token, streaming adds
            a caret while text arrives, and actions adds custom header controls.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ChatMessage role="assistant" author="Assistant" thinking>{""}</ChatMessage>
<ChatMessage role="assistant" author="Assistant" streaming>
  Here is a summary of last week's churn
</ChatMessage>
<ChatMessage
  role="assistant"
  author="Assistant"
  timestamp="2m ago"
  copyable
  actions={
    <Button size="xs" variant="ghost" iconBefore={<RotateCcw />} aria-label="Regenerate">
      Retry
    </Button>
  }
>
  Churn fell to 2.1%, mostly from fewer downgrades on the Starter plan.
</ChatMessage>`}
            previewContent={
              <div className="flex w-full max-w-xl flex-col gap-4 py-4">
                <ChatMessage role="assistant" author="Assistant" thinking>{""}</ChatMessage>
                <ChatMessage role="assistant" author="Assistant" streaming>
                  Here is a summary of last week&apos;s churn
                </ChatMessage>
                <ChatMessage
                  role="assistant"
                  author="Assistant"
                  timestamp="2m ago"
                  copyable
                  actions={
                    <Button size="xs" variant="ghost" iconBefore={<RotateCcw />} aria-label="Regenerate">
                      Retry
                    </Button>
                  }
                >
                  Churn fell to 2.1%, mostly from fewer downgrades on the Starter plan.
                </ChatMessage>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ChatMessage-example-2">
          <h2 id="ChatMessage-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Support Chat with Streaming
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A complete widget. MessageList follows new tokens while you are at
            the bottom, and stops following if you scroll up to read history.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const REPLY = "Your Pro plan renews on December 3. You can switch to annual billing from Settings, Billing to save 20%.";

const [messages, setMessages] = useState([
  { id: "m1", role: "assistant", text: "Hi Sara, how can I help with your workspace today?" },
]);
const [draft, setDraft] = useState("When does my plan renew?");
const [streaming, setStreaming] = useState(null);
const timer = useRef(null);

useEffect(() => () => clearInterval(timer.current), []);

const send = (event) => {
  event.preventDefault();
  if (!draft.trim() || streaming) return;
  const replyId = \`r\${Date.now()}\`;
  setMessages((current) => [
    ...current,
    { id: \`u\${Date.now()}\`, role: "user", text: draft.trim() },
    { id: replyId, role: "assistant", text: "" },
  ]);
  setDraft("");
  setStreaming(replyId);
  let index = 0;
  timer.current = setInterval(() => {
    index += 4;
    setMessages((current) =>
      current.map((m) => (m.id === replyId ? { ...m, text: REPLY.slice(0, index) } : m)),
    );
    if (index >= REPLY.length) {
      clearInterval(timer.current);
      setStreaming(null);
    }
  }, 40);
};

<div className="flex w-full max-w-xl flex-col gap-3">
  <MessageList className="h-80" streamingId={streaming ?? undefined}>
    {messages.map((m) => (
      <ChatMessage
        key={m.id}
        role={m.role}
        author={m.role === "assistant" ? "Support bot" : "Sara"}
        thinking={m.id === streaming && m.text === ""}
        streaming={m.id === streaming && m.text !== ""}
        copyable={m.role === "assistant" && m.id !== streaming}
      >
        {m.text}
      </ChatMessage>
    ))}
  </MessageList>
  <form onSubmit={send} className="flex gap-2">
    <Input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      placeholder="Ask about billing, seats or invoices"
      label="Message"
      labelClassName="sr-only"
      wrapperClassName="flex-1 space-y-0"
    />
    <Button type="submit" disabled={!draft.trim() || Boolean(streaming)}>Send</Button>
  </form>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <StreamingChatDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ChatMessage-example-3">
          <h2 id="ChatMessage-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Empty Conversation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            MessageList shows emptyState when it has no children.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<MessageList
  className="h-48 w-full max-w-xl"
  emptyState={
    <div className="m-auto text-center">
      <p className="text-sm font-medium text-foreground">Start a conversation</p>
      <p className="text-xs text-muted-foreground">Ask about invoices, seats or integrations.</p>
    </div>
  }
>
  {[]}
</MessageList>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <MessageList
                  className="h-48 w-full max-w-xl"
                  emptyState={
                    <div className="m-auto text-center">
                      <p className="text-sm font-medium text-foreground">Start a conversation</p>
                      <p className="text-xs text-muted-foreground">Ask about invoices, seats or integrations.</p>
                    </div>
                  }
                >
                  {[]}
                </MessageList>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ChatMessage-props">
          <h2 id="ChatMessage-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            ChatMessage Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the ChatMessage component.</p>
          <PropsTable rows={chatMessageProps} />
        </section>

        <section aria-labelledby="MessageList-props">
          <h2 id="MessageList-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            MessageList Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the MessageList component.</p>
          <PropsTable rows={messageListProps} />
        </section>

        <section aria-labelledby="ChatMessage-a11y">
          <h2 id="ChatMessage-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Each message is a role="article" labelled "Sara message", "Assistant message" and so on.</li>
            <li>MessageList is a role="log" (polite live region) named by ariaLabel, and is focusable so it can be scrolled from the keyboard.</li>
            <li>Messages are aria-busy while thinking or streaming; the thinking line is a role="status".</li>
            <li>The avatar and streaming caret are aria-hidden; the copy button is labelled "Copy message".</li>
            <li>Pulse animations stop under prefers-reduced-motion.</li>
          </ul>
        </section>

        <ComponentFaq qa={chatMessageFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ChatMessageDocs;
