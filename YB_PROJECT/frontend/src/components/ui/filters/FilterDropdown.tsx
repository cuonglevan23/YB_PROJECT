import { memo, useState, useRef, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface FilterDropdownProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const FilterDropdown = memo(function FilterDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  className = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`space-y-2 ${className}`} ref={dropdownRef}>
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:bg-gray-700"
        >
          <div className="flex items-center justify-between">
            <span className={selectedOption ? "text-white" : "text-gray-400"}>
              {selectedOption?.label || placeholder}
            </span>
            <AiOutlineDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-700 ${
                  option.value === value
                    ? "bg-gray-700 text-white"
                    : "text-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
