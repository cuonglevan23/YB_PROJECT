import { memo } from "react";
import { AiOutlineDownload, AiOutlineRocket } from "react-icons/ai";
import { Button } from "../ui/buttons";

interface KeywordsHeaderProps {
  onGetKeywordIdeas?: () => void;
  onExportKeywords?: () => void;
}

const KeywordsHeader = memo(function KeywordsHeader({
  onGetKeywordIdeas,
  onExportKeywords,
}: KeywordsHeaderProps) {
  return (
    <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-white">Keywords</h1>
          <div className="flex items-center space-x-3">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              onClick={onGetKeywordIdeas}
            >
              <AiOutlineRocket className="h-4 w-4" />
              <span>Get Keyword Ideas</span>
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              onClick={onExportKeywords}
            >
              <AiOutlineDownload className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export { KeywordsHeader };
