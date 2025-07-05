import { memo } from "react";
import { ResearchVideoCard } from "./ResearchVideoCard";
import type { VideoData } from "../../hooks/useResearchFilters";

interface ResearchVideoGridProps {
  videos: VideoData[];
}

export const ResearchVideoGrid = memo(function ResearchVideoGrid({
  videos,
}: ResearchVideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <ResearchVideoCard key={video.id} video={video} />
      ))}
    </div>
  );
});
