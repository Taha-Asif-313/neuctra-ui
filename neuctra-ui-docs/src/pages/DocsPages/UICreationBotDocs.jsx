"use client";

import React, { useMemo, useRef, useState } from "react";
import { Bot, SendHorizontal, Sparkles, User2, Wand2 } from "lucide-react";
import Metadata from "../../MetaData";
import DocsFooter from "../../components/Docs/DocsFooter";
import CodeBlock from "../../components/Docs/CodeBlock";
import { createUiCreationClient } from "../../utils/uiCreationAgent";

const starterPrompts = [
  "Create a pricing section with 3 plans and a highlighted middle plan.",
  "Build a login form card with email, password, remember me, and submit button.",
  "Generate a dashboard hero with stats cards and a recent activity list.",
];

const makeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const UICreationBotDocs = () => {
  const client = useMemo(() => createUiCreationClient(), []);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: makeId(),
      role: "assistant",
      text: "Hi! I can generate React + Tailwind UI using Neuctra UI components. Describe the UI you want to build.",
      code: "",
      error: "",
    },
  ]);

  const inputRef = useRef(null);

  const pushMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const replaceMessage = (id, next) => {
    setMessages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...next } : item))
    );
  };

  const handleGenerate = async (customPrompt) => {
    const text = String(customPrompt ?? prompt).trim();
    if (!text || loading) return;

    setLoading(true);
    setPrompt("");

    pushMessage({
      id: makeId(),
      role: "user",
      text,
      code: "",
      error: "",
    });

    const assistantId = makeId();
    pushMessage({
      id: assistantId,
      role: "assistant",
      text: "Generating UI code...",
      code: "",
      error: "",
    });

    try {
      const result = await client.generate(text);
      replaceMessage(assistantId, {
        text: "Done. Here is your generated UI code:",
        code: result.code,
        error: "",
      });
    } catch (error) {
      replaceMessage(assistantId, {
        text: "Generation failed.",
        code: "",
        error:
          error?.message ||
          "Unable to generate code right now. Please check API config and try again.",
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleGenerate();
  };

  return (
    <>
      <Metadata
        title="UI Creation Bot — Neuctra UI Docs"
        description="Generate React + Tailwind UI from prompts using the Neuctra UI Creation API. Includes a scalable chatbot interface and API integration."
        keywords="Neuctra UI bot, UI generation chatbot, React UI generator, Tailwind UI generator, Neuctra API docs"
        image="https://ui.neuctra.com/og/dropdown-docs-preview.png"
        ogTitle="UI Creation Bot — Neuctra UI"
        ogDescription="Use prompts to generate modern UI code with Neuctra components."
        twitterTitle="UI Creation Bot | Neuctra UI"
        twitterDescription="Prompt-to-UI chatbot powered by Neuctra UI API."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10 relative z-0">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <header className="space-y-3">
            <h1 className="text-4xl font-extrabold text-white">
              UI Creation Bot
            </h1>
            <p className="text-lg text-gray-400 max-w-4xl leading-relaxed">
              A modern prompt-to-code chatbot for generating React + Tailwind UI.
              It calls <code className="text-primary">/api/ui/generate</code>{" "}
              from <code className="text-primary">neuctra-ui-api</code> and is
              designed for scalable extension.
            </p>
          </header>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 md:p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Chat Playground
                </h2>
                <p className="text-sm text-zinc-400">
                  API Base URL:{" "}
                  <code className="text-primary">
                    {client.baseUrl || "Not configured"}
                  </code>
                </p>
              </div>
              <div className="text-xs text-zinc-500 rounded-lg border border-zinc-800 px-3 py-2">
                Set{" "}
                <code className="text-primary">VITE_UI_CREATOR_API_BASE_URL</code>{" "}
                to change environments.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {starterPrompts.map((item) => (
                <button
                  key={item}
                  onClick={() => handleGenerate(item)}
                  disabled={loading}
                  className="text-left rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 hover:border-primary/40 hover:text-white transition disabled:opacity-60"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80">
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <article
                    key={msg.id}
                    className={`rounded-xl border p-4 ${
                      msg.role === "user"
                        ? "border-primary/30 bg-primary/10"
                        : "border-zinc-800 bg-zinc-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide mb-2">
                      {msg.role === "user" ? (
                        <User2 className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-emerald-400" />
                      )}
                      <span
                        className={
                          msg.role === "user" ? "text-primary" : "text-emerald-400"
                        }
                      >
                        {msg.role}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-200 whitespace-pre-wrap">
                      {msg.text}
                    </p>
                    {msg.error && (
                      <p className="mt-2 text-sm text-rose-400">{msg.error}</p>
                    )}
                    {msg.code && (
                      <div className="mt-3">
                        <CodeBlock
                          code={msg.code}
                          language="jsx"
                          showLineNumbers={true}
                        />
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <form onSubmit={onSubmit} className="border-t border-zinc-800 p-3">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    placeholder="Describe the UI you want to generate..."
                    className="flex-1 h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-sm text-white outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="h-11 px-4 rounded-xl bg-primary text-black font-semibold text-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Wand2 className="w-4 h-4 animate-pulse" />
                        Generating
                      </>
                    ) : (
                      <>
                        <SendHorizontal className="w-4 h-4" />
                        Send
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Scalable Integration Pattern
            </h2>
            <CodeBlock
              language="javascript"
              showLineNumbers={false}
              code={`import { createUiCreationClient } from "../../utils/uiCreationAgent";

const client = createUiCreationClient(
  import.meta.env.VITE_UI_CREATOR_API_BASE_URL
);

const { code } = await client.generate("Build a profile card with avatar and action buttons");
console.log(code);`}
            />
          </section>

          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default UICreationBotDocs;
