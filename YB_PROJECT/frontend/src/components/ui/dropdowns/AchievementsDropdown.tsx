import { memo } from "react";
import { AiOutlineTrophy, AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { useLanguage } from "../../../contexts/LanguageContext";

interface Achievement {
  id: string;
  titleKey: string;
  descriptionKey: string;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  completed?: boolean;
}

const AchievementsDropdown = memo(function AchievementsDropdown() {
  const { t } = useLanguage();

  const achievements: Achievement[] = [
    {
      id: "1",
      titleKey: "reached3000Views",
      descriptionKey: "march2025",
      date: "tháng 3 năm 2025",
      icon: AiOutlineTrophy,
      iconColor: "text-yellow-500",
      completed: true,
    },
    {
      id: "2",
      titleKey: "newSubscriberRecord",
      descriptionKey: "february2025",
      date: "3 tháng 2, 2025",
      icon: BsFire,
      iconColor: "text-red-500",
      completed: true,
    },
    {
      id: "3",
      titleKey: "reached2500Views",
      descriptionKey: "august2024",
      date: "14 tháng 8, 2024",
      icon: AiOutlineTrophy,
      iconColor: "text-yellow-500",
      completed: true,
    },
    {
      id: "4",
      titleKey: "newSubscriberRecord",
      descriptionKey: "april2024",
      date: "3 tháng 4, 2024",
      icon: BsFire,
      iconColor: "text-red-500",
      completed: true,
    },
    {
      id: "5",
      titleKey: "reached2500Views",
      descriptionKey: "january2023",
      date: "1 tháng 1, 2023",
      icon: AiOutlineTrophy,
      iconColor: "text-yellow-500",
      completed: true,
    },
  ];

  return (
    <div className="w-96 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <AiOutlineTrophy className="w-5 h-5 text-white" />
          <span className="text-white font-medium">{t("achievements")}</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <AiOutlineClose className="w-5 h-5" />
        </button>
      </div>

      {/* Achievements List */}
      <div className="max-h-96 overflow-y-auto">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className="px-4 py-3 hover:bg-gray-700 border-b border-gray-700/50"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon className={`w-6 h-6 ${achievement.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-tight">
                    {t(achievement.titleKey)}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {achievement.date}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {achievement.completed && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                  <BiChevronDown className="w-4 h-4 text-gray-400 mt-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default AchievementsDropdown;
