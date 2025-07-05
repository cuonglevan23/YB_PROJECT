import { memo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "../components/ui/buttons";
import {
  KeywordOpportunitiesSection,
  SearchTermsSection,
  RisingKeywordsSection,
} from "../components/keywords";

interface KeywordOpportunity {
  id: string;
  keyword: string;
  searchVolume: number;
  overall: "high" | "medium" | "low";
}

interface SearchTerm {
  id: string;
  keyword: string;
  views: number;
  watchTime: number;
}

interface RisingKeyword {
  id: string;
  keyword: string;
  trend: "up" | "down" | "stable";
  category: string;
}

const KeywordsPage = memo(function KeywordsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "opportunities" | "search-terms" | "rising"
  >("overview");

  // Mock data for keyword opportunities
  const keywordOpportunities: KeywordOpportunity[] = [
    {
      id: "1",
      keyword: "live stream",
      searchVolume: 284121,
      overall: "high",
    },
    {
      id: "2",
      keyword: "toyota problems",
      searchVolume: 1457,
      overall: "medium",
    },
    {
      id: "3",
      keyword: "how to come out as a goalkeeper",
      searchVolume: 750,
      overall: "low",
    },
    {
      id: "4",
      keyword: "football training tips",
      searchVolume: 12480,
      overall: "high",
    },
    {
      id: "5",
      keyword: "goalkeeper saves compilation",
      searchVolume: 8520,
      overall: "medium",
    },
  ];

  // Mock data for top search terms
  const searchTerms: SearchTerm[] = [
    {
      id: "1",
      keyword: "bùi tấn trường",
      views: 1,
      watchTime: 0,
    },
    {
      id: "2",
      keyword: "vietnam football",
      views: 15,
      watchTime: 2,
    },
    {
      id: "3",
      keyword: "goalkeeper training",
      views: 8,
      watchTime: 1,
    },
  ];

  // Mock data for rising keywords
  const risingKeywords: RisingKeyword[] = [
    {
      id: "1",
      keyword: "football training",
      trend: "up",
      category: "Sports",
    },
    {
      id: "2",
      keyword: "goalkeeper skills",
      trend: "up",
      category: "Sports",
    },
    {
      id: "3",
      keyword: "penalty shootout",
      trend: "up",
      category: "Sports",
    },
    {
      id: "4",
      keyword: "vietnam national team",
      trend: "up",
      category: "Sports",
    },
    {
      id: "5",
      keyword: "football highlights",
      trend: "up",
      category: "Entertainment",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Keywords</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <AiOutlineSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                block w-full pl-12 pr-16 py-3
                border border-gray-700 rounded-lg 
                bg-gray-800 text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200
                hover:border-gray-600
              "
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all duration-200">
              <AiOutlineSearch className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg w-fit">
            <button
              onClick={() => setSelectedTab("overview")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedTab === "overview"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab("opportunities")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedTab === "opportunities"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Top keyword opportunities
            </button>
            <button
              onClick={() => setSelectedTab("search-terms")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedTab === "search-terms"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Top search terms for your channel
            </button>
            <button
              onClick={() => setSelectedTab("rising")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedTab === "rising"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Rising keywords
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {selectedTab === "overview" && (
          <div className="space-y-8">
            <KeywordOpportunitiesSection data={keywordOpportunities} />
            <SearchTermsSection data={searchTerms} />
            <RisingKeywordsSection data={risingKeywords} />
          </div>
        )}

        {selectedTab === "opportunities" && (
          <KeywordOpportunitiesSection data={keywordOpportunities} />
        )}

        {selectedTab === "search-terms" && (
          <SearchTermsSection data={searchTerms} />
        )}

        {selectedTab === "rising" && (
          <RisingKeywordsSection data={risingKeywords} />
        )}
      </div>
    </div>
  );
});

export default KeywordsPage;
