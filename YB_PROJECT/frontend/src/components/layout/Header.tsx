import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Logo, IconButton, NotificationDropdown, ToolsDropdown } from "../ui";
import { SearchModal } from "../ui/modals";
import UserMenuDropdownContainer from "../container/UserMenuDropdownContainer";
import {
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineAppstore,
  AiOutlineSearch,
} from "react-icons/ai";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleDropdownToggle = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleSearchModalOpen = useCallback(() => {
    setIsSearchModalOpen(true);
    closeDropdowns(); // Close any open dropdowns
  }, []);

  const handleSearchModalClose = useCallback(() => {
    setIsSearchModalOpen(false);
  }, []);

  const handleSearch = useCallback((query: string) => {
    console.log("Searching for:", query);
    // Implement search logic here
  }, []);

  // Handle keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        handleSearchModalOpen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSearchModalOpen]);

  return (
    <header
      className={`
      bg-gray-900 border-b border-gray-800 relative z-50
      ${className}
    `}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo
                variant="light"
                size="md"
                showText={true}
                className="text-white"
              />
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <button
              onClick={handleSearchModalOpen}
              className="w-full max-w-md mx-auto flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-400 hover:bg-gray-700 hover:border-gray-600 transition-colors"
            >
              <AiOutlineSearch className="w-5 h-5 mr-3" />
              <span className="text-left flex-1 truncate">
                Tìm kiếm video, kênh, playlist...
              </span>
              <div className="ml-3 px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                Ctrl+K
              </div>
            </button>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile search button */}
            <div className="md:hidden">
              <IconButton
                icon={AiOutlineSearch}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={handleSearchModalOpen}
                aria-label="Search"
              />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <IconButton
                icon={isMobileMenuOpen ? AiOutlineClose : AiOutlineMenu}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              />
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Tools */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("tools")}
                  className="p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Tools"
                >
                  <AiOutlineAppstore className="w-6 h-6" />
                </button>
                {activeDropdown === "tools" && (
                  <div className="absolute top-full right-0 mt-1 z-50">
                    <ToolsDropdown />
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("notifications")}
                  className="p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors relative"
                  aria-label="Notifications"
                >
                  <AiOutlineBell className="w-6 h-6" />
                  {/* Notification badge */}
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    3
                  </span>
                </button>
                {activeDropdown === "notifications" && (
                  <div className="absolute top-full right-0 mt-1 z-50">
                    <NotificationDropdown />
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("user")}
                  className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-400 bg-blue-600 flex items-center justify-center">
                    <AiOutlineUser className="w-5 h-5 text-white" />
                  </div>
                </button>
                {activeDropdown === "user" && (
                  <div className="absolute top-full right-0 mt-1 z-50">
                    <UserMenuDropdownContainer />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Simple */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
              {/* Mobile search */}
              <button
                onClick={handleSearchModalOpen}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <AiOutlineSearch className="w-6 h-6 mr-3" />
                Tìm kiếm
              </button>

              {/* Mobile user actions */}
              <button
                onClick={() => handleDropdownToggle("tools")}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <AiOutlineAppstore className="w-6 h-6 mr-3" />
                Tools
              </button>
              <button
                onClick={() => handleDropdownToggle("notifications")}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <AiOutlineBell className="w-6 h-6 mr-3" />
                Notifications
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={() => handleDropdownToggle("user")}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-600 bg-blue-600 flex items-center justify-center mr-3">
                  <AiOutlineUser className="w-4 h-4 text-white" />
                </div>
                Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {(activeDropdown || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => {
            closeDropdowns();
            setIsMobileMenuOpen(false);
          }}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={handleSearchModalClose}
        onSearch={handleSearch}
      />
    </header>
  );
};

export default Header;
