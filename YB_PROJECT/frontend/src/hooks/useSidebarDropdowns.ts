import { useState, useCallback, useEffect, useRef } from 'react';

type DropdownType = 'coach' | 'create' | 'research' | null;

export function useSidebarDropdowns() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = useCallback((type: DropdownType) => {
    setActiveDropdown(type);
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((type: DropdownType) => {
    setActiveDropdown(prev => prev === type ? null : type);
  }, []);

  const isDropdownOpen = useCallback((type: DropdownType) => {
    return activeDropdown === type;
  }, [activeDropdown]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [activeDropdown, closeDropdown]);

  return {
    activeDropdown,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    isDropdownOpen,
    dropdownRef,
  };
}
