import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNeuctraLlm } from "../hooks/useNeuctraLlm";
import neuctraAiReference from "../../neuctra-ui-ai-reference.json";
import { chatStorage, generateChatTitle, getLastMessagePreview } from "./utils/chatStorage";
import { useStreamingChat } from "./hooks/useStreamingChat";

// Components
import ChatSidebar from "./components/ChatSidebar";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import ChatHeader from "./components/ChatHeader";
import TypingIndicator from "./components/TypingIndicator";
import SuggestionChips from "./components/SuggestionChips";


const SYSTEM_PROMPT = `You are Neuctra UI Bot, an expert React UI generator for @neuctra/ui.
Always generate practical, modern, production-friendly UI.
Rules:
1) Use only components available in @neuctra/ui plus standard React + className utilities.
2) Prefer controlled forms and accessible labels.
3) Keep output concise and ready to paste.
4) Avoid unsupported props.
5) Include responsive classes where useful.

Return STRICT JSON only in this format:
{
  "title": "Short title",
  "message": "Brief explanation of what was generated",
  "code": "full JSX/TSX code string"
}`;


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

const NeuctraUiChatBot = () => {
  const {
    config,
    updateConfig,
    loading,
    error: llmError,
    generate,
  } = useNeuctraLlm({
    systemPrompt: SYSTEM_PROMPT,
    referenceJson: neuctraAiReference,
  });

  // State management
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const messagesEndRef = useRef(null);
  const { isStreaming, streamingMessage, startStreaming, stopStreaming } = useStreamingChat();

  // Load saved data on mount
  useEffect(() => {
    const savedChats = chatStorage.loadChats();
    const savedCurrentChatId = chatStorage.loadCurrentChatId();
    const savedConfig = chatStorage.loadConfig();
    
    if (savedConfig && Object.keys(savedConfig).length > 0) {
      updateConfig(savedConfig);
    }
    
    setChats(savedChats);
    
    if (savedCurrentChatId && savedChats.find(c => c.id === savedCurrentChatId)) {
      setCurrentChatId(savedCurrentChatId);
      const chat = savedChats.find(c => c.id === savedCurrentChatId);
      setMessages(chat.messages || []);
    } else {
      // Start with welcome message
      const welcomeMessage = {
        id: makeId(),
        role: "assistant",
        title: "Neuctra UI Bot Ready",
        text: "Hi! I can generate React + Tailwind UI using only @neuctra/ui components. Configure model settings and describe what you want.",
        code: "",
        language: "jsx",
        rawResponse: "",
        error: "",
        timestamp: Date.now(),
      };
      
      const newChat = {
        id: makeId(),
        title: "New Chat",
        messages: [welcomeMessage],
        messageCount: 1,
        timestamp: Date.now(),
        lastMessage: getLastMessagePreview([welcomeMessage])
      };
      
      setChats([newChat]);
      setCurrentChatId(newChat.id);
      setMessages([welcomeMessage]);
      chatStorage.saveChats([newChat]);
      chatStorage.saveCurrentChatId(newChat.id);
    }
  }, []);

  // Save messages to local storage
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      const chatTitle = generateChatTitle(messages);
      const lastMessage = getLastMessagePreview(messages);
      
      chatStorage.updateChat(currentChatId, {
        messages,
        title: chatTitle,
        lastMessage,
        messageCount: messages.length,
        timestamp: Date.now()
      });
      
      // Update chats list
      setChats(prev => {
        const updated = prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages, title: chatTitle, lastMessage, messageCount: messages.length, timestamp: Date.now() }
            : chat
        );
        chatStorage.saveChats(updated);
        return updated;
      });
    }
  }, [messages, currentChatId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Generate chat history for LLM
  const history = useMemo(
    () =>
      messages
        .filter((m) => m.role === "user" || (m.role === "assistant" && m.text))
        .slice(-8)
        .map((m) => ({
          role: m.role,
          content:
            m.role === "assistant" ? `${m.text}\n${m.code || ""}` : m.text,
        })),
    [messages],
  );

  // Chat management functions
  const handleNewChat = useCallback(() => {
    const newChatId = makeId();
    const welcomeMessage = {
      id: makeId(),
      role: "assistant",
      title: "Neuctra UI Bot Ready",
      text: "Hi! I can generate React + Tailwind UI using only @neuctra/ui components. Configure model settings and describe what you want.",
      code: "",
      language: "jsx",
      rawResponse: "",
      error: "",
      timestamp: Date.now(),
    };
    
    const newChat = {
      id: newChatId,
      title: "New Chat",
      messages: [welcomeMessage],
      messageCount: 1,
      timestamp: Date.now(),
      lastMessage: getLastMessagePreview([welcomeMessage])
    };
    
    setChats(prev => {
      const updated = [newChat, ...prev];
      chatStorage.saveChats(updated);
      return updated;
    });
    
    setCurrentChatId(newChatId);
    setMessages([welcomeMessage]);
    chatStorage.saveCurrentChatId(newChatId);
    setInputValue("");
  }, []);

  const handleSelectChat = useCallback((chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages || []);
      chatStorage.saveCurrentChatId(chatId);
      setInputValue("");
    }
  }, [chats]);

  const handleDeleteChat = useCallback((chatId) => {
    const updatedChats = chatStorage.deleteChat(chatId);
    setChats(updatedChats);
    
    if (currentChatId === chatId) {
      // Select another chat or create new one
      if (updatedChats.length > 0) {
        handleSelectChat(updatedChats[0].id);
      } else {
        handleNewChat();
      }
    }
  }, [currentChatId, handleSelectChat, handleNewChat]);

  const handleRenameChat = useCallback((chatId, newTitle) => {
    const updatedChats = chatStorage.updateChat(chatId, { title: newTitle });
    setChats(updatedChats);
  }, []);

  // Message handling
  const handleSend = async (e, promptText = null) => {
    if (e) e.preventDefault();
    const text = String(promptText ?? inputValue).trim();
    if (!text || loading) return;

    setInputValue("");

    // Add user message
    const userMessage = {
      id: makeId(),
      role: "user",
      text,
      code: "",
      language: "jsx",
      error: "",
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Add assistant placeholder
    const assistantId = makeId();
    const assistantMessage = {
      id: assistantId,
      role: "assistant",
      title: "Generating",
      text: "",
      code: "",
      language: "jsx",
      rawResponse: "",
      error: "",
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    startStreaming(assistantId);

    try {
      const result = await generate({ userPrompt: text, history });
      
      // Update assistant message with result
      setMessages(prev =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                title: result.title || "Generated UI",
                text: result.message || "Done. Here is your generated UI code:",
                code: result.code,
                language: "jsx",
                rawResponse: result.raw,
                error: "",
              }
            : msg,
        ),
      );
    } catch (error) {
      setMessages(prev =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                title: "Generation failed",
                text: "Generation failed.",
                code: "",
                rawResponse: "",
                error:
                  error?.message ||
                  "Unable to generate right now. Check your Base URL, API key, and model.",
              }
            : msg,
        ),
      );
    } finally {
      stopStreaming();
    }
  };

  const handleConfigUpdate = useCallback((newConfig) => {
    updateConfig(newConfig);
    chatStorage.saveConfig(newConfig);
  }, [updateConfig]);

  return (
    <div className="relative flex min-h-screen bg-black text-zinc-100 font-primary antialiased selection:bg-primary/30 overflow-hidden">
      <AnimatedBackground />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80 md:w-80' : 'w-0'} transition-all duration-300 overflow-hidden flex-shrink-0 fixed md:relative h-full z-20 md:z-auto`}>
        <ChatSidebar
          chats={chats}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onRenameChat={handleRenameChat}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          model={config.model || "Not configured"}
          onNewChat={handleNewChat}
          isReady={!llmError}
          error={llmError}
          config={config}
          onUpdateConfig={handleConfigUpdate}
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Messages Area */}
        <div className="relative z-10 flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-4xl mx-auto w-full px-4 py-8">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isUser={msg.role === "user"}
                  isStreaming={streamingMessage === msg.id}
                />
              ))}
            </AnimatePresence>
            
            {loading && !isStreaming && <TypingIndicator />}

            {messages.length === 1 && !loading && (
              <SuggestionChips
                onSuggestionClick={(text) => handleSend(null, text)}
                disabled={loading}
              />
            )}
            
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSend}
          disabled={loading}
          placeholder="Describe the component you want to generate..."
        />
      </div>
    </div>
  );
};

export default NeuctraUiChatBot;
