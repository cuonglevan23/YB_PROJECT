import { useState, useCallback } from "react";

interface Keyword {
  id: string;
  text: string;
  isRemovable?: boolean;
}

interface UseManageKeywordsModalReturn {
  isOpen: boolean;
  addedKeywords: Keyword[];
  suggestedKeywords: Keyword[];
  openModal: () => void;
  closeModal: () => void;
  addKeyword: (keyword: Keyword) => void;
  removeKeyword: (keywordId: string) => void;
  saveKeywords: (keywords: Keyword[]) => void;
  refreshSuggestions: () => void;
}

export const useManageKeywordsModal = (
  initialKeywords: Keyword[] = [],
  initialSuggestions: Keyword[] = []
): UseManageKeywordsModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [addedKeywords, setAddedKeywords] = useState<Keyword[]>(initialKeywords);
  const [suggestedKeywords, setSuggestedKeywords] = useState<Keyword[]>(initialSuggestions);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addKeyword = useCallback((keyword: Keyword) => {
    setAddedKeywords(prev => {
      const exists = prev.some(k => k.text.toLowerCase() === keyword.text.toLowerCase());
      if (exists) return prev;
      return [...prev, { ...keyword, isRemovable: true }];
    });
  }, []);

  const removeKeyword = useCallback((keywordId: string) => {
    setAddedKeywords(prev => prev.filter(k => k.id !== keywordId));
  }, []);

  const saveKeywords = useCallback((keywords: Keyword[]) => {
    setAddedKeywords(keywords);
    // Here you can add API call to save keywords
    console.log("Saving keywords:", keywords);
  }, []);

  const refreshSuggestions = useCallback(() => {
    // Mock refresh - in real app, this would call an API
    const mockSuggestions: Keyword[] = [
      { id: "s1", text: "2025" },
      { id: "s2", text: "football" },
      { id: "s3", text: "soccer" },
      { id: "s4", text: "fifa club world cup" },
      { id: "s5", text: "club world cup" },
      { id: "s6", text: "fifa" },
      { id: "s7", text: "goal" },
      { id: "s8", text: "futbol" },
      { id: "s9", text: "premier league" },
      { id: "s10", text: "club world cup goals" },
      { id: "s11", text: "uefa" },
      { id: "s12", text: "serie a" },
      { id: "s13", text: "usa" },
      { id: "s14", text: "spain" },
      { id: "s15", text: "la liga" },
    ];
    
    setSuggestedKeywords(mockSuggestions);
  }, []);

  return {
    isOpen,
    addedKeywords,
    suggestedKeywords,
    openModal,
    closeModal,
    addKeyword,
    removeKeyword,
    saveKeywords,
    refreshSuggestions,
  };
};
