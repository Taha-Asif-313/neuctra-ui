import React, { useEffect, useMemo, useRef, useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Code2,
  Eye,
  Loader2,
  RefreshCw,
  Terminal,
  MessageSquare,
} from "lucide-react";
import CodeBlock from "../../components/Docs/CodeBlock";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { createUiCreationClient } from "../../utils/uiCreationAgent";

const makeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
    <div
      className="w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

const DataStream = ({ delay = 0, left = "50%" }) => (
  <motion.div
    className="absolute w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent pointer-events-none"
    style={{ height: "220px", left, top: -220 }}
    animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
    transition={{ duration: 3.5, delay, repeat: Infinity, ease: "linear" }}
  />
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <GridPattern />
    {[...Array(6)].map((_, i) => (
      <DataStream key={i} delay={i * 0.8} left={`${12 + i * 15}%`} />
    ))}
  </div>
);

const BotCodeResult = ({ code, language = "jsx" }) => (
  <div className="w-full mt-2 space-y-4">
    <CodePreviewBlock
      code={code}
      language={language}
      previewContent={
        <LiveProvider code={code} noInline={false}>
          <LiveError className="text-rose-300 text-sm p-4 bg-rose-950/60 rounded-lg border border-rose-700/30 max-w-3xl mb-3" />
          <LivePreview className="w-full flex justify-center" />
        </LiveProvider>
      }
    />
    <CodeBlock code={code} language={language} showLineNumbers={true} />
  </div>
);

const ChatMessage = ({ message, isUser }) => (
  <motion.div
    className={`flex w-full mb-8 ${isUser ? "justify-end" : "justify-start"}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
  >
    <div className={`flex gap-4 max-w-[92%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
          isUser
            ? "bg-primary text-white"
            : "bg-gradient-to-br from-primary to-emerald-500 text-white"
        }`}
      >
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} w-full space-y-3`}>
        <div
          className={`px-5 py-3.5 rounded-2xl shadow-sm ${
            isUser
              ? "bg-primary text-white rounded-tr-sm"
              : "bg-zinc-900/80 text-zinc-100 rounded-tl-sm border border-zinc-800"
          }`}
        >
          <p className="leading-relaxed whitespace-pre-wrap text-[15px]">{message.text}</p>
          {!!message.error && (
            <p className="mt-2 text-sm text-rose-400">{message.error}</p>
          )}
        </div>
        {!isUser && message.code && <BotCodeResult code={message.code} language={message.language} />}
      </div>
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <motion.div
    className="flex w-full mb-8 justify-start"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex gap-4 max-w-[92%] flex-row">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shadow-lg">
        <Bot size={20} className="text-white" />
      </div>
      <div className="bg-zinc-900/80 border border-zinc-800 px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-3">
        <motion.span className="w-2 h-2 bg-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
        <motion.span className="w-2 h-2 bg-primary/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
        <motion.span className="w-2 h-2 bg-primary/30 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
      </div>
    </div>
  </motion.div>
);

const SuggestionChip = ({ text, onClick, icon: Icon, disabled }) => (
  <button
    onClick={() => onClick(text)}
    disabled={disabled}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-primary/40 text-sm text-zinc-400 hover:text-zinc-100 transition-all disabled:opacity-50"
  >
    {Icon && <Icon size={14} className="text-primary" />}
    <span>{text}</span>
  </button>
);

const NeuctraUiChatBot = () => {
  const client = useMemo(() => createUiCreationClient(), []);
  const [messages, setMessages] = useState([
    {
      id: makeId(),
      role: "assistant",
      text: "Hi! I can generate React + Tailwind UI using Neuctra components. Describe what you want to build.",
      code: "",
      language: "jsx",
      error: "",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e, promptText = null) => {
    if (e) e.preventDefault();
    const text = String(promptText ?? inputValue).trim();
    if (!text || loading) return;

    setLoading(true);
    setInputValue("");

    setMessages((prev) => [
      ...prev,
      { id: makeId(), role: "user", text, code: "", language: "jsx", error: "" },
    ]);

    const assistantId = makeId();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: "assistant",
        text: "Generating UI code...",
        code: "",
        language: "jsx",
        error: "",
      },
    ]);

    try {
      const result = await client.generate(text);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                text: "Done. Here is your generated UI code:",
                code: result.code,
                language: "jsx",
                error: "",
              }
            : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                text: "Generation failed.",
                code: "",
                error:
                  error?.message ||
                  "Unable to generate right now. Check your API configuration and try again.",
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () =>
    setMessages([
      {
        id: makeId(),
        role: "assistant",
        text: "Chat reset. Tell me what UI you want to generate next.",
        code: "",
        language: "jsx",
        error: "",
      },
    ]);

  const suggestions = [
    { text: "Create a login card", icon: Terminal },
    { text: "Build a pricing table", icon: Code2 },
    { text: "Design a dashboard widget", icon: Eye },
    { text: "Generate a responsive navbar", icon: MessageSquare },
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-primary antialiased selection:bg-primary/30 overflow-hidden">
      <AnimatedBackground />

      <motion.header
        className="z-10 px-4 md:px-6 py-4 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800 sticky top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <img src="/logo.png" alt="Neuctra UI logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">
                Neuctra<span className="text-primary">UI</span> Bot
              </h1>
              <p className="text-xs text-zinc-400">
                API: <span className="text-zinc-300">{client.baseUrl || "Not configured"}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition-colors"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </motion.header>

      <div className="relative z-10 flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-6xl mx-auto w-full px-4 py-8">
          <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 md:p-5">
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed">
              This bot is fully connected to <code className="text-primary">/api/ui/generate</code>. Prompt it with any UI requirement and get production-ready component code.
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} isUser={msg.role === "user"} />
            ))}
          </AnimatePresence>
          {loading && <TypingIndicator />}

          {messages.length === 1 && !loading && (
            <motion.div
              className="flex flex-wrap gap-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {suggestions.map((suggestion) => (
                <SuggestionChip
                  key={suggestion.text}
                  text={suggestion.text}
                  icon={suggestion.icon}
                  disabled={loading}
                  onClick={(text) => handleSend(null, text)}
                />
              ))}
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      <div className="relative z-10 p-4 md:p-6 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSend} className="relative">
            <div className="relative flex items-end gap-2 bg-zinc-900/85 backdrop-blur-sm border border-zinc-700 rounded-2xl shadow-2xl p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder="Describe the component you want to generate..."
                className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 px-4 py-3.5 max-h-32 min-h-[56px] focus:outline-none resize-none text-[15px]"
                rows={1}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="inline-flex items-center justify-center rounded-xl px-4 py-3 bg-primary text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
            <p className="text-center text-xs text-zinc-500 mt-3">
              Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-xs font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-xs font-mono">Shift + Enter</kbd> for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NeuctraUiChatBot;