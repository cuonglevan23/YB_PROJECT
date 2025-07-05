import { memo } from "react";
import { KeywordDataTable } from "./KeywordDataTable";
import type { TableColumn } from "./KeywordDataTable";

interface SearchTerm {
  id: string;
  keyword: string;
  views: number;
  watchTime: number;
}

interface SearchTermsSectionProps {
  data: SearchTerm[];
}

export const SearchTermsSection = memo(function SearchTermsSection({
  data,
}: SearchTermsSectionProps) {
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
      key: "views",
      label: "Views",
      width: "w-20",
      render: (value) => (
        <span className="text-gray-300">{value as number}</span>
      ),
    },
    {
      key: "watchTime",
      label: "Watch time",
      width: "w-24",
      render: (value) => (
        <span className="text-gray-300">{value as number}</span>
      ),
    },
  ];

  const customActions = (
    <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
      View all search terms
    </button>
  );

  return (
    <KeywordDataTable
      title="Top search terms for your channel"
      columns={columns}
      data={data as unknown as Record<string, unknown>[]}
      showManageButton={false}
      unlockVariant="default"
      unlockTitle="Get more search term insights for your channel"
      customActions={customActions}
      className="mb-8"
    />
  );
});
