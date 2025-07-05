import { memo } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LineChart } from "../charts";
import type { LineChartData, LineChartLine } from "../charts";

interface Competitor {
  id: string;
  name: string;
  channelName: string;
  subscribers: string;
  avatar: string;
  isSelected: boolean;
}

interface ComparePerformanceSectionProps {
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
  selectedDataType: string;
  onDataTypeChange: (dataType: string) => void;
  chartData: LineChartData[];
  chartLines: LineChartLine[];
  competitors: Competitor[];
}

const ComparePerformanceSection = memo(function ComparePerformanceSection({
  selectedMetric,
  onMetricChange,
  selectedDataType,
  onDataTypeChange,
  chartData,
  chartLines,
  competitors,
}: ComparePerformanceSectionProps) {
  const metrics = [
    "Views",
    "Subscribers",
    "Public videos",
    "Average daily views",
    "Average subscribers/day",
    "Average public videos/day",
  ];

  const dataTypes = ["Daily", "Cumulative", "Total"];

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-white">
            Compare Performance
          </h2>
          <AiOutlineInfoCircle className="text-gray-400 h-5 w-5" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">30 Days</span>
            <span className="text-white font-medium">60 Days</span>
            <span className="text-gray-400">12 Months</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar with Metrics */}
        <div className="w-48 space-y-2">
          {metrics.map((metric) => (
            <div
              key={metric}
              onClick={() => onMetricChange(metric)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedMetric === metric
                  ? "bg-blue-600/20 border-l-4 border-blue-500"
                  : "hover:bg-gray-700/50"
              }`}
            >
              <div className="text-white font-medium">{metric}</div>
            </div>
          ))}
        </div>

        {/* Right Chart Area */}
        <div className="flex-1">
          {/* Chart Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                {dataTypes.map((dataType) => (
                  <button
                    key={dataType}
                    onClick={() => onDataTypeChange(dataType)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      selectedDataType === dataType
                        ? "bg-white text-gray-900 font-medium"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {dataType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 w-full">
            <LineChart data={chartData} lines={chartLines} height={320} />
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center mt-4 space-x-6">
            {competitors
              .filter((comp) => comp.isSelected)
              .map((competitor, index) => (
                <div
                  key={competitor.id}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={competitor.avatar}
                    alt={competitor.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: [
                        "#8B5CF6",
                        "#3B82F6",
                        "#10B981",
                        "#F59E0B",
                      ][index % 4],
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ComparePerformanceSection;
