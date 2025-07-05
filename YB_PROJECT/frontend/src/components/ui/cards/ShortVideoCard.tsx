import React from "react";

interface ShortVideoCardProps {
  id: string;
  title: string;
  views: number;
  uploadDate: string;
  thumbnail: string;
  duration: string;
  isPublished: boolean;
  score?: number;
  onScoreWithBoost?: () => void;
  onOptionsClick?: () => void;
}

const ShortVideoCard: React.FC<ShortVideoCardProps> = ({
  title,
  views,
  uploadDate,
  duration,
  score,
  onScoreWithBoost,
}) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 group hover:shadow-lg hover:shadow-black/20 w-full max-w-[170px] mx-auto">
      {/* Thumbnail Container - Vertical aspect ratio for Shorts */}
      <div className="relative aspect-[9/16] bg-gray-900 overflow-hidden">
        {/* Background gradient for shorts */}
        <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center relative">
          {/* Video Icon/Placeholder */}
          <div className="text-gray-400 opacity-50">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
            </svg>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
          {duration}
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <div className="flex items-center bg-green-600/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
            <span className="text-white text-xs">published</span>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-800 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-white font-medium text-sm leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors min-h-[2.5rem]">
          {title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center text-gray-400 text-xs space-x-1">
          <span className="font-medium">{formatViews(views)} views</span>
          <span className="text-gray-500">•</span>
          <span className="font-medium">{uploadDate}</span>
        </div>

        {/* Score Section */}
        {score && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-medium">Score:</span>
              <div className="flex items-center space-x-1">
                <span className={`text-xs font-bold ${getScoreColor(score)}`}>
                  {score}%
                </span>
                {score < 85 && (
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {onScoreWithBoost && (
          <button
            onClick={onScoreWithBoost}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1 group/btn shadow-md hover:shadow-lg hover:shadow-blue-500/25"
          >
            <svg
              className="w-3 h-3 group-hover/btn:rotate-12 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Score with Boost</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ShortVideoCard;
