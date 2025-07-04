import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}

function Dropdown({
  trigger,
  children,
  align = "right",
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 transform -translate-x-1/2",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`
          absolute top-full mt-2 min-w-64 bg-gray-800 rounded-lg shadow-xl 
          border border-gray-700 py-2 z-50 ${alignmentClasses[align]} ${className}
        `}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
