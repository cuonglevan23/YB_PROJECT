import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineRocket,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiAnalyse } from "react-icons/bi";
import { MdOutlineCreate } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";
import { CoachDropdown } from "../ui/dropdowns";
import CreateDropdown from "../ui/dropdowns/CreateDropdown";
import ResearchDropdown from "../ui/dropdowns/ResearchDropdown";
import CheckoutModal from "../ui/modals/CheckoutModal";
import { useCheckoutModal, useSidebarDropdowns, useSidebar } from "../../hooks";
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
  const { isCollapsed, toggleSidebar } = useSidebar();

  // Modal and dropdown hooks
  const {
    isOpen: isCheckoutModalOpen,
    openModal: openCheckoutModal,
    closeModal: closeCheckoutModal,
  } = useCheckoutModal();
  const { toggleDropdown, closeDropdown, isDropdownOpen } =
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
      className={`bg-gray-800 flex flex-col border-r border-gray-700 h-screen transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header with toggle button */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-center">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <AiOutlineMenu className="text-white text-lg" />
          </button>
        </div>
      </div>

      {/* Main Menu Items */}
      <nav
        className={`flex-1 overflow-y-auto ${
          isCollapsed ? "px-2" : "px-4"
        } py-4`}
      >
        <div className="space-y-2">
          {menuItems.map((item) => {
            // Special handling for Research dropdown
            if (item.isSpecial && item.type === "research") {
              return (
                <div key={item.labelKey} className="relative">
                  <ResearchDropdown
                    onToggle={() => toggleDropdown("research")}
                    isOpen={isDropdownOpen("research")}
                    isCollapsed={isCollapsed}
                  />
                </div>
              );
            }

            // Special handling for Coach dropdown
            if (item.isSpecial && item.type === "coach") {
              return (
                <div key={item.labelKey} className="relative">
                  <CoachDropdown
                    isActive={isCoachActive}
                    onToggle={() => toggleDropdown("coach")}
                    isOpen={isDropdownOpen("coach")}
                    isCollapsed={isCollapsed}
                  />
                </div>
              );
            }

            // Special handling for Create dropdown
            if (item.isSpecial && item.type === "create") {
              return (
                <div key={item.labelKey} className="relative">
                  <CreateDropdown
                    isActive={isCreateActive}
                    onToggle={() => toggleDropdown("create")}
                    isOpen={isDropdownOpen("create")}
                    onClose={() => closeDropdown()}
                    isCollapsed={isCollapsed}
                  />
                </div>
              );
            }

            // Special handling for Upgrade button
            if (item.isSpecial && item.labelKey === "upgrade") {
              const Icon = item.icon;
              return (
                <button
                  key={item.labelKey}
                  onClick={item.onClick}
                  className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white ${
                    isCollapsed ? "justify-center" : "justify-start"
                  }`}
                  title={t(item.labelKey)}
                >
                  <div className="relative">
                    <Icon className="text-lg" />
                    {/* Upgrade Badge */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-black">+</span>
                    </div>
                  </div>
                  {!isCollapsed && (
                    <span className="ml-3 text-sm">{t(item.labelKey)}</span>
                  )}
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
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    isCollapsed ? "justify-center" : "justify-start"
                  } ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                  title={t(item.labelKey)}
                >
                  <Icon className="text-lg" />
                  {!isCollapsed && (
                    <span className="ml-3 text-sm">{t(item.labelKey)}</span>
                  )}
                </Link>
              );
            }

            return null;
          })}
        </div>
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
