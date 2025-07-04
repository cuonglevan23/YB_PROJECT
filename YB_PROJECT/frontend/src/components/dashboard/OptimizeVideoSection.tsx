import { memo } from "react";
import {
  AiOutlinePlayCircle,
  AiOutlineBarChart,
  AiOutlineTool,
} from "react-icons/ai";
import { Card, Button } from "../ui";

const OptimizeVideoSection = memo(function OptimizeVideoSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Optimize Your Latest Video
        </h2>
        <button className="text-blue-400 hover:text-blue-300 text-sm">
          View All
        </button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-12 bg-gray-700 rounded-md flex items-center justify-center">
            <AiOutlinePlayCircle className="text-gray-400 w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium mb-1">
              Thu Mon Bui Tan Truong
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>0 views • 10 months ago</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            <AiOutlineBarChart className="w-4 h-4 mr-2" />
            Generate scores +
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            <AiOutlineTool className="w-4 h-4 mr-2" />
            Optimize
          </Button>
        </div>
      </Card>
    </div>
  );
});

export default OptimizeVideoSection;
