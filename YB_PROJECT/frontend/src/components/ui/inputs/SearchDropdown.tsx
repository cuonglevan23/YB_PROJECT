import { memo, useState, useRef, useEffect, useCallback } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import type { ChangeEvent, KeyboardEvent } from "react";

interface SearchResult {
  id: string;
  title: string;
  type: "suggestion" | "trending" | "recent";
  category?: string;
}

interface SearchDropdownProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (result: SearchResult) => void;
  className?: string;
}

const SearchDropdown = memo(function SearchDropdown({
  placeholder = "Search videos",
  onSearch,
  onSelect,
  className = "",
}: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter results based on query
  useEffect(() => {
    const mockResults: SearchResult[] = [
      { id: "1", title: "breaking bad", type: "trending" },
      { id: "2", title: "bruno mars", type: "suggestion" },
      { id: "3", title: "babymonster", type: "trending" },
      { id: "4", title: "baby", type: "suggestion" },
      { id: "5", title: "bong phu hoa", type: "recent" },
      { id: "6", title: "bùi công nam", type: "recent" },
      { id: "7", title: "bánh bao bự", type: "suggestion" },
      { id: "8", title: "blue", type: "trending" },
      { id: "9", title: "bl", type: "suggestion" },
      { id: "10", title: "bts", type: "trending" },
      { id: "11", title: "butterfly", type: "suggestion" },
      { id: "12", title: "beautiful things", type: "trending" },
      { id: "13", title: "beggin", type: "suggestion" },
    ];

    if (query.length > 0) {
      const filtered = mockResults.filter((result) =>
        result.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 10)); // Limit to 10 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  const handleSelectResult = useCallback(
    (result: SearchResult) => {
      setQuery(result.title);
      setIsOpen(false);
      onSelect?.(result);
      onSearch?.(result.title);
    },
    [onSelect, onSearch]
  );

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setIsOpen(false);
      onSearch?.(query);
    }
  }, [query, onSearch]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [handleSearch]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }, []);

  const getResultIcon = useCallback((type: string) => {
    switch (type) {
      case "trending":
        return <BiTrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <AiOutlineSearch className="w-4 h-4 text-gray-400" />;
    }
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <AiOutlineSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <AiOutlineClose className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelectResult(result)}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
            >
              <div className="flex-shrink-0 mr-3">
                {getResultIcon(result.type)}
              </div>
              <span className="text-gray-300 flex-1">{result.title}</span>
              {result.type === "trending" && (
                <span className="text-xs text-red-500 ml-2">Trending</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default SearchDropdown;
