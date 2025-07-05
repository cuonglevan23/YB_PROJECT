import { memo } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  uploadDate: string;
  status: "published" | "processing" | "draft" | "private";
  optimizationScore: number;
  hasIssues: boolean;
}

interface VideoCardProps {
  video: Video;
  onOptimize: (videoId: string) => void;
}

const VideoCard = memo(function VideoCard({
  video,
  onOptimize,
}: VideoCardProps) {
  const getThumbnailBackground = (videoId: string) => {
    const backgrounds = [
      "from-red-600/30 to-orange-600/30",
      "from-blue-600/30 to-purple-600/30",
      "from-green-600/30 to-teal-600/30",
      "from-purple-600/30 to-pink-600/30",
      "from-yellow-600/30 to-red-600/30",
      "from-cyan-600/30 to-blue-600/30",
    ];

    const bgIndex = parseInt(videoId) % backgrounds.length;
    return backgrounds[bgIndex];
  };

  const getOptimizationColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 group hover:shadow-lg hover:shadow-black/20">
      {/* Thumbnail Container */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <div
          className={`w-full h-full bg-gradient-to-br ${getThumbnailBackground(
            video.id
          )} flex items-center justify-center relative`}
        >
          <div className="text-gray-400 opacity-50">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-medium">
          {video.duration}
        </div>

        <div className="absolute top-2 left-2">
          <div className="flex items-center bg-green-600/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
            <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
            <span className="text-white">{video.status}</span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-800 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-white font-medium text-[15px] leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
          {video.title}
        </h3>

        <div className="flex items-center text-gray-400 text-xs space-x-1">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span className="font-medium">{video.views} views</span>
          <span className="text-gray-500">•</span>
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
          <span className="font-medium">{video.uploadDate}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-medium">Score:</span>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-bold ${getOptimizationColor(
                  video.optimizationScore
                )}`}
              >
                {video.optimizationScore}%
              </span>
              {video.hasIssues && (
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>

          <div className="w-full bg-gray-700/60 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                video.optimizationScore >= 90
                  ? "bg-green-500"
                  : video.optimizationScore >= 70
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${video.optimizationScore}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => onOptimize(video.id)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group/btn shadow-md hover:shadow-lg hover:shadow-blue-500/25"
        >
          <svg
            className="w-4 h-4 group-hover/btn:rotate-12 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Score with Boost</span>
        </button>
      </div>
    </div>
  );
});

export default VideoCard;
