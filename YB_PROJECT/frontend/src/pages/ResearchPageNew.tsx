import { memo, useState } from "react";
import { useLocation } from "react-router-dom";

const ResearchPage = memo(function ResearchPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Videos");
  const [showFilters, setShowFilters] = useState(true);

  // Filter states
  const [outlierScore, setOutlierScore] = useState(67);
  const [views, setViews] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [viewsPerHour, setViewsPerHour] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [publishingDate, setPublishingDate] = useState("All Time");

  // Sample video data matching the image
  const videos = [
    {
      id: 1,
      title: "INFORMATION THAT VIETNAMESE FOOTBALL IS REMOVED FROM...",
      channel: "Technical Maruf",
      views: "102 N views",
      uploadTime: "1 year ago",
      subscribers: "11 N subscribers",
      thumbnail: "/api/placeholder/300/200",
      percentage: ">100%",
      vph: "8.2 VPH",
    },
    {
      id: 2,
      title: "Arif Aiman (12) Vs Vietnam• Arif Proved The Rise Of Malaysia...",
      channel: "Asian Football",
      views: "96 N views",
      uploadTime: "23 days ago",
      subscribers: "6.3 M subscribers",
      thumbnail: "/api/placeholder/300/200",
      percentage: ">100%",
      vph: "176 VPH",
    },
    {
      id: 3,
      title:
        "Nepal vs Laos |9-0| AFC Women's Asian Cup Qualifiers | Group F...",
      channel: "Talk Nepal Football HD",
      views: "159 N views",
      uploadTime: "5 days ago",
      subscribers: "5.4 N subscribers",
      thumbnail: "/api/placeholder/300/200",
      percentage: ">100%",
      vph: "1.6 N VPH",
    },
  ];

  const getSubPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/outliers")) return "Outliers";
    if (path.includes("/keywords")) return "Keywords";
    if (path.includes("/competitors")) return "Competitors";
    if (path.includes("/subscribers")) return "Subscribers";
    return "Outliers"; // Default
  };

  const getSubPageDescription = () => {
    const path = location.pathname;
    if (path.includes("/outliers"))
      return "Discover winning ideas to inspire your next video";
    if (path.includes("/keywords"))
      return "Find trending topics for your channel";
    if (path.includes("/competitors"))
      return "Analyze your competitors' performance";
    if (path.includes("/subscribers"))
      return "Track your subscriber growth and engagement";
    return "Discover winning ideas to inspire your next video"; // Default
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-3xl font-bold mb-2">
          {getSubPageTitle()}
        </h1>
        <p className="text-gray-400">{getSubPageDescription()}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {["Videos", "Shorts", "Thumbnails"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {tab === "Videos" && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            {tab === "Shorts" && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
              </svg>
            )}
            {tab === "Thumbnails" && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h7V2H4a2 2 0 0 0-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4a2 2 0 0 0-2-2zm0 18h-7v2h7a2 2 0 0 0 2-2v-7h-2v7zM4 13H2v7a2 2 0 0 0 2 2h7v-2H4v-7z" />
              </svg>
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Search and Filter Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Outlier Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium">Outlier Score</label>
                <button
                  onClick={() => setOutlierScore(0)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Reset
                </button>
              </div>
              <div className="text-gray-400 text-sm mb-3">Range (0-100x)</div>
              <div className="relative mb-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={outlierScore}
                  onChange={(e) => setOutlierScore(parseInt(e.target.value))}
                  className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{outlierScore}</span>
                <span>100+</span>
              </div>
            </div>

            {/* Views */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium">Views</label>
                <button
                  onClick={() => setViews(0)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Reset
                </button>
              </div>
              <div className="text-gray-400 text-sm mb-3">Range (0-10M+)</div>
              <div className="relative mb-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={views}
                  onChange={(e) => setViews(parseInt(e.target.value))}
                  className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{views}</span>
                <span>10 Tr+</span>
              </div>
            </div>

            {/* Subscribers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium">Subscribers</label>
                <button
                  onClick={() => setSubscribers(0)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Reset
                </button>
              </div>
              <div className="text-gray-400 text-sm mb-3">Range (0-10M+)</div>
              <div className="relative mb-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={subscribers}
                  onChange={(e) => setSubscribers(parseInt(e.target.value))}
                  className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{subscribers}</span>
                <span>10 Tr+</span>
              </div>
            </div>

            {/* Views Per Hour */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium">Views Per Hour</label>
                <button
                  onClick={() => setViewsPerHour(0)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Reset
                </button>
              </div>
              <div className="text-gray-400 text-sm mb-3">Range (0-1000+)</div>
              <div className="relative mb-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={viewsPerHour}
                  onChange={(e) => setViewsPerHour(parseInt(e.target.value))}
                  className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{viewsPerHour}</span>
                <span>1 N+</span>
              </div>
            </div>

            {/* Video Length */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium">Video Length</label>
                <button
                  onClick={() => setVideoLength(0)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Reset
                </button>
              </div>
              <div className="text-gray-400 text-sm mb-3">
                Range (0-60+ mins)
              </div>
              <div className="relative mb-2">
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={videoLength}
                  onChange={(e) => setVideoLength(parseInt(e.target.value))}
                  className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{videoLength}</span>
                <span>60+</span>
              </div>
            </div>

            {/* Publishing Date */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-medium">
                  Publishing Date
                </label>
                <button
                  onClick={() => setPublishingDate("All Time")}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Reset
                </button>
              </div>
              <div className="text-gray-400 text-sm mb-3"></div>
              <div className="relative">
                <select
                  value={publishingDate}
                  onChange={(e) => setPublishingDate(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="All Time">All Time</option>
                  <option value="Last 24 hours">Last 24 hours</option>
                  <option value="Last week">Last week</option>
                  <option value="Last month">Last month</option>
                  <option value="Last year">Last year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                setOutlierScore(0);
                setViews(0);
                setSubscribers(0);
                setViewsPerHour(0);
                setVideoLength(0);
                setPublishingDate("All Time");
              }}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Reset All
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Stats overlay - top left */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-1 text-xs font-bold bg-green-600 text-white rounded">
                  {video.percentage}
                </span>
                <span className="px-2 py-1 text-xs font-bold bg-gray-900 bg-opacity-80 text-white rounded">
                  {video.vph}
                </span>
              </div>

              {/* Menu button - top right */}
              <div className="absolute top-3 right-3">
                <button className="p-1 bg-gray-900 bg-opacity-50 text-white rounded hover:bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="text-white font-medium text-sm mb-2 line-clamp-2 leading-tight">
                {video.title}
              </h3>
              <p className="text-gray-400 text-xs mb-1">
                {video.channel} • {video.subscribers}
              </p>
              <p className="text-gray-400 text-xs">
                {video.views} • {video.uploadTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ResearchPage;
