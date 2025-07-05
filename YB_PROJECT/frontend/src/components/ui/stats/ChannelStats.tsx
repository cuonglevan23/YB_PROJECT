import { memo } from "react";
import {
  AiOutlineEye,
  AiOutlineUser,
  AiOutlineVideoCamera,
  AiOutlineCalendar,
} from "react-icons/ai";

interface ChannelStatsProps {
  subscribers: number;
  totalViews: number;
  videoCount: number;
  joinedDate: string;
  className?: string;
}

export const ChannelStats = memo(function ChannelStats({
  subscribers,
  totalViews,
  videoCount,
  joinedDate,
  className = "",
}: ChannelStatsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const stats = [
    {
      icon: AiOutlineUser,
      label: "Subscribers",
      value: formatNumber(subscribers),
      color: "text-blue-400",
    },
    {
      icon: AiOutlineEye,
      label: "Total Views",
      value: formatNumber(totalViews),
      color: "text-green-400",
    },
    {
      icon: AiOutlineVideoCamera,
      label: "Videos",
      value: videoCount.toString(),
      color: "text-purple-400",
    },
    {
      icon: AiOutlineCalendar,
      label: "Joined",
      value: joinedDate,
      color: "text-orange-400",
    },
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center justify-center mb-3">
              <IconComponent className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
});

export default ChannelStats;
