import { memo } from "react";
import { useNavigate } from "react-router-dom";
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
  onClose: () => void;
}

const CreateDropdown = memo(function CreateDropdown({
  isActive,
  onToggle,
  isOpen,
  onClose,
}: CreateDropdownProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
      id: "optimize",
      icon: MdOutlineVideoLibrary,
      labelKey: "optimizeVideo",
      description: "Optimize existing videos",
      path: "/create/optimize",
    },
  ];

  const handleOptionClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <BaseDropdown
      icon={MdOutlineCreate}
      labelKey="create"
      isActive={isActive}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="p-2">
        <div className="text-white text-sm font-medium mb-2 px-2">
          {t("createTools")}
        </div>

        {createOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.path)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                <div>
                  <div className="text-white text-sm font-medium">
                    {t(option.labelKey)}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {option.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </BaseDropdown>
  );
});

export default CreateDropdown;
