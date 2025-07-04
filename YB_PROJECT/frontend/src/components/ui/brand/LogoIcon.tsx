import { memo } from "react";
import { Link } from "react-router-dom";

interface LogoIconProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  to?: string;
  animated?: boolean;
}

const LogoIcon = memo(function LogoIcon({
  size = "md",
  className = "",
  onClick,
  to = "/",
  animated = true,
}: LogoIconProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const content = (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${className}`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="w-3/4 h-3/4"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Y Letter */}
        <path
          d="M6 4L10 16L14 4H17L11 18V28H9V18L3 4H6Z"
          fill="white"
          fillOpacity="0.95"
          className="drop-shadow-sm"
        />

        {/* B Letter - Redesigned */}
        <path
          d="M18 4H24C25.1 4 26 4.9 26 6C26 6.6 25.7 7.1 25.3 7.5C25.7 7.9 26 8.4 26 9C26 10.1 25.1 11 24 11H22V14H24C25.1 14 26 14.9 26 16C26 17.1 25.1 18 24 18H18V4ZM20 6V9H23V6H20ZM20 11V16H23V11H20Z"
          fill="white"
          fillOpacity="0.95"
          className="drop-shadow-sm"
        />

        {/* Enhanced decorative elements */}
        <circle cx="14" cy="2" r="1" fill="white" fillOpacity="0.8">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.8;0.4;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="18" cy="30" r="1" fill="white" fillOpacity="0.8">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        {/* Modern accent elements */}
        <path
          d="M2 16L30 16"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.4"
          strokeDasharray="3 2"
        />

        {/* Corner accents */}
        <path d="M1 1L4 1L1 4Z" fill="white" fillOpacity="0.3" />
        <path d="M31 31L28 31L31 28Z" fill="white" fillOpacity="0.3" />
      </svg>
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

export default LogoIcon;
