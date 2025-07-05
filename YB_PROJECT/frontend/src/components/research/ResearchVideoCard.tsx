import { memo } from "react";
import type { VideoData } from "../../hooks/useResearchFilters";

interface ResearchVideoCardProps {
  video: VideoData;
}

export const ResearchVideoCard = memo(function ResearchVideoCard({
  video,
}: ResearchVideoCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-700">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Stats overlay - top left */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 text-xs font-bold bg-green-600 text-white rounded">
            {video.percentage}
          </span>
          <span className="px-2 py-1 text-xs font-bold bg-gray-900 bg-opacity-80 text-white rounded">
            {video.vph}
          </span>
        </div>

        {/* Menu button - top right */}
        <div className="absolute top-3 right-3">
          <button className="p-1 bg-gray-900 bg-opacity-50 text-white rounded hover:bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="text-white font-medium text-sm mb-2 line-clamp-2 leading-tight">
          {video.title}
        </h3>
        <p className="text-gray-400 text-xs mb-1">
          {video.channel} • {video.subscribers}
        </p>
        <p className="text-gray-400 text-xs">
          {video.views} • {video.uploadTime}
        </p>
      </div>
    </div>
  );
});
