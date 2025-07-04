import { memo } from "react";
import { Card } from "../ui";

const ChannelStatsWidget = memo(function ChannelStatsWidget() {
  const stats = [
    { label: "Views", value: "8", change: "-52.9%", negative: true },
    { label: "Subscribers", value: "0", change: "0.0%", negative: false },
    { label: "Watch time", value: "0", change: "-100.0%", negative: true },
    { label: "Retention", value: "76.3%", change: "+44.5%", negative: false },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Channel Stats</h2>
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Time period:</span>
            <select className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <span
                  className={`text-sm ${
                    stat.negative ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <span className="text-white text-2xl font-bold">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
});

export default ChannelStatsWidget;
