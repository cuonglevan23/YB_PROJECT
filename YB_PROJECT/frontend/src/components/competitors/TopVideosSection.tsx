import { memo } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface TopVideo {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  views: number;
  outlierScore: string;
  viewsPerHour: number;
  uploadTime: string;
}

interface TopVideosSectionProps {
  videos: TopVideo[];
}

const TopVideosSection = memo(function TopVideosSection({
  videos,
}: TopVideosSectionProps) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Top Videos From Your Competitors
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">This week</span>
            <AiOutlineDown className="text-gray-400 h-4 w-4" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Outlier Level</span>
            <AiOutlineDown className="text-gray-400 h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                Video
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                Views
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                Outlier
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                Views/hour
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                Uploaded
              </th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr
                key={video.id}
                className="border-b border-gray-800 hover:bg-gray-700/30"
              >
                <td className="py-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-12 rounded object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {video.channelName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-white text-sm">
                  {video.views.toLocaleString()}
                </td>
                <td className="py-4">
                  <span
                    className={`text-sm ${
                      video.outlierScore === "-"
                        ? "text-gray-400"
                        : parseFloat(video.outlierScore) > 1
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {video.outlierScore}
                  </span>
                </td>
                <td className="py-4 text-white text-sm">
                  {video.viewsPerHour}
                </td>
                <td className="py-4 text-gray-400 text-sm">
                  {video.uploadTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TopVideosSection;
export type { TopVideo };
