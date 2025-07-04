import { memo } from "react";
import {
  AiOutlineBulb,
  AiOutlineVideoCamera,
  AiOutlinePicture,
  AiOutlineSearch,
} from "react-icons/ai";
import { Card, Button } from "../ui";

const QuickActionsSection = memo(function QuickActionsSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        What would you like to do today?
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Score Card */}
        <Card className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <svg
              className="w-20 h-20 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#374151"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${87 * 2.51} 251`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-400">87</span>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            <AiOutlineSearch className="mr-2" />
            Find Trending Keywords
          </Button>
        </Card>

        {/* Video Ideas Card */}
        <Card className="p-6 text-center bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-600/30 rounded-lg flex items-center justify-center relative">
            <AiOutlineBulb className="w-8 h-8 text-green-400" />
            <span className="absolute text-xs bg-green-500 text-white px-1 rounded ml-6 -mt-6">
              Very High
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            Get Video Ideas
          </Button>
        </Card>

        {/* Trending Videos Card */}
        <Card className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-pink-500/50"></div>
            <div className="relative">
              <AiOutlineVideoCamera className="text-white text-2xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded">
                100x
              </span>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            Find Trending Videos
          </Button>
        </Card>

        {/* Thumbnails Card */}
        <Card className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-cyan-500/50"></div>
            <AiOutlinePicture className="relative text-white text-2xl" />
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            Create Thumbnails
          </Button>
        </Card>
      </div>
    </div>
  );
});

export default QuickActionsSection;
