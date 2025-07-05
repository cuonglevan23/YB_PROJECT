import { memo, useState } from "react";
import { KeywordDataTable } from "./KeywordDataTable";
import type { TableColumn } from "./KeywordDataTable";

interface RisingKeyword {
  id: string;
  keyword: string;
  trend: "up" | "down" | "stable";
  category: string;
}

interface RisingKeywordsSectionProps {
  data: RisingKeyword[];
}

export const RisingKeywordsSection = memo(function RisingKeywordsSection({
  data,
}: RisingKeywordsSectionProps) {
  const [timeFilter, setTimeFilter] = useState<
    "today" | "this-week" | "this-month"
  >("this-month");
  const [languageFilter, setLanguageFilter] = useState("english");
  const [topicFilter, setTopicFilter] = useState("all");

  const columns: TableColumn[] = [
    {
      key: "keyword",
      label: "Keyword",
      width: "flex-1",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{value as string}</span>
          {row.trend === "up" && (
            <span className="text-green-400 text-xs">↗</span>
          )}
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      width: "w-32",
      render: (value) => (
        <span className="text-gray-300">{value as string}</span>
      ),
    },
  ];

  const customActions = (
    <div className="flex items-center gap-4">
      {/* Time Filter */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTimeFilter("today")}
          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
            timeFilter === "today"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setTimeFilter("this-week")}
          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
            timeFilter === "this-week"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          This week
        </button>
        <button
          onClick={() => setTimeFilter("this-month")}
          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
            timeFilter === "this-month"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          This month
        </button>
      </div>

      {/* Language Filter */}
      <select
        value={languageFilter}
        onChange={(e) => setLanguageFilter(e.target.value)}
        className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
      >
        <option value="english">English</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="all">All Languages</option>
      </select>
    </div>
  );

  const tableCustomActions = (
    <div className="flex items-center gap-4">
      {/* Topic Filter */}
      <select
        value={topicFilter}
        onChange={(e) => setTopicFilter(e.target.value)}
        className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
      >
        <option value="all">Topic: All</option>
        <option value="sports">Sports</option>
        <option value="entertainment">Entertainment</option>
        <option value="education">Education</option>
      </select>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Custom Filter Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Rising keywords</h3>
        {customActions}
      </div>

      <KeywordDataTable
        title=""
        columns={columns}
        data={data as unknown as Record<string, unknown>[]}
        showManageButton={false}
        unlockVariant="trending"
        customActions={tableCustomActions}
        className=""
      />
    </div>
  );
});
