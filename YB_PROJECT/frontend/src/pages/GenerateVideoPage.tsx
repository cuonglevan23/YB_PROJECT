import { useState, useRef } from "react";
import {
  FiVideo,
  FiMessageCircle,
  FiGrid,
  FiStar,
  FiClock,
  FiDownload,
  FiSend,
  FiImage,
  FiArrowRight,
  FiRefreshCw,
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiEdit3,
  FiTag,
  FiFileText,
  FiZap,
  FiEye,
  FiCopy,
} from "react-icons/fi";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  videoContent?: GeneratedVideoContent;
}

interface GeneratedVideoContent {
  id: string;
  title: string;
  description: string;
  tags: string[];
  hook: string;
  outline: string[];
  thumbnail: {
    url: string;
    alt: string;
  };
  metadata: {
    estimatedViews: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: string;
    category: string;
  };
  seoScore: number;
  suggestions: {
    title: string[];
    description: string[];
    tags: string[];
  };
}

const GenerateVideoPage = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "generate">("chat");
  const [videoTopic, setVideoTopic] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [targetDuration, setTargetDuration] = useState(10);
  const [videoContent, setVideoContent] = useState<GeneratedVideoContent[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI video optimization assistant. I can help you create complete video content packages including optimized titles, descriptions, tags, hooks, outlines, and thumbnails. What video are you working on today?",
      timestamp: new Date(),
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: "general",
      name: "General",
      description: "All-purpose content",
      gradient: "from-blue-400 to-blue-600",
      icon: "🎯",
    },
    {
      id: "gaming",
      name: "Gaming",
      description: "Game content & tutorials",
      gradient: "from-purple-400 to-pink-600",
      icon: "🎮",
    },
    {
      id: "tech",
      name: "Tech",
      description: "Technology & reviews",
      gradient: "from-green-400 to-teal-600",
      icon: "💻",
    },
    {
      id: "education",
      name: "Education",
      description: "Learning & tutorials",
      gradient: "from-yellow-400 to-orange-600",
      icon: "📚",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Life & wellness",
      gradient: "from-pink-400 to-red-500",
      icon: "🌟",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description: "Fun & comedy",
      gradient: "from-indigo-400 to-purple-600",
      icon: "🎭",
    },
  ];

  const durations = [
    { value: 5, label: "5 minutes", views: "High engagement" },
    { value: 10, label: "10 minutes", views: "Optimal length" },
    { value: 15, label: "15 minutes", views: "In-depth content" },
    { value: 20, label: "20 minutes", views: "Comprehensive" },
    { value: 30, label: "30+ minutes", views: "Long-form" },
  ];

  const quickTopics = [
    "How to start a YouTube channel in 2025",
    "Best productivity apps for students",
    "Beginner's guide to cryptocurrency",
    "10 healthy recipes under 30 minutes",
    "Photography tips for beginners",
    "Home workout routine no equipment",
    "Budget travel tips and tricks",
    "Web development crash course",
    "Digital marketing strategies",
    "Sustainable living tips",
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
      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const mockContent = generateMockVideoContent(currentInput, selectedCategory, targetDuration);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I've created a complete video content package for "${currentInput}". This includes an optimized title, SEO-friendly description, trending tags, engaging hook, detailed outline, and a custom thumbnail. The content is tailored for ${selectedCategory} category and optimized for ${targetDuration}-minute videos.`,
        timestamp: new Date(),
        videoContent: mockContent,
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
      setVideoContent([mockContent]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate video content");
    } finally {
      setIsChatting(false);
    }
  };

  const generateVideoContent = async () => {
    if (!videoTopic.trim()) {
      setError("Please enter a video topic");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      const mockContent = generateMockVideoContent(videoTopic, selectedCategory, targetDuration);
      setVideoContent([mockContent]);
    } catch {
      setError("Failed to generate video content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockVideoContent = (topic: string, category: string, duration: number): GeneratedVideoContent => {
    const titles = [
      `${topic} - Complete Guide for Beginners`,
      `How to Master ${topic} in ${duration} Minutes`,
      `${topic}: Everything You Need to Know`,
      `The Ultimate ${topic} Tutorial`,
      `${topic} Explained Simply`,
    ];

    const descriptions = [
      `In this comprehensive guide, we'll cover everything you need to know about ${topic}. Perfect for beginners and those looking to improve their understanding.\n\n🎯 What you'll learn:\n• Key concepts and fundamentals\n• Step-by-step instructions\n• Pro tips and best practices\n• Common mistakes to avoid\n\n⏰ Timestamps:\n0:00 Introduction\n1:30 Getting Started\n3:45 Main Content\n${duration-2}:00 Summary & Next Steps\n\n💡 Don't forget to like and subscribe for more helpful content!`,
      `Master ${topic} with this easy-to-follow tutorial! Whether you're a complete beginner or looking to level up your skills, this video has something for everyone.\n\n🔥 Key highlights:\n• Practical examples\n• Expert insights\n• Actionable tips\n• Real-world applications\n\n📚 Resources mentioned:\n• Free templates (link in description)\n• Recommended tools\n• Further reading\n\n👍 If this helped you, please like and share with others who might benefit!`,
    ];

    const tagSets = [
      [topic.toLowerCase(), category, "tutorial", "beginner", "guide", "2025", "how to", "tips", "learn", "education"],
      [topic.toLowerCase(), category, "explained", "simple", "easy", "step by step", "complete", "ultimate", "master", "skills"],
    ];

    const hooks = [
      `Did you know that 90% of people struggle with ${topic}? In the next ${duration} minutes, I'll show you exactly how to master it.`,
      `What if I told you that ${topic} could be learned in just ${duration} minutes? Stay tuned because I'm about to prove it.`,
      `Everyone thinks ${topic} is complicated, but I'm about to show you how simple it really is.`,
      `After years of experience with ${topic}, I've discovered the one thing that changes everything.`,
    ];

    const outlines = [
      [
        "Introduction and welcome",
        `What is ${topic} and why it matters`,
        "Common misconceptions explained",
        "Step-by-step tutorial begins",
        "Key principles and fundamentals",
        "Practical examples and demonstrations",
        "Pro tips and advanced techniques",
        "Common mistakes to avoid",
        "Summary and key takeaways",
        "Next steps and resources",
      ],
      [
        "Hook and introduction",
        `The importance of ${topic} in 2025`,
        "What you'll learn in this video",
        "Getting started - the basics",
        "Building your foundation",
        "Advanced strategies revealed",
        "Real-world case studies",
        "Troubleshooting common issues",
        "Final thoughts and recap",
        "Call to action and subscribe",
      ],
    ];

    const selectedIndex = Math.floor(Math.random() * 2);
    const seoScore = Math.floor(Math.random() * 20) + 80; // 80-100

    return {
      id: `video-${Date.now()}`,
      title: titles[selectedIndex],
      description: descriptions[selectedIndex],
      tags: tagSets[selectedIndex],
      hook: hooks[selectedIndex],
      outline: outlines[selectedIndex],
      thumbnail: {
        url: `https://images.unsplash.com/photo-${1500000000000 + selectedIndex}?w=1280&h=720&fit=crop`,
        alt: `${topic} tutorial thumbnail`,
      },
      metadata: {
        estimatedViews: `${Math.floor(Math.random() * 50) + 20}K-${Math.floor(Math.random() * 100) + 50}K`,
        difficulty: duration < 10 ? "beginner" : duration < 20 ? "intermediate" : "advanced",
        duration: `${duration} minutes`,
        category: category,
      },
      seoScore,
      suggestions: {
        title: [
          `${topic} Tutorial for Beginners`,
          `Learn ${topic} in ${duration} Minutes`,
          `${topic} Made Simple`,
        ],
        description: [
          "Add more specific keywords",
          "Include trending hashtags",
          "Add call-to-action earlier",
        ],
        tags: [
          "trending keywords",
          "category-specific tags",
          "long-tail keywords",
        ],
      },
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadContent = (content: GeneratedVideoContent) => {
    const fullContent = `
TITLE: ${content.title}

DESCRIPTION:
${content.description}

TAGS: ${content.tags.join(", ")}

HOOK: ${content.hook}

OUTLINE:
${content.outline.map((item, index) => `${index + 1}. ${item}`).join("\n")}

SEO SCORE: ${content.seoScore}/100

METADATA:
- Estimated Views: ${content.metadata.estimatedViews}
- Difficulty: ${content.metadata.difficulty}
- Duration: ${content.metadata.duration}
- Category: ${content.metadata.category}
    `;

    const element = document.createElement("a");
    const file = new Blob([fullContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${content.title.replace(/[^a-zA-Z0-9]/g, "_")}_content.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleQuickTopic = (topic: string) => {
    setVideoTopic(topic);
  };

  const getSeoColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500";
      case "intermediate": return "bg-yellow-500";
      case "advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <FiVideo className="text-blue-400" />
            AI Video Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Create complete video content with optimized titles, descriptions, tags, hooks, and thumbnails
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
            {/* Chat Interface */}
            <div className="xl:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl h-[650px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FiVideo className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Video Assistant</h3>
                        <p className="text-sm text-gray-400">
                          Ready to create your complete video content
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Creative Mode</span>
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
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-700/50 text-gray-100 border border-gray-600/50"
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                        {message.videoContent && (
                          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-white">{message.videoContent.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded ${getSeoColor(message.videoContent.seoScore)}`}>
                                  SEO {message.videoContent.seoScore}/100
                                </span>
                                <span className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded">
                                  {message.videoContent.metadata.duration}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-300 space-y-2">
                              <div>
                                <strong className="text-blue-400">Hook:</strong>
                                <p className="text-xs mt-1 italic">{message.videoContent.hook.substring(0, 80)}...</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                  {message.videoContent.tags.slice(0, 3).map(tag => `#${tag}`).join(" ")}
                                </span>
                                <button
                                  onClick={() => downloadContent(message.videoContent!)}
                                  className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1 rounded transition-all flex items-center gap-1"
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
                        <span className="text-gray-300">Creating your video content...</span>
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
                      placeholder="Describe your video idea or ask for optimization help..."
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

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Category Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiStar className="text-blue-400" />
                  Category
                </h3>
                <div className="space-y-3">
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-xl border transition-all ${
                        selectedCategory === category.id
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-blue-500/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {category.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs opacity-75">
                            {category.description}
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
                  Duration
                </h3>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <button
                      key={duration.value}
                      onClick={() => setTargetDuration(duration.value)}
                      className={`w-full p-3 rounded-lg border transition-all ${
                        targetDuration === duration.value
                          ? "bg-green-600 border-green-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{duration.label}</span>
                        <span className="text-xs opacity-75">{duration.views}</span>
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
                  <FiTarget className="text-2xl text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">
                    Create Your Video Content
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Video topic or main idea
                    </label>
                    <textarea
                      value={videoTopic}
                      onChange={(e) => setVideoTopic(e.target.value)}
                      placeholder="Example: How to learn programming, Best travel destinations 2025, Healthy breakfast recipes..."
                      className="w-full h-32 px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      disabled={isGenerating}
                    />
                  </div>

                  {/* Quick Topic Suggestions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Or choose from trending topics:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quickTopics.map((topic, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickTopic(topic)}
                          className="text-left p-4 bg-gray-700/30 hover:bg-gray-600/50 rounded-lg border border-gray-600/50 hover:border-blue-500/50 transition-all text-gray-300 hover:text-white"
                          disabled={isGenerating}
                        >
                          <FiArrowRight className="inline mr-2 text-blue-400" />
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Settings Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        disabled={isGenerating}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name} - {category.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Target Duration
                      </label>
                      <select
                        value={targetDuration}
                        onChange={(e) => setTargetDuration(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        disabled={isGenerating}
                      >
                        {durations.map((duration) => (
                          <option key={duration.value} value={duration.value}>
                            {duration.label} - {duration.views}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateVideoContent}
                    disabled={isGenerating || !videoTopic.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Generating Video Content...
                      </>
                    ) : (
                      <>
                        <FiVideo className="text-xl" />
                        Generate Complete Video Content
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
                  <FiZap className="text-yellow-400" />
                  What You'll Get
                </h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FiEdit3 className="text-blue-400" />
                      <span className="font-medium text-white">Optimized Title</span>
                    </div>
                    <p className="text-xs text-gray-400">SEO-friendly titles that drive clicks</p>
                  </div>

                  <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FiFileText className="text-green-400" />
                      <span className="font-medium text-white">Description</span>
                    </div>
                    <p className="text-xs text-gray-400">Detailed descriptions with timestamps</p>
                  </div>

                  <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FiTag className="text-purple-400" />
                      <span className="font-medium text-white">Smart Tags</span>
                    </div>
                    <p className="text-xs text-gray-400">Trending tags for better discoverability</p>
                  </div>

                  <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FiZap className="text-yellow-400" />
                      <span className="font-medium text-white">Engaging Hook</span>
                    </div>
                    <p className="text-xs text-gray-400">Captivating opening lines</p>
                  </div>

                  <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FiImage className="text-pink-400" />
                      <span className="font-medium text-white">Thumbnail</span>
                    </div>
                    <p className="text-xs text-gray-400">Eye-catching thumbnail suggestions</p>
                  </div>

                  <div className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FiUsers className="text-orange-400" />
                      <span className="font-medium text-white">Outline</span>
                    </div>
                    <p className="text-xs text-gray-400">Structured video outline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Content */}
        {videoContent.length > 0 && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiVideo className="text-blue-400" />
                Generated Video Content
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={generateVideoContent}
                  disabled={isGenerating}
                  className="bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-600/30 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 text-white border border-gray-600/50"
                >
                  <FiRefreshCw className={isGenerating ? "animate-spin" : ""} />
                  Regenerate
                </button>
                <button
                  onClick={() => downloadContent(videoContent[0])}
                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
                >
                  <FiDownload />
                  Download All
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {videoContent.map((content) => (
                <div key={content.id} className="space-y-6">
                  {/* Thumbnail */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FiImage className="text-pink-400" />
                        Thumbnail
                      </h3>
                      <button
                        onClick={() => setActiveSection(activeSection === "thumbnail" ? null : "thumbnail")}
                        className="text-gray-400 hover:text-white p-2"
                      >
                        <FiEye />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={content.thumbnail.url}
                          alt={content.thumbnail.alt}
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${getDifficultyColor(content.metadata.difficulty)}`}></div>
                          <span className="text-white font-medium capitalize">{content.metadata.difficulty}</span>
                          <span className="text-gray-400">{content.metadata.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiTrendingUp className="text-green-400" />
                          <span className="text-white">Est. Views: {content.metadata.estimatedViews}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${getSeoColor(content.seoScore)}`}>SEO Score: {content.seoScore}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FiEdit3 className="text-blue-400" />
                        Title
                      </h3>
                      <button
                        onClick={() => copyToClipboard(content.title)}
                        className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <FiCopy />
                        Copy
                      </button>
                    </div>
                    <p className="text-white text-lg mb-3">{content.title}</p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Alternative titles:</h4>
                      <div className="space-y-1">
                        {content.suggestions.title.map((title, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">{title}</span>
                            <button
                              onClick={() => copyToClipboard(title)}
                              className="text-gray-500 hover:text-white p-1"
                            >
                              <FiCopy />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FiFileText className="text-green-400" />
                        Description
                      </h3>
                      <button
                        onClick={() => copyToClipboard(content.description)}
                        className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <FiCopy />
                        Copy
                      </button>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm whitespace-pre-wrap">{content.description}</pre>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FiTag className="text-purple-400" />
                        Tags
                      </h3>
                      <button
                        onClick={() => copyToClipboard(content.tags.join(", "))}
                        className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <FiCopy />
                        Copy All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.tags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => copyToClipboard(tag)}
                          className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-1 rounded-full text-sm transition-all"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hook */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FiZap className="text-yellow-400" />
                        Hook
                      </h3>
                      <button
                        onClick={() => copyToClipboard(content.hook)}
                        className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <FiCopy />
                        Copy
                      </button>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-300 text-sm italic">"{content.hook}"</p>
                    </div>
                  </div>

                  {/* Outline */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FiUsers className="text-orange-400" />
                        Video Outline
                      </h3>
                      <button
                        onClick={() => copyToClipboard(content.outline.join("\n"))}
                        className="bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <FiCopy />
                        Copy
                      </button>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <ol className="space-y-2">
                        {content.outline.map((item, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-3">
                            <span className="bg-orange-600/20 text-orange-400 px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                              {index + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {videoContent.length === 0 && !isGenerating && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
            <FiVideo className="mx-auto text-6xl text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              No video content generated yet
            </h3>
            <p className="text-gray-400 text-lg">
              {activeTab === "chat"
                ? "Start a conversation with our AI assistant to create your complete video content package"
                : "Enter your video topic and settings, then click 'Generate Complete Video Content' to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateVideoPage;
