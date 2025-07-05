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
      
      // Dynamic spacing based on viewport width for better responsive behavior
      const spacing = viewportWidth > 1200 ? 20 : 16;
      
      let x = rect.right + spacing; // Dynamic gap from sidebar edge
      let y = rect.top;
      
      // Adjust if dropdown would go off screen
      if (x + 256 > viewportWidth) { // 256px is dropdown width
        x = rect.left - 256 - spacing; // Show on left side instead with same spacing
      }
      
      // Ensure dropdown doesn't go below viewport
      if (y + 200 > viewportHeight) { // 200px is min dropdown height
        y = Math.max(16, viewportHeight - 200 - 16); // Adjust to fit in viewport with padding
      }
      
      // Ensure dropdown doesn't go above viewport
      if (y < 16) {
        y = 16;
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
