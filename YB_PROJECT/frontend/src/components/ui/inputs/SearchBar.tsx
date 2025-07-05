import { memo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "../buttons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearchClick?: () => void;
  className?: string;
  showSearchButton?: boolean;
  size?: "sm" | "md" | "lg";
}

const SearchBar = memo(function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onSearchClick,
  className = "",
  showSearchButton = true,
  size = "md",
}: SearchBarProps) {
  const sizeClasses = {
    sm: {
      container: "h-10",
      input: "pl-10 pr-12 py-2 text-sm",
      icon: "h-4 w-4",
      button: "p-1.5",
      buttonIcon: "h-3.5 w-3.5",
    },
    md: {
      container: "h-12",
      input: "pl-12 pr-16 py-3",
      icon: "h-5 w-5",
      button: "p-2",
      buttonIcon: "h-4 w-4",
    },
    lg: {
      container: "h-14",
      input: "pl-14 pr-18 py-4 text-lg",
      icon: "h-6 w-6",
      button: "p-3",
      buttonIcon: "h-5 w-5",
    },
  };

  const currentSize = sizeClasses[size];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearchClick) {
      onSearchClick();
    }
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <div className={`relative w-full ${currentSize.container} ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <AiOutlineSearch className={`${currentSize.icon} text-gray-400`} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={`
          block w-full ${currentSize.input}
          border border-gray-700 rounded-full 
          bg-gray-800 text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          transition-all duration-200
          hover:border-gray-600
        `}
      />

      {/* Search Button */}
      {showSearchButton && (
        <Button
          onClick={handleSearchClick}
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2 
            bg-blue-600 hover:bg-blue-700 ${currentSize.button} 
            rounded-full transition-all duration-200
            flex items-center justify-center
          `}
        >
          <AiOutlineSearch className={currentSize.buttonIcon} />
        </Button>
      )}
    </div>
  );
});

export default SearchBar;
