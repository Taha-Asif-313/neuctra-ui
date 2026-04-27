const STORAGE_KEYS = {
  CHATS: 'neuctra-chat-chats',
  CURRENT_CHAT: 'neuctra-chat-current',
  CONFIG: 'neuctra-chat-config',
};

export const chatStorage = {
  // Save all chats
  saveChats: (chats) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    } catch (error) {
      console.error('Failed to save chats:', error);
    }
  },

  // Load all chats
  loadChats: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHATS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load chats:', error);
      return [];
    }
  },

  // Save current chat ID
  saveCurrentChatId: (chatId) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CHAT, chatId);
    } catch (error) {
      console.error('Failed to save current chat ID:', error);
    }
  },

  // Load current chat ID
  loadCurrentChatId: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_CHAT);
    } catch (error) {
      console.error('Failed to load current chat ID:', error);
      return null;
    }
  },

  // Save chat configuration
  saveConfig: (config) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  },

  // Load chat configuration
  loadConfig: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load config:', error);
      return {};
    }
  },

  // Delete a specific chat
  deleteChat: (chatId) => {
    try {
      const chats = chatStorage.loadChats();
      const filteredChats = chats.filter(chat => chat.id !== chatId);
      chatStorage.saveChats(filteredChats);
      
      // If deleted chat was current, clear current chat ID
      const currentChatId = chatStorage.loadCurrentChatId();
      if (currentChatId === chatId) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT);
      }
      
      return filteredChats;
    } catch (error) {
      console.error('Failed to delete chat:', error);
      return [];
    }
  },

  // Update a specific chat
  updateChat: (chatId, updates) => {
    try {
      const chats = chatStorage.loadChats();
      const updatedChats = chats.map(chat =>
        chat.id === chatId ? { ...chat, ...updates } : chat
      );
      chatStorage.saveChats(updatedChats);
      return updatedChats;
    } catch (error) {
      console.error('Failed to update chat:', error);
      return [];
    }
  },

  // Clear all chat data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear chat data:', error);
    }
  },
};

// Helper function to generate chat title from first message
export const generateChatTitle = (messages) => {
  if (!messages || messages.length === 0) return 'New Chat';
  
  const firstUserMessage = messages.find(msg => msg.role === 'user');
  if (!firstUserMessage) return 'New Chat';
  
  const title = firstUserMessage.text.slice(0, 30);
  return title.length < firstUserMessage.text.length ? `${title}...` : title;
};

// Helper function to get last message preview
export const getLastMessagePreview = (messages) => {
  if (!messages || messages.length === 0) return '';
  
  const lastMessage = messages[messages.length - 1];
  const preview = lastMessage.text.slice(0, 50);
  return preview.length < lastMessage.text.length ? `${preview}...` : preview;
};
