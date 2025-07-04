import { memo } from "react";
import { AiOutlineMessage } from "react-icons/ai";

interface SupportButtonProps {
  onClick?: () => void;
  className?: string;
  text?: string;
  variant?: "primary" | "secondary" | "blue";
  size?: "sm" | "md" | "lg";
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

const SupportButton = memo(function SupportButton({
  onClick,
  className = "",
  text = "Gửi tin nhắn cho chúng tôi",
  variant = "blue",
  size = "md",
  icon: Icon = AiOutlineMessage,
  disabled = false,
}: SupportButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    blue: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400 shadow-lg hover:shadow-xl transform hover:scale-105",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm gap-2",
    md: "px-4 py-3 text-base gap-2",
    lg: "px-6 py-4 text-lg gap-3",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={iconSizeClasses[size]} />
      {text}
    </button>
  );
});

export default SupportButton;
