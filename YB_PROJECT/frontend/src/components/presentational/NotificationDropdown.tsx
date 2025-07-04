import { memo } from "react";
import {
  AiOutlineBell,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import type { IconType } from "react-icons";

interface Notification {
  id: string;
  titleKey: string;
  messageKey: string;
  time: string;
  type: "success" | "info" | "warning";
  read: boolean;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onViewAllNotifications: () => void;
  onNotificationClick: (notificationId: string) => void;
  t: (key: string) => string;
}

const NotificationDropdown = memo(function NotificationDropdown({
  notifications,
  onMarkAllAsRead,
  onViewAllNotifications,
  onNotificationClick,
  t,
}: NotificationDropdownProps) {
  const getIcon = (type: string): IconType => {
    switch (type) {
      case "success":
        return AiOutlineCheckCircle;
      case "warning":
        return AiOutlineWarning;
      default:
        return AiOutlineInfoCircle;
    }
  };

  const getIconColor = (type: string): string => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <AiOutlineBell className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Notifications</span>
        </div>
        <button
          onClick={onMarkAllAsRead}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-700 border-b border-gray-700/50 cursor-pointer ${
                !notification.read ? "bg-gray-800/50" : ""
              }`}
              onClick={() => onNotificationClick(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon
                    className={`w-5 h-5 ${getIconColor(notification.type)}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-sm font-medium">
                      {t(notification.titleKey)}
                    </h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1 leading-tight">
                    {t(notification.messageKey)}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-700">
        <button
          onClick={onViewAllNotifications}
          className="w-full text-center text-blue-400 hover:text-blue-300 text-sm"
        >
          {t("viewAllNotifications")}
        </button>
      </div>
    </div>
  );
});

export default NotificationDropdown;
