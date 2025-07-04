import { memo } from "react";
import { AiOutlineLock, AiOutlineArrowRight } from "react-icons/ai";
import { Card } from "../ui";

const GrowthPlanSection = memo(function GrowthPlanSection() {
  const lessons = [
    {
      title: "The Key for YouTube Success",
      duration: "3 min",
      category: "Foundations",
      locked: false,
    },
    {
      title: "Winning on YouTube",
      duration: "3 min",
      category: "Foundations",
      locked: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Today's Growth Plan
        </h2>
        <span className="text-gray-400 text-sm">0/2</span>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <Card
            key={index}
            className="p-4 hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="text-gray-400 text-xs">{lesson.category}</div>
                  <div className="text-white text-sm font-medium">
                    {lesson.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-xs">{lesson.duration}</span>
                {lesson.locked && (
                  <AiOutlineLock className="w-4 h-4 text-gray-400" />
                )}
                <button className="text-gray-400 hover:text-white">
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
});

export default GrowthPlanSection;
