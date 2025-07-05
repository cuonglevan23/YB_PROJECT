import { memo, useEffect } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useDropdownPosition } from "../../../hooks";
import type { ComponentType, ReactNode } from "react";

interface BaseDropdownProps {
  icon: ComponentType<{ className?: string }>;
  labelKey: string;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
  isCollapsed?: boolean;
}

const BaseDropdown = memo(function BaseDropdown({
  icon: Icon,
  labelKey,
  isActive,
  isOpen,
  onToggle,
  children,
  className = "",
  isCollapsed = false,
}: BaseDropdownProps) {
  const { t } = useLanguage();
  const { position, buttonRef, updatePosition } = useDropdownPosition();

  // Update position when dropdown opens or sidebar state changes
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, isCollapsed, updatePosition]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        className={`w-full flex items-center p-3 rounded-lg transition-colors ${
          isCollapsed ? "justify-center" : "justify-start"
        } ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-400 hover:text-white hover:bg-gray-700"
        } ${className}`}
        title={isCollapsed ? t(labelKey) : undefined}
      >
        <Icon className="text-lg flex-shrink-0" />
        {!isCollapsed && <span className="ml-3 text-sm">{t(labelKey)}</span>}
      </button>

      {/* Dropdown Content - POSITIONED OUTSIDE SIDEBAR */}
      {isOpen && (
        <div
          className="fixed w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-[100]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            minHeight: "200px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
});

export default BaseDropdown;
