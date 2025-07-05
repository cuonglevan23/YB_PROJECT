import { memo } from "react";
import { AiOutlineUser } from "react-icons/ai";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar?: string;
  views: number;
  subscribers: number;
  duration: string;
  publishedDate: string;
  outlierScore: number;
  viewsPerHour: number;
  onClick?: () => void;
  className?: string;
}

export const VideoCard = memo(function VideoCard({
  title,
  thumbnail,
  channel,
  channelAvatar,
  views,
  subscribers,
  duration,
  publishedDate,
  outlierScore,
  viewsPerHour,
  onClick,
  className = "",
}: VideoCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDuration = (duration: string) => {
    // Assuming duration is in format like "10:45" or "1:23:45"
    return duration;
  };

  const getOutlierScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getOutlierScoreText = (score: number) => {
    if (score >= 100) return ">100x";
    return `${score}x`;
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer group ${className}`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs text-white">
          {formatDuration(duration)}
        </div>
        {/* Outlier Score */}
        <div
          className={`absolute top-2 left-2 ${getOutlierScoreColor(
            outlierScore
          )} px-2 py-1 rounded text-xs text-white font-bold`}
        >
          {getOutlierScoreText(outlierScore)}
        </div>
        {/* VPH (Views Per Hour) */}
        <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-80 px-2 py-1 rounded text-xs text-white">
          {formatNumber(viewsPerHour)} VPH
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Channel */}
        <div className="flex items-center gap-2">
          {channelAvatar ? (
            <img
              src={channelAvatar}
              alt={channel}
              className="w-5 h-5 rounded-full"
            />
          ) : (
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
              <AiOutlineUser className="w-3 h-3 text-gray-400" />
            </div>
          )}
          <span className="text-gray-400 text-xs truncate">{channel}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatNumber(views)} views</span>
          <span>•</span>
          <span>{formatNumber(subscribers)} subscribers</span>
          <span>•</span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </div>
  );
});
