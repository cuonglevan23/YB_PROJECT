import { memo, useState, useMemo } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { OutliersSearchBar } from "../components/ui/inputs";
import { AdvancedFilters, VideoGrid } from "../components/outliers";
import { VideoDetailsModal } from "../components/ui/modals";

interface OutlierFilters {
  outlierScore: [number, number];
  views: [number, number];
  subscribers: [number, number];
  viewsPerHour: [number, number];
  videoLength: [number, number];
  publishingDate: string;
}

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar?: string;
  views: number;
  subscribers: number;
  duration: string;
  publishedDate: string;
  outlierScore: number;
  viewsPerHour: number;
}

// Mock data matching the design
const MOCK_VIDEOS: VideoData[] = [
  {
    id: "1",
    title: "Goalkeeper goals in History's 😍🔥 #football",
    thumbnail: "https://i.ytimg.com/vi/sample1/maxresdefault.jpg",
    channel: "Welcome To FootballXodi...",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 2800000,
    subscribers: 650000,
    duration: "0:45",
    publishedDate: "11 days ago",
    outlierScore: 83,
    viewsPerHour: 8500,
  },
  {
    id: "2",
    title: "Lamine Yamal Vs Goalkeepers he Owns",
    thumbnail: "https://i.ytimg.com/vi/sample2/maxresdefault.jpg",
    channel: "FCiller",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 6900000,
    subscribers: 680000,
    duration: "8:42",
    publishedDate: "13 days ago",
    outlierScore: 100,
    viewsPerHour: 73500,
  },
  {
    id: "3",
    title: "Nepal Crushes Laos 9—0 in Historic 100th Match 🇳🇵",
    thumbnail: "https://i.ytimg.com/vi/sample3/maxresdefault.jpg",
    channel: "RQN",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 1900000,
    subscribers: 220000,
    duration: "10:23",
    publishedDate: "6 days ago",
    outlierScore: 100,
    viewsPerHour: 47900,
  },
  {
    id: "4",
    title: "Nepali women's football team trying 🔥❤️",
    thumbnail: "https://i.ytimg.com/vi/sample4/maxresdefault.jpg",
    channel: "PrashantTamangTD",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 4600000,
    subscribers: 220000,
    duration: "0:30",
    publishedDate: "13 days ago",
    outlierScore: 22,
    viewsPerHour: 15200,
  },
  {
    id: "5",
    title: "GOALLLLLLL JOAO FIGUEIREDO!",
    thumbnail: "https://i.ytimg.com/vi/sample5/maxresdefault.jpg",
    channel: "Football Highlights",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 3200000,
    subscribers: 890000,
    duration: "0:15",
    publishedDate: "8 days ago",
    outlierScore: 87,
    viewsPerHour: 28900,
  },
  {
    id: "6",
    title: "Amazing Football Skills Compilation",
    thumbnail: "https://i.ytimg.com/vi/sample6/maxresdefault.jpg",
    channel: "SkillMaster",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 5400000,
    subscribers: 1200000,
    duration: "12:45",
    publishedDate: "4 days ago",
    outlierScore: 91,
    viewsPerHour: 45600,
  },
  {
    id: "7",
    title: "Best Football Moments 2024",
    thumbnail: "https://i.ytimg.com/vi/sample7/maxresdefault.jpg",
    channel: "Sports Central",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 2100000,
    subscribers: 780000,
    duration: "15:30",
    publishedDate: "9 days ago",
    outlierScore: 76,
    viewsPerHour: 12400,
  },
  {
    id: "8",
    title: "Incredible Saves by Goalkeepers",
    thumbnail: "https://i.ytimg.com/vi/sample8/maxresdefault.jpg",
    channel: "GK Academy",
    channelAvatar:
      "https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj",
    views: 1800000,
    subscribers: 450000,
    duration: "9:18",
    publishedDate: "7 days ago",
    outlierScore: 68,
    viewsPerHour: 18200,
  },
];

const OutliersPage = memo(function OutliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<
    "videos" | "shorts" | "thumbnails"
  >("videos");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // Changed to false by default
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [filters, setFilters] = useState<OutlierFilters>({
    outlierScore: [0, 100],
    views: [0, 10000000],
    subscribers: [0, 10000000],
    viewsPerHour: [0, 100000],
    videoLength: [0, 3600],
    publishingDate: "any",
  });

  const filteredVideos = useMemo(() => {
    let filtered = MOCK_VIDEOS;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    filtered = filtered.filter((video) => {
      const durationParts = video.duration.split(":");
      let videoDurationSeconds = 0;
      if (durationParts.length === 2) {
        // Format: MM:SS
        videoDurationSeconds =
          parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
      } else if (durationParts.length === 3) {
        // Format: HH:MM:SS
        videoDurationSeconds =
          parseInt(durationParts[0]) * 3600 +
          parseInt(durationParts[1]) * 60 +
          parseInt(durationParts[2]);
      }

      return (
        video.outlierScore >= filters.outlierScore[0] &&
        video.outlierScore <= filters.outlierScore[1] &&
        video.views >= filters.views[0] &&
        video.views <= filters.views[1] &&
        video.subscribers >= filters.subscribers[0] &&
        video.subscribers <= filters.subscribers[1] &&
        video.viewsPerHour >= filters.viewsPerHour[0] &&
        video.viewsPerHour <= filters.viewsPerHour[1] &&
        videoDurationSeconds >= filters.videoLength[0] &&
        videoDurationSeconds <= filters.videoLength[1]
      );
    });

    return filtered;
  }, [searchQuery, filters]);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleFiltersClick = () => {
    setShowFilters(!showFilters);
  };

  const handleApplyFilters = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleResetFilters = () => {
    setFilters({
      outlierScore: [0, 100],
      views: [0, 10000000],
      subscribers: [0, 10000000],
      viewsPerHour: [0, 100000],
      videoLength: [0, 3600],
      publishingDate: "any",
    });
  };

  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Outliers</h1>
            <p className="text-gray-400 text-lg">
              Discover winning ideas to inspire your next video
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-6 mb-8">
            <button
              onClick={() => setSelectedTab("videos")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTab === "videos"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <AiOutlinePlayCircle className="w-5 h-5" />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setSelectedTab("shorts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTab === "shorts"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="w-5 h-5 bg-gray-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-3 bg-white rounded-sm"></div>
              </div>
              <span>Shorts</span>
            </button>
            <button
              onClick={() => setSelectedTab("thumbnails")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTab === "thumbnails"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <span>Thumbnails</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <OutliersSearchBar
              placeholder="Search videos..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              onFiltersToggle={handleFiltersClick}
              showFilters={showFilters}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Advanced Filters */}
        {showFilters && (
          <div className="mb-8">
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-400">
            <span className="text-white font-medium">
              {filteredVideos.length}
            </span>{" "}
            videos found
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Sorted by:</span>
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="outlier_score">Outlier Score</option>
              <option value="views">Views</option>
              <option value="recent">Most Recent</option>
              <option value="views_per_hour">Views per Hour</option>
            </select>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === "videos" && (
          <VideoGrid
            videos={filteredVideos}
            loading={loading}
            onVideoClick={handleVideoClick}
          />
        )}

        {selectedTab === "shorts" && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Shorts Content</h3>
            <p className="text-gray-400">
              Shorts outliers content will be displayed here
            </p>
          </div>
        )}

        {selectedTab === "thumbnails" && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Thumbnails Content</h3>
            <p className="text-gray-400">
              Thumbnail outliers content will be displayed here
            </p>
          </div>
        )}
      </div>

      {/* Video Details Modal */}
      <VideoDetailsModal
        isOpen={showVideoModal}
        onClose={handleCloseModal}
        video={selectedVideo}
      />
    </div>
  );
});

export default OutliersPage;
