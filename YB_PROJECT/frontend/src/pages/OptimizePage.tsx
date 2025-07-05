import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { Button } from "../components/ui/buttons";
import { ShortVideoCard } from "../components/ui/cards";
import { SearchBar } from "../components/ui/inputs";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  uploadDate: string;
  status: "published" | "processing" | "draft" | "private";
  tags: string[];
  optimizationScore: number;
  hasIssues: boolean;
  description: string;
  category: string;
  isShort?: boolean;
}

const OptimizePage = memo(function OptimizePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "videos" | "shorts"
  >("all");

  // Mock data
  const videos: Video[] = [
    {
      id: "1",
      title: "Thứ Món Bùi Tấn Trường",
      thumbnail: "/api/placeholder/300/200",
      views: 0,
      duration: "5:32",
      uploadDate: "a year ago",
      status: "published",
      tags: ["football", "sports", "vietnam"],
      optimizationScore: 75,
      hasIssues: false,
      description: "Video about football player Bùi Tấn Trường",
      category: "Sports",
    },
    {
      id: "2",
      title: "TRỰC TIẾP BÓNG ĐÁ : OMAN - VIỆT NAM | VÒNG LOẠI 3 WORLD CUP 2022",
      thumbnail: "/api/placeholder/300/200",
      views: 50,
      duration: "120:15",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "worldcup", "vietnam", "live"],
      optimizationScore: 85,
      hasIssues: true,
      description: "Live football match: Oman vs Vietnam",
      category: "Sports",
    },
    {
      id: "3",
      title: "Highlight Hiệp 1 : OMAN - VIỆT NAM | VÒNG LOẠI 3 WORLD CUP 2022",
      thumbnail: "/api/placeholder/300/200",
      views: 44,
      duration: "15:42",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "highlights", "vietnam"],
      optimizationScore: 90,
      hasIssues: false,
      description: "First half highlights of Oman vs Vietnam match",
      category: "Sports",
    },
    {
      id: "4",
      title: "Cận cảnh buổi Tập của đội tuyển Việt nam",
      thumbnail: "/api/placeholder/300/200",
      views: 41,
      duration: "8:23",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "training", "vietnam"],
      optimizationScore: 65,
      hasIssues: true,
      description: "Behind the scenes training session",
      category: "Sports",
    },
    {
      id: "5",
      title: "THỨ MÔN BÙI TẤN TRƯỜNG PK VỚI LỘC FUHO",
      thumbnail: "/api/placeholder/300/200",
      views: 25,
      duration: "12:15",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "penalty", "goalkeeper"],
      optimizationScore: 80,
      hasIssues: false,
      description: "Penalty shootout with goalkeeper Bùi Tấn Trường",
      category: "Sports",
    },
    {
      id: "6",
      title: "Thủ Môn Bùi Tấn Trường CLB HÀ NỘI",
      thumbnail: "/api/placeholder/300/200",
      views: 121,
      duration: "7:45",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "goalkeeper", "hanoi"],
      optimizationScore: 70,
      hasIssues: false,
      description: "Goalkeeper Bùi Tấn Trường from Hanoi FC",
      category: "Sports",
    },
    // Shorts videos
    {
      id: "7",
      title: "Kỹ thuật sút phạt tuyệt đỉnh #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1240,
      duration: "0:35",
      uploadDate: "3 days ago",
      status: "published",
      tags: ["football", "skills", "shorts"],
      optimizationScore: 88,
      hasIssues: false,
      description: "Amazing free kick technique",
      category: "Sports",
      isShort: true,
    },
    {
      id: "8",
      title: "Bàn thắng đẹp nhất tuần #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 2180,
      duration: "0:28",
      uploadDate: "1 week ago",
      status: "published",
      tags: ["football", "goals", "shorts"],
      optimizationScore: 92,
      hasIssues: false,
      description: "Best goal of the week compilation",
      category: "Sports",
      isShort: true,
    },
    {
      id: "9",
      title: "Thủ môn xuất thần cản phá #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 856,
      duration: "0:42",
      uploadDate: "5 days ago",
      status: "published",
      tags: ["football", "goalkeeper", "saves", "shorts"],
      optimizationScore: 76,
      hasIssues: true,
      description: "Incredible goalkeeper saves",
      category: "Sports",
      isShort: true,
    },
    // Additional regular videos
    {
      id: "10",
      title: "Chiến thuật tấn công của đội tuyển Việt Nam",
      thumbnail: "/api/placeholder/300/200",
      views: 89,
      duration: "18:45",
      uploadDate: "3 years ago",
      status: "published",
      tags: ["football", "tactics", "vietnam"],
      optimizationScore: 82,
      hasIssues: false,
      description: "Analysis of Vietnam national team attacking tactics",
      category: "Sports",
    },
    {
      id: "11",
      title: "Kỹ thuật chuyền bóng cơ bản",
      thumbnail: "/api/placeholder/300/200",
      views: 156,
      duration: "9:12",
      uploadDate: "2 years ago",
      status: "published",
      tags: ["football", "skills", "tutorial"],
      optimizationScore: 67,
      hasIssues: true,
      description: "Basic ball passing techniques for beginners",
      category: "Education",
    },
    {
      id: "12",
      title: "Phân tích trận đấu V-League 2023",
      thumbnail: "/api/placeholder/300/200",
      views: 72,
      duration: "22:33",
      uploadDate: "1 year ago",
      status: "published",
      tags: ["football", "analysis", "v-league"],
      optimizationScore: 91,
      hasIssues: false,
      description: "In-depth analysis of V-League 2023 matches",
      category: "Sports",
    },
    {
      id: "13",
      title: "Bí quyết luyện tập thể lực cho cầu thủ",
      thumbnail: "/api/placeholder/300/200",
      views: 203,
      duration: "14:28",
      uploadDate: "6 months ago",
      status: "published",
      tags: ["football", "fitness", "training"],
      optimizationScore: 73,
      hasIssues: false,
      description: "Physical training secrets for football players",
      category: "Fitness",
    },
    {
      id: "14",
      title: "Lịch sử bóng đá Việt Nam qua các thời kỳ",
      thumbnail: "/api/placeholder/300/200",
      views: 95,
      duration: "35:16",
      uploadDate: "8 months ago",
      status: "published",
      tags: ["football", "history", "vietnam"],
      optimizationScore: 88,
      hasIssues: false,
      description: "History of Vietnamese football through the ages",
      category: "Documentary",
    },
    {
      id: "15",
      title: "Phỏng vấn độc quyền với HLV Park Hang-seo",
      thumbnail: "/api/placeholder/300/200",
      views: 312,
      duration: "28:45",
      uploadDate: "1 year ago",
      status: "published",
      tags: ["football", "interview", "coach"],
      optimizationScore: 94,
      hasIssues: false,
      description: "Exclusive interview with coach Park Hang-seo",
      category: "Interview",
    },
    // Additional shorts
    {
      id: "16",
      title: "Siêu phẩm đá phạt góc #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1580,
      duration: "0:31",
      uploadDate: "2 days ago",
      status: "published",
      tags: ["football", "corner", "goal", "shorts"],
      optimizationScore: 85,
      hasIssues: false,
      description: "Amazing corner kick goal",
      category: "Sports",
      isShort: true,
    },
    {
      id: "17",
      title: "Pha phối hợp tuyệt đẹp #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 2340,
      duration: "0:25",
      uploadDate: "4 days ago",
      status: "published",
      tags: ["football", "teamwork", "goal", "shorts"],
      optimizationScore: 89,
      hasIssues: false,
      description: "Beautiful team coordination goal",
      category: "Sports",
      isShort: true,
    },
    {
      id: "18",
      title: "Kỹ thuật rê bóng như Messi #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 987,
      duration: "0:38",
      uploadDate: "1 week ago",
      status: "published",
      tags: ["football", "dribbling", "skills", "shorts"],
      optimizationScore: 79,
      hasIssues: true,
      description: "Messi-style dribbling techniques",
      category: "Skills",
      isShort: true,
    },
    {
      id: "19",
      title: "Top 5 bàn thắng tuần này #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1670,
      duration: "0:45",
      uploadDate: "6 days ago",
      status: "published",
      tags: ["football", "goals", "compilation", "shorts"],
      optimizationScore: 93,
      hasIssues: false,
      description: "Top 5 goals of this week",
      category: "Compilation",
      isShort: true,
    },
    {
      id: "20",
      title: "Thủ thuật penalty không thể cản #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1234,
      duration: "0:29",
      uploadDate: "3 days ago",
      status: "published",
      tags: ["football", "penalty", "trick", "shorts"],
      optimizationScore: 81,
      hasIssues: false,
      description: "Unstoppable penalty kick trick",
      category: "Skills",
      isShort: true,
    },
  ];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "shorts") {
      return matchesSearch && video.isShort;
    }
    if (selectedFilter === "videos") {
      return matchesSearch && !video.isShort;
    }
    return matchesSearch;
  });

  const handleOptimizeVideo = useCallback((videoId: string) => {
    console.log("Optimizing video:", videoId);
  }, []);

  const getThumbnailBackground = (videoId: string) => {
    const backgrounds = [
      "from-red-600/30 to-orange-600/30",
      "from-blue-600/30 to-purple-600/30",
      "from-green-600/30 to-teal-600/30",
      "from-purple-600/30 to-pink-600/30",
      "from-yellow-600/30 to-red-600/30",
      "from-cyan-600/30 to-blue-600/30",
    ];

    const bgIndex = parseInt(videoId) % backgrounds.length;
    return backgrounds[bgIndex];
  };

  const getOptimizationColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Optimize</h1>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate('/seo')}
            >
              Channel-wide Tags
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search videos"
            size="md"
            onSearchClick={() => console.log("Search clicked")}
          />

          {/* Filter Tabs */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">All videos</h2>
            <div className="flex items-center space-x-1 bg-gray-800/50 p-1 rounded-lg">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedFilter === "all"
                    ? "bg-white text-gray-900"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All videos
              </button>
              <button
                onClick={() => setSelectedFilter("videos")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedFilter === "videos"
                    ? "bg-white text-gray-900"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                📹 Videos
              </button>
              <button
                onClick={() => setSelectedFilter("shorts")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedFilter === "shorts"
                    ? "bg-white text-gray-900"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🩳 Shorts
              </button>
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div
          className={`${
            selectedFilter === "shorts"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 justify-items-center"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          }`}
        >
          {filteredVideos.map((video) => {
            // Only use ShortVideoCard when specifically viewing shorts filter
            if (video.isShort && selectedFilter === "shorts") {
              return (
                <ShortVideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  views={video.views}
                  uploadDate={video.uploadDate}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  isPublished={video.status === "published"}
                  score={video.optimizationScore}
                  onScoreWithBoost={() => handleOptimizeVideo(video.id)}
                  onOptionsClick={() =>
                    console.log("Options clicked for", video.id)
                  }
                />
              );
            } else {
              // Use regular video card for all videos when in "all" or "videos" tab,
              // and also for shorts when not in "shorts" tab
              return (
                <div
                  key={video.id}
                  className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 group hover:shadow-lg hover:shadow-black/20"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${getThumbnailBackground(
                        video.id
                      )} flex items-center justify-center relative`}
                    >
                      <div className="text-gray-400 opacity-50">
                        <svg
                          className="w-16 h-16"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
                      {video.duration}
                    </div>

                    <div className="absolute top-2 left-2">
                      <div className="flex items-center bg-green-600/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        <span className="text-white">published</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-800 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-white font-medium text-[15px] leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {video.title}
                    </h3>

                    <div className="flex items-center text-gray-400 text-xs space-x-1">
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                      <span className="font-medium">{video.views} views</span>
                      <span className="text-gray-500">•</span>
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      <span className="font-medium">{video.uploadDate}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs font-medium">
                          Score:
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm font-bold ${getOptimizationColor(
                              video.optimizationScore
                            )}`}
                          >
                            {video.optimizationScore}%
                          </span>
                          {video.hasIssues && (
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>

                      <div className="w-full bg-gray-700/60 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            video.optimizationScore >= 90
                              ? "bg-green-500"
                              : video.optimizationScore >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${video.optimizationScore}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOptimizeVideo(video.id)}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group/btn shadow-md hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <svg
                        className="w-4 h-4 group-hover/btn:rotate-12 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Score with Boost</span>
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <AiOutlineVideoCamera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              No videos found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

export default OptimizePage;
