import { memo } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface KeywordsFiltersProps {
  searchQuery: string;
  selectedTab: "overview" | "opportunities" | "search-terms" | "rising";
  timeFilter: "today" | "this-week" | "this-month";
  languageFilter: string;
  topicFilter: string;
  onSearchChange: (query: string) => void;
  onTabChange: (
    tab: "overview" | "opportunities" | "search-terms" | "rising"
  ) => void;
  onTimeFilterChange: (filter: "today" | "this-week" | "this-month") => void;
  onLanguageFilterChange: (filter: string) => void;
  onTopicFilterChange: (filter: string) => void;
}

const KeywordsFilters = memo(function KeywordsFilters({
  searchQuery,
  selectedTab,
  timeFilter,
  languageFilter,
  topicFilter,
  onSearchChange,
  onTabChange,
  onTimeFilterChange,
  onLanguageFilterChange,
  onTopicFilterChange,
}: KeywordsFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <AiOutlineSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-12 pr-4 py-3 border border-gray-700 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-gray-800/50 p-1 rounded-lg">
          <button
            onClick={() => onTabChange("overview")}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              selectedTab === "overview"
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onTabChange("opportunities")}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              selectedTab === "opportunities"
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => onTabChange("search-terms")}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              selectedTab === "search-terms"
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Search Terms
          </button>
          <button
            onClick={() => onTabChange("rising")}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              selectedTab === "rising"
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Rising
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <select
            value={timeFilter}
            onChange={(e) =>
              onTimeFilterChange(
                e.target.value as "today" | "this-week" | "this-month"
              )
            }
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>

          <select
            value={languageFilter}
            onChange={(e) => onLanguageFilterChange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="english">English</option>
            <option value="vietnamese">Vietnamese</option>
            <option value="all">All Languages</option>
          </select>

          <select
            value={topicFilter}
            onChange={(e) => onTopicFilterChange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Topics</option>
            <option value="tech">Technology</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export { KeywordsFilters };
