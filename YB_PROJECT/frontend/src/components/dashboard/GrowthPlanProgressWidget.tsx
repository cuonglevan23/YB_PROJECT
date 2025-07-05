import { memo, useState, useEffect } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { Card } from "../ui";

const GrowthPlanProgressWidget = memo(function GrowthPlanProgressWidget() {
  const [activeTab, setActiveTab] = useState<"progress" | "lessons">(
    "progress"
  );

  useEffect(() => {
    // No-op effect for tab switching
  }, [activeTab]);

  const levels = [
    {
      level: 1,
      title: "Foundations",
      completed: true,
      icon: "🎯",
      lessons: [
        {
          title: "The Key for YouTube Success",
          duration: "3 min",
          locked: false,
        },
        { title: "Winning on YouTube", duration: "3 min", locked: true },
        { title: 'Define Your "Why"', duration: "4 min", locked: true },
      ],
    },
    {
      level: 2,
      title: "Master algorithm",
      completed: false,
      icon: "▶️",
      lessons: [
        {
          title: "How the YouTube Algorithm Works",
          duration: "6 min",
          locked: true,
        },
        { title: "Optimizing for Discovery", duration: "5 min", locked: true },
      ],
    },
    {
      level: 3,
      title: "Attract viewers",
      completed: false,
      icon: "🎭",
      lessons: [],
    },
    {
      level: 4,
      title: "Amass viewers",
      completed: false,
      icon: "📦",
      lessons: [],
    },
    {
      level: 5,
      title: "Captivate viewers",
      completed: false,
      icon: "🎪",
      lessons: [],
    },
  ];

  if (activeTab === "lessons") {
    return (
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          Growth Plan Progress
        </h2>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6 bg-gray-700 rounded-full p-1">
            <button
              onClick={() => setActiveTab("progress")}
              className="flex-1 text-center py-3 text-gray-400 text-sm rounded-full transition-colors"
            >
              Progress
            </button>
            <button
              onClick={() => setActiveTab("lessons")}
              className="flex-1 text-center py-3 bg-gray-600 text-white text-sm rounded-full"
            >
              Lessons
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Level 1: Foundations
              </h3>
              <div className="space-y-3">
                {levels[0].lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <div className="text-gray-400 text-xs">
                        {levels[0].title}
                      </div>
                      <div className="text-white text-sm font-medium">
                        {lesson.title}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400 text-xs">
                        {lesson.duration}
                      </span>
                      {lesson.locked && (
                        <AiOutlineLock className="w-4 h-4 text-gray-400" />
                      )}
                      <button className="text-blue-400 hover:text-blue-300">
                        →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Level 2: Master algorithm
              </h3>
              <div className="space-y-3">
                {levels[1].lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg opacity-60"
                  >
                    <div>
                      <div className="text-gray-400 text-xs">
                        {levels[1].title}
                      </div>
                      <div className="text-white text-sm font-medium">
                        {lesson.title}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400 text-xs">
                        {lesson.duration}
                      </span>
                      <AiOutlineLock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Growth Plan Progress
      </h2>
      <Card className="p-6 relative animate-breath">
        <div className="flex items-center justify-between mb-8 bg-gray-700 rounded-full p-1">
          <button
            onClick={() => setActiveTab("progress")}
            className="flex-1 text-center py-3 bg-gray-600 text-white text-sm rounded-full font-medium transition-all duration-300 hover:bg-gray-500"
          >
            Progress
          </button>
          <button
            onClick={() => setActiveTab("lessons")}
            className="flex-1 text-center py-3 text-gray-400 text-sm rounded-full transition-all duration-300 font-medium hover:text-gray-300 hover:bg-gray-600/50"
          >
            Lessons
          </button>
        </div>

        <div className="relative">
          {/* SVG Path Line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            {/* Main path connecting all levels through exact center points */}
            {/* Grid layout: Level 1 (25,25) -> Level 2 (75,25) -> Level 3 (25,60) -> Level 4 (75,60) -> Level 5 (50,85) */}
            <path
              d="M25,25 L75,25 Q85,35 75,60 Q60,65 25,60 Q10,72 50,85"
              stroke="#374151"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="3,3"
              className="opacity-40 animate-line-flow"
            />
            {/* Completed path (Level 1 to Level 2) - horizontal line through centers */}
            <path
              d="M25,25 L75,25"
              stroke="#10b981"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray="30"
              className="opacity-90 animate-path-draw animate-line-glow"
              style={{
                animationDelay: "0.5s",
              }}
            />
            {/* Additional flowing particles effect on completed path */}
            <path
              d="M25,25 L75,25"
              stroke="#34d399"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="2,8"
              className="opacity-60 animate-line-flow"
              style={{
                animationDelay: "1s",
                animationDuration: "4s",
              }}
            />
          </svg>

          <div
            className="grid grid-cols-2 gap-6 sm:gap-8 relative"
            style={{ zIndex: 10 }}
          >
            {/* Level 1 - Top Left */}
            <div className="flex flex-col items-center text-center group animate-float">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-600 rounded-full flex items-center justify-center mb-3 shadow-lg relative transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl cursor-pointer level-glow-completed">
                <span className="text-2xl sm:text-3xl">🎯</span>
                {/* Green dot indicator with enhanced pulse */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-green-600 animate-pulse"></div>
                {/* Success glow effect */}
                <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md animate-pulse"></div>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors">
                Level 1
              </div>
              <div className="text-white text-sm sm:text-base font-medium group-hover:text-green-400 transition-colors">
                Foundations
              </div>
            </div>

            {/* Level 2 - Top Right */}
            <div
              className="flex flex-col items-center text-center group animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-600 rounded-full flex items-center justify-center mb-3 border-2 border-gray-500 relative transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl cursor-pointer level-glow-current">
                <span className="text-2xl sm:text-3xl">▶️</span>

                {/* Animated progress ring */}
                <svg
                  className="absolute inset-0 w-full h-full progress-ring"
                  viewBox="0 0 44 44"
                >
                  <circle
                    className="progress-ring-circle active"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="transparent"
                    r="20"
                    cx="22"
                    cy="22"
                  />
                </svg>

                {/* Current level indicator with enhanced animation */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                </div>

                {/* Sparkle effects */}
                <div
                  className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full sparkle"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full sparkle"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 -left-2 w-1 h-1 bg-blue-300 rounded-full sparkle"
                  style={{ animationDelay: "2s" }}
                ></div>

                {/* Active glow effect */}
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
              </div>
              <div className="text-gray-500 text-xs sm:text-sm group-hover:text-gray-400 transition-colors">
                Level 2
              </div>
              <div className="text-gray-400 text-sm sm:text-base font-medium group-hover:text-blue-400 transition-colors">
                Master algorithm
              </div>
            </div>

            {/* Level 3 - Middle Left */}
            <div
              className="flex flex-col items-center text-center group animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-full flex items-center justify-center mb-3 border-2 border-gray-600 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer relative level-glow-locked">
                <span className="text-2xl sm:text-3xl opacity-50 group-hover:opacity-70 transition-opacity">
                  🎭
                </span>
                {/* Lock indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <AiOutlineLock className="w-2 h-2 text-gray-400" />
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gray-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="text-gray-500 text-xs sm:text-sm group-hover:text-gray-400 transition-colors">
                Level 3
              </div>
              <div className="text-gray-400 text-sm sm:text-base font-medium group-hover:text-gray-300 transition-colors">
                Attract viewers
              </div>
            </div>

            {/* Level 4 - Middle Right */}
            <div
              className="flex flex-col items-center text-center group animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-full flex items-center justify-center mb-3 border-2 border-gray-600 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer relative level-glow-locked">
                <span className="text-2xl sm:text-3xl opacity-50 group-hover:opacity-70 transition-opacity">
                  📦
                </span>
                {/* Lock indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <AiOutlineLock className="w-2 h-2 text-gray-400" />
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gray-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="text-gray-500 text-xs sm:text-sm group-hover:text-gray-400 transition-colors">
                Level 4
              </div>
              <div className="text-gray-400 text-sm sm:text-base font-medium group-hover:text-gray-300 transition-colors">
                Amass viewers
              </div>
            </div>

            {/* Level 5 - Bottom Center (spans both columns) */}
            <div
              className="col-span-2 flex flex-col items-center text-center group animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-full flex items-center justify-center mb-3 border-2 border-gray-600 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer relative level-glow-locked">
                <span className="text-2xl sm:text-3xl opacity-50 group-hover:opacity-70 transition-opacity">
                  🎪
                </span>
                {/* Lock indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <AiOutlineLock className="w-2 h-2 text-gray-400" />
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gray-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="text-gray-500 text-xs sm:text-sm group-hover:text-gray-400 transition-colors">
                Level 5
              </div>
              <div className="text-gray-400 text-sm sm:text-base font-medium group-hover:text-gray-300 transition-colors">
                Captivate viewers
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default GrowthPlanProgressWidget;
