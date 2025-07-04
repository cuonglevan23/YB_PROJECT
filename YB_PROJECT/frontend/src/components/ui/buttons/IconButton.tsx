import { memo } from 'react';
import type { ButtonHTMLAttributes, ComponentType } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ComponentType<{ className?: string }>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  isActive?: boolean;
  tooltip?: string;
}

const IconButton = memo(function IconButton({
  icon: Icon,
  size = 'md',
  variant = 'default',
  isActive = false,
  tooltip,
  className = '',
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    default: 'text-gray-400 hover:text-white hover:bg-gray-700',
    primary: 'text-white bg-blue-600 hover:bg-blue-700',
    secondary: 'text-gray-300 bg-gray-600 hover:bg-gray-500',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-700/50'
  };

  const activeClasses = isActive 
    ? 'bg-blue-600 text-white' 
    : variantClasses[variant];

  const buttonClasses = `
    group relative flex items-center justify-center rounded-lg transition-all duration-200
    ${sizeClasses[size]} ${activeClasses} ${className}
  `.trim();

  return (
    <button className={buttonClasses} title={tooltip} {...props}>
      <Icon className={iconSizes[size]} />
      
      {/* Tooltip */}
      {tooltip && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </button>
  );
});

export default IconButton;
