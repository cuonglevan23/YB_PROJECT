import { memo, useState, useEffect, useCallback } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { KeywordSearchDropdown } from "../inputs/KeywordSearchDropdown";

interface Keyword {
  id: string;
  text: string;
  isRemovable?: boolean;
}

interface ManageKeywordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  addedKeywords?: Keyword[];
  suggestedKeywords?: Keyword[];
  onAddKeyword?: (keyword: Keyword) => void;
  onRemoveKeyword?: (keywordId: string) => void;
  onSave?: (keywords: Keyword[]) => void;
  onRefreshSuggestions?: () => void;
}

export const ManageKeywordsModal = memo(function ManageKeywordsModal({
  isOpen,
  onClose,
  title = "Manage my keywords",
  addedKeywords = [],
  suggestedKeywords = [],
  onAddKeyword,
  onRemoveKeyword,
  onSave,
  onRefreshSuggestions,
}: ManageKeywordsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localAddedKeywords, setLocalAddedKeywords] =
    useState<Keyword[]>(addedKeywords);
  const [searchResults, setSearchResults] = useState<Keyword[]>([]);

  // Update local state when props change
  useEffect(() => {
    setLocalAddedKeywords(addedKeywords);
  }, [addedKeywords]);

  // Handle search logic
  useEffect(() => {
    if (searchQuery.trim()) {
      // Mock search results - in real app, this would be an API call
      const mockResults: Keyword[] = [
        { id: "search1", text: `${searchQuery} tips` },
        { id: "search2", text: `${searchQuery} tutorial` },
        { id: "search3", text: `${searchQuery} guide` },
        { id: "search4", text: `${searchQuery} best practices` },
        { id: "search5", text: `${searchQuery} 2025` },
      ];

      // Filter out already added keywords
      const filteredResults = mockResults.filter(
        (result) =>
          !localAddedKeywords.some(
            (added) => added.text.toLowerCase() === result.text.toLowerCase()
          )
      );

      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, localAddedKeywords]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleAddKeyword = useCallback(
    (keyword: Keyword) => {
      const newKeyword = { ...keyword, isRemovable: true };
      setLocalAddedKeywords((prev) => [...prev, newKeyword]);
      onAddKeyword?.(newKeyword);
    },
    [onAddKeyword]
  );

  const handleRemoveKeyword = useCallback(
    (keywordId: string) => {
      setLocalAddedKeywords((prev) => prev.filter((k) => k.id !== keywordId));
      onRemoveKeyword?.(keywordId);
    },
    [onRemoveKeyword]
  );

  const handleSave = useCallback(() => {
    onSave?.(localAddedKeywords);
    onClose();
  }, [localAddedKeywords, onSave, onClose]);

  const handleCancel = useCallback(() => {
    setLocalAddedKeywords(addedKeywords); // Reset to original
    onClose();
  }, [addedKeywords, onClose]);

  const handleRefreshSuggestions = useCallback(() => {
    onRefreshSuggestions?.();
  }, [onRefreshSuggestions]);

  // Filter suggested keywords to exclude already added ones
  const filteredSuggestedKeywords = suggestedKeywords.filter(
    (suggested) =>
      !localAddedKeywords.some(
        (added) => added.text.toLowerCase() === suggested.text.toLowerCase()
      )
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {/* Added Keywords Section */}
          <div className="mb-8">
            <h3 className="text-white font-medium mb-4">
              Keywords you've added
            </h3>
            <div className="flex flex-wrap gap-2">
              {localAddedKeywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm"
                >
                  <span>{keyword.text}</span>
                  {keyword.isRemovable !== false && (
                    <button
                      onClick={() => handleRemoveKeyword(keyword.id)}
                      className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                    >
                      <AiOutlineClose className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
              {localAddedKeywords.length === 0 && (
                <p className="text-gray-400 text-sm">No keywords added yet</p>
              )}
            </div>
          </div>

          {/* Add Keywords Section */}
          <div className="mb-8">
            <h3 className="text-white font-medium mb-4">Add keywords</h3>
            <KeywordSearchDropdown
              placeholder="Search keywords to add..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={(result) => {
                handleAddKeyword(result);
                setSearchQuery("");
              }}
              onClear={() => setSearchQuery("")}
              searchResults={searchResults}
              showAddIcon={true}
              noResultsMessage="No results found for"
            />
          </div>

          {/* Suggested Keywords Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Suggested keywords</h3>
              <button
                onClick={handleRefreshSuggestions}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                <BiRefresh className="w-4 h-4" />
                Refresh suggestions
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filteredSuggestedKeywords.map((keyword) => (
                <button
                  key={keyword.id}
                  onClick={() => handleAddKeyword(keyword)}
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-full text-sm transition-colors group"
                >
                  <span>{keyword.text}</span>
                  <AiOutlinePlus className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </button>
              ))}
              {filteredSuggestedKeywords.length === 0 && (
                <p className="text-gray-400 text-sm">
                  No suggestions available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-700">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
});
