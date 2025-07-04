import { memo } from "react";
import {
  AiOutlineBarChart,
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineLineChart,
  AiOutlineLock,
} from "react-icons/ai";
import { Card, Button } from "../ui";

const DailyVideoIdeasSection = memo(function DailyVideoIdeasSection() {
  const dailyIdeas = [
    {
      text: "U22 Trung Quốc Đài Áp Lực Lên U22 Việt Nam Trước Thềm Chung Kết #bongda #football",
      prediction: "Very high",
    },
    {
      text: "Các cầu thủ trẻ Việt Nam làm nên điều kỳ diệu.",
      prediction: "High",
    },
    {
      text: "Hai Cầu Thủ Này Cũng Chơi Cho Đội Nào? Thử Thách Cho Fan Cứng! 😂😂 #footballcr7gold #giaifribongda",
      prediction: "Medium",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Daily Video Ideas</h2>
        <button className="text-blue-400 hover:text-blue-300 text-sm">
          View All
        </button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">Idea</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">View prediction</span>
              <AiOutlineBarChart className="text-green-400 text-sm" />
            </div>
          </div>

          {dailyIdeas.map((idea, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <span className="text-white flex-1 text-sm">{idea.text}</span>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm px-2 py-1 rounded flex items-center space-x-1 ${
                    idea.prediction === "Very high"
                      ? "text-green-400"
                      : idea.prediction === "High"
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  <AiOutlineBarChart />
                  <span>{idea.prediction}</span>
                </span>
                <button className="text-gray-400 hover:text-white">
                  <AiOutlineHeart />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <AiOutlineLineChart className="text-white" />
              </div>
              <span className="text-white">
                Come back tomorrow for more ideas or upgrade to get more
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
            >
              <AiOutlineLock className="mr-1" /> Unlock With Boost
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default DailyVideoIdeasSection;
