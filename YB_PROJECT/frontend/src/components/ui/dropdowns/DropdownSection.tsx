import { memo } from 'react';
import type { ReactNode } from 'react';

interface DropdownSectionProps {
  children: ReactNode;
  title?: string;
  showDivider?: boolean;
}

const DropdownSection = memo(function DropdownSection({
  children,
  title,
  showDivider = true
}: DropdownSectionProps) {
  return (
    <>
      {title && (
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </div>
      )}
      <div className="py-1">
        {children}
      </div>
      {showDivider && <hr className="border-gray-700 my-2" />}
    </>
  );
});

export default DropdownSection;
