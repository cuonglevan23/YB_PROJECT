import { memo, useState } from "react";
import { FloatingSupportButton } from "../ui/buttons";
import { HelpCenterModal } from "../ui/modals";

interface SupportSystemProps {
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const SupportSystem = memo(function SupportSystem({
  className = "",
  position = "bottom-right",
}: SupportSystemProps) {
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);

  const handleContactSupport = () => {
    setIsHelpCenterOpen(true);
  };

  const handleEmailSupport = () => {
    // Mở email client hoặc form liên hệ
    window.location.href =
      "mailto:support@ybproject.com?subject=Yêu cầu hỗ trợ&body=Xin chào, tôi cần hỗ trợ về...";
  };

  const handlePhoneSupport = () => {
    // Hiển thị số điện thoại hoặc gọi
    alert("Số điện thoại hỗ trợ: +84 123 456 789");
  };

  const handleSendMessage = () => {
    // Logic gửi tin nhắn - có thể mở form liên hệ hoặc chat
    console.log("Opening message form...");
    // Có thể tích hợp với chat widget như Intercom, Zendesk, etc.
  };

  const handleCloseHelpCenter = () => {
    setIsHelpCenterOpen(false);
  };

  return (
    <>
      <FloatingSupportButton
        onContactSupport={handleContactSupport}
        onEmailSupport={handleEmailSupport}
        onPhoneSupport={handlePhoneSupport}
        className={className}
        position={position}
      />

      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={handleCloseHelpCenter}
        onSendMessage={handleSendMessage}
      />
    </>
  );
});

export default SupportSystem;
