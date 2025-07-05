import { useState } from "react";
import { useLocation } from "react-router-dom";

export interface VideoData {
  id: number;
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  subscribers: string;
  thumbnail: string;
  percentage: string;
  vph: string;
}

export const useResearchFilters = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Videos");
  const [showFilters, setShowFilters] = useState(true);

  // Filter states
  const [outlierScore, setOutlierScore] = useState(67);
  const [views, setViews] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [viewsPerHour, setViewsPerHour] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [publishingDate, setPublishingDate] = useState("All Time");

  // Sample video data
  const videos: VideoData[] = [
    {
      id: 1,
      title: "INFORMATION THAT VIETNAMESE FOOTBALL IS REMOVED FROM...",
      channel: "Technical Maruf",
      views: "102 N views",
      uploadTime: "1 year ago",
      subscribers: "11 N subscribers",
      thumbnail: "/api/placeholder/300/200",
      percentage: ">100%",
      vph: "8.2 VPH",
    },
    {
      id: 2,
      title: "Arif Aiman (12) Vs Vietnam• Arif Proved The Rise Of Malaysia...",
      channel: "Asian Football",
      views: "96 N views",
      uploadTime: "23 days ago",
      subscribers: "6.3 M subscribers",
      thumbnail: "/api/placeholder/300/200",
      percentage: ">100%",
      vph: "176 VPH",
    },
    {
      id: 3,
      title: "Nepal vs Laos |9-0| AFC Women's Asian Cup Qualifiers | Group F...",
      channel: "Talk Nepal Football HD",
      views: "159 N views",
      uploadTime: "5 days ago",
      subscribers: "5.4 N subscribers",
      thumbnail: "/api/placeholder/300/200",
      percentage: ">100%",
      vph: "1.6 N VPH",
    },
  ];

  const getSubPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/outliers")) return "Outliers";
    if (path.includes("/keywords")) return "Keywords";
    if (path.includes("/competitors")) return "Competitors";
    if (path.includes("/subscribers")) return "Subscribers";
    return "Outliers"; // Default
  };

  const getSubPageDescription = () => {
    const path = location.pathname;
    if (path.includes("/outliers"))
      return "Discover winning ideas to inspire your next video";
    if (path.includes("/keywords"))
      return "Find trending topics for your channel";
    if (path.includes("/competitors"))
      return "Analyze your competitors' performance";
    if (path.includes("/subscribers"))
      return "Track your subscriber growth and engagement";
    return "Discover winning ideas to inspire your next video"; // Default
  };

  const resetAllFilters = () => {
    setOutlierScore(0);
    setViews(0);
    setSubscribers(0);
    setViewsPerHour(0);
    setVideoLength(0);
    setPublishingDate("All Time");
  };

  return {
    // State
    searchQuery,
    activeTab,
    showFilters,
    outlierScore,
    views,
    subscribers,
    viewsPerHour,
    videoLength,
    publishingDate,
    videos,

    // Setters
    setSearchQuery,
    setActiveTab,
    setShowFilters,
    setOutlierScore,
    setViews,
    setSubscribers,
    setViewsPerHour,
    setVideoLength,
    setPublishingDate,

    // Computed
    getSubPageTitle,
    getSubPageDescription,

    // Actions
    resetAllFilters,
  };
};
