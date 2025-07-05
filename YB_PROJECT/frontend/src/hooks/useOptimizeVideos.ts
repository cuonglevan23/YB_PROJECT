import { useState, useMemo } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  uploadDate: string;
  status: "published" | "processing" | "draft" | "private";
  tags: string[];
  optimizationScore: number;
  hasIssues: boolean;
  description: string;
  category: string;
  isShort?: boolean;
}

const useOptimizeVideos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "videos" | "shorts"
  >("all");

  // Mock data - wrapped in useMemo to avoid recreation on every render
  const videos = useMemo<Video[]>(() => [
    {
      id: "1",
      title: "Thứ Món Bùi Tấn Trường",
      thumbnail: "/api/placeholder/300/200",
      views: 0,
      duration: "5:32",
      uploadDate: "a year ago",
      status: "published",
      tags: ["football", "sports", "vietnam"],
      optimizationScore: 75,
      hasIssues: false,
      description: "Video about football player Bùi Tấn Trường",
      category: "Sports",
    },
    {
      id: "2",
      title: "TRỰC TIẾP BÓNG ĐÁ : OMAN - VIỆT NAM | VÒNG LOẠI 3 WORLD CUP 2022",
      thumbnail: "/api/placeholder/300/200",
      views: 50,
      duration: "120:15",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "worldcup", "vietnam", "live"],
      optimizationScore: 85,
      hasIssues: true,
      description: "Live football match: Oman vs Vietnam",
      category: "Sports",
    },
    {
      id: "3",
      title: "Highlight Hiệp 1 : OMAN - VIỆT NAM | VÒNG LOẠI 3 WORLD CUP 2022",
      thumbnail: "/api/placeholder/300/200",
      views: 44,
      duration: "15:42",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "highlights", "vietnam"],
      optimizationScore: 90,
      hasIssues: false,
      description: "First half highlights of Oman vs Vietnam match",
      category: "Sports",
    },
    {
      id: "4",
      title: "Cận cảnh buổi Tập của đội tuyển Việt nam",
      thumbnail: "/api/placeholder/300/200",
      views: 41,
      duration: "8:23",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "training", "vietnam"],
      optimizationScore: 65,
      hasIssues: true,
      description: "Behind the scenes training session",
      category: "Sports",
    },
    {
      id: "5",
      title: "THỨ MÔN BÙI TẤN TRƯỜNG PK VỚI LỘC FUHO",
      thumbnail: "/api/placeholder/300/200",
      views: 25,
      duration: "12:15",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "penalty", "goalkeeper"],
      optimizationScore: 80,
      hasIssues: false,
      description: "Penalty shootout with goalkeeper Bùi Tấn Trường",
      category: "Sports",
    },
    {
      id: "6",
      title: "Thủ Môn Bùi Tấn Trường CLB HÀ NỘI",
      thumbnail: "/api/placeholder/300/200",
      views: 121,
      duration: "7:45",
      uploadDate: "4 years ago",
      status: "published",
      tags: ["football", "goalkeeper", "hanoi"],
      optimizationScore: 70,
      hasIssues: false,
      description: "Goalkeeper Bùi Tấn Trường from Hanoi FC",
      category: "Sports",
    },
    // Shorts videos
    {
      id: "7",
      title: "Kỹ thuật sút phạt tuyệt đỉnh #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1240,
      duration: "0:35",
      uploadDate: "3 days ago",
      status: "published",
      tags: ["football", "skills", "shorts"],
      optimizationScore: 88,
      hasIssues: false,
      description: "Amazing free kick technique",
      category: "Sports",
      isShort: true,
    },
    {
      id: "8",
      title: "Bàn thắng đẹp nhất tuần #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 2180,
      duration: "0:28",
      uploadDate: "1 week ago",
      status: "published",
      tags: ["football", "goals", "shorts"],
      optimizationScore: 92,
      hasIssues: false,
      description: "Best goal of the week compilation",
      category: "Sports",
      isShort: true,
    },
    {
      id: "9",
      title: "Thủ môn xuất thần cản phá #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 856,
      duration: "0:42",
      uploadDate: "5 days ago",
      status: "published",
      tags: ["football", "goalkeeper", "saves", "shorts"],
      optimizationScore: 76,
      hasIssues: true,
      description: "Incredible goalkeeper saves",
      category: "Sports",
      isShort: true,
    },
    // Additional regular videos
    {
      id: "10",
      title: "Chiến thuật tấn công của đội tuyển Việt Nam",
      thumbnail: "/api/placeholder/300/200",
      views: 89,
      duration: "18:45",
      uploadDate: "3 years ago",
      status: "published",
      tags: ["football", "tactics", "vietnam"],
      optimizationScore: 82,
      hasIssues: false,
      description: "Analysis of Vietnam national team attacking tactics",
      category: "Sports",
    },
    {
      id: "11",
      title: "Kỹ thuật chuyền bóng cơ bản",
      thumbnail: "/api/placeholder/300/200",
      views: 156,
      duration: "9:12",
      uploadDate: "2 years ago",
      status: "published",
      tags: ["football", "skills", "tutorial"],
      optimizationScore: 67,
      hasIssues: true,
      description: "Basic ball passing techniques for beginners",
      category: "Education",
    },
    {
      id: "12",
      title: "Phân tích trận đấu V-League 2023",
      thumbnail: "/api/placeholder/300/200",
      views: 72,
      duration: "22:33",
      uploadDate: "1 year ago",
      status: "published",
      tags: ["football", "analysis", "v-league"],
      optimizationScore: 91,
      hasIssues: false,
      description: "In-depth analysis of V-League 2023 matches",
      category: "Sports",
    },
    {
      id: "13",
      title: "Bí quyết luyện tập thể lực cho cầu thủ",
      thumbnail: "/api/placeholder/300/200",
      views: 203,
      duration: "14:28",
      uploadDate: "6 months ago",
      status: "published",
      tags: ["football", "fitness", "training"],
      optimizationScore: 73,
      hasIssues: false,
      description: "Physical training secrets for football players",
      category: "Fitness",
    },
    {
      id: "14",
      title: "Lịch sử bóng đá Việt Nam qua các thời kỳ",
      thumbnail: "/api/placeholder/300/200",
      views: 95,
      duration: "35:16",
      uploadDate: "8 months ago",
      status: "published",
      tags: ["football", "history", "vietnam"],
      optimizationScore: 88,
      hasIssues: false,
      description: "History of Vietnamese football through the ages",
      category: "Documentary",
    },
    {
      id: "15",
      title: "Phỏng vấn độc quyền với HLV Park Hang-seo",
      thumbnail: "/api/placeholder/300/200",
      views: 312,
      duration: "28:45",
      uploadDate: "1 year ago",
      status: "published",
      tags: ["football", "interview", "coach"],
      optimizationScore: 94,
      hasIssues: false,
      description: "Exclusive interview with coach Park Hang-seo",
      category: "Interview",
    },
    // Additional shorts
    {
      id: "16",
      title: "Siêu phẩm đá phạt góc #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1580,
      duration: "0:31",
      uploadDate: "2 days ago",
      status: "published",
      tags: ["football", "corner", "goal", "shorts"],
      optimizationScore: 85,
      hasIssues: false,
      description: "Amazing corner kick goal",
      category: "Sports",
      isShort: true,
    },
    {
      id: "17",
      title: "Pha phối hợp tuyệt đẹp #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 2340,
      duration: "0:25",
      uploadDate: "4 days ago",
      status: "published",
      tags: ["football", "teamwork", "goal", "shorts"],
      optimizationScore: 89,
      hasIssues: false,
      description: "Beautiful team coordination goal",
      category: "Sports",
      isShort: true,
    },
    {
      id: "18",
      title: "Kỹ thuật rê bóng như Messi #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 987,
      duration: "0:38",
      uploadDate: "1 week ago",
      status: "published",
      tags: ["football", "dribbling", "skills", "shorts"],
      optimizationScore: 79,
      hasIssues: true,
      description: "Messi-style dribbling techniques",
      category: "Skills",
      isShort: true,
    },
    {
      id: "19",
      title: "Top 5 bàn thắng tuần này #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1670,
      duration: "0:45",
      uploadDate: "6 days ago",
      status: "published",
      tags: ["football", "goals", "compilation", "shorts"],
      optimizationScore: 93,
      hasIssues: false,
      description: "Top 5 goals of this week",
      category: "Compilation",
      isShort: true,
    },
    {
      id: "20",
      title: "Thủ thuật penalty không thể cản #shorts",
      thumbnail: "/api/placeholder/300/533",
      views: 1234,
      duration: "0:29",
      uploadDate: "3 days ago",
      status: "published",
      tags: ["football", "penalty", "trick", "shorts"],
      optimizationScore: 81,
      hasIssues: false,
      description: "Unstoppable penalty kick trick",
      category: "Skills",
      isShort: true,
    },
  ], []);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedFilter === "shorts") {
        return matchesSearch && video.isShort;
      }
      if (selectedFilter === "videos") {
        return matchesSearch && !video.isShort;
      }
      return matchesSearch;
    });
  }, [videos, searchQuery, selectedFilter]);

  return {
    videos: filteredVideos,
    searchQuery,
    selectedFilter,
    setSearchQuery,
    setSelectedFilter,
  };
};

export default useOptimizeVideos;
