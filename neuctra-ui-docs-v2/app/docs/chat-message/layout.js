import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "Chat Message - React Conversation UI | Neuctra UI";
const DESCRIPTION =
  "Compose chat interfaces with role-aware message bubbles, streaming and thinking states, author details and an auto-scrolling message list.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react chat message, chat bubble component, conversation ui react, streaming message ui, message list react, neuctra ui chat",
  path: "/docs/chat-message",
});

const chatMessageFaq = buildComponentFaq("ChatMessage", {
  variants: ["user", "assistant", "system"],
});

export default function ChatMessageLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Chat Message", path: "/docs/chat-message" },
          ]),
          techArticleSchema({
            name: "ChatMessage",
            description: DESCRIPTION,
            path: "/docs/chat-message",
          }),
          faqSchema(chatMessageFaq),
        ]}
      />
      {children}
    </>
  );
}
