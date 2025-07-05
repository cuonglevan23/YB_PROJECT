import { memo, useState } from "react";
import {
  TopVideosSection,
  ComparePerformanceSection,
  ChannelStatsSection,
  CompetitorsSidebar,
  type Competitor,
  type TopVideo,
  type ChannelStat,
} from "../components/competitors";
import { useCompetitorChartData } from "../hooks";

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

  // Use custom hook for chart data
  const { chartData, chartLines } = useCompetitorChartData({
    competitors,
    selectedMetric,
    selectedDataType,
  });

  // Event handlers
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
            <TopVideosSection videos={topVideos} />

            {/* Compare Performance Section */}
            <ComparePerformanceSection
              selectedMetric={selectedMetric}
              onMetricChange={setSelectedMetric}
              selectedDataType={selectedDataType}
              onDataTypeChange={setSelectedDataType}
              chartData={chartData}
              chartLines={chartLines}
              competitors={competitors}
            />

            {/* Channel Stats Section */}
            <ChannelStatsSection channelStats={channelStats} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CompetitorsSidebar
              competitors={competitors}
              searchableCompetitors={searchableCompetitors}
              filteredCompetitors={filteredCompetitors}
              includeMyChannel={includeMyChannel}
              isSearchDropdownOpen={isSearchDropdownOpen}
              onToggleCompetitor={toggleCompetitor}
              onToggleSelectAll={toggleSelectAll}
              onAddCompetitor={handleAddCompetitor}
              onCancelSearch={handleCancelSearch}
              onToggleIncludeMyChannel={setIncludeMyChannel}
              onToggleSearchDropdown={() =>
                setIsSearchDropdownOpen(!isSearchDropdownOpen)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CompetitorsPage;
