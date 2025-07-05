import { memo } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import type { ChatMessage } from "../../hooks/useChatManager";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatMessages = memo(function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: ChatMessagesProps) {
  return (
    <div className="px-6 py-4 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-[70%] ${
              message.type === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 ${
                message.type === "user" ? "ml-3" : "mr-3"
              }`}
            >
              {message.type === "assistant" ? (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <AiOutlineRobot className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">You</span>
                </div>
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`px-4 py-3 rounded-2xl ${
                message.type === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700"
              }`}
            >
              {message.type === "assistant" && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-blue-400 text-sm">
                    AI Coach
                  </span>
                </div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Loading Message */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex max-w-[70%]">
            <div className="mr-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <AiOutlineRobot className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-800 text-gray-100 rounded-2xl rounded-bl-md border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold text-blue-400 text-sm">
                  AI Coach
                </span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
});
