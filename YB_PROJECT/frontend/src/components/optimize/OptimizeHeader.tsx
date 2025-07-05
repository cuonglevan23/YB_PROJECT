import { memo } from "react";
import { Button } from "../ui/buttons";

interface OptimizeHeaderProps {
  onChannelWideTagsClick?: () => void;
}

const OptimizeHeader = memo(function OptimizeHeader({
  onChannelWideTagsClick,
}: OptimizeHeaderProps) {
  return (
    <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-white">Optimize</h1>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={onChannelWideTagsClick}
          >
            Channel-wide Tags
          </Button>
        </div>
      </div>
    </div>
  );
});

export default OptimizeHeader;
