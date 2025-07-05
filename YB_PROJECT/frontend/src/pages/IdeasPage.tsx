import { useState, useRef } from "react";
import {
  FiZap,
  FiMessageCircle,
  FiGrid,
  FiStar,
  FiClock,
  FiDownload,
  FiSend,
  FiTarget,
  FiArrowRight,
  FiRefreshCw,
  FiTrendingUp,
  FiUsers,
  FiPlayCircle,
} from "react-icons/fi";

interface IdeaMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  ideas?: VideoIdea[];
}

interface VideoIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedViews: string;
  trendingScore: number;
  tags: string[];
  thumbnail?: string;
}

const IdeasPage = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "generate">("chat");
  const [topic, setTopic] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [chatMessages, setChatMessages] = useState<IdeaMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your creative assistant. I can help you brainstorm amazing video ideas based on your interests, niche, or trending topics. What kind of content are you thinking about creating?",
      timestamp: new Date(),
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: "general",
      name: "General",
      description: "All-around content ideas",
      gradient: "from-blue-400 to-blue-600",
      icon: "🎯",
    },
    {
      id: "gaming",
      name: "Gaming",
      description: "Game reviews, tutorials, gameplay",
      gradient: "from-purple-400 to-pink-600",
      icon: "🎮",
    },
    {
      id: "tech",
      name: "Tech",
      description: "Reviews, tutorials, news",
      gradient: "from-green-400 to-teal-600",
      icon: "💻",
    },
    {
      id: "lifestyle",
      name: "Lifestyle",
      description: "Daily life, wellness, productivity",
      gradient: "from-pink-400 to-red-500",
      icon: "🌟",
    },
    {
      id: "education",
      name: "Education",
      description: "Learning, tutorials, explanations",
      gradient: "from-yellow-400 to-orange-600",
      icon: "📚",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description: "Comedy, reactions, challenges",
      gradient: "from-indigo-400 to-purple-600",
      icon: "🎭",
    },
  ];

  const quickTopics = [
    "Trending tech gadgets 2025",
    "Beginner-friendly gaming tutorials",
    "Productivity tips for remote work",
    "Budget-friendly lifestyle hacks",
    "Educational content for kids",
    "Viral challenge ideas",
    "Cooking recipes for beginners",
    "Fitness routines at home",
    "DIY craft projects",
    "Travel vlogs on a budget",
  ];

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage: IdeaMessage = {
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockIdeas = generateMockIdeas(currentInput, selectedCategory);
      
      const assistantMessage: IdeaMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Here are some creative video ideas based on "${currentInput}". These are tailored for the ${selectedCategory} category and should perform well with your audience!`,
        timestamp: new Date(),
        ideas: mockIdeas,
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
      setIdeas(mockIdeas);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate ideas");
    } finally {
      setIsChatting(false);
    }
  };

  const generateIdeas = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic or niche");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const mockIdeas = generateMockIdeas(topic, selectedCategory);
      setIdeas(mockIdeas);
    } catch {
      setError("Failed to generate ideas. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockIdeas = (input: string, category: string): VideoIdea[] => {
    const additionalIdeas = [
      {
        title: `My ${input} Journey: From Zero to Hero`,
        description: `Personal story of how I got started with ${input} and the lessons learned along the way.`,
        difficulty: "beginner" as const,
        estimatedViews: "40K-80K",
        trendingScore: 82,
        tags: ["journey", "story", "personal", input.toLowerCase()],
      },
      {
        title: `${input} Trends That Will Dominate 2025`,
        description: `Predictions and analysis of upcoming ${input} trends that will shape the future.`,
        difficulty: "advanced" as const,
        estimatedViews: "120K-240K",
        trendingScore: 95,
        tags: ["trends", "2025", "future", input.toLowerCase()],
      },
    ];
    const ideaTemplates = {
      gaming: [
        {
          title: `${input} - Complete Beginner's Guide`,
          description: `Master the basics of ${input} with this comprehensive tutorial covering everything from setup to advanced techniques.`,
          difficulty: "beginner" as const,
          estimatedViews: "50K-100K",
          trendingScore: 85,
          tags: ["tutorial", "beginner", "guide", input.toLowerCase()],
        },
        {
          title: `Top 10 ${input} Tips That Changed My Game`,
          description: `Discover the game-changing tips and tricks that will elevate your ${input} experience to the next level.`,
          difficulty: "intermediate" as const,
          estimatedViews: "75K-150K",
          trendingScore: 92,
          tags: ["tips", "pro", "advanced", input.toLowerCase()],
        },
      ],
      tech: [
        {
          title: `${input} Review: Is It Worth Your Money?`,
          description: `Honest review of ${input} with real-world testing, pros and cons, and buying recommendations.`,
          difficulty: "beginner" as const,
          estimatedViews: "100K-200K",
          trendingScore: 88,
          tags: ["review", "tech", "honest", input.toLowerCase()],
        },
        {
          title: `${input} vs Competition: The Ultimate Comparison`,
          description: `Side-by-side comparison of ${input} with its main competitors to help you make the best choice.`,
          difficulty: "intermediate" as const,
          estimatedViews: "80K-160K",
          trendingScore: 90,
          tags: ["comparison", "vs", "tech", input.toLowerCase()],
        },
      ],
      lifestyle: [
        {
          title: `30-Day ${input} Challenge: My Transformation`,
          description: `Document your journey through a 30-day ${input} challenge and share the amazing results.`,
          difficulty: "beginner" as const,
          estimatedViews: "60K-120K",
          trendingScore: 87,
          tags: ["challenge", "transformation", "lifestyle", input.toLowerCase()],
        },
        {
          title: `${input} Mistakes Everyone Makes (Avoid These!)`,
          description: `Common mistakes people make with ${input} and how to avoid them for better results.`,
          difficulty: "intermediate" as const,
          estimatedViews: "90K-180K",
          trendingScore: 93,
          tags: ["mistakes", "avoid", "tips", input.toLowerCase()],
        },
      ],
      general: [
        {
          title: `Everything You Need to Know About ${input}`,
          description: `Complete guide covering all aspects of ${input} from basics to advanced concepts.`,
          difficulty: "beginner" as const,
          estimatedViews: "70K-140K",
          trendingScore: 85,
          tags: ["complete", "guide", "everything", input.toLowerCase()],
        },
        {
          title: `${input}: Behind the Scenes`,
          description: `Take viewers behind the scenes of ${input} and show what really happens.`,
          difficulty: "intermediate" as const,
          estimatedViews: "85K-170K",
          trendingScore: 89,
          tags: ["behind-scenes", "exclusive", "real", input.toLowerCase()],
        },
      ],
    };

    const templates = ideaTemplates[category as keyof typeof ideaTemplates] || ideaTemplates.general;
    
    const allIdeas = [...templates, ...additionalIdeas];
    
    return allIdeas.map((template, index) => ({
      ...template,
      id: `idea-${Date.now()}-${index}`,
      category: selectedCategory,
      thumbnail: `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=225&fit=crop`,
    }));
  };

  const saveIdea = (idea: VideoIdea) => {
    // Implement save functionality
    console.log("Saving idea:", idea);
    // You can add this to local storage or send to backend
  };

  const handleQuickTopic = (topicText: string) => {
    setTopic(topicText);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-yellow-500";
      case "advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <FiZap className="text-yellow-400" />
            AI Video Ideas Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Get creative video ideas tailored to your niche and audience
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
                  ? "bg-yellow-600 text-white shadow-lg"
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
                  ? "bg-yellow-600 text-white shadow-lg"
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
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <FiZap className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Ideas Assistant</h3>
                        <p className="text-sm text-gray-400">
                          Ready to brainstorm amazing video ideas
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
                            ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white"
                            : "bg-gray-700/50 text-gray-100 border border-gray-600/50"
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                        {message.ideas && (
                          <div className="grid grid-cols-1 gap-3 mt-4">
                            {message.ideas.slice(0, 2).map((idea) => (
                              <div
                                key={idea.id}
                                className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/50"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-medium text-white text-sm">
                                    {idea.title}
                                  </h4>
                                  <div className="flex items-center gap-1 text-xs">
                                    <FiTrendingUp className="text-green-400" />
                                    <span className="text-green-400">{idea.trendingScore}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-300 mb-2">
                                  {idea.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-2 h-2 rounded-full ${getDifficultyColor(
                                        idea.difficulty
                                      )}`}
                                    ></div>
                                    <span className="text-xs text-gray-400">
                                      {idea.difficulty}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <FiUsers />
                                    {idea.estimatedViews}
                                  </div>
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
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-gray-300">Generating ideas...</span>
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
                      placeholder="Tell me about your niche or what content you want to create..."
                      className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                      disabled={isChatting}
                    />
                    <button
                      onClick={handleChatSubmit}
                      disabled={isChatting || !chatInput.trim()}
                      className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-3 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100"
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
                  <FiStar className="text-yellow-400" />
                  Category
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-xl border transition-all ${
                        selectedCategory === category.id
                          ? "bg-yellow-600 border-yellow-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-yellow-500/50"
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

              {/* Recent Ideas */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiClock className="text-green-400" />
                  Recent Ideas
                </h3>
                <div className="space-y-3">
                  {ideas.slice(0, 3).map((idea) => (
                    <div
                      key={idea.id}
                      className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white truncate">
                          {idea.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs">
                          <FiTrendingUp className="text-green-400" />
                          <span className="text-green-400">{idea.trendingScore}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${getDifficultyColor(
                              idea.difficulty
                            )}`}
                          ></div>
                          <span className="text-xs text-gray-400">
                            {idea.difficulty}
                          </span>
                        </div>
                        <button
                          onClick={() => saveIdea(idea)}
                          className="text-gray-400 hover:text-white p-1 rounded"
                        >
                          <FiDownload />
                        </button>
                      </div>
                    </div>
                  ))}
                  {ideas.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No ideas yet
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
            {/* Form */}
            <div className="xl:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <FiTarget className="text-2xl text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">
                    What's Your Niche?
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Describe your content focus or target audience
                    </label>
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Example: Tech reviews for beginners, Gaming tutorials, Lifestyle tips for students..."
                      className="w-full h-32 px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      disabled={isGenerating}
                    />
                  </div>

                  {/* Quick Topic Suggestions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Or try these trending topics:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {quickTopics.map((quickTopic, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickTopic(quickTopic)}
                          className="text-left p-4 bg-gray-700/30 hover:bg-gray-600/50 rounded-lg border border-gray-600/50 hover:border-yellow-500/50 transition-all text-gray-300 hover:text-white"
                          disabled={isGenerating}
                        >
                          <FiArrowRight className="inline mr-2 text-yellow-400" />
                          {quickTopic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateIdeas}
                    disabled={isGenerating || !topic.trim()}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Generating Creative Ideas...
                      </>
                    ) : (
                      <>
                        <FiZap className="text-xl" />
                        Generate Video Ideas
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
                  <FiStar className="text-yellow-400" />
                  Content Category
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-xl border transition-all ${
                        selectedCategory === category.id
                          ? "bg-yellow-600 border-yellow-500 text-white"
                          : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-600/50 hover:border-yellow-500/50"
                      }`}
                      disabled={isGenerating}
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
            </div>
          </div>
        )}

        {/* Generated Ideas */}
        {ideas.length > 0 && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiZap className="text-yellow-400" />
                Generated Video Ideas
              </h2>
              <button
                onClick={generateIdeas}
                disabled={isGenerating}
                className="bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-600/30 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 text-white border border-gray-600/50"
              >
                <FiRefreshCw className={isGenerating ? "animate-spin" : ""} />
                Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50 hover:border-yellow-500/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getDifficultyColor(
                          idea.difficulty
                        )}`}
                      ></div>
                      <span className="text-sm text-gray-400 capitalize">
                        {idea.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <FiTrendingUp className="text-green-400" />
                      <span className="text-green-400">{idea.trendingScore}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {idea.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {idea.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <FiUsers />
                      {idea.estimatedViews}
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-600/50 px-2 py-1 rounded">
                      {idea.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {idea.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => saveIdea(idea)}
                      className="flex-1 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <FiDownload />
                      Save Idea
                    </button>
                    <button className="bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                      <FiPlayCircle />
                      Script
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ideas.length === 0 && !isGenerating && (
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
            <FiZap className="mx-auto text-6xl text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              No ideas generated yet
            </h3>
            <p className="text-gray-400 text-lg">
              {activeTab === "chat"
                ? "Start a conversation with our AI assistant to brainstorm video ideas"
                : "Enter your niche or topic and click 'Generate Video Ideas' to get started"}
            </p>
          </div>
        )}
      </div>

      <div ref={chatEndRef} />
    </div>
  );
};

export default IdeasPage;
