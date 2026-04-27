import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Paperclip, Mic } from "lucide-react";
import { Button, Textarea } from "@neuctra/ui";

const ChatInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "Describe the component you want to generate...",
  showProPrompt = true,
  className = "",
}) => {
  const textareaRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const proPrompt = "Create a modern SaaS dashboard page with stats cards, recent activity table, and a settings drawer using only @neuctra/ui components.";

  return (
    <div className={`relative z-10 p-4 md:p-6 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent ${className}`}>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          {/* Main Input Container */}
          <motion.div
            className={`relative flex items-end gap-2 bg-zinc-900/85 backdrop-blur-sm border rounded-2xl shadow-2xl p-2 transition-all ${
              isFocused 
                ? 'ring-2 ring-primary/20 border-primary/50' 
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition-all"
                title="Attach file"
                disabled
              >
                <Paperclip size={16} />
              </button>
              <button
                type="button"
                className="p-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition-all"
                title="Voice input"
                disabled
              >
                <Mic size={16} />
              </button>
            </div>

            {/* Text Input */}
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 px-3 py-2.5 max-h-32 min-h-[56px] focus:outline-none resize-none text-[15px] border-none"
              rows={1}
              disabled={disabled}
            />

            {/* Send Button */}
            <Button
              type="submit"
              disabled={!value.trim() || disabled}
              className="inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 bg-primary text-white hover:bg-primary/90 disabled:opacity-60 transition-all"
            >
              {disabled ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Send size={18} />
              )}
            </Button>
          </motion.div>

          {/* Bottom Bar */}
          <div className="mt-3 flex items-center justify-between gap-3">
            {/* Keyboard Shortcuts */}
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-xs font-mono">
                  Enter
                </kbd>
                <span>to send</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-xs font-mono">
                  Shift + Enter
                </kbd>
                <span>for new line</span>
              </span>
            </div>

            {/* Pro Prompt Button */}
            {showProPrompt && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onChange(proPrompt)}
                className="text-xs"
              >
                Use Pro Prompt
              </Button>
            )}
          </div>

          {/* Character Count */}
          {value.length > 100 && (
            <div className="absolute -top-6 right-0 text-xs text-zinc-500">
              {value.length} characters
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
