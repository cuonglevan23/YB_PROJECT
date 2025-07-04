import { memo, forwardRef } from "react";
import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, error, fullWidth = false, className = "", ...props },
    ref
  ) {
    const inputClasses = clsx(
      // Base classes
      "px-4 py-3 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2",

      // Error/success states
      {
        "border-red-500 focus:ring-red-500": error,
        "border-gray-300 focus:ring-blue-500 focus:border-blue-500": !error,
      },

      // Width
      {
        "w-full": fullWidth,
      },

      // Custom className
      className
    );

    return (
      <div className={clsx({ "w-full": fullWidth })}>
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  })
);

export default Input;
