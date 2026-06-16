import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Eye, MessageSquare, Zap, Layout, Shield, CreditCard } from "lucide-react";

const SuggestionChip = ({ text, onClick, icon: Icon, disabled = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(text)}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-zinc-900/30 border-zinc-800 text-zinc-600"
          : "bg-zinc-900/60 hover:bg-zinc-900 border-zinc-700 hover:border-primary/40 text-zinc-400 hover:text-zinc-100 hover:shadow-lg"
      }`}
    >
      {Icon && <Icon size={14} className="text-primary" />}
      <span className="text-sm font-medium">{text}</span>
    </motion.button>
  );
};

const SuggestionChips = ({ onSuggestionClick, disabled = false, className = "" }) => {
  const suggestions = [
    { text: "Create a login card", icon: Terminal },
    { text: "Build a pricing table", icon: CreditCard },
    { text: "Design a dashboard widget", icon: Eye },
    { text: "Generate a responsive navbar", icon: Layout },
    { text: "Create a form with validation", icon: Shield },
    { text: "Build a chat interface", icon: MessageSquare },
    { text: "Design a hero section", icon: Zap },
    { text: "Create a data table", icon: Code2 },
  ];

  return (
    <motion.div
      className={`flex flex-wrap gap-2 mt-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="w-full mb-3">
        <h3 className="text-sm font-medium text-zinc-300 mb-2">Try these suggestions:</h3>
      </div>
      
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={suggestion.text}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.1 + index * 0.05,
            type: "spring",
            stiffness: 100
          }}
        >
          <SuggestionChip
            text={suggestion.text}
            icon={suggestion.icon}
            disabled={disabled}
            onClick={onSuggestionClick}
          />
        </motion.div>
      ))}
      
      {/* Custom prompt chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.3, 
          delay: 0.6,
          type: "spring",
          stiffness: 100
        }}
      >
        <SuggestionChip
          text="Or describe your own component..."
          icon={Zap}
          disabled={disabled}
          onClick={onSuggestionClick}
        />
      </motion.div>
    </motion.div>
  );
};

export default SuggestionChips;
