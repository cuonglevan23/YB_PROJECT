import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineExperiment,
  AiOutlinePlus,
  AiOutlineTeam,
  AiOutlineArrowUp,
  AiOutlineTrophy,
  AiOutlineMenu,
} from "react-icons/ai";

interface HeaderProps {
  className?: string;
}

const HeaderSimple: React.FC<HeaderProps> = ({ className = "" }) => {
  const location = useLocation();

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: AiOutlineHome,
      path: "/",
      active: location.pathname === "/",
    },
    {
      id: "optimize",
      label: "Optimize",
      icon: AiOutlineSearch,
      path: "/optimize",
      active: location.pathname === "/optimize",
    },
    {
      id: "research",
      label: "Research",
      icon: AiOutlineExperiment,
      path: "/research",
      active: location.pathname === "/research",
    },
    {
      id: "create",
      label: "Create",
      icon: AiOutlinePlus,
      path: "/create",
      active: location.pathname === "/create",
    },
    {
      id: "coach",
      label: "Coach",
      icon: AiOutlineTeam,
      path: "/coach",
      active: location.pathname === "/coach",
    },
    {
      id: "upgrade",
      label: "Upgrade",
      icon: AiOutlineArrowUp,
      path: "/upgrade",
      active: location.pathname === "/upgrade",
      isUpgrade: true,
    },
  ];

  return (
    <header
      className={`
      bg-gray-900 border-b border-gray-800 relative z-50
      ${className}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">YB</span>
                </div>
                <span className="text-white font-semibold text-lg">
                  YB Project
                </span>
              </div>
            </Link>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      item.active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }
                    ${
                      item.isUpgrade
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : ""
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-3">
            {/* Achievements */}
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
              <AiOutlineTrophy className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md relative">
              <AiOutlineBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
              <AiOutlineUser className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">
              <AiOutlineMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSimple;
