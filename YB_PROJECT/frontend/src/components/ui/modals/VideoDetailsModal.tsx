import { memo } from "react";
import {
  AiOutlineClose,
  AiOutlineLink,
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlineDownload,
} from "react-icons/ai";
import { BiPlay } from "react-icons/bi";

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

interface VideoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoData | null;
}

const VideoDetailsModal = memo(function VideoDetailsModal({
  isOpen,
  onClose,
  video,
}: VideoDetailsModalProps) {
  if (!isOpen || !video) return null;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatViews = (views: number): string => {
    return `${formatNumber(views)} views`;
  };

  const formatSubscribers = (subs: number): string => {
    return `${formatNumber(subs)} subs`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Video Details</h2>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Video Preview */}
            <div className="space-y-6">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIyMCI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
                  }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <BiPlay className="w-16 h-16 text-white" />
                </div>
                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>

              {/* Video Title */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>{formatViews(video.views)}</span>
                  <span>•</span>
                  <span>{video.publishedDate}</span>
                </div>
              </div>

              {/* Channel Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                  {video.channelAvatar ? (
                    <img
                      src={video.channelAvatar}
                      alt={video.channel}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{video.channel}</div>
                  <div className="text-gray-400 text-sm">
                    {formatSubscribers(video.subscribers)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Stats and Actions */}
            <div className="space-y-6">
              {/* Performance Stats */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Performance
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Outlier Score */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-1">
                      {">"}
                      {video.outlierScore}x
                    </div>
                    <div className="text-gray-400 text-sm">Outlier Score</div>
                  </div>
                  {/* Views */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {formatNumber(video.views)}
                    </div>
                    <div className="text-gray-400 text-sm">Views</div>
                  </div>
                  {/* Views Per Hour */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {video.viewsPerHour.toFixed(1)}
                    </div>
                    <div className="text-gray-400 text-sm">Views Per Hour</div>
                  </div>
                  {/* Engagement */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-1">
                      Bad
                    </div>
                    <div className="text-gray-400 text-sm">Engagement</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors">
                    <AiOutlineLink className="w-4 h-4" />
                    <span className="text-sm">Open in YouTube</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
                    <AiOutlineEdit className="w-4 h-4" />
                    <span className="text-sm">Remix title</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
                    <AiOutlineDownload className="w-4 h-4" />
                    <span className="text-sm">Remix thumbnail</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
                    <AiOutlineSearch className="w-4 h-4" />
                    <span className="text-sm">Find similar titles</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
                    <AiOutlineSearch className="w-4 h-4" />
                    <span className="text-sm">Find similar thumbnails</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors">
                    <AiOutlineUserAdd className="w-4 h-4" />
                    <span className="text-sm">Add as competitor</span>
                  </button>
                </div>
              </div>

              {/* Related Videos Preview */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Related Videos
                </h4>
                <div className="space-y-3">
                  {/* Sample related video */}
                  <div className="flex gap-3">
                    <div className="w-24 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium line-clamp-2 mb-1">
                        AFC Women's Asia | Group F...
                      </div>
                      <div className="text-gray-400 text-xs">
                        11 M views • 11 days ago
                      </div>
                    </div>
                  </div>
                  {/* Another sample related video */}
                  <div className="flex gap-3">
                    <div className="w-24 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-green-600 to-yellow-600"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium line-clamp-2 mb-1">
                        Vietnam Laine Work In Harima...
                      </div>
                      <div className="text-gray-400 text-xs">
                        Views • 23 days ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoDetailsModal;
