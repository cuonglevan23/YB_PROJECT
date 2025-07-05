import { useState, useRef } from "react";
import {
  FiCamera,
  FiMessageCircle,
  FiGrid,
  FiStar,
  FiClock,
  FiDownload,
  FiSend,
  FiImage,
  FiArrowRight,
  FiRefreshCw,
} from "react-icons/fi";
import {
  thumbnailsService,
  type ThumbnailGenerationRequest,
  type ThumbnailOption,
  type ChatThumbnailRequest,
} from "../services/api/thumbnailsService";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  thumbnails?: ThumbnailOption[];
}

const ThumbnailsPage = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "generate">("chat");
  const [prompt, setPrompt] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [thumbnails, setThumbnails] = useState<ThumbnailOption[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm here to help you create amazing thumbnails for your videos. You can describe what you want and I'll generate custom thumbnails for you. What kind of thumbnail are you looking for?",
      timestamp: new Date(),
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const styles = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design",
      gradient: "from-blue-400 to-blue-600",
      icon: "🎯",
    },
    {
      id: "gaming",
      name: "Gaming",
      description: "Bold and energetic style",
      gradient: "from-purple-400 to-pink-600",
      icon: "🎮",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Business and corporate",
      gradient: "from-gray-400 to-gray-600",
      icon: "💼",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Artistic and unique",
      gradient: "from-yellow-400 to-orange-600",
      icon: "🎨",
    },
    {
      id: "tech",
      name: "Tech",
      description: "Futuristic design",
      gradient: "from-green-400 to-teal-600",
      icon: "⚡",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Warm and inviting",
      gradient: "from-pink-400 to-red-500",
      icon: "🌟",
    },
  ];

  const quickPrompts = [
    "YouTube gaming tutorial with glowing keyboard",
    "Tech review with modern smartphone setup",
    "Cooking tutorial with colorful ingredients",
    "Fitness workout in modern gym",
    "Travel vlog in beautiful landscape",
    "Educational content with books and laptop",
  ];

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const currentInput = chatInput.trim();
    setChatInput("");
    setIsChatting(true);
    setError(null);

    try {
      // Try to use the chat API first
      const chatRequest: ChatThumbnailRequest = {
        message: currentInput,
        style: selectedStyle,
        count: 3,
      };

      try {
        const chatResponse = await thumbnailsService.chatThumbnailRequest(
          chatRequest
        );

        if (chatResponse.success) {
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            content: chatResponse.reply,
            timestamp: new Date(),
            thumbnails: chatResponse.thumbnails,
          };

          setChatMessages((prev) => [...prev, assistantMessage]);
          if (chatResponse.thumbnails) {
            setThumbnails(chatResponse.thumbnails);
          }
        } else {
          throw new Error(
            chatResponse.message || "Failed to process chat request"
          );
        }
      } catch (apiError) {
        // Fallback to mock response
        const mockResponse =
          thumbnailsService.generateMockChatResponse(chatRequest);

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: mockResponse.reply,
          timestamp: new Date(),
          thumbnails: mockResponse.thumbnails,
        };

        setChatMessages((prev) => [...prev, assistantMessage]);
        if (mockResponse.thumbnails) {
          setThumbnails(mockResponse.thumbnails);
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process request"
      );
    } finally {
      setIsChatting(false);
    }
  };

  const generateThumbnails = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your thumbnail");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const request: ThumbnailGenerationRequest = {
        prompt: prompt.trim(),
        style: selectedStyle,
        count: 4,
      };

      const response = await thumbnailsService.generateThumbnails(request);

      if (response.success) {
        setThumbnails(response.thumbnails);
      } else {
        throw new Error(response.message || "Failed to generate thumbnails");
      }
    } catch (error) {
      // Use mock data for development
      const mockResponse = thumbnailsService.generateMockThumbnails({
        prompt: prompt.trim(),
        style: selectedStyle,
        count: 4,
      });
      setThumbnails(mockResponse.thumbnails);
      console.log("Using mock data:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadThumbnail = async (thumbnail: ThumbnailOption) => {
    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `thumbnail-${thumbnail.style}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download thumbnail:", err);
      setError("Failed to download thumbnail");
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setPrompt(promptText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <FiCamera className="text-blue-400" />
            AI Thumbnail Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Create stunning thumbnails using AI - chat with our assistant or use
            the form
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800/50 backdrop-blur-sm p-1 rounded-2xl border border-gray-700/50">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTab === "chat"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <FiMessageCircle />
              Chat Assistant
            </button>
            <button
              onClick={() => setActiveTab("generate")}
              className={`px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTab === "generate"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <FiGrid />
              Direct Generate
            </button>
          </div>
        </div>

        {/* Chat Mode */}
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Chat Interface - Much Wider */}
            <div className="xl:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl h-[650px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FiMessageCircle className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">AI Assistant</h3>
                        <p className="text-sm text-gray-400">
                          Ready to help you create thumbnails
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Online</span>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-700/50 text-gray-100 border border-gray-600/50"
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                        {message.thumbnails && (
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            {message.thumbnails.map((thumbnail) => (
                              <div
                                key={thumbnail.id}
                                className="relative group"
                              >
                                <img
                                  src={thumbnail.url}
                                  alt={`Thumbnail ${thumbnail.id}`}
                                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-lg">
                                  <button
                                    onClick={() => downloadThumbnail(thumbnail)}
                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
                                  >
                                    <FiDownload />
                                    Download
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="text-xs text-gray-400 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isChatting && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700/50 border border-gray-600/50 p-4 rounded-2xl flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-gray-300">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-6 border-t border-gray-700/50">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && !isChatting && handleChatSubmit()
                      }
                      placeholder="Describe the thumbnail you want... (e.g., 'Gaming setup with RGB lights')"
                      className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                      disabled={isChatting}
                    />
                    <button
                      onClick={handleChatSubmit}
                      disabled={isChatting || !chatInput.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-3 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100"
                    >
                      <FiSend className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Narrower */}
            <div className="xl:col-span-1 space-y-6">
              {/* Style Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiStar className="text-yellow-400" />
                  Style
                </h3>
                <div className="space-y-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`w-full p-3 rounded-xl border transition-all ${
                        selectedStyle === style.id
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-blue-500/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white font-bold`}
                        >
                          {style.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{style.name}</div>
                          <div className="text-xs opacity-75">
                            {style.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Thumbnails */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiClock className="text-green-400" />
                  Recent
                </h3>
                <div className="space-y-3">
                  {thumbnails.slice(0, 3).map((thumbnail) => (
                    <div
                      key={thumbnail.id}
                      className="flex items-center gap-3 p-2 bg-gray-700/30 rounded-lg"
                    >
                      <img
                        src={thumbnail.url}
                        alt={`Thumbnail ${thumbnail.id}`}
                        className="w-12 h-8 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          {thumbnail.prompt}
                        </div>
                        <div className="text-xs text-gray-400">
                          {thumbnail.style}
                        </div>
                      </div>
                      <button
                        onClick={() => downloadThumbnail(thumbnail)}
                        className="text-gray-400 hover:text-white p-1 rounded"
                      >
                        <FiDownload />
                      </button>
                    </div>
                  ))}
                  {thumbnails.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No recent thumbnails
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Direct Generate Mode */}
        {activeTab === "generate" && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Form - Much Wider */}
            <div className="xl:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <FiImage className="text-2xl text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">
                    Describe Your Thumbnail
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      What's your video about?
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Example: Gaming setup with RGB lights, multiple monitors, and a cool background..."
                      className="w-full h-32 px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      disabled={isGenerating}
                    />
                  </div>

                  {/* Quick Prompt Suggestions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Or try these popular ideas:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quickPrompts.map((quickPrompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickPrompt(quickPrompt)}
                          className="text-left p-4 bg-gray-700/30 hover:bg-gray-600/50 rounded-lg border border-gray-600/50 hover:border-blue-500/50 transition-all text-gray-300 hover:text-white"
                          disabled={isGenerating}
                        >
                          <FiArrowRight className="inline mr-2 text-blue-400" />
                          {quickPrompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateThumbnails}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Generating Amazing Thumbnails...
                      </>
                    ) : (
                      <>
                        <FiImage className="text-xl" />
                        Generate Thumbnails
                      </>
                    )}
                  </button>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-900/50 border border-red-500 rounded-xl">
                      <p className="text-red-200">{error}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Style Selection */}
            <div className="xl:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiStar className="text-yellow-400" />
                  Thumbnail Style
                </h3>
                <div className="space-y-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`w-full p-3 rounded-xl border transition-all ${
                        selectedStyle === style.id
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-blue-500/50"
                      }`}
                      disabled={isGenerating}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white font-bold`}
                        >
                          {style.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{style.name}</div>
                          <div className="text-xs opacity-75">
                            {style.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Thumbnails */}
        {thumbnails.length > 0 && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiImage className="text-blue-400" />
                Generated Thumbnails
              </h2>
              <button
                onClick={generateThumbnails}
                disabled={isGenerating}
                className="bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-600/30 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 text-white border border-gray-600/50"
              >
                <FiRefreshCw className={isGenerating ? "animate-spin" : ""} />
                Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {thumbnails.map((thumbnail) => (
                <div
                  key={thumbnail.id}
                  className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-600/50 hover:border-blue-500/50 transition-all group"
                >
                  <div className="aspect-video relative">
                    <img
                      src={thumbnail.url}
                      alt={`Thumbnail ${thumbnail.id}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <button
                        onClick={() => downloadThumbnail(thumbnail)}
                        className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-white transform scale-90 group-hover:scale-100"
                      >
                        <FiDownload />
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                          styles.find((s) => s.id === thumbnail.style)
                            ?.gradient || "from-gray-400 to-gray-600"
                        }`}
                      ></div>
                      <div className="text-sm text-gray-400">
                        Style: {thumbnail.style}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 line-clamp-2">
                      {thumbnail.prompt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {thumbnails.length === 0 && !isGenerating && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
            <FiCamera className="mx-auto text-6xl text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              No thumbnails yet
            </h3>
            <p className="text-gray-400 text-lg">
              {activeTab === "chat"
                ? "Start a conversation with our AI assistant to generate your first thumbnail"
                : "Describe your thumbnail idea and click 'Generate Thumbnails' to get started"}
            </p>
          </div>
        )}
      </div>

      <div ref={chatEndRef} />
    </div>
  );
};

export default ThumbnailsPage;
