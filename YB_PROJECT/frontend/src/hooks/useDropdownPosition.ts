import { useState, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useDropdownPosition() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      let x = rect.right + 8; // 8px gap from sidebar edge
      let y = rect.top;
      
      // Adjust if dropdown would go off screen
      if (x + 256 > viewportWidth) { // 256px is dropdown width
        x = rect.left - 256 - 8; // Show on left side instead
      }
      
      if (y + 200 > viewportHeight) { // 200px is min dropdown height
        y = viewportHeight - 200 - 8; // Adjust to fit in viewport
      }
      
      setPosition({ x, y });
    }
  }, []);

  return {
    position,
    buttonRef,
    updatePosition
  };
}
