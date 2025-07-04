import { memo, useState, useCallback, useRef, useEffect } from "react";
import {
  AiOutlineRobot,
  AiOutlineSend,
  AiOutlinePaperClip,
  AiOutlineBulb,
  AiOutlineEye,
  AiOutlineBarChart,
  AiOutlineFileText,
  AiOutlineLineChart,
  AiOutlineHistory,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFire,
  AiOutlinePlus,
} from "react-icons/ai";
import { Button } from "../components/ui/buttons";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

const AiChatPage = memo(function AiChatPage() {
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

  const quickActions = [
    { id: "video-ideas", label: "Give me video ideas", icon: AiOutlineBulb },
    { id: "more-views", label: "Get more views", icon: AiOutlineEye },
    { id: "channel-audit", label: "Channel audit", icon: AiOutlineBarChart },
    {
      id: "review-video",
      label: "Review my latest video",
      icon: AiOutlineFileText,
    },
  ];

  const aiFeatures = [
    { id: "ai-abilities", label: "AI Coach abilities", icon: AiOutlineRobot },
    { id: "current-trends", label: "Current trends", icon: AiOutlineFire },
    {
      id: "competitor-analysis",
      label: "Competitor analysis",
      icon: AiOutlineBarChart,
    },
    {
      id: "vidiq-tools",
      label: "vidIQ tools",
      icon: AiOutlineLineChart,
      active: true,
    },
  ];

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

  return (
    <div className="h-full bg-gray-900 flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-800 p-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <AiOutlineRobot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Coach</h1>
                <p className="text-gray-400 text-sm">
                  Powered by your YouTube data
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* New Chat Button (show only when in chat interface) */}
              {showChatInterface && (
                <button
                  onClick={handleNewChat}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="New Chat"
                >
                  <AiOutlinePlus className="w-4 h-4" />
                  <span className="text-sm">New Chat</span>
                </button>
              )}

              {/* History Toggle Button */}
              <button
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Chat History"
              >
                <AiOutlineHistory className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {!showChatInterface ? (
            // Welcome Screen
            <div className="h-full flex flex-col items-center justify-center px-6 py-8">
              {/* Welcome Message */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  How can I help you today?
                </h2>
              </div>

              {/* Quick Action Cards */}
              <div className="w-full max-w-4xl mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() =>
                          handleQuickAction(action.id, action.label)
                        }
                        className="flex items-center justify-start p-4 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600/50 rounded-lg transition-all duration-200 text-left group"
                      >
                        <Icon className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-white font-medium">
                          {action.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Features Pills */}
              <div className="w-full max-w-4xl mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                  {aiFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <button
                        key={feature.id}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                          feature.active
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{feature.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Response Counter */}
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <div className="w-3 h-3 border border-gray-600 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                  <span>18 responses left this month</span>
                </div>
              </div>
            </div>
          ) : (
            // Chat Messages
            <div className="px-6 py-4 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[70%] ${
                      message.type === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 ${
                        message.type === "user" ? "ml-3" : "mr-3"
                      }`}
                    >
                      {message.type === "assistant" ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <AiOutlineRobot className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            You
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700"
                      }`}
                    >
                      {message.type === "assistant" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-blue-400 text-sm">
                            AI Coach
                          </span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading Message */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[70%]">
                    <div className="mr-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <AiOutlineRobot className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-800 text-gray-100 rounded-2xl rounded-bl-md border border-gray-700">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-blue-400 text-sm">
                          AI Coach
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-6 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              {/* Attachment Button - only show in chat interface */}
              {showChatInterface && (
                <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors">
                  <AiOutlinePaperClip className="w-5 h-5" />
                </button>
              )}

              {/* Input Field */}
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    showChatInterface
                      ? "Ask anything..."
                      : "Ask your AI Coach anything..."
                  }
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    !showChatInterface ? "text-center" : ""
                  }`}
                  rows={1}
                  style={{
                    minHeight: "48px",
                    maxHeight: "120px",
                  }}
                />
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <AiOutlineSend className="w-5 h-5" />
              </Button>
            </div>

            {/* Footer Options - only show in chat interface */}
            {showChatInterface && (
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-gray-400 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <AiOutlineRobot className="w-4 h-4" />
                    <span>Deep thinking</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-400 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <AiOutlinePaperClip className="w-4 h-4" />
                    <span>Attach</span>
                  </label>
                </div>
                <button className="text-blue-500 hover:text-blue-400 transition-colors">
                  <AiOutlineSend className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Sidebar */}
      {isHistoryOpen && (
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* History Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold">AI Chat History</h3>
            <button
              onClick={() => setIsHistoryOpen(false)}
              className="p-1 text-gray-400 hover:text-white rounded"
            >
              <AiOutlineClose className="w-4 h-4" />
            </button>
          </div>

          {/* History Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Today Section */}
            <div className="mb-6">
              <h4 className="text-gray-400 text-sm font-medium mb-3">Today</h4>
              <div className="space-y-2">
                {chatHistory
                  .filter((chat) => {
                    const today = new Date();
                    const chatDate = new Date(chat.timestamp);
                    return chatDate.toDateString() === today.toDateString();
                  })
                  .map((chat) => (
                    <div
                      key={chat.id}
                      className="group p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {chat.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {chat.timestamp.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 text-gray-400 hover:text-white rounded">
                            <AiOutlineEdit className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-400 rounded">
                            <AiOutlineDelete className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Older Section */}
            <div>
              <h4 className="text-gray-400 text-sm font-medium mb-3">Older</h4>
              <div className="space-y-2">
                {chatHistory
                  .filter((chat) => {
                    const today = new Date();
                    const chatDate = new Date(chat.timestamp);
                    return chatDate.toDateString() !== today.toDateString();
                  })
                  .map((chat) => (
                    <div
                      key={chat.id}
                      className="group p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {chat.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            6 months ago
                          </p>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 text-gray-400 hover:text-white rounded">
                            <AiOutlineEdit className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-400 rounded">
                            <AiOutlineDelete className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default AiChatPage;
