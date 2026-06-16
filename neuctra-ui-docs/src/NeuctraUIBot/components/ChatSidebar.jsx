import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Clock,
} from "lucide-react";
import { Button } from "@neuctra/ui";

const ChatSidebar = ({
  chats = [],
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onRenameChat,
  className = "",
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleStartEdit = (chat) => {
    setEditingId(chat.id);
    setEditingTitle(chat.title);
  };

  const handleSaveEdit = () => {
    if (editingTitle.trim() && editingId) {
      onRenameChat(editingId, editingTitle.trim());
    }
    setEditingId(null);
    setEditingTitle("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className={`w-80 h-full bg-zinc-950/90 backdrop-blur-xl border-r border-zinc-800 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <Button
          onClick={onNewChat}
          iconBefore={<Plus size={14} />}
          className="gap-2 bg-primary hover:bg-primary/90 text-white"
        >

          New Chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence>
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                  currentChatId === chat.id
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-zinc-900/50 hover:bg-zinc-900/80 border border-transparent hover:border-zinc-700"
                }`}
                onClick={() => currentChatId !== chat.id && onSelectChat(chat.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    {editingId === chat.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit();
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                          className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-primary"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEdit();
                          }}
                          className="p-1 text-green-400 hover:text-green-300"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare size={14} className="text-zinc-400" />
                          <h3 className="text-sm font-medium text-zinc-100 truncate">
                            {chat.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <Clock size={10} />
                          <span>{formatTime(chat.timestamp)}</span>
                          <span className="text-zinc-600">•</span>
                          <span>{chat.messageCount} messages</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {editingId !== chat.id && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(chat);
                        }}
                        className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        <Edit3 size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Preview of last message */}
                {!editingId && chat.lastMessage && (
                  <p className="mt-2 text-xs text-zinc-500 line-clamp-2">
                    {chat.lastMessage}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {chats.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare size={32} className="mx-auto text-zinc-600 mb-2" />
            <p className="text-sm text-zinc-500">No chats yet</p>
            <p className="text-xs text-zinc-600 mt-1">Start a new conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
