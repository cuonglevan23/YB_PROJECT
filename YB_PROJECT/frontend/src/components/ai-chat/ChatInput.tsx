import { memo } from "react";
import {
  AiOutlineSend,
  AiOutlinePaperClip,
  AiOutlineRobot,
} from "react-icons/ai";
import { Button } from "../ui/buttons";

interface ChatInputProps {
  inputValue: string;
  isLoading: boolean;
  showChatInterface: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInputFocus: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSendMessage: () => void;
}

export const ChatInput = memo(function ChatInput({
  inputValue,
  isLoading,
  showChatInterface,
  onInputChange,
  onInputFocus,
  onKeyPress,
  onSendMessage,
}: ChatInputProps) {
  return (
    <div className="border-t border-gray-800 p-6 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          {/* Attachment Button - only show in chat interface */}
          {showChatInterface && (
            <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors">
              <AiOutlinePaperClip className="w-5 h-5" />
            </button>
          )}

          {/* Input Field */}
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={onInputChange}
              onFocus={onInputFocus}
              onKeyPress={onKeyPress}
              placeholder={
                showChatInterface
                  ? "Ask anything..."
                  : "Ask your AI Coach anything..."
              }
              className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                !showChatInterface ? "text-center" : ""
              }`}
              rows={1}
              style={{
                minHeight: "48px",
                maxHeight: "120px",
              }}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={onSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          >
            <AiOutlineSend className="w-5 h-5" />
          </Button>
        </div>

        {/* Footer Options - only show in chat interface */}
        {showChatInterface && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-gray-400 text-sm">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                />
                <AiOutlineRobot className="w-4 h-4" />
                <span>Deep thinking</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-400 text-sm">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                />
                <AiOutlinePaperClip className="w-4 h-4" />
                <span>Attach</span>
              </label>
            </div>
            <button className="text-blue-500 hover:text-blue-400 transition-colors">
              <AiOutlineSend className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
