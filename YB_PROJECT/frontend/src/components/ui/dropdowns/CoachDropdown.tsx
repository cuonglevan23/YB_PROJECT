import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineRobot, AiOutlineBook } from "react-icons/ai";
import BaseDropdown from "./BaseDropdown";

interface CoachDropdownProps {
  isActive: boolean;
  onToggle: () => void;
  isOpen: boolean;
}

const CoachDropdown = memo(function CoachDropdown({
  isActive,
  onToggle,
  isOpen,
}: CoachDropdownProps) {
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
      >
        <div className="py-2">
          {coachItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  onToggle(); // Close dropdown immediately
                }}
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors group"
              >
                <Icon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="text-gray-400 text-xs">
                    {item.description}
                  </div>
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
