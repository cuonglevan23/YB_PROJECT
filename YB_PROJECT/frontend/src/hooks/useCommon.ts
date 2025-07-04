import { useState, useCallback } from 'react';

// Types for selection state
interface SelectionState<T> {
  selectedItem: T | null;
  setSelectedItem: (item: T | null) => void;
  isSelected: (item: T) => boolean;
  clearSelection: () => void;
}

// Generic hook for managing selections
export function useSelection<T>(initialValue: T | null = null): SelectionState<T> {
  const [selectedItem, setSelectedItem] = useState<T | null>(initialValue);

  const isSelected = useCallback((item: T) => {
    return selectedItem === item;
  }, [selectedItem]);

  const clearSelection = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return {
    selectedItem,
    setSelectedItem,
    isSelected,
    clearSelection,
  };
}

// Hook for managing multiple selections
export function useMultiSelection<T>(
  initialValues: T[] = [],
  getId?: (item: T) => string | number
): {
  selectedItems: T[];
  toggleItem: (item: T) => void;
  selectItem: (item: T) => void;
  deselectItem: (item: T) => void;
  clearSelection: () => void;
  isSelected: (item: T) => boolean;
  selectedCount: number;
} {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialValues);

  const isSelected = useCallback((item: T) => {
    if (getId) {
      const itemId = getId(item);
      return selectedItems.some(selected => getId(selected) === itemId);
    }
    return selectedItems.includes(item);
  }, [selectedItems, getId]);

  const toggleItem = useCallback((item: T) => {
    setSelectedItems(prev => {
      if (isSelected(item)) {
        if (getId) {
          const itemId = getId(item);
          return prev.filter(selected => getId(selected) !== itemId);
        }
        return prev.filter(selected => selected !== item);
      } else {
        return [...prev, item];
      }
    });
  }, [isSelected, getId]);

  const selectItem = useCallback((item: T) => {
    if (!isSelected(item)) {
      setSelectedItems(prev => [...prev, item]);
    }
  }, [isSelected]);

  const deselectItem = useCallback((item: T) => {
    setSelectedItems(prev => {
      if (getId) {
        const itemId = getId(item);
        return prev.filter(selected => getId(selected) !== itemId);
      }
      return prev.filter(selected => selected !== item);
    });
  }, [getId]);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  return {
    selectedItems,
    toggleItem,
    selectItem,
    deselectItem,
    clearSelection,
    isSelected,
    selectedCount: selectedItems.length,
  };
}

// Hook for managing loading states
export function useLoadingState(initialState = false) {
  const [loading, setLoading] = useState(initialState);

  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T> => {
    setLoading(true);
    try {
      const result = await fn();
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    setLoading,
    withLoading,
  };
}
