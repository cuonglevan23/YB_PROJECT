import { memo, useState } from "react";
import { AiOutlineSearch, AiOutlineFilter } from "react-icons/ai";

interface OutliersSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
  onFiltersToggle?: () => void;
  showFilters?: boolean;
  className?: string;
}

const OutliersSearchBar = memo(function OutliersSearchBar({
  value,
  onChange,
  placeholder = "Search videos...",
  onSearch,
  onFiltersToggle,
  showFilters = false,
  className = "",
}: OutliersSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  const handleFiltersClick = () => {
    if (onFiltersToggle) {
      onFiltersToggle();
    }
  };

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <div
        className={`
          flex items-center w-full h-14 
          bg-gray-800 border border-gray-700 rounded-2xl
          transition-all duration-200 shadow-sm
          ${
            isFocused
              ? "ring-2 ring-blue-500 border-transparent"
              : "hover:border-gray-600"
          }
        `}
      >
        {/* Filters Button */}
        <button
          onClick={handleFiltersClick}
          className={`
            flex items-center gap-2 px-4 py-2 ml-3 rounded-lg
            transition-colors duration-200 flex-shrink-0
            ${
              showFilters
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
            }
          `}
        >
          <AiOutlineFilter className="w-5 h-5" />
          <span className="text-sm font-medium">Filters</span>
        </button>

        {/* Search Input */}
        <div className="flex-1 relative mx-3">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="
              w-full px-4 py-3 
              bg-transparent text-white placeholder-gray-400 
              focus:outline-none
              text-base
            "
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          className="
            p-3 mr-3 rounded-full flex-shrink-0
            bg-blue-600 hover:bg-blue-700 
            transition-colors duration-200
            flex items-center justify-center shadow
          "
        >
          <AiOutlineSearch className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
});

export default OutliersSearchBar;
