import { memo } from "react";
import { Link } from "react-router-dom";

interface LogoTextProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  to?: string;
}

const LogoText = memo(function LogoText({
  variant = "light",
  size = "md",
  className = "",
  onClick,
  to = "/",
}: LogoTextProps) {
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };

  const logoColor = variant === "light" ? "text-white" : "text-gray-900";

  const content = (
    <div
      className={`font-bold ${textSizeClasses[size]} ${logoColor} transition-all duration-300 hover:scale-105 cursor-pointer ${className}`}
      onClick={onClick}
    >
      YB
      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Project
      </span>
    </div>
  );

  if (to && !onClick) {
    return (
      <Link to={to} className="inline-flex group">
        {content}
      </Link>
    );
  }

  return content;
});

export default LogoText;
