import { memo } from "react";
import {
  AiOutlineRobot,
  AiOutlineBulb,
  AiOutlineEye,
  AiOutlineBarChart,
  AiOutlineFileText,
  AiOutlineLineChart,
  AiOutlineFire,
} from "react-icons/ai";

interface ChatWelcomeScreenProps {
  onQuickAction: (actionId: string, label: string) => void;
}

export const ChatWelcomeScreen = memo(function ChatWelcomeScreen({
  onQuickAction,
}: ChatWelcomeScreenProps) {
  const quickActions = [
    { id: "video-ideas", label: "Give me video ideas", icon: AiOutlineBulb },
    { id: "more-views", label: "Get more views", icon: AiOutlineEye },
    { id: "channel-audit", label: "Channel audit", icon: AiOutlineBarChart },
    {
      id: "review-video",
      label: "Review my latest video",
      icon: AiOutlineFileText,
    },
  ];

  const aiFeatures = [
    { id: "ai-abilities", label: "AI Coach abilities", icon: AiOutlineRobot },
    { id: "current-trends", label: "Current trends", icon: AiOutlineFire },
    {
      id: "competitor-analysis",
      label: "Competitor analysis",
      icon: AiOutlineBarChart,
    },
    {
      id: "vidiq-tools",
      label: "vidIQ tools",
      icon: AiOutlineLineChart,
      active: true,
    },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 py-8">
      {/* Welcome Message */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          How can I help you today?
        </h2>
      </div>

      {/* Quick Action Cards */}
      <div className="w-full max-w-4xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onQuickAction(action.id, action.label)}
                className="flex items-center justify-start p-4 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600/50 rounded-lg transition-all duration-200 text-left group"
              >
                <Icon className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-white font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Features Pills */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {aiFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                  feature.active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Response Counter */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <div className="w-3 h-3 border border-gray-600 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
          <span>18 responses left this month</span>
        </div>
      </div>
    </div>
  );
});
