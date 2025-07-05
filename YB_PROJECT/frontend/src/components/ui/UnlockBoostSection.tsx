import { memo } from "react";
import { AiOutlineRocket } from "react-icons/ai";

interface UnlockBoostSectionProps {
  title?: string;
  buttonText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const UnlockBoostSection = memo(function UnlockBoostSection({
  title = "Get more top keyword opportunities for your channel",
  buttonText = "Unlock With Boost",
  icon: Icon = AiOutlineRocket,
  className = "",
}: UnlockBoostSectionProps) {
  return (
    <div className={`mt-6 text-center ${className}`}>
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <h4 className="text-white font-medium mb-4">{title}</h4>
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
    </div>
  );
});
