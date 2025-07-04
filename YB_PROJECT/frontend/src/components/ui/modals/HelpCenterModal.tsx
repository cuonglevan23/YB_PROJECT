import { memo, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineMail,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: () => void;
}

const HelpCenterModal = memo(function HelpCenterModal({
  isOpen,
  onClose,
  onSendMessage,
}: HelpCenterModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "help">(
    "home"
  );

  if (!isOpen) return null;

  const helpSections = [
    {
      title: "Getting Started With YB Project",
      description:
        "A roadmap for account setup and understanding YB Project's functionalities.",
      articles: "14 Bài viết",
    },
    {
      title: "Mastering YB Project Tools",
      description:
        "Comprehensive guides that explore all the features and tools of YB Project, from basic analytics to advanced AI-powered tools",
      articles: "31 Bài viết",
    },
    {
      title: "Account and Billing",
      description:
        "Manage your YB Project account, upgrade or downgrade your plan",
      articles: "38 Bài viết",
    },
    {
      title: "Coaching",
      description: "Explore everything YB Project Coaching has to offer",
      articles: "12 Bài viết",
    },
  ];

  const renderHomeContent = () => (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">YB</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Chào bạn 👋</h2>
        <p className="text-xl text-gray-600 mb-6">
          Chúng tôi có thể giúp được gì cho bạn?
        </p>

        {/* Send Message Button */}
        <button
          onClick={onSendMessage}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 mb-4 transition-colors"
        >
          <AiOutlineMessage className="w-5 h-5" />
          Gửi tin nhắn cho chúng tôi
        </button>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sự trợ giúp"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
          <span className="text-gray-600">How to change my channel?</span>
          <span className="text-blue-500">›</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
          <span className="text-gray-600">What is my current plan?</span>
          <span className="text-blue-500">›</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
          <span className="text-gray-600">
            How to Add Your Managed YouTube Channel to YB Project: A Guide for
            Account Managers
          </span>
          <span className="text-blue-500">›</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
          <span className="text-gray-600">How To Clear Browser Cookies?</span>
          <span className="text-blue-500">›</span>
        </div>
      </div>

      {/* Help Sections */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          6 bộ sưu tập
        </h3>
        {helpSections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {section.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  {section.description}
                </p>
                <span className="text-gray-500 text-sm">
                  {section.articles}
                </span>
              </div>
              <span className="text-blue-500 ml-4">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessagesContent = () => (
    <div className="p-6 text-center">
      <div className="mb-8">
        <AiOutlineMessage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Không có tin nhắn
        </h3>
        <p className="text-gray-600 mb-6">
          Thông báo từ nhóm sẽ được hiển thị ở đây
        </p>
        <button
          onClick={onSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          <AiOutlineMessage className="w-5 h-5" />
          Gửi tin nhắn cho chúng tôi
        </button>
      </div>
    </div>
  );

  const renderHelpContent = () => (
    <div className="p-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sự trợ giúp"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          6 bộ sưu tập
        </h3>
        {helpSections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {section.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  {section.description}
                </p>
                <span className="text-gray-500 text-sm">
                  {section.articles}
                </span>
              </div>
              <span className="text-blue-500 ml-4">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {activeTab === "home" && "Trợ giúp"}
            {activeTab === "messages" && "Tin nhắn"}
            {activeTab === "help" && "Trợ giúp"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[70vh]">
          {activeTab === "home" && renderHomeContent()}
          {activeTab === "messages" && renderMessagesContent()}
          {activeTab === "help" && renderHelpContent()}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t bg-gray-50 p-4">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 ${
                activeTab === "home" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-lg">🏠</span>
              </div>
              <span className="text-xs">Nhà</span>
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex flex-col items-center gap-1 ${
                activeTab === "messages" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <AiOutlineMail className="w-6 h-6" />
              <span className="text-xs">Tin nhắn</span>
            </button>
            <button
              onClick={() => setActiveTab("help")}
              className={`flex flex-col items-center gap-1 ${
                activeTab === "help" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <AiOutlineQuestionCircle className="w-6 h-6" />
              <span className="text-xs">Trợ giúp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HelpCenterModal;
