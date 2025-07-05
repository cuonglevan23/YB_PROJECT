import { useState, useRef } from "react";
import {
  FiEdit3,
  FiMessageCircle,
  FiGrid,
  FiStar,
  FiClock,
  FiDownload,
  FiSend,
  FiFileText,
  FiArrowRight,
  FiRefreshCw,
  FiPlay,
  FiTarget,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import {
  scriptService,
  type ScriptGenerationRequest,
  type ChatScriptRequest,
  type GeneratedScript,
} from "../services/api/scriptService";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  script?: GeneratedScript;
}

const ScriptWriterPage = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "generate">("chat");
  const [topic, setTopic] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [selectedTone, setSelectedTone] = useState("conversational");
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [scripts, setScripts] = useState<GeneratedScript[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI script writer assistant. I can help you create engaging video scripts tailored to your content style, target audience, and desired length. What kind of video script would you like to create today?",
      timestamp: new Date(),
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const tones = [
    {
      id: "conversational",
      name: "Conversational",
      description: "Friendly and approachable",
      gradient: "from-blue-400 to-blue-600",
      icon: "💬",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Business and formal",
      gradient: "from-gray-400 to-gray-600",
      icon: "💼",
    },
    {
      id: "enthusiastic",
      name: "Enthusiastic",
      description: "High energy and exciting",
      gradient: "from-orange-400 to-red-600",
      icon: "🔥",
    },
    {
      id: "educational",
      name: "Educational",
      description: "Clear and informative",
      gradient: "from-green-400 to-teal-600",
      icon: "📚",
    },
    {
      id: "humorous",
      name: "Humorous",
      description: "Light-hearted and funny",
      gradient: "from-yellow-400 to-orange-500",
      icon: "😄",
    },
    {
      id: "inspiring",
      name: "Inspiring",
      description: "Motivational and uplifting",
      gradient: "from-purple-400 to-pink-600",
      icon: "✨",
    },
  ];

  const durations = [
    { value: 5, label: "5 minutes", wordCount: "650-750 words" },
    { value: 10, label: "10 minutes", wordCount: "1,300-1,500 words" },
    { value: 15, label: "15 minutes", wordCount: "1,950-2,250 words" },
    { value: 20, label: "20 minutes", wordCount: "2,600-3,000 words" },
    { value: 25, label: "25 minutes", wordCount: "3,250-3,750 words" },
    { value: 30, label: "30 minutes", wordCount: "3,900-4,500 words" },
  ];

  const quickTopics = [
    "How to start a YouTube channel in 2025",
    "10 productivity tips for remote workers",
    "Beginner's guide to investing",
    "Best tech gadgets of 2025",
    "Healthy meal prep ideas",
    "Digital marketing strategies",
    "Photography tips for beginners",
    "Home workout routines",
    "Travel planning essentials",
    "Building a personal brand",
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
      const chatRequest: ChatScriptRequest = {
        message: currentInput,
        tone: selectedTone,
        duration: selectedDuration,
      };

      const response = await scriptService.chatScriptRequest(chatRequest);

      if (response.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: response.reply,
          timestamp: new Date(),
          script: response.script,
        };

        setChatMessages((prev) => [...prev, assistantMessage]);
        if (response.script) {
          setScripts([response.script]);
        }
      } else {
        throw new Error(response.message || "Failed to generate script");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate script");
    } finally {
      setIsChatting(false);
    }
  };

  const generateScript = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic or video idea");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const request: ScriptGenerationRequest = {
        topic: topic.trim(),
        tone: selectedTone,
        duration: selectedDuration,
      };

      const response = await scriptService.generateScript(request);

      if (response.success && response.script) {
        setScripts([response.script]);
      } else {
        throw new Error(response.message || "Failed to generate script");
      }
    } catch {
      setError("Failed to generate script. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadScript = (script: GeneratedScript) => {
    const element = document.createElement("a");
    const file = new Blob([script.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${script.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleQuickTopic = (topicText: string) => {
    setTopic(topicText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <FiEdit3 className="text-purple-400" />
            AI Script Writer
          </h1>
          <p className="text-gray-300 text-lg">
            Create engaging video scripts with perfect tone and timing
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
                  ? "bg-purple-600 text-white shadow-lg"
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
                  ? "bg-purple-600 text-white shadow-lg"
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
            {/* Chat Interface */}
            <div className="xl:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl h-[650px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <FiEdit3 className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Script Assistant</h3>
                        <p className="text-sm text-gray-400">
                          Ready to write your perfect video script
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Writing Mode</span>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-gray-700/50 text-gray-100 border border-gray-600/50"
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                        {message.script && (
                          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-white">{message.script.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                                  {message.script.duration} min
                                </span>
                                <span className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded">
                                  {message.script.wordCount} words
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-300 space-y-2">
                              <div>
                                <strong className="text-purple-400">Hook:</strong>
                                <p className="text-xs mt-1 italic">{message.script.hook.substring(0, 100)}...</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Tone: {message.script.tone}</span>
                                <button
                                  onClick={() => downloadScript(message.script!)}
                                  className="text-xs bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-1 rounded transition-all flex items-center gap-1"
                                >
                                  <FiDownload />
                                  Download
                                </button>
                              </div>
                            </div>
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
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-gray-300">Writing your script...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
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
                      placeholder="Describe your video idea or ask for script help..."
                      className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                      disabled={isChatting}
                    />
                    <button
                      onClick={handleChatSubmit}
                      disabled={isChatting || !chatInput.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-3 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100"
                    >
                      <FiSend className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Tone Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiStar className="text-purple-400" />
                  Script Tone
                </h3>
                <div className="space-y-3">
                  {tones.slice(0, 4).map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={`w-full p-3 rounded-xl border transition-all ${
                        selectedTone === tone.id
                          ? "bg-purple-600 border-purple-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-purple-500/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tone.gradient} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {tone.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{tone.name}</div>
                          <div className="text-xs opacity-75">
                            {tone.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiClock className="text-green-400" />
                  Video Length
                </h3>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <button
                      key={duration.value}
                      onClick={() => setSelectedDuration(duration.value)}
                      className={`w-full p-3 rounded-lg border transition-all ${
                        selectedDuration === duration.value
                          ? "bg-green-600 border-green-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{duration.label}</span>
                        <span className="text-xs opacity-75">{duration.wordCount}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Direct Generate Mode */}
        {activeTab === "generate" && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Form */}
            <div className="xl:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <FiTarget className="text-2xl text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">
                    What's Your Video About?
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Video topic or main idea
                    </label>
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Example: How to build a website from scratch, Top 10 productivity apps, Beginner's guide to photography..."
                      className="w-full h-32 px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      disabled={isGenerating}
                    />
                  </div>

                  {/* Quick Topic Suggestions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Or choose from trending topics:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quickTopics.map((quickTopic, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickTopic(quickTopic)}
                          className="text-left p-4 bg-gray-700/30 hover:bg-gray-600/50 rounded-lg border border-gray-600/50 hover:border-purple-500/50 transition-all text-gray-300 hover:text-white"
                          disabled={isGenerating}
                        >
                          <FiArrowRight className="inline mr-2 text-purple-400" />
                          {quickTopic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Settings Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Script Tone
                      </label>
                      <select
                        value={selectedTone}
                        onChange={(e) => setSelectedTone(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        disabled={isGenerating}
                      >
                        {tones.map((tone) => (
                          <option key={tone.id} value={tone.id}>
                            {tone.name} - {tone.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Video Duration
                      </label>
                      <select
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        disabled={isGenerating}
                      >
                        {durations.map((duration) => (
                          <option key={duration.value} value={duration.value}>
                            {duration.label} ({duration.wordCount})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateScript}
                    disabled={isGenerating || !topic.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Writing Your Script...
                      </>
                    ) : (
                      <>
                        <FiEdit3 className="text-xl" />
                        Generate Script
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

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiFileText className="text-purple-400" />
                  Script Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Selected Tone</label>
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {tones.find(t => t.id === selectedTone)?.icon}
                        </span>
                        <div>
                          <div className="text-white font-medium">
                            {tones.find(t => t.id === selectedTone)?.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {tones.find(t => t.id === selectedTone)?.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Video Length</label>
                    <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{selectedDuration} minutes</span>
                        <FiClock className="text-green-400" />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        ~{selectedDuration * 130} words
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700/50">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Script Features</h4>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        Engaging hook & introduction
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        Structured main content
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        Strong call-to-action
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        Natural speaking flow
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Scripts */}
        {scripts.length > 0 && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiEdit3 className="text-purple-400" />
                Generated Script
              </h2>
              <button
                onClick={generateScript}
                disabled={isGenerating}
                className="bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-600/30 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 text-white border border-gray-600/50"
              >
                <FiRefreshCw className={isGenerating ? "animate-spin" : ""} />
                Regenerate
              </button>
            </div>

            <div className="space-y-6">
              {scripts.map((script) => (
                <div
                  key={script.id}
                  className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{script.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiClock />
                          {script.duration} minutes
                        </div>
                        <div className="flex items-center gap-1">
                          <FiFileText />
                          {script.wordCount} words
                        </div>
                        <div className="flex items-center gap-1">
                          <FiUsers />
                          {script.tone} tone
                        </div>
                        <div className="flex items-center gap-1">
                          <FiPlay />
                          {script.estimatedReadingTime}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadScript(script)}
                      className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                    >
                      <FiDownload />
                      Download
                    </button>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600/50">
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                        {script.content}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <FiTarget className="text-purple-400" />
                        Hook
                      </h4>
                      <p className="text-gray-300 text-sm">{script.hook}</p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <FiFileText className="text-blue-400" />
                        Structure
                      </h4>
                      <p className="text-gray-300 text-sm">
                        5-part structure with intro, key points, examples, and conclusion
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <FiTrendingUp className="text-green-400" />
                        Call-to-Action
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Optimized for engagement and subscriber growth
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {scripts.length === 0 && !isGenerating && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
            <FiEdit3 className="mx-auto text-6xl text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              No scripts generated yet
            </h3>
            <p className="text-gray-400 text-lg">
              {activeTab === "chat"
                ? "Start a conversation with our AI assistant to create your perfect video script"
                : "Enter your video topic and settings, then click 'Generate Script' to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptWriterPage;
