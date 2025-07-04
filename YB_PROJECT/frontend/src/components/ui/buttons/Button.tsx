import { memo } from "react";
import { clsx } from "clsx";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "custom" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = memo(function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const buttonClasses = clsx(
    // Base classes
    "font-semibold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",

    // Variant classes
    {
      "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500":
        variant === "primary",
      "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500":
        variant === "secondary",
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500":
        variant === "outline",
      "": variant === "custom", // Custom variant uses className only
      "text-gray-400 hover:text-white hover:bg-gray-700": variant === "ghost",
    },

    // Size classes
    {
      "px-3 py-1 text-sm": size === "sm",
      "px-4 py-2": size === "md",
      "px-6 py-3 text-lg": size === "lg",
    },

    // Disabled state
    {
      "opacity-50 cursor-not-allowed": disabled,
      "cursor-pointer": !disabled,
    },

    // Custom className
    className
  );

  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
});

export default Button;
