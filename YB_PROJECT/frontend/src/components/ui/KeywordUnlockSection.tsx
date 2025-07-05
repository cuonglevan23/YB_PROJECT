import { memo } from "react";
import { AiOutlineRocket, AiOutlineRise } from "react-icons/ai";

interface KeywordUnlockSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  variant?: "default" | "trending" | "opportunities";
}

export const KeywordUnlockSection = memo(function KeywordUnlockSection({
  title,
  subtitle,
  buttonText = "Unlock With Boost",
  icon: Icon,
  className = "",
  variant = "default",
}: KeywordUnlockSectionProps) {
  // Default props based on variant
  const getVariantProps = () => {
    switch (variant) {
      case "trending":
        return {
          defaultTitle: "Get access to more trending keywords",
          defaultSubtitle:
            "Discover rising keywords and trending topics in your niche",
          defaultIcon: AiOutlineRise,
        };
      case "opportunities":
        return {
          defaultTitle: "Get more top keyword opportunities for your channel",
          defaultSubtitle:
            "Unlock advanced keyword research and competitor analysis",
          defaultIcon: AiOutlineRocket,
        };
      default:
        return {
          defaultTitle: "Get more keyword insights for your channel",
          defaultSubtitle: "Access premium keyword data and analytics",
          defaultIcon: AiOutlineRocket,
        };
    }
  };

  const { defaultTitle, defaultSubtitle, defaultIcon } = getVariantProps();
  const FinalIcon = Icon || defaultIcon;

  return (
    <div
      className={`bg-gray-900/50 rounded-lg p-6 border border-gray-700 text-center ${className}`}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
          <FinalIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      <h4 className="text-white font-medium mb-2">{title || defaultTitle}</h4>

      {(subtitle || defaultSubtitle) && (
        <p className="text-gray-400 text-sm mb-4">
          {subtitle || defaultSubtitle}
        </p>
      )}

      <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        {buttonText}
      </button>
    </div>
  );
});
