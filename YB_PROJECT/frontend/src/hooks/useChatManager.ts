import { useState, useCallback, useRef, useEffect } from "react";

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

export const useChatManager = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock chat history data
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Phân tích và tối ưu kênh YouTube bóng đá",
      timestamp: new Date("2025-01-04T09:27:00"),
      preview: "Analyzing football channel performance...",
    },
    {
      id: "2",
      title: "Clarifying Your YouTube Questions",
      timestamp: new Date("2024-07-01"),
      preview: "Questions about content strategy...",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    // Transition to chat interface if not already shown
    if (!showChatInterface) {
      setShowChatInterface(true);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I understand you're asking about "${inputValue}". As your AI Coach, I can help you with video optimization, content strategy, and YouTube growth. Let me provide some personalized recommendations based on your channel data.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  }, [inputValue, isLoading, showChatInterface]);

  const handleQuickAction = useCallback((_actionId: string, label: string) => {
    setInputValue(label);
    setShowChatInterface(true);
    // Auto-send the message after a short delay to simulate user interaction
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "user",
        content: label,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: `Great! I'll help you with "${label}". Based on your channel data, here are some personalized recommendations...`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    }, 100);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleInputFocus = useCallback(() => {
    if (!showChatInterface) {
      setShowChatInterface(true);
    }
  }, [showChatInterface]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
      if (!showChatInterface && e.target.value.trim()) {
        setShowChatInterface(true);
      }
    },
    [showChatInterface]
  );

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setInputValue("");
    setShowChatInterface(false);
    setIsLoading(false);
  }, []);

  const toggleHistory = useCallback(() => {
    setIsHistoryOpen(!isHistoryOpen);
  }, [isHistoryOpen]);

  const closeHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  return {
    // State
    messages,
    inputValue,
    isLoading,
    isHistoryOpen,
    showChatInterface,
    chatHistory,
    messagesEndRef,

    // Handlers
    handleSendMessage,
    handleQuickAction,
    handleKeyPress,
    handleInputFocus,
    handleInputChange,
    handleNewChat,
    toggleHistory,
    closeHistory,

    // Setters
    setInputValue,
  };
};
