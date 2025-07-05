import { memo } from "react";
import { SearchBar } from "../ui/inputs";

interface OptimizeSearchFiltersProps {
  searchQuery: string;
  selectedFilter: "all" | "videos" | "shorts";
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: "all" | "videos" | "shorts") => void;
}

const OptimizeSearchFilters = memo(function OptimizeSearchFilters({
  searchQuery,
  selectedFilter,
  onSearchChange,
  onFilterChange,
}: OptimizeSearchFiltersProps) {
  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search videos"
        size="md"
        onSearchClick={() => console.log("Search clicked")}
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">All videos</h2>
        <div className="flex items-center space-x-1 bg-gray-800/50 p-1 rounded-lg">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedFilter === "all"
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            All videos
          </button>
          <button
            onClick={() => onFilterChange("videos")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedFilter === "videos"
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📹 Videos
          </button>
          <button
            onClick={() => onFilterChange("shorts")}
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
  );
});

export default OptimizeSearchFilters;
