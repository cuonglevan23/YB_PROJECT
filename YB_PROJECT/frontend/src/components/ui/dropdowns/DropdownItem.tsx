import { memo } from 'react';
import type { ReactNode, ComponentType } from 'react';

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
  variant?: 'default' | 'danger' | 'success';
  disabled?: boolean;
}

const DropdownItem = memo(function DropdownItem({
  children,
  onClick,
  icon: Icon,
  className = '',
  variant = 'default',
  disabled = false
}: DropdownItemProps) {
  const variantClasses = {
    default: 'text-gray-300 hover:bg-gray-700 hover:text-white',
    danger: 'text-red-400 hover:bg-gray-700 hover:text-red-300',
    success: 'text-green-400 hover:bg-gray-700 hover:text-green-300'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center px-4 py-3 text-left transition-colors
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4 mr-3 flex-shrink-0" />}
      <span className="flex-grow">{children}</span>
    </button>
  );
});

export default DropdownItem;
