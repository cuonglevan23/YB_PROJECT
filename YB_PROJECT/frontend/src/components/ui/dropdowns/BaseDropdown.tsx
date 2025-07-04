import { memo } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import type { ComponentType, ReactNode } from "react";

interface BaseDropdownProps {
  icon: ComponentType<{ className?: string }>;
  labelKey: string;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

const BaseDropdown = memo(function BaseDropdown({
  icon: Icon,
  labelKey,
  isActive,
  isOpen,
  onToggle,
  children,
  className = "",
}: BaseDropdownProps) {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`
          group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }
          ${className}
        `}
        title={t(labelKey)}
      >
        <Icon className="w-5 h-5" />

        {/* Tooltip */}
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {t(labelKey)}
        </div>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute left-full ml-2 top-0 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  );
});

export default BaseDropdown;
