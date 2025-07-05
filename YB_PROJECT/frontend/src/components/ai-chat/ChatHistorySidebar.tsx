import { memo } from "react";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import type { ChatHistory } from "../../hooks/useChatManager";

interface ChatHistorySidebarProps {
  isOpen: boolean;
  chatHistory: ChatHistory[];
  onClose: () => void;
}

export const ChatHistorySidebar = memo(function ChatHistorySidebar({
  isOpen,
  chatHistory,
  onClose,
}: ChatHistorySidebarProps) {
  if (!isOpen) return null;

  const todayChats = chatHistory.filter((chat) => {
    const today = new Date();
    const chatDate = new Date(chat.timestamp);
    return chatDate.toDateString() === today.toDateString();
  });

  const olderChats = chatHistory.filter((chat) => {
    const today = new Date();
    const chatDate = new Date(chat.timestamp);
    return chatDate.toDateString() !== today.toDateString();
  });

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* History Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold">AI Chat History</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white rounded"
        >
          <AiOutlineClose className="w-4 h-4" />
        </button>
      </div>

      {/* History Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Today Section */}
        {todayChats.length > 0 && (
          <div className="mb-6">
            <h4 className="text-gray-400 text-sm font-medium mb-3">Today</h4>
            <div className="space-y-2">
              {todayChats.map((chat) => (
                <div
                  key={chat.id}
                  className="group p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {chat.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        {chat.timestamp.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 hover:text-white rounded">
                        <AiOutlineEdit className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400 rounded">
                        <AiOutlineDelete className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Older Section */}
        {olderChats.length > 0 && (
          <div>
            <h4 className="text-gray-400 text-sm font-medium mb-3">Older</h4>
            <div className="space-y-2">
              {olderChats.map((chat) => (
                <div
                  key={chat.id}
                  className="group p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {chat.title}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">6 months ago</p>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-gray-400 hover:text-white rounded">
                        <AiOutlineEdit className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400 rounded">
                        <AiOutlineDelete className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
