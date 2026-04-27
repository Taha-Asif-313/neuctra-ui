import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <motion.div
      className="flex w-full mb-6 justify-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-4 max-w-[85%] flex-row">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shadow-lg">
          <Bot size={20} className="text-white" />
        </div>

        {/* Typing Bubble */}
        <div className="bg-zinc-900/80 border border-zinc-800 px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
          <motion.div className="flex gap-1">
            <motion.span
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <motion.span
              className="w-2 h-2 bg-primary/60 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            <motion.span
              className="w-2 h-2 bg-primary/30 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
            />
          </motion.div>
          <span className="text-xs text-zinc-500 ml-2">typing...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
