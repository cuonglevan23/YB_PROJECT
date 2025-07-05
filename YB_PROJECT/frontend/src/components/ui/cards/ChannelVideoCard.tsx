import { memo } from "react";
import { BiPlay } from "react-icons/bi";

interface ChannelVideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  publishedDate: string;
  outlierScore: number;
  viewsPerHour: number;
  onClick?: () => void;
  className?: string;
}

export const ChannelVideoCard = memo(function ChannelVideoCard({
  title,
  thumbnail,
  views,
  duration,
  publishedDate,
  outlierScore,
  viewsPerHour,
  onClick,
  className = "",
}: ChannelVideoCardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getOutlierColor = (score: number): string => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-200 cursor-pointer group hover:shadow-xl hover:shadow-black/20 ${className}`}
      onClick={onClick}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-700">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIyMCI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
          }}
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform duration-200">
            <BiPlay className="w-8 h-8 text-gray-900" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
          {duration}
        </div>

        {/* Outlier Score */}
        <div
          className={`absolute top-3 left-3 ${getOutlierColor(
            outlierScore
          )} text-white px-2 py-1 rounded text-sm font-bold shadow-lg`}
        >
          {outlierScore}x
        </div>

        {/* Views per hour */}
        <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-2 py-1 rounded text-xs font-medium">
          {viewsPerHour} VPH
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span className="font-medium">{formatNumber(views)} views</span>
          <span>{publishedDate}</span>
        </div>

        <div className="text-gray-500 text-xs">
          Performance: {viewsPerHour} views/hour
        </div>
      </div>
    </div>
  );
});

export default ChannelVideoCard;
