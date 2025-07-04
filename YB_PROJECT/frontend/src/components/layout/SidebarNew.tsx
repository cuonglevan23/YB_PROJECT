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
import type { ComponentType } from "react";

interface SidebarItem {
  path: string;
  labelKey: string;
  icon: ComponentType<{ className?: string }>;
}

const Sidebar = memo(function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems: SidebarItem[] = [
    { path: "/", labelKey: "home", icon: AiOutlineHome },
    { path: "/optimize", labelKey: "optimizeNav", icon: BiAnalyse },
    { path: "/research", labelKey: "research", icon: AiOutlineSearch },
    { path: "/create", labelKey: "create", icon: MdOutlineCreate },
    { path: "/coach", labelKey: "coach", icon: AiOutlineUser },
  ];

  const bottomItems: SidebarItem[] = [
    { path: "/upgrade", labelKey: "upgrade", icon: AiOutlineRocket },
  ];

  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r border-gray-700">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">YB</span>
        </div>
      </div>

      {/* Main Menu Items */}
      <nav className="flex flex-col space-y-4 flex-1">
        {menuItems.map((item) => {
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
        })}
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col space-y-4">
        {bottomItems.map((item) => {
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

              {/* Upgrade Badge */}
              {item.path === "/upgrade" && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-black">+</span>
                </div>
              )}

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {t(item.labelKey)}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
});

export default Sidebar;
