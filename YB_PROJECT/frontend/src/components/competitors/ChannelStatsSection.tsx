import { memo } from "react";

interface ChannelStat {
  id: string;
  name: string;
  avatar: string;
  totalVideos: string;
  thisWeek: number;
  vsLastWeek: string;
  thisMonth: number;
  vsLastMonth: string;
}

interface ChannelStatsSectionProps {
  channelStats: ChannelStat[];
}

const ChannelStatsSection = memo(function ChannelStatsSection({
  channelStats,
}: ChannelStatsSectionProps) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-xl font-semibold text-white mb-6">Channel Stats</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                Channel
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                Total Videos
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                This Week
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                vs Last Week
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                This Month
              </th>
              <th className="text-left text-sm font-medium text-gray-400 pb-3">
                vs Last Month
              </th>
            </tr>
          </thead>
          <tbody>
            {channelStats.map((channel) => (
              <tr
                key={channel.id}
                className="border-b border-gray-800 hover:bg-gray-700/30"
              >
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white font-medium">
                      {channel.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-white">{channel.totalVideos}</td>
                <td className="py-4 text-white">{channel.thisWeek}</td>
                <td className="py-4">
                  <span
                    className={`text-sm ${
                      channel.vsLastWeek.includes("↓")
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {channel.vsLastWeek}
                  </span>
                </td>
                <td className="py-4 text-white">{channel.thisMonth}</td>
                <td className="py-4">
                  <span
                    className={`text-sm ${
                      channel.vsLastMonth.includes("↓")
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {channel.vsLastMonth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ChannelStatsSection;
export type { ChannelStat };
