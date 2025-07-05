import { memo, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { SearchWithFilters } from "../components/ui/inputs";

const OutliersPage = memo(function OutliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"videos" | "shorts" | "thumbnails">("videos");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Handle search functionality
  };

  const handleFiltersClick = () => {
    console.log("Opening filters");
    // Handle filters modal or dropdown
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
          <div className="max-w-4xl">
            <SearchWithFilters
              placeholder="Search videos..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              onFiltersClick={handleFiltersClick}
              showFilters={true}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content */}
        {selectedTab === "videos" && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Videos Content</h3>
            <p className="text-gray-400">
              Video outliers content will be displayed here
            </p>
          </div>
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
    </div>
  );
});

export default OutliersPage;
