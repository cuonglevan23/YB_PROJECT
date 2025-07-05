import { memo, useState } from "react";
import { AiOutlineInfoCircle, AiOutlineDown } from "react-icons/ai";
import { LineChart } from "../components/charts";
import type { LineChartData, LineChartLine } from "../components/charts";
import { CompetitorSearchDropdown } from "../components/ui/dropdowns";

interface Competitor {
  id: string;
  name: string;
  channelName: string;
  subscribers: string;
  avatar: string;
  isSelected: boolean;
}

interface TopVideo {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  views: number;
  outlierScore: string;
  viewsPerHour: number;
  uploadTime: string;
}

interface ChannelStat {
  id: string;
  name: string;
  avatar: string;
  totalVideos: string;
  thisWeek: number;
  vsLastWeek: string;
  thisMonth: number;
  vsLastMonth: string;
}

const CompetitorsPage = memo(function CompetitorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("Views");
  const [selectedDataType, setSelectedDataType] = useState("Total");
  const [includeMyChannel, setIncludeMyChannel] = useState(true);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: "1",
      name: "Thầy Giáo Ba",
      channelName: "Thầy Giáo Ba",
      subscribers: "406 N subs",
      avatar: "/api/placeholder/40/40",
      isSelected: true,
    },
    {
      id: "2",
      name: "Tấn Trường Bùi",
      channelName: "Tấn Trường Bùi",
      subscribers: "41 subscribers",
      avatar: "/api/placeholder/40/40",
      isSelected: true,
    },
  ]);

  // Mock data for search competitors (based on the image)
  const searchableCompetitors: Omit<Competitor, "isSelected">[] = [
    {
      id: "search-1",
      name: "Pháp thoại Thầy Pháp Hoa",
      channelName: "Pháp thoại Thầy Pháp Hoa",
      subscribers: "1.7 Tr subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-2",
      name: "Văn đáp Thầy Thích Pháp Hoa",
      channelName: "Văn đáp Thầy Thích Pháp Hoa",
      subscribers: "1.6 Tr subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-3",
      name: "Nghe Pháp Thầy Thích Pháp Hòa",
      channelName: "Nghe Pháp Thầy Thích Pháp Hòa",
      subscribers: "1.2 Tr subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-4",
      name: "Thầy Giáo Đông",
      channelName: "Thầy Giáo Đông",
      subscribers: "823 N subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-5",
      name: "Thầy Thích Trúc Thái Minh",
      channelName: "Thầy Thích Trúc Thái Minh",
      subscribers: "616 N subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-6",
      name: "Thầy Thích Pháp Hoa - Tu Viện Trúc Lâm",
      channelName: "Thầy Thích Pháp Hoa - Tu Viện Trúc Lâm",
      subscribers: "501 N subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-7",
      name: "Thầy Chung An Giang",
      channelName: "Thầy Chung An Giang",
      subscribers: "129 N subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-8",
      name: "Thầy Pháp Nhật Channel",
      channelName: "Thầy Pháp Nhật Channel",
      subscribers: "20 N subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-9",
      name: "THẦY ĐỖ KHUYÊN - DIỄN CHẤN",
      channelName: "THẦY ĐỖ KHUYÊN - DIỄN CHẤN",
      subscribers: "5.1 N subscribers",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "search-10",
      name: "Thầy TX Dây",
      channelName: "Thầy TX Dây",
      subscribers: "3.4 N subscribers",
      avatar: "/api/placeholder/40/40",
    },
  ];

  // Mock data for top videos
  const topVideos: TopVideo[] = [
    {
      id: "1",
      title:
        "REMATCH | ANH EM SBTC LUYỆN TẬP CHĂM CHỈ CHO ĐẠI CHIẾN VỚI REFUND SẮP DIỄN RA",
      channelName: "Thầy Giáo Ba",
      thumbnail: "/api/placeholder/120/68",
      views: 38393,
      outlierScore: "1.1x",
      viewsPerHour: 372.9,
      uploadTime: "2 days ago",
    },
    {
      id: "2",
      title:
        "TRAIN TEAM BCS #14 | SBTC JR DỰ GẶP NHIỀU KHÓ KHĂN NHƯNG VẪN CÓ GANG ĐỂN GIÂY PHÚT CUỐI CÙNG",
      channelName: "Thầy Giáo Ba",
      thumbnail: "/api/placeholder/120/68",
      views: 32068,
      outlierScore: "1.2x",
      viewsPerHour: 769.6,
      uploadTime: "a day ago",
    },
    {
      id: "3",
      title:
        "HIGHLIGHT BCS 2025 | TUẦN 2 [28.06.2025] SBTC JR CÓ CHIẾN THẮNG ĐẦU TIÊN CỰC KỲ CẢM XÚC",
      channelName: "Thầy Giáo Ba",
      thumbnail: "/api/placeholder/120/68",
      views: 28021,
      outlierScore: "0.52x",
      viewsPerHour: 42.3,
      uploadTime: "6 days ago",
    },
    {
      id: "4",
      title:
        "REMATCH | MỘT BUỔI TẬP LUYỆN DÀI HƠI CỦA ANH EM SBTC THỂ HIỆN QUYẾT TÂM CAO",
      channelName: "Thầy Giáo Ba",
      thumbnail: "/api/placeholder/120/68",
      views: 23039,
      outlierScore: "-",
      viewsPerHour: 1351.5,
      uploadTime: "18 hours ago",
    },
    {
      id: "5",
      title:
        "TRAIN TEAM BCS #15 | HLV BAROIBEO CHỈ DAO CHIẾN THUẬT CHO SBTC JR MỘT CÁCH CHUYÊN NGHIỆP VÀ CẢI KẾT",
      channelName: "Thầy Giáo Ba",
      thumbnail: "/api/placeholder/120/68",
      views: 21533,
      outlierScore: "-",
      viewsPerHour: 2153.3,
      uploadTime: "14 hours ago",
    },
  ];

  // Mock data for channel stats
  const channelStats: ChannelStat[] = [
    {
      id: "1",
      name: "Thầy Giáo Ba",
      avatar: "/api/placeholder/40/40",
      totalVideos: "2.6 N",
      thisWeek: 3,
      vsLastWeek: "↓ 72.7%",
      thisMonth: 35,
      vsLastMonth: "↓ 20.5%",
    },
    {
      id: "2",
      name: "Tấn Trường Bùi",
      avatar: "/api/placeholder/40/40",
      totalVideos: "19",
      thisWeek: 0,
      vsLastWeek: "0.0%",
      thisMonth: 0,
      vsLastMonth: "0.0%",
    },
  ];

  const toggleCompetitor = (competitorId: string) => {
    setCompetitors((prev) =>
      prev.map((comp) =>
        comp.id === competitorId
          ? { ...comp, isSelected: !comp.isSelected }
          : comp
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = competitors.every((comp) => comp.isSelected);
    setCompetitors((prev) =>
      prev.map((comp) => ({ ...comp, isSelected: !allSelected }))
    );
  };

  const handleAddCompetitor = (competitor: Omit<Competitor, "isSelected">) => {
    // Check if competitor already exists
    const exists = competitors.find((comp) => comp.id === competitor.id);
    if (!exists) {
      setCompetitors((prev) => [...prev, { ...competitor, isSelected: true }]);
    }
  };

  const handleCancelSearch = () => {
    // Reset search or perform other cleanup actions
    setSearchQuery("");
  };

  // Function to generate chart data based on selected metric and data type
  const getChartDataForMetric = (
    metric: string,
    dataType: string
  ): LineChartData[] => {
    const dates = [
      "05/01/25",
      "05/02/25",
      "05/03/25",
      "05/04/25",
      "05/05/25",
      "05/06/25",
      "05/07/25",
    ];

    return dates.map((date, index) => {
      const baseData: LineChartData = { name: date };

      competitors.forEach((competitor) => {
        let value = 0;

        switch (metric) {
          case "Views":
            if (dataType === "Total") {
              value = competitor.name === "Thầy Giáo Ba" ? 81 : 0;
            } else if (dataType === "Daily") {
              value =
                competitor.name === "Thầy Giáo Ba"
                  ? Math.floor(Math.random() * 50) + 20
                  : 0;
            } else if (dataType === "Cumulative") {
              value = competitor.name === "Thầy Giáo Ba" ? (index + 1) * 12 : 0;
            }
            break;

          case "Subscribers":
            if (dataType === "Total") {
              value = competitor.name === "Thầy Giáo Ba" ? 406000 : 41;
            } else if (dataType === "Daily") {
              value =
                competitor.name === "Thầy Giáo Ba"
                  ? Math.floor(Math.random() * 100) + 50
                  : 0;
            } else if (dataType === "Cumulative") {
              value =
                competitor.name === "Thầy Giáo Ba" ? (index + 1) * 200 : index;
            }
            break;

          case "Public videos":
            if (dataType === "Total") {
              value = competitor.name === "Thầy Giáo Ba" ? 2600 : 19;
            } else if (dataType === "Daily") {
              value =
                competitor.name === "Thầy Giáo Ba"
                  ? Math.floor(Math.random() * 3)
                  : 0;
            } else if (dataType === "Cumulative") {
              value =
                competitor.name === "Thầy Giáo Ba"
                  ? (index + 1) * 5
                  : index * 0.5;
            }
            break;

          case "Average daily views":
            value =
              competitor.name === "Thầy Giáo Ba"
                ? Math.floor(Math.random() * 20) + 10
                : Math.floor(Math.random() * 5);
            break;

          case "Average subscribers/day":
            value =
              competitor.name === "Thầy Giáo Ba"
                ? Math.floor(Math.random() * 15) + 5
                : Math.floor(Math.random() * 3);
            break;

          case "Average public videos/day":
            value =
              competitor.name === "Thầy Giáo Ba"
                ? Math.random() * 2
                : Math.random() * 0.5;
            break;

          default:
            value = 0;
        }

        baseData[competitor.name] = value;
      });

      return baseData;
    });
  };

  const chartLines: LineChartLine[] = competitors
    .filter((comp) => comp.isSelected)
    .map((competitor, index) => ({
      dataKey: competitor.name,
      stroke: ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"][index % 4],
      strokeWidth: 2,
      name: competitor.name,
      avatar: competitor.avatar,
    }));

  const filteredCompetitors = competitors.filter(
    (competitor) =>
      competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competitor.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Competitors</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Videos Section */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Top Videos From Your Competitors
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">This week</span>
                    <AiOutlineDown className="text-gray-400 h-4 w-4" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Outlier Level</span>
                    <AiOutlineDown className="text-gray-400 h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        Video
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        Views
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        Outlier
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        Views/hour
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        Uploaded
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topVideos.map((video) => (
                      <tr
                        key={video.id}
                        className="border-b border-gray-800 hover:bg-gray-700/30"
                      >
                        <td className="py-4">
                          <div className="flex items-start space-x-3">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-20 h-12 rounded object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
                                {video.title}
                              </h3>
                              <p className="text-gray-400 text-xs">
                                {video.channelName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-white text-sm">
                          {video.views.toLocaleString()}
                        </td>
                        <td className="py-4">
                          <span
                            className={`text-sm ${
                              video.outlierScore === "-"
                                ? "text-gray-400"
                                : parseFloat(video.outlierScore) > 1
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {video.outlierScore}
                          </span>
                        </td>
                        <td className="py-4 text-white text-sm">
                          {video.viewsPerHour}
                        </td>
                        <td className="py-4 text-gray-400 text-sm">
                          {video.uploadTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compare Performance Section */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-semibold text-white">
                    Compare Performance
                  </h2>
                  <AiOutlineInfoCircle className="text-gray-400 h-5 w-5" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">30 Days</span>
                    <span className="text-white font-medium">60 Days</span>
                    <span className="text-gray-400">12 Months</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                {/* Left Sidebar with Metrics */}
                <div className="w-48 space-y-2">
                  <div
                    onClick={() => setSelectedMetric("Views")}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMetric === "Views"
                        ? "bg-blue-600/20 border-l-4 border-blue-500"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="text-white font-medium">Views</div>
                  </div>
                  <div
                    onClick={() => setSelectedMetric("Subscribers")}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMetric === "Subscribers"
                        ? "bg-blue-600/20 border-l-4 border-blue-500"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="text-white font-medium">Subscribers</div>
                  </div>
                  <div
                    onClick={() => setSelectedMetric("Public videos")}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMetric === "Public videos"
                        ? "bg-blue-600/20 border-l-4 border-blue-500"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="text-white font-medium">Public videos</div>
                  </div>
                  <div
                    onClick={() => setSelectedMetric("Average daily views")}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMetric === "Average daily views"
                        ? "bg-blue-600/20 border-l-4 border-blue-500"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="text-white font-medium">
                      Average daily views
                    </div>
                  </div>
                  <div
                    onClick={() => setSelectedMetric("Average subscribers/day")}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMetric === "Average subscribers/day"
                        ? "bg-blue-600/20 border-l-4 border-blue-500"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="text-white font-medium">
                      Average subscribers/day
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setSelectedMetric("Average public videos/day")
                    }
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMetric === "Average public videos/day"
                        ? "bg-blue-600/20 border-l-4 border-blue-500"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="text-white font-medium">
                      Average public videos/day
                    </div>
                  </div>
                </div>

                {/* Right Chart Area */}
                <div className="flex-1">
                  {/* Chart Controls */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedDataType("Daily")}
                          className={`px-3 py-1 rounded-md text-sm transition-colors ${
                            selectedDataType === "Daily"
                              ? "bg-white text-gray-900 font-medium"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Daily
                        </button>
                        <button
                          onClick={() => setSelectedDataType("Cumulative")}
                          className={`px-3 py-1 rounded-md text-sm transition-colors ${
                            selectedDataType === "Cumulative"
                              ? "bg-white text-gray-900 font-medium"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Cumulative
                        </button>
                        <button
                          onClick={() => setSelectedDataType("Total")}
                          className={`px-3 py-1 rounded-md text-sm transition-colors ${
                            selectedDataType === "Total"
                              ? "bg-white text-gray-900 font-medium"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Total
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-80 w-full">
                    <LineChart
                      data={getChartDataForMetric(
                        selectedMetric,
                        selectedDataType
                      )}
                      lines={chartLines}
                      height={320}
                    />
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center mt-4 space-x-6">
                    {competitors
                      .filter((comp) => comp.isSelected)
                      .map((competitor, index) => (
                        <div
                          key={competitor.id}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src={competitor.avatar}
                            alt={competitor.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: [
                                "#8B5CF6",
                                "#3B82F6",
                                "#10B981",
                                "#F59E0B",
                              ][index % 4],
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Stats Section */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-6">
                Channel Stats
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        Channel
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        Total Videos
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        This Week
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        vs Last Week
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        This Month
                      </th>
                      <th className="text-left text-sm font-medium text-gray-400 pb-3">
                        vs Last Month
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelStats.map((channel) => (
                      <tr
                        key={channel.id}
                        className="border-b border-gray-800 hover:bg-gray-700/30"
                      >
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={channel.avatar}
                              alt={channel.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-white font-medium">
                              {channel.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-white">
                          {channel.totalVideos}
                        </td>
                        <td className="py-4 text-white">{channel.thisWeek}</td>
                        <td className="py-4">
                          <span
                            className={`text-sm ${
                              channel.vsLastWeek.includes("↓")
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {channel.vsLastWeek}
                          </span>
                        </td>
                        <td className="py-4 text-white">{channel.thisMonth}</td>
                        <td className="py-4">
                          <span
                            className={`text-sm ${
                              channel.vsLastMonth.includes("↓")
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {channel.vsLastMonth}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-6">
                Add competitors
              </h2>

              {/* Competitor Search Dropdown */}
              <div className="mb-6">
                <CompetitorSearchDropdown
                  competitors={searchableCompetitors}
                  onSelectCompetitor={handleAddCompetitor}
                  onCancel={handleCancelSearch}
                  placeholder="Search competitors..."
                  isOpen={isSearchDropdownOpen}
                  onToggle={() =>
                    setIsSearchDropdownOpen(!isSearchDropdownOpen)
                  }
                />
              </div>

              {/* Include My Channel Toggle */}
              <div className="flex items-center justify-between mb-6 p-3 bg-gray-700/30 rounded-lg">
                <span className="text-white font-medium">
                  Include my channel
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMyChannel}
                    onChange={(e) => setIncludeMyChannel(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Select All Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Select all</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={competitors.every((comp) => comp.isSelected)}
                    onChange={toggleSelectAll}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Competitors List */}
              <div className="space-y-3">
                {filteredCompetitors.map((competitor) => (
                  <div
                    key={competitor.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/30 transition-colors"
                  >
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={competitor.isSelected}
                        onChange={() => toggleCompetitor(competitor.id)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <img
                      src={competitor.avatar}
                      alt={competitor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">
                        {competitor.name}
                      </h3>
                      <p className="text-gray-400 text-xs truncate">
                        {competitor.subscribers}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CompetitorsPage;
