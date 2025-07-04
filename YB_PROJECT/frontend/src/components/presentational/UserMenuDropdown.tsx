import { memo } from "react";
import {
  AiOutlineStar,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineQuestionCircle,
  AiOutlineGlobal,
  AiOutlineLogout,
  AiOutlineLink,
  AiOutlineCheck,
} from "react-icons/ai";
import { BiChevronDown, BiMoon } from "react-icons/bi";
import { BsToggleOn } from "react-icons/bs";
import { DropdownItem, DropdownSection } from "../ui/dropdowns";

interface Language {
  code: string;
  name: string;
}

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

interface Channel {
  name: string;
  avatar: string;
}

interface UserMenuDropdownProps {
  userInfo: UserInfo;
  currentLanguage: Language;
  languages: Language[];
  showLanguageDropdown: boolean;
  channels: Channel[];
  onLanguageToggle: () => void;
  onLanguageSelect: (language: Language) => void;
  onPlansClick: () => void;
  onAccountClick: () => void;
  onChannelClick: () => void;
  onAffiliateClick: () => void;
  onHelpClick: () => void;
  onLogoutClick: () => void;
  onAddChannelClick: () => void;
  t: (key: string) => string;
}

const UserMenuDropdown = memo(function UserMenuDropdown({
  userInfo,
  currentLanguage,
  languages,
  showLanguageDropdown,
  channels,
  onLanguageToggle,
  onLanguageSelect,
  onPlansClick,
  onAccountClick,
  onChannelClick,
  onAffiliateClick,
  onHelpClick,
  onLogoutClick,
  onAddChannelClick,
  t,
}: UserMenuDropdownProps) {
  return (
    <div className="w-72 relative bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      {/* User Info Section */}
      <DropdownSection showDivider={true}>
        <div className="px-4 py-3 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <AiOutlineUser className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{userInfo.name}</p>
              <p className="text-xs text-gray-400">{userInfo.email}</p>
            </div>
          </div>
        </div>
      </DropdownSection>

      {/* Menu Items */}
      <DropdownSection>
        <DropdownItem icon={AiOutlineStar} onClick={onPlansClick}>
          {t("plans")}
        </DropdownItem>
        <DropdownItem icon={AiOutlineSetting} onClick={onAccountClick}>
          {t("accountSettings")}
        </DropdownItem>
        <DropdownItem icon={AiOutlineUser} onClick={onChannelClick}>
          {t("channelSettings")}
        </DropdownItem>
        <DropdownItem icon={AiOutlineLink} onClick={onAffiliateClick}>
          {t("affiliateCenter")}
        </DropdownItem>
        <DropdownItem icon={AiOutlineQuestionCircle} onClick={onHelpClick}>
          {t("help")}
        </DropdownItem>
      </DropdownSection>

      {/* Settings Section */}
      <DropdownSection>
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={onLanguageToggle}
            className="w-full px-4 py-3 flex items-center justify-between text-gray-300 hover:bg-gray-700 transition-colors rounded-lg"
          >
            <div className="flex items-center">
              <AiOutlineGlobal className="w-6 h-6 mr-3 text-blue-500" />
              <span className="font-medium">{t("language")}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-white mr-2 px-2 py-1 bg-blue-600 rounded-full">
                {currentLanguage.code.toUpperCase()}
              </span>
              <BiChevronDown
                className={`w-5 h-5 transition-transform ${
                  showLanguageDropdown ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Language Dropdown */}
          {showLanguageDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-[100]">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onLanguageSelect(language);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-600 flex items-center justify-between transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex items-center">
                    <span className="text-xs font-bold text-white mr-3 px-2 py-1 bg-gray-600 rounded">
                      {language.code.toUpperCase()}
                    </span>
                    <span className="font-medium">{language.name}</span>
                  </div>
                  {currentLanguage.code === language.code && (
                    <AiOutlineCheck className="w-5 h-5 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="px-4 py-3 flex items-center justify-between text-gray-300 hover:bg-gray-700 transition-colors rounded-lg">
          <div className="flex items-center">
            <BiMoon className="w-6 h-6 mr-3 text-blue-500" />
            <span className="font-medium">{t("darkMode")}</span>
          </div>
          <BsToggleOn className="w-8 h-8 text-blue-500 hover:text-blue-400 cursor-pointer transition-colors" />
        </div>
      </DropdownSection>

      {/* Logout */}
      <DropdownSection showDivider={false}>
        <DropdownItem
          icon={AiOutlineLogout}
          variant="danger"
          onClick={onLogoutClick}
        >
          {t("signOut")}
        </DropdownItem>
      </DropdownSection>

      {/* Channels Section */}
      <DropdownSection showDivider={false}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm font-medium">
              {t("channels")}
            </span>
            <button
              onClick={onAddChannelClick}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
            >
              {t("addChannel")} +
            </button>
          </div>
          {channels.map((channel, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-300 text-sm">{channel.name}</span>
            </div>
          ))}
        </div>
      </DropdownSection>
    </div>
  );
});

export default UserMenuDropdown;
