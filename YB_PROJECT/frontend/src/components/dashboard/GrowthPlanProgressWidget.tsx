import { memo } from "react";
import { Card } from "../ui";

const GrowthPlanProgressWidget = memo(function GrowthPlanProgressWidget() {
  const levels = [
    { level: 1, title: "Foundations", completed: true },
    { level: 2, title: "Master algorithm", completed: false },
    { level: 3, title: "Attract viewers", completed: false },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Growth Plan Progress
      </h2>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button className="text-blue-400 text-sm">Progress</button>
          <button className="text-gray-400 text-sm">Lessons</button>
        </div>

        <div className="space-y-4">
          {levels.map((level, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  level.completed ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                <span className="text-white text-sm">
                  {level.completed ? "✓" : level.level}
                </span>
              </div>
              <div>
                <div className="text-gray-400 text-xs">Level {level.level}</div>
                <div className="text-white text-sm">{level.title}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
});

export default GrowthPlanProgressWidget;
