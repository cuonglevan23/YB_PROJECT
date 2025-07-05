import { memo, useState } from "react";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";

interface SearchWithFiltersProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  onFiltersClick?: () => void;
  showFilters?: boolean;
  className?: string;
  searchButtonClassName?: string;
  filtersButtonClassName?: string;
}

export const SearchWithFilters = memo(function SearchWithFilters({
  placeholder = "Search videos...",
  value = "",
  onChange,
  onSearch,
  onFiltersClick,
  showFilters = true,
  className = "",
  searchButtonClassName = "",
  filtersButtonClassName = "",
}: SearchWithFiltersProps) {
  const [internalValue, setInternalValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  const handleSearchClick = () => {
    onSearch?.();
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Filters Button */}
      {showFilters && (
        <button
          onClick={onFiltersClick}
          className={`flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors ${filtersButtonClassName}`}
        >
          <AiOutlineFilter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Filters</span>
        </button>
      )}

      {/* Search Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder={placeholder}
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearchClick}
        className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors ${searchButtonClassName}`}
      >
        <AiOutlineSearch className="w-5 h-5 text-white" />
      </button>
    </div>
  );
});
