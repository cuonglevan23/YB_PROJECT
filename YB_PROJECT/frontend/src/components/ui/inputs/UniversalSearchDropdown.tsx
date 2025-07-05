import { memo, useState, useRef, useEffect, useCallback } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  type?: "suggestion" | "trending" | "recent" | "result";
  icon?: React.ReactNode;
  data?: any; // Additional data for the result
}

interface UniversalSearchDropdownProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: SearchResult) => void;
  onClear?: () => void;
  searchResults?: SearchResult[];
  isLoading?: boolean;
  showClearButton?: boolean;
  className?: string;
  dropdownClassName?: string;
  noResultsMessage?: string;
  disabled?: boolean;
  debounceMs?: number;
  maxResults?: number;
  showCategories?: boolean;
  resultRenderer?: (
    result: SearchResult,
    onSelect: (result: SearchResult) => void
  ) => React.ReactNode;
}

export const UniversalSearchDropdown = memo(function UniversalSearchDropdown({
  placeholder = "Search...",
  value = "",
  onChange,
  onSelect,
  onClear,
  searchResults = [],
  isLoading = false,
  showClearButton = true,
  className = "",
  dropdownClassName = "",
  noResultsMessage = "No results found",
  disabled = false,
  debounceMs = 300,
  maxResults = 10,
  showCategories = false,
  resultRenderer,
}: UniversalSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  // Debounce search value
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [value, debounceMs]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
      setIsOpen(!!newValue.trim());
    },
    [onChange]
  );

  const handleInputFocus = useCallback(() => {
    if (value.trim()) {
      setIsOpen(true);
    }
  }, [value]);

  const handleClear = useCallback(() => {
    onChange?.("");
    onClear?.();
    setIsOpen(false);
  }, [onChange, onClear]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      onSelect?.(result);
      setIsOpen(false);
    },
    [onSelect]
  );

  const displayResults = searchResults.slice(0, maxResults);
  const showDropdown =
    isOpen && (displayResults.length > 0 || (value.trim() && !isLoading));

  // Group results by category if showCategories is true
  const groupedResults = showCategories
    ? displayResults.reduce((acc, result) => {
        const category = result.category || "Other";
        if (!acc[category]) acc[category] = [];
        acc[category].push(result);
        return acc;
      }, {} as Record<string, SearchResult[]>)
    : { "": displayResults };

  const defaultResultRenderer = (
    result: SearchResult,
    onSelectResult: (result: SearchResult) => void
  ) => (
    <button
      key={result.id}
      onClick={() => onSelectResult(result)}
      className="w-full text-left px-4 py-3 text-white hover:bg-gray-600 transition-colors flex items-center gap-3"
    >
      {result.icon && <div className="flex-shrink-0">{result.icon}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{result.title}</div>
        {result.subtitle && (
          <div className="text-xs text-gray-400 truncate">
            {result.subtitle}
          </div>
        )}
      </div>
      {result.type && (
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {result.type}
        </span>
      )}
    </button>
  );

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
          className="w-full bg-gray-700 text-white placeholder-gray-400 pl-10 pr-10 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        {showClearButton && value && !disabled && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <AiOutlineClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 text-gray-400 text-sm flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
            Searching...
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {showDropdown && !isLoading && (
        <div
          className={`absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto ${dropdownClassName}`}
        >
          {displayResults.length > 0 ? (
            showCategories ? (
              Object.entries(groupedResults).map(([category, results]) => (
                <div key={category}>
                  {category && (
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-600">
                      {category}
                    </div>
                  )}
                  {results.map((result) =>
                    resultRenderer
                      ? resultRenderer(result, handleSelect)
                      : defaultResultRenderer(result, handleSelect)
                  )}
                </div>
              ))
            ) : (
              displayResults.map((result) =>
                resultRenderer
                  ? resultRenderer(result, handleSelect)
                  : defaultResultRenderer(result, handleSelect)
              )
            )
          ) : (
            <div className="px-4 py-3 text-gray-400 text-sm">
              {noResultsMessage}
              {value.trim() && ` for "${value}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
