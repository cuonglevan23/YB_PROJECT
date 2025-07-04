import { memo } from "react";
import {
  AiOutlineVideoCamera,
  AiOutlineBulb,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Card } from "../ui";

const DailyTasksSection = memo(function DailyTasksSection() {
  const tasks = [
    {
      id: 1,
      icon: AiOutlineVideoCamera,
      title: "Publish videos",
      subtitle: "Start publishing videos",
      completed: false,
    },
    {
      id: 2,
      icon: AiOutlineBulb,
      title: "Research",
      subtitle: "View your Daily Ideas",
      completed: false,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Daily Tasks</h2>
        <span className="text-gray-400 text-sm">0/2</span>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          const IconComponent = task.icon;
          return (
            <Card
              key={task.id}
              className="p-4 hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <IconComponent className="text-xl text-gray-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">{task.title}</div>
                    <div className="text-white text-sm font-medium">
                      {task.subtitle}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <AiOutlineArrowRight />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
});

export default DailyTasksSection;
