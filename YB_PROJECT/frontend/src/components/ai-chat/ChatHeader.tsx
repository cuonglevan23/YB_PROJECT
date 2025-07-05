import { memo } from "react";
import {
  AiOutlineRobot,
  AiOutlineHistory,
  AiOutlinePlus,
} from "react-icons/ai";

interface ChatHeaderProps {
  showChatInterface: boolean;
  onNewChat: () => void;
  onToggleHistory: () => void;
}

export const ChatHeader = memo(function ChatHeader({
  showChatInterface,
  onNewChat,
  onToggleHistory,
}: ChatHeaderProps) {
  return (
    <div className="border-b border-gray-800 p-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <AiOutlineRobot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Coach</h1>
            <p className="text-gray-400 text-sm">
              Powered by your YouTube data
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* New Chat Button (show only when in chat interface) */}
          {showChatInterface && (
            <button
              onClick={onNewChat}
              className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title="New Chat"
            >
              <AiOutlinePlus className="w-4 h-4" />
              <span className="text-sm">New Chat</span>
            </button>
          )}

          {/* History Toggle Button */}
          <button
            onClick={onToggleHistory}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Chat History"
          >
            <AiOutlineHistory className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});
