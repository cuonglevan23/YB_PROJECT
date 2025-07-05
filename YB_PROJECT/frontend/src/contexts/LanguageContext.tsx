import { createContext, useContext, useState, memo, useCallback } from "react";
import type { ReactNode } from "react";

interface Language {
  code: string;
  name: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "vi", name: "Tiếng Việt" },
];

// Translation dictionary
const translations = {
  en: {
    // Header
    today: "Today",
    searchPlaceholder: "Search videos, channels, or playlists",

    // User Menu
    plans: "Plans",
    accountSettings: "Account Settings",
    channelSettings: "Channel Settings",
    affiliateCenter: "Affiliate Center",
    help: "Help",
    language: "Language",
    darkMode: "Dark Mode",
    signOut: "Sign out",
    channels: "CHANNELS",
    addChannel: "Add Channel",

    // Notifications
    achievements: "Achievements",
    newAchievement: "New Achievement Unlocked",
    trendingKeyword: "Trending Keyword Alert",
    videoPerformance: "Video Performance Update",
    contentOptimization: "Content Optimization Tip",

    // Tools
    keywords: "Keywords",
    competitors: "Competitors",
    outliers: "Outliers",
    subscribers: "Subscribers",
    scriptWriter: "Script Writer",
    generate: "Generate",
    dailyIdeas: "Daily Ideas",
    create: "Create",
    createThumbnail: "Create Thumbnail",
    createIdeas: "Generate Ideas", 
    createScript: "Script Writer",
    generateVideo: "Generate Video",
    thumbnail: "Thumbnail",
    optimize: "Optimize",
    seo: "SEO",
    coach: "Coach",
    learn: "Learn",

    // Sidebar Navigation
    optimizeNav: "Optimize",
    research: "Research",
    upgrade: "Upgrade",

    // Pages
    home: "Home",
    about: "About",
    contact: "Contact",
    dashboard: "Dashboard",

    // Notifications
    newAchievementUnlocked: "New Achievement Unlocked",
    trendingKeywordAlert: "Trending Keyword Alert",
    videoPerformanceUpdate: "Video Performance Update",
    contentOptimizationTip: "Content Optimization Tip",
    reachedViews: "You reached 3,000 views on your latest video!",
    keywordTrending: 'The keyword "React tutorials" is trending in your niche.',
    performanceImproved:
      "Your video performance has improved by 25% this week.",
    thumbnailOptimization:
      "Consider updating your thumbnail for better engagement.",
    hoursAgo: "{0} hours ago",
    dayAgo: "1 day ago",
    daysAgo: "{0} days ago",
    viewAllNotifications: "View all notifications",

    // Achievements
    reached3000Views: "You reached 3.000 Views. View now!",
    newSubscriberRecord:
      "A new record for Subscribers! {0} was your best in the past year.",
    reached2500Views: "You reached 2.500 Views. View now!",
    march2025: "March 2025",
    february2025: "February 2025",
    august2024: "August 2024",
    april2024: "April 2024",
    january2023: "January 2023",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",

    // Home Page
    welcomeTitle: "Welcome to YB Project",
    welcomeDescription:
      "A modern React application built with TypeScript, Vite and Tailwind CSS",
    count: "Count: {0}",
    reset: "Reset",
    featuresTitle: "Features",
    modernTech: "Modern Technology",
    modernTechDesc: "Built with the latest React, TypeScript, and Tailwind CSS",
    fastDev: "Fast Development",
    fastDevDesc: "Powered by Vite for lightning-fast development experience",
    responsive: "Responsive Design",
    responsiveDesc: "Works perfectly on all devices and screen sizes",

    // About Page
    aboutTitle: "About YB Project",
    aboutDescription:
      "YB Project is a modern web application developed using the most advanced technologies in the React ecosystem. This project is built with the goal of creating a powerful, flexible and easy-to-maintain platform.",
    technologiesUsed: "Technologies Used",
    frontend: "Frontend",
    features: "Features",
    modernUI: "Modern UI with React 19",
    typeSafety: "Type safety with TypeScript",
    fastBuild: "Fast build with Vite",
    utilityCSS: "Utility-first CSS with Tailwind",
    clientRouting: "Client-side routing with React Router",

    // Search
    searchSuggestions: "Search Suggestions",
    trending: "Trending",
    recent: "Recent",
    noResults: "No results found",
    typeToSearch: "Type to search for videos, channels, or playlists",
    suggestions: "Suggestions",
    trendingNow: "Trending Now",
    recentSearches: "Recent Searches",
  },
  vi: {
    // Header
    today: "Hôm nay",
    searchPlaceholder: "Tìm kiếm video, kênh hoặc playlist",

    // User Menu
    plans: "Gói dịch vụ",
    accountSettings: "Cài đặt tài khoản",
    channelSettings: "Cài đặt kênh",
    affiliateCenter: "Trung tâm liên kết",
    help: "Trợ giúp",
    language: "Ngôn ngữ",
    darkMode: "Chế độ tối",
    signOut: "Đăng xuất",
    channels: "KÊNH",
    addChannel: "Thêm kênh",

    // Notifications
    achievements: "Thành tích",
    newAchievement: "Mở khóa thành tích mới",
    trendingKeyword: "Cảnh báo từ khóa xu hướng",
    videoPerformance: "Cập nhật hiệu suất video",
    contentOptimization: "Mẹo tối ưu nội dung",

    // Tools
    keywords: "Từ khóa",
    competitors: "Đối thủ",
    outliers: "Ngoại lệ",
    subscribers: "Người đăng ký",
    scriptWriter: "Viết kịch bản",
    generate: "Tạo",
    dailyIdeas: "Ý tưởng hàng ngày",
    create: "Tạo",
    createThumbnail: "Tạo Thumbnail",
    createIdeas: "Tạo Ý Tưởng", 
    createScript: "Viết Kịch Bản",
    generateVideo: "Tạo Video",
    thumbnail: "Hình thu nhỏ",
    optimize: "Tối ưu",
    seo: "SEO",
    coach: "Huấn luyện",
    learn: "Học tập",

    // Sidebar Navigation
    optimizeNav: "Tối ưu",
    research: "Nghiên cứu",
    upgrade: "Nâng cấp",

    // Pages
    home: "Trang chủ",
    about: "Giới thiệu",
    contact: "Liên hệ",
    dashboard: "Bảng điều khiển",

    // Notifications
    newAchievementUnlocked: "Mở khóa thành tích mới",
    trendingKeywordAlert: "Cảnh báo từ khóa xu hướng",
    videoPerformanceUpdate: "Cập nhật hiệu suất video",
    contentOptimizationTip: "Mẹo tối ưu nội dung",
    reachedViews: "Bạn đã đạt 3.000 lượt xem trong video mới nhất!",
    keywordTrending:
      'Từ khóa "React tutorials" đang có xu hướng trong lĩnh vực của bạn.',
    performanceImproved: "Hiệu suất video của bạn đã cải thiện 25% tuần này.",
    thumbnailOptimization:
      "Hãy cân nhắc cập nhật hình thu nhỏ để tăng tương tác.",
    hoursAgo: "{0} giờ trước",
    dayAgo: "1 ngày trước",
    daysAgo: "{0} ngày trước",
    viewAllNotifications: "Xem tất cả thông báo",

    // Achievements
    reached3000Views: "Bạn đã đạt 3.000 lượt xem. Xem ngay!",
    newSubscriberRecord:
      "Kỷ lục mới về người đăng ký! {0} là tháng tốt nhất của bạn trong năm qua.",
    reached2500Views: "Bạn đã đạt 2.500 lượt xem. Xem ngay!",
    march2025: "Tháng 3 năm 2025",
    february2025: "Tháng 2 năm 2025",
    august2024: "Tháng 8 năm 2024",
    april2024: "Tháng 4 năm 2024",
    january2023: "Tháng 1 năm 2023",

    // Common
    loading: "Đang tải...",
    save: "Lưu",
    cancel: "Hủy",
    confirm: "Xác nhận",
    close: "Đóng",

    // Home Page
    welcomeTitle: "Chào mừng đến với YB Project",
    welcomeDescription:
      "Một ứng dụng React hiện đại được xây dựng với TypeScript, Vite và Tailwind CSS",
    count: "Đếm: {0}",
    reset: "Đặt lại",
    featuresTitle: "Tính năng",
    modernTech: "Công nghệ hiện đại",
    modernTechDesc:
      "Được xây dựng với React, TypeScript và Tailwind CSS mới nhất",
    fastDev: "Phát triển nhanh",
    fastDevDesc: "Được hỗ trợ bởi Vite cho trải nghiệm phát triển cực nhanh",
    responsive: "Thiết kế responsive",
    responsiveDesc:
      "Hoạt động hoàn hảo trên mọi thiết bị và kích thước màn hình",

    // About Page
    aboutTitle: "Giới thiệu về YB Project",
    aboutDescription:
      "YB Project là một ứng dụng web hiện đại được phát triển bằng những công nghệ tiên tiến nhất trong hệ sinh thái React. Dự án này được xây dựng với mục tiêu tạo ra một nền tảng mạnh mẽ, linh hoạt và dễ bảo trì.",
    technologiesUsed: "Công nghệ sử dụng",
    frontend: "Frontend",
    features: "Tính năng",
    modernUI: "Giao diện hiện đại với React 19",
    typeSafety: "Type safety với TypeScript",
    fastBuild: "Build nhanh với Vite",
    utilityCSS: "Utility-first CSS với Tailwind",
    clientRouting: "Client-side routing với React Router",

    // Search
    searchSuggestions: "Gợi ý tìm kiếm",
    trending: "Xu hướng",
    recent: "Gần đây",
    noResults: "Không tìm thấy kết quả",
    typeToSearch: "Nhập để tìm kiếm video, kênh hoặc playlist",
    suggestions: "Gợi ý",
    trendingNow: "Xu hướng hiện tại",
    recentSearches: "Tìm kiếm gần đây",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = memo(function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]
  ); // Default to English

  const setLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
    console.log("Language changed to:", language);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const translation =
        translations[currentLanguage.code as keyof typeof translations];
      return translation[key as keyof typeof translation] || key;
    },
    [currentLanguage.code]
  );

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
});

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export { languages };
