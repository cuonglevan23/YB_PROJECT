import { memo, useState, useRef, useEffect, useCallback } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import type { ChangeEvent, KeyboardEvent } from "react";

interface SearchResult {
  id: string;
  title: string;
  type: "suggestion" | "trending" | "recent";
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  onSelect?: (result: SearchResult) => void;
}

const SearchModal = memo(function SearchModal({
  isOpen,
  onClose,
  onSearch,
  onSelect,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
      setResults(filtered.slice(0, 10));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSelectResult = useCallback(
    (result: SearchResult) => {
      setQuery(result.title);
      onSelect?.(result);
      onSearch?.(result.title);
      onClose();
    },
    [onSelect, onSearch, onClose]
  );

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch?.(query);
      onClose();
    }
  }, [query, onSearch, onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [handleSearch, onClose]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  }, []);

  const getResultIcon = useCallback((type: string) => {
    switch (type) {
      case "trending":
        return <BiTrendingUp className="w-5 h-5 text-red-500" />;
      default:
        return <AiOutlineSearch className="w-5 h-5 text-gray-400" />;
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
      <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-6 border-b border-gray-700">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineSearch className="w-6 h-6 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search videos, channels, playlists..."
              className="w-full pl-12 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <AiOutlineClose className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-96">
          {query && results.length > 0 && (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelectResult(result)}
                  className="w-full flex items-center px-6 py-4 text-left hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-b-0"
                >
                  <div className="flex-shrink-0 mr-4">
                    {getResultIcon(result.type)}
                  </div>
                  <span className="text-gray-300 flex-1 text-lg">
                    {result.title}
                  </span>
                  {result.type === "trending" && (
                    <span className="text-sm text-red-500 ml-2">Trending</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <AiOutlineSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No results found for "{query}"</p>
              <p className="text-sm mt-2">
                Try different keywords or check your spelling
              </p>
            </div>
          )}

          {/* Default State */}
          {!query && (
            <div className="p-8 text-center text-gray-400">
              <AiOutlineSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Start typing to search</p>
              <p className="text-sm mt-2">
                Search for videos, channels, or playlists
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default SearchModal;
