import { memo, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineClose,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";

interface FloatingSupportButtonProps {
  onContactSupport?: () => void;
  onEmailSupport?: () => void;
  onPhoneSupport?: () => void;
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingSupportButton = memo(function FloatingSupportButton({
  onContactSupport,
  onEmailSupport,
  onPhoneSupport,
  className = "",
  position = "bottom-right",
}: FloatingSupportButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContactSupport = () => {
    onContactSupport?.();
    setIsExpanded(false);
  };

  const handleEmailSupport = () => {
    onEmailSupport?.();
    setIsExpanded(false);
  };

  const handlePhoneSupport = () => {
    onPhoneSupport?.();
    setIsExpanded(false);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Expanded Options */}
      {isExpanded && (
        <div className="mb-4 space-y-3 animate-fade-in">
          {/* Gửi tin nhắn cho chúng tôi */}
          <button
            onClick={handleContactSupport}
            className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 min-w-[250px]"
          >
            <AiOutlineMessage className="w-5 h-5" />
            <span className="font-medium">Gửi tin nhắn cho chúng tôi</span>
          </button>

          {/* Email Support */}
          <button
            onClick={handleEmailSupport}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 min-w-[250px]"
          >
            <AiOutlineMail className="w-5 h-5" />
            <span className="font-medium">Gửi email hỗ trợ</span>
          </button>

          {/* Phone Support */}
          <button
            onClick={handlePhoneSupport}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 min-w-[250px]"
          >
            <AiOutlinePhone className="w-5 h-5" />
            <span className="font-medium">Gọi điện hỗ trợ</span>
          </button>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={handleToggle}
        className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center"
      >
        {isExpanded ? (
          <AiOutlineClose className="w-6 h-6" />
        ) : (
          <AiOutlineMessage className="w-6 h-6" />
        )}
      </button>
    </div>
  );
});

export default FloatingSupportButton;
