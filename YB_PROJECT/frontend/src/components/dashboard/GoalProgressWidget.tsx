import { memo } from "react";
import { Card } from "../ui";

const GoalProgressWidget = memo(function GoalProgressWidget() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Goal Progress</h2>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <div className="text-white font-medium mb-2">
              3,400 views by Nov 26, 2025
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                3,149 • 145 Days Left
              </span>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">93%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-white font-medium mb-4">
              2 Videos Per Month
            </div>
            <div className="text-gray-400 text-sm mb-4">
              Start your next video with{" "}
              <span className="text-blue-400">Create</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default GoalProgressWidget;
