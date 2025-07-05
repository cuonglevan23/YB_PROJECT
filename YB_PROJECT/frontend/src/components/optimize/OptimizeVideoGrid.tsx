import { memo } from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { ShortVideoCard } from "../ui/cards";
import VideoCard from "./VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  uploadDate: string;
  status: "published" | "processing" | "draft" | "private";
  tags: string[];
  optimizationScore: number;
  hasIssues: boolean;
  description: string;
  category: string;
  isShort?: boolean;
}

interface OptimizeVideoGridProps {
  videos: Video[];
  selectedFilter: "all" | "videos" | "shorts";
  onOptimizeVideo: (videoId: string) => void;
}

const OptimizeVideoGrid = memo(function OptimizeVideoGrid({
  videos,
  selectedFilter,
  onOptimizeVideo,
}: OptimizeVideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <AiOutlineVideoCamera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">
          No videos found
        </h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        selectedFilter === "shorts"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 justify-items-center"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      }`}
    >
      {videos.map((video) => {
        // Only use ShortVideoCard when specifically viewing shorts filter
        if (video.isShort && selectedFilter === "shorts") {
          return (
            <ShortVideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              views={video.views}
              uploadDate={video.uploadDate}
              thumbnail={video.thumbnail}
              duration={video.duration}
              isPublished={video.status === "published"}
              score={video.optimizationScore}
              onScoreWithBoost={() => onOptimizeVideo(video.id)}
              onOptionsClick={() =>
                console.log("Options clicked for", video.id)
              }
            />
          );
        } else {
          // Use regular video card for all videos when in "all" or "videos" tab,
          // and also for shorts when not in "shorts" tab
          return (
            <VideoCard
              key={video.id}
              video={video}
              onOptimize={onOptimizeVideo}
            />
          );
        }
      })}
    </div>
  );
});

export default OptimizeVideoGrid;
