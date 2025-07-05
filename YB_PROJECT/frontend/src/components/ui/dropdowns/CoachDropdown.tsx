import { memo, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser, AiOutlineRobot, AiOutlineBook } from "react-icons/ai";
import BaseDropdown from "./BaseDropdown";

interface CoachDropdownProps {
  isActive: boolean;
  onToggle: () => void;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const CoachDropdown = memo(function CoachDropdown({
  isActive,
  onToggle,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isCollapsed = false,
}: CoachDropdownProps) {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          console.log("Closing dropdown from outside click");
          onToggle();
        }
      }
    };

    if (isOpen) {
      // Add small delay to avoid immediate closure
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const coachItems = [
    {
      path: "/coach/ai-chat",
      labelKey: "aiChat",
      label: "AI Chat",
      icon: AiOutlineRobot,
      description: "Chat with AI Coach",
    },
    {
      path: "/coach/learn",
      labelKey: "learn",
      label: "Learn",
      icon: AiOutlineBook,
      description: "Learning resources",
    },
  ];

  return (
    <div ref={dropdownRef}>
      <BaseDropdown
        icon={AiOutlineUser}
        labelKey="coach"
        isActive={isActive}
        isOpen={isOpen}
        onToggle={onToggle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        isCollapsed={isCollapsed}
      >
        <div className="py-1">
          {coachItems.map((item) => {
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
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(); // Close dropdown immediately
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
    </div>
  );
});

export default CoachDropdown;
