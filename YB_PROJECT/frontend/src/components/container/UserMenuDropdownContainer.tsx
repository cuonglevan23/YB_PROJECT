import { memo, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserMenuDropdown from "../presentational/UserMenuDropdown";
import { useLanguage, languages } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

interface Channel {
  name: string;
  avatar: string;
}

const UserMenuDropdownContainer = memo(function UserMenuDropdownContainer() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  // Use auth user info or fallback to default
  const userInfo: UserInfo = {
    name: user?.name || "Guest User",
    email: user?.email || "guest@example.com",
    avatar: user?.avatar,
  };

  // Mock channels data - in real app this would come from API
  const channels: Channel[] = [
    {
      name: "Tấn Trường Bùi",
      avatar: "/api/placeholder/32/32",
    },
  ];

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageToggle = useCallback(() => {
    console.log(
      "Language button clicked, current state:",
      showLanguageDropdown
    );
    setShowLanguageDropdown(!showLanguageDropdown);
  }, [showLanguageDropdown]);

  const handleLanguageSelect = useCallback(
    (language: { code: string; name: string }) => {
      console.log("Language clicked:", language);
      console.log("Current selected language:", currentLanguage);
      setLanguage(language);
      setShowLanguageDropdown(false);
      console.log("New selected language should be:", language.name);
    },
    [currentLanguage, setLanguage]
  );

  const handlePlansClick = useCallback(() => {
    console.log("Plans clicked");
    // TODO: Implement plans navigation
  }, []);

  const handleAccountClick = useCallback(() => {
    console.log("Account clicked");
    // TODO: Implement account settings navigation
  }, []);

  const handleChannelClick = useCallback(() => {
    console.log("Channel clicked");
    // TODO: Implement channel settings navigation
  }, []);

  const handleAffiliateClick = useCallback(() => {
    console.log("Affiliate clicked");
    // TODO: Implement affiliate center navigation
  }, []);

  const handleHelpClick = useCallback(() => {
    console.log("Help clicked");
    // TODO: Implement help navigation
  }, []);

  const handleLogoutClick = useCallback(() => {
    console.log("Logout clicked");
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const handleAddChannelClick = useCallback(() => {
    console.log("Add channel clicked");
    // TODO: Implement add channel logic
  }, []);

  return (
    <div ref={languageRef}>
      <UserMenuDropdown
        userInfo={userInfo}
        currentLanguage={currentLanguage}
        languages={languages}
        showLanguageDropdown={showLanguageDropdown}
        channels={channels}
        onLanguageToggle={handleLanguageToggle}
        onLanguageSelect={handleLanguageSelect}
        onPlansClick={handlePlansClick}
        onAccountClick={handleAccountClick}
        onChannelClick={handleChannelClick}
        onAffiliateClick={handleAffiliateClick}
        onHelpClick={handleHelpClick}
        onLogoutClick={handleLogoutClick}
        onAddChannelClick={handleAddChannelClick}
        t={t}
      />
    </div>
  );
});

export default UserMenuDropdownContainer;
