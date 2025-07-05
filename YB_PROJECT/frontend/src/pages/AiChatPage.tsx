import { memo } from "react";
import { useChatManager } from "../hooks/useChatManager";
import {
  ChatHeader,
  ChatWelcomeScreen,
  ChatMessages,
  ChatInput,
  ChatHistorySidebar,
} from "../components/ai-chat";

const AiChatPage = memo(function AiChatPage() {
  const {
    messages,
    inputValue,
    isLoading,
    isHistoryOpen,
    showChatInterface,
    chatHistory,
    messagesEndRef,
    handleSendMessage,
    handleQuickAction,
    handleKeyPress,
    handleInputFocus,
    handleInputChange,
    handleNewChat,
    toggleHistory,
    closeHistory,
  } = useChatManager();

  return (
    <div className="h-full bg-gray-900 flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader
          showChatInterface={showChatInterface}
          onNewChat={handleNewChat}
          onToggleHistory={toggleHistory}
        />

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {!showChatInterface ? (
            <ChatWelcomeScreen onQuickAction={handleQuickAction} />
          ) : (
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
          )}
        </div>

        {/* Input Area */}
        <ChatInput
          inputValue={inputValue}
          isLoading={isLoading}
          showChatInterface={showChatInterface}
          onInputChange={handleInputChange}
          onInputFocus={handleInputFocus}
          onKeyPress={handleKeyPress}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* History Sidebar */}
      <ChatHistorySidebar
        isOpen={isHistoryOpen}
        chatHistory={chatHistory}
        onClose={closeHistory}
      />
    </div>
  );
});

export default AiChatPage;
