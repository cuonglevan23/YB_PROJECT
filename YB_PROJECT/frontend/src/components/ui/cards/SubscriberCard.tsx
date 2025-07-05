import { memo } from "react";
import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineGlobal,
  AiOutlineCheckCircle,
} from "react-icons/ai";

interface SubscriberCardProps {
  username: string;
  avatar?: string;
  subscribedDate: string;
  totalSubscribers: number;
  isVerified: boolean;
  location?: string;
  onClick?: () => void;
  className?: string;
}

export const SubscriberCard = memo(function SubscriberCard({
  username,
  avatar,
  subscribedDate,
  totalSubscribers,
  isVerified,
  location,
  onClick,
  className = "",
}: SubscriberCardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors cursor-pointer group ${className}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden flex-shrink-0 group-hover:ring-2 group-hover:ring-blue-500 transition-all">
          {avatar ? (
            <img
              src={avatar}
              alt={username}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE2Ij5VPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <AiOutlineUser className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-medium text-sm truncate group-hover:text-blue-400 transition-colors">
              {username}
            </h3>
            {isVerified && (
              <AiOutlineCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-gray-400 text-xs">
            {formatNumber(totalSubscribers)} subscribers
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <AiOutlineCalendar className="w-4 h-4 flex-shrink-0" />
          <span>Subscribed {subscribedDate}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <AiOutlineGlobal className="w-4 h-4 flex-shrink-0" />
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium group-hover:shadow-lg">
        View Profile
      </button>
    </div>
  );
});

export default SubscriberCard;
