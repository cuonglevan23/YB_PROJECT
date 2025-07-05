import { useState, useEffect } from "react";
import {
  FiTag,
  FiSearch,
  FiTrendingUp,
  FiBarChart,
  FiTarget,
  FiInfo,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiEye,
  FiStar,
  FiAward,
} from "react-icons/fi";

interface ChannelTag {
  id: string;
  tag: string;
  count: number;
  bestRank: number;
  rankedCount: number;
  searchVolume: number;
  competitionScore: number;
  overallScore: number;
}

interface SortConfig {
  key: keyof ChannelTag | null;
  direction: 'asc' | 'desc';
}

const ChannelTagsPage = () => {
  const [channelName] = useState("Video Gadgets Journal (VGJFelix)");
  const [tags, setTags] = useState<ChannelTag[]>([]);
  const [filteredTags, setFilteredTags] = useState<ChannelTag[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({
    minCount: 0,
    maxCount: 1000,
    minRank: 1,
    maxRank: 100,
    minScore: 0,
    maxScore: 100,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data similar to the image
  const mockTags: ChannelTag[] = [
    {
      id: "1",
      tag: "airshou",
      count: 60,
      bestRank: 1,
      rankedCount: 29,
      searchVolume: 18.5,
      competitionScore: 16.34,
      overallScore: 51.08,
    },
    {
      id: "2",
      tag: "how to record your ipad screen",
      count: 53,
      bestRank: 2,
      rankedCount: 11,
      searchVolume: 2.5,
      competitionScore: 24.47,
      overallScore: 39.02,
    },
    {
      id: "3",
      tag: "screen recorder for iphone",
      count: 50,
      bestRank: 8,
      rankedCount: 10,
      searchVolume: 25,
      competitionScore: 29.86,
      overallScore: 47.57,
    },
    {
      id: "4",
      tag: "phone screen recorder",
      count: 63,
      bestRank: 8,
      rankedCount: 10,
      searchVolume: 6,
      competitionScore: 24.47,
      overallScore: 40.77,
    },
    {
      id: "5",
      tag: "airshou ios 10",
      count: 13,
      bestRank: 1,
      rankedCount: 10,
      searchVolume: 2.5,
      competitionScore: 3.49,
      overallScore: 49.51,
    },
    {
      id: "6",
      tag: "how to record your iphone screen",
      count: 63,
      bestRank: 6,
      rankedCount: 8,
      searchVolume: 6.5,
      competitionScore: 28.1,
      overallScore: 39.2,
    },
    {
      id: "7",
      tag: "how to record ipad screen",
      count: 50,
      bestRank: 1,
      rankedCount: 7,
      searchVolume: 51.5,
      competitionScore: 30.21,
      overallScore: 60.65,
    },
    {
      id: "8",
      tag: "android lollipop tips and tricks",
      count: 2,
      bestRank: 3,
      rankedCount: 7,
      searchVolume: 0,
      competitionScore: 34.26,
      overallScore: 32.87,
    },
    {
      id: "9",
      tag: "vgj",
      count: 121,
      bestRank: 1,
      rankedCount: 7,
      searchVolume: 2.5,
      competitionScore: 1.82,
      overallScore: 50.34,
    },
    {
      id: "10",
      tag: "ios screen recording",
      count: 45,
      bestRank: 3,
      rankedCount: 6,
      searchVolume: 15.2,
      competitionScore: 22.15,
      overallScore: 44.28,
    },
  ];

  useEffect(() => {
    loadChannelTags();
  }, []);

  useEffect(() => {
    filterTags();
  }, [tags, searchTerm, filterConfig]);

  const loadChannelTags = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTags(mockTags);
    } catch (error) {
      console.error("Failed to load channel tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTags = () => {
    let filtered = tags.filter(tag => {
      const matchesSearch = tag.tag.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCount = tag.count >= filterConfig.minCount && tag.count <= filterConfig.maxCount;
      const matchesRank = tag.bestRank >= filterConfig.minRank && tag.bestRank <= filterConfig.maxRank;
      const matchesScore = tag.overallScore >= filterConfig.minScore && tag.overallScore <= filterConfig.maxScore;
      
      return matchesSearch && matchesCount && matchesRank && matchesScore;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredTags(filtered);
  };

  const handleSort = (key: keyof ChannelTag) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof ChannelTag) => {
    if (sortConfig.key !== key) {
      return <FiMinus className="w-3 h-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FiArrowUp className="w-3 h-3 text-blue-400" />
      : <FiArrowDown className="w-3 h-3 text-blue-400" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return "text-green-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return "text-green-400";
    if (rank <= 10) return "text-yellow-400";
    return "text-gray-400";
  };

  const getCompetitionColor = (score: number) => {
    if (score <= 15) return "text-green-400";
    if (score <= 30) return "text-yellow-400";
    return "text-red-400";
  };

  const exportTags = () => {
    const csvContent = [
      ['Tag', 'Count', 'Best Rank', 'Ranked Count', 'Search Volume', 'Competition Score', 'Overall Score'].join(','),
      ...filteredTags.map(tag => [
        `"${tag.tag}"`,
        tag.count,
        tag.bestRank,
        tag.rankedCount,
        tag.searchVolume,
        tag.competitionScore,
        tag.overallScore
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${channelName.replace(/[^a-zA-Z0-9]/g, '_')}_tags.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <FiTag className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Channel-wide Tags Analysis</h1>
                <p className="text-gray-300">Analyze tag performance across your entire channel</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  showFilters 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                <FiFilter />
                Filters
              </button>
              <button
                onClick={exportTags}
                className="bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <FiDownload />
                Export
              </button>
              <button
                onClick={loadChannelTags}
                disabled={isLoading}
                className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <FiRefreshCw className={isLoading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Found {filteredTags.length} channel-wide tags for {channelName}
                </h3>
                <p className="text-gray-400 text-sm">
                  Analyzing tag performance metrics across all videos
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FiEye className="text-blue-400" />
                  <span className="text-gray-300">Total Views Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-400" />
                  <span className="text-gray-300">SEO Ranking</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiAward className="text-purple-400" />
                  <span className="text-gray-300">Competition Analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <h4 className="text-white font-medium mb-3">Filter Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Count Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filterConfig.minCount}
                      onChange={(e) => setFilterConfig(prev => ({ ...prev, minCount: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filterConfig.maxCount}
                      onChange={(e) => setFilterConfig(prev => ({ ...prev, maxCount: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Rank Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filterConfig.minRank}
                      onChange={(e) => setFilterConfig(prev => ({ ...prev, minRank: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filterConfig.maxRank}
                      onChange={(e) => setFilterConfig(prev => ({ ...prev, maxRank: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Score Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filterConfig.minScore}
                      onChange={(e) => setFilterConfig(prev => ({ ...prev, minScore: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filterConfig.maxScore}
                      onChange={(e) => setFilterConfig(prev => ({ ...prev, maxScore: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-gray-600/50 border border-gray-500 rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FiTag className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Tags</p>
                <p className="text-2xl font-bold text-white">{filteredTags.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avg Score</p>
                <p className="text-2xl font-bold text-white">
                  {filteredTags.length > 0 
                    ? (filteredTags.reduce((sum, tag) => sum + tag.overallScore, 0) / filteredTags.length).toFixed(1)
                    : "0"
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <FiTarget className="text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Top Rank</p>
                <p className="text-2xl font-bold text-white">
                  {filteredTags.length > 0 
                    ? Math.min(...filteredTags.map(tag => tag.bestRank))
                    : "—"
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <FiBarChart className="text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Volume</p>
                <p className="text-2xl font-bold text-white">
                  {filteredTags.reduce((sum, tag) => sum + tag.searchVolume, 0).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading channel tags...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-medium">
                      <button
                        onClick={() => handleSort('tag')}
                        className="flex items-center gap-2 hover:text-white transition-colors"
                      >
                        Tag
                        {getSortIcon('tag')}
                      </button>
                    </th>
                    <th className="text-center p-4 text-gray-300 font-medium">
                      <button
                        onClick={() => handleSort('count')}
                        className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                      >
                        Count
                        <FiInfo className="w-3 h-3 text-gray-500" />
                        {getSortIcon('count')}
                      </button>
                    </th>
                    <th className="text-center p-4 text-gray-300 font-medium">
                      <button
                        onClick={() => handleSort('bestRank')}
                        className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                      >
                        Best Rank
                        <FiInfo className="w-3 h-3 text-gray-500" />
                        {getSortIcon('bestRank')}
                      </button>
                    </th>
                    <th className="text-center p-4 text-gray-300 font-medium">
                      <button
                        onClick={() => handleSort('rankedCount')}
                        className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                      >
                        Ranked Count
                        <FiInfo className="w-3 h-3 text-gray-500" />
                        {getSortIcon('rankedCount')}
                      </button>
                    </th>
                    <th className="text-center p-4 text-gray-300 font-medium">
                      <button
                        onClick={() => handleSort('searchVolume')}
                        className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                      >
                        Search Volume
                        <FiInfo className="w-3 h-3 text-gray-500" />
                        {getSortIcon('searchVolume')}
                      </button>
                    </th>
                    <th className="text-center p-4 text-gray-300 font-medium">
                      <button
                        onClick={() => handleSort('competitionScore')}
                        className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                      >
                        Competition Score
                        <FiInfo className="w-3 h-3 text-gray-500" />
                        {getSortIcon('competitionScore')}
                      </button>
                    </th>
                    <th className="text-center p-4 text-gray-300 font-medium">
                      <button
                        onClick={() => handleSort('overallScore')}
                        className="flex items-center gap-2 hover:text-white transition-colors mx-auto"
                      >
                        Overall Score
                        <FiInfo className="w-3 h-3 text-gray-500" />
                        {getSortIcon('overallScore')}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTags.map((tag, index) => (
                    <tr
                      key={tag.id}
                      className={`border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                        index % 2 === 0 ? 'bg-gray-800/20' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                          <span className="text-white font-medium">{tag.tag}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-white font-semibold">{tag.count}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-semibold ${getRankColor(tag.bestRank)}`}>
                          {tag.bestRank}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-white">{tag.rankedCount}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-white">{tag.searchVolume}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-semibold ${getCompetitionColor(tag.competitionScore)}`}>
                          {tag.competitionScore.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`font-bold ${getScoreColor(tag.overallScore)}`}>
                            {tag.overallScore.toFixed(2)}
                          </span>
                          {tag.overallScore >= 60 && (
                            <FiAward className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredTags.length === 0 && !isLoading && (
                <div className="p-12 text-center">
                  <FiTag className="mx-auto text-4xl text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No tags found</h3>
                  <p className="text-gray-400">
                    {searchTerm ? "Try adjusting your search or filter criteria" : "No channel tags available"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <FiInfo className="text-blue-400" />
            Metrics Explanation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="text-white font-medium mb-2">Count</h4>
              <p className="text-gray-400">Number of videos using this tag</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Best Rank</h4>
              <p className="text-gray-400">Highest ranking position achieved</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Ranked Count</h4>
              <p className="text-gray-400">Number of videos that ranked for this tag</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Search Volume</h4>
              <p className="text-gray-400">Monthly search volume (in thousands)</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Competition Score</h4>
              <p className="text-gray-400">Competition difficulty (lower is better)</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Overall Score</h4>
              <p className="text-gray-400">Combined performance metric</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelTagsPage;
