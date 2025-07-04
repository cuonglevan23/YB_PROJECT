import { memo, useCallback } from "react";
import NotificationDropdown from "../presentational/NotificationDropdown";
import { useLanguage } from "../../contexts/LanguageContext";

interface Notification {
  id: string;
  titleKey: string;
  messageKey: string;
  time: string;
  type: "success" | "info" | "warning";
  read: boolean;
}

const NotificationDropdownContainer = memo(
  function NotificationDropdownContainer() {
    const { t } = useLanguage();

    const notifications: Notification[] = [
      {
        id: "1",
        titleKey: "newAchievementUnlocked",
        messageKey: "reachedViews",
        time: "2 hours ago",
        type: "success",
        read: false,
      },
      {
        id: "2",
        titleKey: "trendingKeywordAlert",
        messageKey: "keywordTrending",
        time: "5 hours ago",
        type: "info",
        read: false,
      },
      {
        id: "3",
        titleKey: "videoPerformanceUpdate",
        messageKey: "performanceImproved",
        time: "1 day ago",
        type: "success",
        read: true,
      },
      {
        id: "4",
        titleKey: "contentOptimizationTip",
        messageKey: "thumbnailOptimization",
        time: "2 days ago",
        type: "warning",
        read: true,
      },
    ];

    const handleMarkAllAsRead = useCallback(() => {
      console.log("Mark all notifications as read");
      // TODO: Implement mark all as read logic
    }, []);

    const handleViewAllNotifications = useCallback(() => {
      console.log("View all notifications");
      // TODO: Implement view all notifications logic
    }, []);

    const handleNotificationClick = useCallback((notificationId: string) => {
      console.log("Notification clicked:", notificationId);
      // TODO: Implement notification click logic
    }, []);

    return (
      <NotificationDropdown
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onViewAllNotifications={handleViewAllNotifications}
        onNotificationClick={handleNotificationClick}
        t={t}
      />
    );
  }
);

export default NotificationDropdownContainer;
