import { memo } from "react";
import { VideoCard } from "../ui/cards";

interface VideoData {
  id: string;
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
}

interface VideoGridProps {
  videos: VideoData[];
  onVideoClick?: (video: VideoData) => void;
  loading?: boolean;
  className?: string;
}

export const VideoGrid = memo(function VideoGrid({
  videos,
  onVideoClick,
  loading = false,
  className = "",
}: VideoGridProps) {
  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-700 aspect-video rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 text-lg mb-2">No videos found</div>
        <p className="text-gray-500 text-sm">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            channel={video.channel}
            channelAvatar={video.channelAvatar}
            views={video.views}
            subscribers={video.subscribers}
            duration={video.duration}
            publishedDate={video.publishedDate}
            outlierScore={video.outlierScore}
            viewsPerHour={video.viewsPerHour}
            onClick={() => onVideoClick?.(video)}
          />
        ))}
      </div>
    </div>
  );
});
