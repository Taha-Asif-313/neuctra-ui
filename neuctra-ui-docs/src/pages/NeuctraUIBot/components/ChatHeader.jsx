"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Settings2,
  RefreshCw,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Edit3,
  Trash2,
  Settings,
} from "lucide-react";

import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  Dropdown,
} from "@neuctra/ui";

const ChatHeader = ({
  model = "Not configured",
  onNewChat,
  isReady = true,
  error = null,
  config = {},
  onUpdateConfig,
  isSidebarOpen = false,
  onToggleSidebar,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  return (
    <>
      {/* Header */}
      <motion.header
        className="z-10 px-4 md:px-6 py-4 bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800 sticky top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Neuctra UI logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <div>
                <h1 className="font-bold text-lg tracking-tight text-white">
                  Neuctra<span className="text-primary">UI</span> Bot
                </h1>
                <p className="text-xs text-zinc-400 hidden sm:block">
                  LLM: <span className="text-zinc-300">{model}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Dropdown
              trigger={<MoreVertical className="cursor-pointer" size={24} />}
              items={[
                {
                  label: "Settings",
                  icon: <Settings size={14} />,
                  onClick: () => setIsSettingsOpen(true),
                },
                {
                  label: "New Chat",
                  icon: <RefreshCw size={14} />,
                  onClick: () => onNewChat(),
                },
              ]}
            />
          </div>
        </div>
      </motion.header>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <ModalContent
          className="w-full max-w-lg"
          onClose={() => setIsSettingsOpen(false)}
        >
          <ModalHeader
            title="LLM Configuration"
            onClose={() => setIsSettingsOpen(false)}
            icon={<Settings2 size={18} />}
          />

          <ModalBody>
            <div className="grid gap-3">
              <Input
                label="Base URL"
                value={config.baseUrl}
                onChange={(e) => onUpdateConfig({ baseUrl: e.target.value })}
                placeholder="https://api.openai.com"
              />

              <Input
                label="API Key"
                type="password"
                value={config.apiKey}
                onChange={(e) => onUpdateConfig({ apiKey: e.target.value })}
                placeholder="sk-..."
              />

              <Input
                label="Model"
                value={config.model}
                onChange={(e) => onUpdateConfig({ model: e.target.value })}
                placeholder="gpt-4o-mini"
              />
            </div>

            <p className="mt-4 text-xs text-zinc-400">
              Settings are stored locally in your browser.
            </p>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsSettingsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatHeader;
