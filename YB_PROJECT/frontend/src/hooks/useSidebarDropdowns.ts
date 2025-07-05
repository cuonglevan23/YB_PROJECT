import { useState, useCallback, useEffect, useRef } from 'react';

type DropdownType = 'coach' | 'create' | 'research' | null;

export function useSidebarDropdowns() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [hoverDropdown, setHoverDropdown] = useState<DropdownType>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const openDropdown = useCallback((type: DropdownType) => {
    // Clear any existing hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(type);
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
    setHoverDropdown(null);
  }, []);

  const handleMouseEnter = useCallback((type: DropdownType) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    setHoverDropdown(type);
    setActiveDropdown(type);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Add a small delay before closing to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverDropdown(null);
      setActiveDropdown(null);
    }, 150);
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    // Clear any pending close timeout when entering dropdown content
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    // Close dropdown when leaving dropdown content, but with a longer delay to allow clicks
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverDropdown(null);
      setActiveDropdown(null);
    }, 300);
  }, []);

  const handleDropdownClick = useCallback(() => {
    // Clear any pending close timeout when clicking inside dropdown
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeDropdown,
    hoverDropdown,
    openDropdown,
    closeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
    handleDropdownClick,
    toggleDropdown,
    isDropdownOpen,
    dropdownRef,
  };
}
