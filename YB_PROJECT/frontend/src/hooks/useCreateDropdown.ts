import { useState, useCallback } from 'react';

export function useCreateDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
}