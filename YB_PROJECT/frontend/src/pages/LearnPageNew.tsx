import { memo, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlinePlayCircle,
  AiOutlineUser,
  AiOutlineStar,
} from "react-icons/ai";

interface Masterclass {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  lessons: number;
  category: string;
  thumbnail: string;
  level?: string;
  isUpgradeRequired?: boolean;
}

const LearnPage = memo(function LearnPage() {
  const [activeTab, setActiveTab] = useState<"masterclasses" | "growth-plan">(
    "masterclasses"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "Growth & Strategy",
    "Creator Inspiration",
    "Editing & Production",
    "Storytelling & Creativity",
    "Short-Form Content",
  ];

  const masterclasses: Masterclass[] = [
    {
      id: "1",
      title: "Full YouTube SEO Keyword Research Guide: Rank #1",
      instructor: "Youri",
      duration: "1h 39m",
      lessons: 13,
      category: "Growth & Strategy",
      thumbnail: "/api/placeholder/400/240",
      isUpgradeRequired: true,
    },
    {
      id: "2",
      title: "How to Increase Your Views with vidIQ",
      instructor: "Rob Wilson",
      duration: "8m",
      lessons: 6,
      category: "Growth & Strategy",
      thumbnail: "/api/placeholder/400/240",
    },
    {
      id: "3",
      title: "0 to 1M Subs In 1 Year: 5 Tips To Grow Faster",
      instructor: "Armaan",
      duration: "12m",
      lessons: 5,
      category: "Creator Inspiration",
      thumbnail: "/api/placeholder/400/240",
    },
    {
      id: "4",
      title: "Advanced Thumbnail Design Strategies",
      instructor: "Sarah Kim",
      duration: "45m",
      lessons: 8,
      category: "Editing & Production",
      thumbnail: "/api/placeholder/400/240",
    },
    {
      id: "5",
      title: "Viral Storytelling Techniques",
      instructor: "Marcus Johnson",
      duration: "32m",
      lessons: 7,
      category: "Storytelling & Creativity",
      thumbnail: "/api/placeholder/400/240",
    },
    {
      id: "6",
      title: "YouTube Shorts Mastery Course",
      instructor: "Lisa Chen",
      duration: "28m",
      lessons: 9,
      category: "Short-Form Content",
      thumbnail: "/api/placeholder/400/240",
    },
  ];

  const filteredMasterclasses =
    selectedCategory === "all"
      ? masterclasses
      : masterclasses.filter((course) => course.category === selectedCategory);

  const renderMasterclassCard = (masterclass: Masterclass) => (
    <div
      key={masterclass.id}
      className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-all duration-200 group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          <AiOutlinePlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
          {masterclass.duration} • {masterclass.lessons} Lessons
        </div>

        {/* Upgrade Badge */}
        {masterclass.isUpgradeRequired && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <AiOutlineStar className="w-3 h-3" />
            <span>Upgrade to unlock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-gray-400 text-sm mb-2">
          {masterclass.instructor}
        </div>
        <h3 className="text-white font-semibold text-lg leading-tight mb-3 group-hover:text-blue-400 transition-colors">
          {masterclass.title}
        </h3>
        <div className="text-gray-400 text-sm">{masterclass.category}</div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-6">Learn</h1>

        {/* Tabs */}
        <div className="flex space-x-6 mb-6">
          <button
            onClick={() => setActiveTab("masterclasses")}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === "masterclasses"
                ? "border-blue-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Masterclasses
          </button>
          <button
            onClick={() => setActiveTab("growth-plan")}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === "growth-plan"
                ? "border-blue-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Interactive Growth Plan
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search classes, topics, or instructors"
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "masterclasses" ? (
          <div className="p-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Masterclasses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredMasterclasses.map(renderMasterclassCard)}
            </div>

            {/* Show More Button */}
            <div className="flex justify-center">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl transition-colors">
                Show More
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Growth Plan Tab */
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AiOutlineUser className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Interactive Growth Plan
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Get a personalized roadmap to grow your YouTube channel
                    based on your current goals, content style, and target
                    audience. Our AI-powered system will create a step-by-step
                    plan tailored specifically for you.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            1
                          </span>
                        </div>
                        <h3 className="text-white font-semibold">
                          Analyze Channel
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        We'll analyze your current channel performance and
                        identify growth opportunities.
                      </p>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            2
                          </span>
                        </div>
                        <h3 className="text-white font-semibold">
                          Custom Strategy
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Get a personalized growth strategy based on your niche
                        and goals.
                      </p>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            3
                          </span>
                        </div>
                        <h3 className="text-white font-semibold">
                          Track Progress
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Monitor your growth and adjust the plan as you achieve
                        milestones.
                      </p>
                    </div>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-colors">
                    Start Your Growth Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default LearnPage;
