import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineRocket,
} from "react-icons/ai";
import { BiAnalyse } from "react-icons/bi";
import { MdOutlineCreate } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";
import { CoachDropdown } from "../ui/dropdowns";
import CreateDropdown from "../ui/dropdowns/CreateDropdown";
import ResearchDropdown from "../ui/dropdowns/ResearchDropdown";
import CheckoutModal from "../ui/modals/CheckoutModal";
import { useCheckoutModal, useSidebarDropdowns } from "../../hooks";
import type { ComponentType } from "react";

interface SidebarItem {
  path?: string;
  labelKey: string;
  icon: ComponentType<{ className?: string }>;
  isSpecial?: boolean;
  type?: "coach" | "create" | "research";
  onClick?: () => void;
}

const Sidebar = memo(function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  // Modal and dropdown hooks
  const {
    isOpen: isCheckoutModalOpen,
    openModal: openCheckoutModal,
    closeModal: closeCheckoutModal,
  } = useCheckoutModal();
  const { toggleDropdown, closeDropdown, isDropdownOpen, dropdownRef } =
    useSidebarDropdowns();

  const menuItems: SidebarItem[] = [
    { path: "/", labelKey: "home", icon: AiOutlineHome },
    { path: "/optimize", labelKey: "optimizeNav", icon: BiAnalyse },
    {
      labelKey: "research",
      icon: AiOutlineSearch,
      isSpecial: true,
      type: "research",
    },
    {
      labelKey: "create",
      icon: MdOutlineCreate,
      isSpecial: true,
      type: "create",
    },
    { labelKey: "coach", icon: AiOutlineUser, isSpecial: true, type: "coach" },
    {
      labelKey: "upgrade",
      icon: AiOutlineRocket,
      isSpecial: true,
      onClick: openCheckoutModal,
    },
  ];

  const isCoachActive = location.pathname.startsWith("/coach");
  const isCreateActive = location.pathname.startsWith("/create");

  return (
    <div
      ref={dropdownRef}
      className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r border-gray-700"
    >
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">YB</span>
        </div>
      </div>

      {/* Main Menu Items */}
      <nav className="flex flex-col space-y-4 flex-1">
        {menuItems.map((item) => {
          // Special handling for Research dropdown
          if (item.isSpecial && item.type === "research") {
            return (
              <ResearchDropdown
                key={item.labelKey}
                onToggle={() => toggleDropdown("research")}
                isOpen={isDropdownOpen("research")}
              />
            );
          }

          // Special handling for Coach dropdown
          if (item.isSpecial && item.type === "coach") {
            return (
              <CoachDropdown
                key={item.labelKey}
                isActive={isCoachActive}
                onToggle={() => toggleDropdown("coach")}
                isOpen={isDropdownOpen("coach")}
              />
            );
          }

          // Special handling for Create dropdown
          if (item.isSpecial && item.type === "create") {
            return (
              <CreateDropdown
                key={item.labelKey}
                isActive={isCreateActive}
                onToggle={() => toggleDropdown("create")}
                isOpen={isDropdownOpen("create")}
                onClose={() => closeDropdown()}
              />
            );
          }

          // Special handling for Upgrade button (show modal)
          if (item.isSpecial && item.labelKey === "upgrade") {
            const Icon = item.icon;
            return (
              <button
                key={item.labelKey}
                onClick={item.onClick}
                className="group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-700"
                title={t(item.labelKey)}
              >
                <Icon className="w-5 h-5" />

                {/* Upgrade Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-black">+</span>
                </div>

                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {t(item.labelKey)}
                </div>
              </button>
            );
          }

          // Regular menu items
          if (item.path) {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }
                `}
                title={t(item.labelKey)}
              >
                <Icon className="w-5 h-5" />

                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {t(item.labelKey)}
                </div>
              </Link>
            );
          }

          return null;
        })}
      </nav>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={closeCheckoutModal}
      />
    </div>
  );
});

export default Sidebar;
