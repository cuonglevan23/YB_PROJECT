import { memo } from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg';
}

const Card = memo(function Card({ 
  children, 
  className = '', 
  padding = 'md',
  rounded = 'md'
}: CardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl'
  };

  return (
    <div className={`
      bg-gray-800 border border-gray-700 
      ${paddingClasses[padding]} 
      ${roundedClasses[rounded]} 
      ${className}
    `}>
      {children}
    </div>
  );
});

export default Card;
