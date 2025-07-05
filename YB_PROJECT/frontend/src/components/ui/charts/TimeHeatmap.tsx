import { memo } from "react";

interface TimeHeatmapProps {
  selectedDay: string;
  className?: string;
}

export const TimeHeatmap = memo(function TimeHeatmap({
  selectedDay,
  className = "",
}: TimeHeatmapProps) {
  // Generate mock data for bar chart
  const barData = [
    { hour: 0, label: "12am", value: 40 },
    { hour: 3, label: "3am", value: 65 },
    { hour: 6, label: "6am", value: 85 }, // Peak
    { hour: 9, label: "9am", value: 60 },
    { hour: 12, label: "12pm", value: 45 },
    { hour: 15, label: "3pm", value: 70 },
    { hour: 18, label: "6pm", value: 55 },
    { hour: 21, label: "9pm", value: 50 },
  ];

  // Generate heatmap data with varying sizes
  const heatmapData = ["M", "T", "W", "T", "F", "S", "S"].map((day) => ({
    day,
    hours: Array.from({ length: 24 }, (_, hour) => {
      let intensity = 0.2;
      if (hour >= 6 && hour <= 10) intensity = 0.7 + Math.random() * 0.3;
      else if (hour >= 11 && hour <= 15) intensity = 0.5 + Math.random() * 0.3;
      else if (hour >= 16 && hour <= 20) intensity = 0.6 + Math.random() * 0.3;
      else if (hour >= 21 || hour <= 2) intensity = 0.2 + Math.random() * 0.3;
      else intensity = 0.3 + Math.random() * 0.2;

      intensity = Math.max(0, Math.min(1, intensity));

      // Calculate size based on intensity
      let size = "small";
      if (intensity > 0.8) size = "xlarge";
      else if (intensity > 0.6) size = "large";
      else if (intensity > 0.4) size = "medium";
      else if (intensity > 0.25) size = "small";
      else size = "tiny";

      return { hour, intensity, isActive: intensity > 0.2, size };
    }),
  }));

  const getDotSize = (size: string) => {
    // Return both size class and specific dimensions
    switch (size) {
      case "xlarge":
        return { class: "w-6 h-6", opacity: "opacity-100" };
      case "large":
        return { class: "w-5 h-5", opacity: "opacity-90" };
      case "medium":
        return { class: "w-4 h-4", opacity: "opacity-80" };
      case "small":
        return { class: "w-3 h-3", opacity: "opacity-70" };
      case "tiny":
        return { class: "w-2 h-2", opacity: "opacity-50" };
      default:
        return { class: "w-1 h-1", opacity: "opacity-30" };
    }
  };

  const getIntensityColor = (isActive: boolean) => {
    if (!isActive) return "bg-gray-600";
    return "bg-blue-500"; // Use consistent blue color
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Bar Chart Section */}
      <div className="space-y-4">
        <div className="h-24 flex items-end justify-between gap-1">
          {barData.map(({ hour, label, value }) => {
            const height = Math.max(15, (value / 100) * 70);
            return (
              <div key={hour} className="flex flex-col items-center flex-1">
                <div
                  className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-400"
                  style={{ height: `${height}px` }}
                  title={`${label}: ${value}%`}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          {barData.map(({ hour, label }) => (
            <div key={hour} className="flex-1 text-center">
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="space-y-3 overflow-hidden">
        {heatmapData.map(({ day, hours }) => (
          <div key={day} className="flex items-center gap-3">
            <div className="w-4 text-xs text-gray-400 font-medium flex-shrink-0">
              {day}
            </div>
            <div className="flex-1 flex items-center justify-start flex-wrap gap-1 min-h-[24px]">
              {hours.map(({ hour, intensity, isActive, size }) => {
                const dotSize = getDotSize(size);
                return (
                  <div
                    key={hour}
                    className="flex items-center justify-center"
                    style={{ minWidth: "16px" }}
                  >
                    <div
                      className={`rounded-full transition-all hover:scale-110 ${
                        dotSize.class
                      } ${dotSize.opacity} ${getIntensityColor(isActive)}`}
                      title={`${day} ${hour}:00 - ${Math.round(
                        intensity * 100
                      )}% activity`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3">
        <div className="w-4 flex-shrink-0"></div>
        <div className="flex-1 flex justify-between text-xs text-gray-400 px-2">
          <span>12am</span>
          <span>3</span>
          <span>6</span>
          <span>9</span>
          <span>12pm</span>
          <span>3</span>
          <span>6</span>
          <span>9</span>
        </div>
      </div>
    </div>
  );
});

export default TimeHeatmap;
