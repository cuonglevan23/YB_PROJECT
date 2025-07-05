import { memo, useState, useRef, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

interface Competitor {
  id: string;
  name: string;
  channelName: string;
  subscribers: string;
  avatar: string;
}

interface CompetitorSearchDropdownProps {
  competitors: Competitor[];
  onSelectCompetitor: (competitor: Competitor) => void;
  onCancel: () => void;
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const CompetitorSearchDropdown = memo(function CompetitorSearchDropdown({
  competitors,
  onSelectCompetitor,
  onCancel,
  placeholder = "Search competitors...",
  isOpen,
  onToggle,
}: CompetitorSearchDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter competitors based on search query
  const filteredCompetitors = competitors.filter(
    (competitor) =>
      competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competitor.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
        setSearchQuery("");
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus input when dropdown opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredCompetitors.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCompetitors.length - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0 && filteredCompetitors[focusedIndex]) {
          handleSelectCompetitor(filteredCompetitors[focusedIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        handleCancel();
        break;
    }
  };

  const handleSelectCompetitor = (competitor: Competitor) => {
    onSelectCompetitor(competitor);
    setSearchQuery("");
    setFocusedIndex(-1);
    onToggle();
  };

  const handleCancel = () => {
    onCancel();
    setSearchQuery("");
    setFocusedIndex(-1);
    onToggle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFocusedIndex(-1);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors text-left"
      >
        <div className="flex items-center space-x-2">
          <AiOutlineSearch className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">Add competitors</span>
        </div>
        <div className="text-gray-400">{isOpen ? "▲" : "▼"}</div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-700">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="block w-full pl-10 pr-10 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <AiOutlineClose className="h-4 w-4 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto">
            {filteredCompetitors.length > 0 ? (
              <div className="py-2">
                {filteredCompetitors.map((competitor, index) => (
                  <button
                    key={competitor.id}
                    onClick={() => handleSelectCompetitor(competitor)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                      index === focusedIndex ? "bg-gray-700" : ""
                    }`}
                  >
                    <img
                      src={competitor.avatar}
                      alt={competitor.name}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">
                        {competitor.name}
                      </h3>
                      <p className="text-gray-400 text-xs truncate">
                        {competitor.subscribers}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <div className="text-gray-400 text-sm">
                  {searchQuery
                    ? "No competitors found"
                    : "Start typing to search..."}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Cancel Button */}
          <div className="border-t border-gray-700 p-4">
            <button
              onClick={handleCancel}
              className="w-full px-4 py-2 text-gray-400 hover:text-white transition-colors text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CompetitorSearchDropdown;
