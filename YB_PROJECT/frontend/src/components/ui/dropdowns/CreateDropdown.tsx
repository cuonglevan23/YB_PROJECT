import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineCreate,
  MdOutlineImage,
  MdOutlineLightbulb,
  MdOutlineVideoLibrary,
  MdOutlineDescription,
} from "react-icons/md";
import { useLanguage } from "../../../contexts/LanguageContext";
import BaseDropdown from "./BaseDropdown";

interface CreateDropdownProps {
  isActive: boolean;
  onToggle: () => void;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const CreateDropdown = memo(function CreateDropdown({
  isActive,
  onToggle,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isCollapsed = false,
}: CreateDropdownProps) {
  const { t } = useLanguage();
  const location = useLocation();

  const createOptions = [
    {
      id: "thumbnail",
      icon: MdOutlineImage,
      labelKey: "createThumbnail",
      description: "Generate eye-catching thumbnails",
      path: "/create/thumbnail",
    },
    {
      id: "ideas",
      icon: MdOutlineLightbulb,
      labelKey: "createIdeas",
      description: "Get daily video ideas",
      path: "/create/ideas",
    },
    {
      id: "script",
      icon: MdOutlineDescription,
      labelKey: "createScript",
      description: "Write video scripts",
      path: "/create/script",
    },
    {
      id: "generateVideo",
      icon: MdOutlineVideoLibrary,
      labelKey: "generateVideo",
      description: "Optimize existing videos",
      path: "/create/GenerateVideo",
    },
  ];

  return (
    <BaseDropdown
      icon={MdOutlineCreate}
      labelKey="create"
      isActive={isActive}
      isOpen={isOpen}
      onToggle={onToggle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      isCollapsed={isCollapsed}
    >
      <div className="py-1">
        {createOptions.map((option) => {
          const Icon = option.icon;
          const isItemActive = location.pathname === option.path;

          return (
            <Link
              key={option.id}
              to={option.path}
              className={`flex items-center gap-3 px-3 py-2 mx-1 my-1 rounded-lg transition-colors ${
                isItemActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium">{t(option.labelKey)}</div>
                <div className="text-xs opacity-70">{option.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </BaseDropdown>
  );
});

export default CreateDropdown;
