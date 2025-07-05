import { memo } from "react";
import { KeywordDataTable } from "./KeywordDataTable";
import type { TableColumn } from "./KeywordDataTable";

interface KeywordOpportunity {
  id: string;
  keyword: string;
  searchVolume: number;
  overall: "high" | "medium" | "low";
}

interface KeywordOpportunitiesSectionProps {
  data: KeywordOpportunity[];
}

export const KeywordOpportunitiesSection = memo(
  function KeywordOpportunitiesSection({
    data,
  }: KeywordOpportunitiesSectionProps) {
    const getOverallColor = (overall: string) => {
      switch (overall) {
        case "high":
          return "bg-green-500 text-white";
        case "medium":
          return "bg-yellow-500 text-white";
        case "low":
          return "bg-orange-500 text-white";
        default:
          return "bg-gray-500 text-white";
      }
    };

    const getOverallPercentage = (overall: string) => {
      switch (overall) {
        case "high":
          return "62%";
        case "medium":
          return "53%";
        case "low":
          return "48%";
        default:
          return "0%";
      }
    };

    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
      }
      return num.toString();
    };

    const columns: TableColumn[] = [
      {
        key: "keyword",
        label: "Keyword",
        width: "flex-1",
        render: (value) => (
          <span className="text-white font-medium">{value as string}</span>
        ),
      },
      {
        key: "searchVolume",
        label: "Search volume",
        width: "w-32",
        render: (value) => (
          <span className="text-gray-300">{formatNumber(value as number)}</span>
        ),
      },
      {
        key: "overall",
        label: "Overall",
        width: "w-24",
        render: (value) => (
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getOverallColor(
              value as string
            )}`}
          >
            {getOverallPercentage(value as string)}
          </span>
        ),
      },
    ];

    return (
      <KeywordDataTable
        title="Top keyword opportunities"
        columns={columns}
        data={data as unknown as Record<string, unknown>[]}
        showManageButton={true}
        unlockVariant="opportunities"
        className="mb-8"
      />
    );
  }
);
