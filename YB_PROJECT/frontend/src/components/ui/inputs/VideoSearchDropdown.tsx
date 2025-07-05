import { memo, useMemo } from "react";
import { AiOutlinePlay, AiOutlineEye } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { UniversalSearchDropdown, SearchResult } from "./UniversalSearchDropdown";

interface VideoResult {
  id: string;
  title: string;
  channel?: string;
  views?: number;
  duration?: string;
  type?: "suggestion" | "trending" | "recent";
  thumbnail?: string;
}

interface VideoSearchDropdownProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (result: VideoResult) => void;
  onClear?: () => void;
  searchResults?: VideoResult[];
  isLoading?: boolean;
  showClearButton?: boolean;
  className?: string;
  dropdownClassName?: string;
  noResultsMessage?: string;
  disabled?: boolean;
  showCategories?: boolean;
}

export const VideoSearchDropdown = memo(function VideoSearchDropdown({
  placeholder = "Search videos...",
  value = "",
  onChange,
  onSelect,
  onClear,
  searchResults = [],
  isLoading = false,
  showClearButton = true,
  className = "",
  dropdownClassName = "",
  noResultsMessage = "No videos found",
  disabled = false,
  showCategories = false,
}: VideoSearchDropdownProps) {
  
  // Convert videos to SearchResult format
  const convertedResults: SearchResult[] = useMemo(() => 
    searchResults.map(video => ({
      id: video.id,
      title: video.title,
      subtitle: video.channel ? `${video.channel}${video.views ? ` • ${formatViews(video.views)} views` : ''}` : undefined,
      category: video.type === "trending" ? "Trending" : video.type === "recent" ? "Recent" : "Suggestions",
      type: video.type,
      icon: getVideoIcon(video.type),
      data: video
    })), [searchResults]);

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views.toString();
  };

  // Get icon based on video type
  const getVideoIcon = (type?: string) => {
    switch (type) {
      case "trending":
        return <BiTrendingUp className="w-4 h-4 text-orange-400" />;
      case "recent":
        return <AiOutlineEye className="w-4 h-4 text-blue-400" />;
      default:
        return <AiOutlinePlay className="w-4 h-4 text-gray-400" />;
    }
  };

  // Custom result renderer for videos
  const videoResultRenderer = (result: SearchResult, onSelectResult: (result: SearchResult) => void) => (
    <button
      key={result.id}
      onClick={() => onSelectResult(result)}
      className="w-full text-left px-4 py-3 text-white hover:bg-gray-600 transition-colors flex items-center gap-3"
    >
      <div className="flex-shrink-0">
        {result.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{result.title}</div>
        {result.subtitle && (
          <div className="text-xs text-gray-400 truncate">{result.subtitle}</div>
        )}
      </div>
      {result.data?.duration && (
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
          {result.data.duration}
        </span>
      )}
    </button>
  );

  const handleSelect = (result: SearchResult) => {
    onSelect?.(result.data as VideoResult);
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
      showCategories={showCategories}
      resultRenderer={videoResultRenderer}
    />
  );
});
