import { memo, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { UniversalSearchDropdown } from "./UniversalSearchDropdown";
import type { SearchResult } from "./UniversalSearchDropdown";

interface Keyword {
  id: string;
  text: string;
  category?: string;
  type?: "suggestion" | "trending" | "recent";
}

interface KeywordSearchDropdownProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: Keyword) => void;
  onClear?: () => void;
  searchResults?: Keyword[];
  isLoading?: boolean;
  showClearButton?: boolean;
  showAddIcon?: boolean;
  className?: string;
  dropdownClassName?: string;
  noResultsMessage?: string;
  disabled?: boolean;
}

export const KeywordSearchDropdown = memo(function KeywordSearchDropdown({
  placeholder = "Search keywords...",
  value = "",
  onChange,
  onSelect,
  onClear,
  searchResults = [],
  isLoading = false,
  showClearButton = true,
  showAddIcon = true,
  className = "",
  dropdownClassName = "",
  noResultsMessage = "No results found",
  disabled = false,
}: KeywordSearchDropdownProps) {
  // Convert keywords to SearchResult format
  const convertedResults: SearchResult[] = useMemo(
    () =>
      searchResults.map((keyword) => ({
        id: keyword.id,
        title: keyword.text,
        category: keyword.category,
        type: keyword.type,
        data: keyword,
      })),
    [searchResults]
  );

  // Custom result renderer for keywords
  const keywordResultRenderer = (
    result: SearchResult,
    onSelectResult: (result: SearchResult) => void
  ) => (
    <button
      key={result.id}
      onClick={() => onSelectResult(result)}
      className="w-full text-left px-4 py-3 text-white hover:bg-gray-600 transition-colors flex items-center justify-between group"
    >
      <div className="flex flex-col">
        <span className="text-sm">{result.title}</span>
        {result.category && (
          <span className="text-xs text-gray-400">{result.category}</span>
        )}
      </div>
      {showAddIcon && (
        <AiOutlinePlus className="w-4 h-4 text-gray-400 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
      )}
    </button>
  );

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result.data as Keyword);
  };

  return (
    <UniversalSearchDropdown
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
      onClear={onClear}
      searchResults={convertedResults}
      isLoading={isLoading}
      showClearButton={showClearButton}
      className={className}
      dropdownClassName={dropdownClassName}
      noResultsMessage={noResultsMessage}
      disabled={disabled}
      resultRenderer={showAddIcon ? keywordResultRenderer : undefined}
    />
  );
});
