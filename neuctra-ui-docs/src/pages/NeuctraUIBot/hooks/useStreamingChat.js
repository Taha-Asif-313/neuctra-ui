import { useState, useRef, useCallback } from 'react';

export const useStreamingChat = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const abortControllerRef = useRef(null);

  const startStreaming = useCallback((messageId) => {
    setIsStreaming(true);
    setStreamingMessage(messageId);
    abortControllerRef.current = new AbortController();
  }, []);

  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
    setStreamingMessage(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const updateStreamingText = useCallback((text) => {
    setStreamingMessage(prev => prev ? { ...prev, text } : null);
  }, []);

  const generateStreamingResponse = useCallback(async function* (chunks) {
    let accumulatedText = '';
    
    for await (const chunk of chunks) {
      if (abortControllerRef.current?.signal.aborted) {
        break;
      }
      
      accumulatedText += chunk;
      yield accumulatedText;
    }
  }, []);

  return {
    isStreaming,
    streamingMessage,
    startStreaming,
    stopStreaming,
    updateStreamingText,
    generateStreamingResponse,
    abortController: abortControllerRef.current,
  };
};
