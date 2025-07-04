import { memo, useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchDropdown from "../inputs/SearchDropdown";
import SearchModal from "../modals/SearchModal";

interface SearchResult {
  id: string;
  title: string;
  type: "suggestion" | "trending" | "recent";
}

interface SearchButtonProps {
  variant?: "dropdown" | "modal";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (result: SearchResult) => void;
  className?: string;
}

const SearchButton = memo(function SearchButton({
  variant = "modal",
  size = "md",
  placeholder,
  onSearch,
  onSelect,
  className = "",
}: SearchButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalSearch = useCallback(
    (query: string) => {
      onSearch?.(query);
      setIsModalOpen(false);
    },
    [onSearch]
  );

  const handleModalSelect = useCallback(
    (result: SearchResult) => {
      onSelect?.(result);
      setIsModalOpen(false);
    },
    [onSelect]
  );

  if (variant === "dropdown") {
    return (
      <SearchDropdown
        placeholder={placeholder}
        onSearch={onSearch}
        onSelect={onSelect}
        className={className}
      />
    );
  }

  return (
    <>
      <button
        onClick={handleModalOpen}
        className={`
          ${sizeClasses[size]} 
          text-gray-400 hover:text-white hover:bg-gray-700 
          rounded-lg transition-colors ${className}
        `}
      >
        <AiOutlineSearch className={iconSizes[size]} />
      </button>

      <SearchModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSearch={handleModalSearch}
        onSelect={handleModalSelect}
      />
    </>
  );
});

export default SearchButton;
