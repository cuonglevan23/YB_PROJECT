import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import BaseDropdown from "./BaseDropdown";
import { AiOutlineSearch } from "react-icons/ai";
import { BiAnalyse, BiGroup } from "react-icons/bi";
import { MdOutlineTrendingUp } from "react-icons/md";

interface ResearchDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const ResearchDropdown = memo(function ResearchDropdown({
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isCollapsed = false,
}: ResearchDropdownProps) {
  const location = useLocation();

  const researchItems = [
    {
      path: "/research/outliers",
      label: "Outliers",
      description: "Find standout videos",
      icon: AiOutlineSearch,
    },
    {
      path: "/research/keywords",
      label: "Keywords",
      description: "Trending topics for your channel",
      icon: MdOutlineTrendingUp,
    },
    {
      path: "/research/competitors",
      label: "Competitors",
      description: "Find your competitors",
      icon: BiAnalyse,
    },
    {
      path: "/research/subscribers",
      label: "Subscribers",
      description: "Analyze your subscriber growth",
      icon: BiGroup,
    },
  ];

  const isActive = location.pathname.startsWith("/research");

  return (
    <BaseDropdown
      icon={AiOutlineSearch}
      labelKey="research"
      isActive={isActive}
      isOpen={isOpen}
      onToggle={onToggle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      isCollapsed={isCollapsed}
    >
      <div className="py-1">
        {researchItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 mx-1 my-1 rounded-lg transition-colors ${
                isItemActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => {
                // Allow navigation to proceed immediately
                setTimeout(() => {
                  onToggle();
                }, 0);
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </BaseDropdown>
  );
});

export default ResearchDropdown;
