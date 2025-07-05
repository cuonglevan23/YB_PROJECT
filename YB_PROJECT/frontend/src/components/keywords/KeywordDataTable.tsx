import { memo } from "react";
import type { ReactNode } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { KeywordUnlockSection } from "../ui/KeywordUnlockSection";
import { ManageKeywordsModal } from "../ui/modals/ManageKeywordsModal";
import { useManageKeywordsModal } from "../../hooks/useManageKeywordsModal";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: string;
  render?: (value: unknown, row: T) => ReactNode;
}

interface KeywordDataTableProps<T = Record<string, unknown>> {
  title: string;
  subtitle?: string;
  columns: TableColumn<T>[];
  data: T[];
  showManageButton?: boolean;
  showDownloadButton?: boolean;
  showUnlockSection?: boolean;
  unlockVariant?: "default" | "trending" | "opportunities";
  unlockTitle?: string;
  unlockButtonText?: string;
  customActions?: ReactNode;
  className?: string;
}

export const KeywordDataTable = memo(function KeywordDataTable<
  T extends Record<string, unknown>
>({
  title,
  subtitle,
  columns,
  data,
  showManageButton = false,
  showDownloadButton = true,
  showUnlockSection = true,
  unlockVariant = "opportunities",
  unlockTitle,
  unlockButtonText,
  customActions,
  className = "",
}: KeywordDataTableProps<T>) {
  // Initialize keywords modal with mock data
  const initialKeywords = [
    { id: "1", text: "premier league" },
    { id: "2", text: "football" },
    { id: "3", text: "soccer" },
    { id: "4", text: "fifa" },
    { id: "5", text: "club world cup" },
    { id: "6", text: "goal" },
  ];

  const initialSuggestions = [
    { id: "s1", text: "2025" },
    { id: "s2", text: "football" },
    { id: "s3", text: "soccer" },
    { id: "s4", text: "fifa club world cup" },
    { id: "s5", text: "club world cup" },
    { id: "s6", text: "fifa" },
    { id: "s7", text: "goal" },
    { id: "s8", text: "futbol" },
    { id: "s9", text: "premier league" },
    { id: "s10", text: "club world cup goals" },
    { id: "s11", text: "uefa" },
    { id: "s12", text: "serie a" },
    { id: "s13", text: "usa" },
    { id: "s14", text: "spain" },
    { id: "s15", text: "la liga" },
  ];

  const {
    isOpen,
    addedKeywords,
    suggestedKeywords,
    openModal,
    closeModal,
    addKeyword,
    removeKeyword,
    saveKeywords,
    refreshSuggestions,
  } = useManageKeywordsModal(initialKeywords, initialSuggestions);
  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {customActions}
          {showManageButton && (
            <button
              onClick={openModal}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Manage
            </button>
          )}
          {showDownloadButton && (
            <button className="text-gray-400 hover:text-white transition-colors">
              <AiOutlineDownload className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="w-8 py-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left py-3 px-3 text-gray-400 font-medium text-sm ${
                    column.width || ""
                  }`}
                >
                  {column.label}
                  {(column.key === "searchVolume" ||
                    column.key === "views") && (
                    <button className="ml-1 text-gray-500 hover:text-gray-300">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                      </svg>
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={((row as Record<string, unknown>).id as string) || index}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-3 text-white">
                    {column.render
                      ? column.render(
                          (row as Record<string, unknown>)[column.key],
                          row
                        )
                      : String(
                          (row as Record<string, unknown>)[column.key] || ""
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Unlock Section */}
      {showUnlockSection && (
        <KeywordUnlockSection
          variant={unlockVariant}
          title={unlockTitle}
          buttonText={unlockButtonText}
          className="mt-6"
        />
      )}

      {/* Manage Keywords Modal */}
      <ManageKeywordsModal
        isOpen={isOpen}
        onClose={closeModal}
        addedKeywords={addedKeywords}
        suggestedKeywords={suggestedKeywords}
        onAddKeyword={addKeyword}
        onRemoveKeyword={removeKeyword}
        onSave={saveKeywords}
        onRefreshSuggestions={refreshSuggestions}
      />
    </div>
  );
});
