import { memo } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface LineChartData {
  name: string;
  [key: string]: string | number;
}

export interface LineChartLine {
  dataKey: string;
  stroke: string;
  strokeWidth?: number;
  name?: string;
  type?: "monotone" | "linear" | "step";
  avatar?: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number | string;
    color: string;
    name?: string;
  }>;
  label?: string;
  lines?: LineChartLine[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
  lines,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg">
        <p className="text-gray-300 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => {
          const line = lines?.find((l) => l.dataKey === entry.dataKey);
          return (
            <div key={index} className="flex items-center space-x-3 mb-2">
              {line?.avatar && (
                <div className="flex-shrink-0">
                  <img
                    src={line.avatar}
                    alt={line.name || entry.dataKey}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ borderColor: entry.color }}
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-white font-medium text-sm">
                  {line?.name || entry.dataKey}
                </p>
                <p className="text-lg font-bold" style={{ color: entry.color }}>
                  {entry.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

interface LineChartProps {
  data: LineChartData[];
  lines: LineChartLine[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisDataKey?: string;
  className?: string;
  strokeDasharray?: string;
}

const LineChart = memo(function LineChart({
  data,
  lines,
  height = 400,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  xAxisDataKey = "name",
  className = "",
  strokeDasharray = "3 3",
}: LineChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray={strokeDasharray}
              stroke="#374151"
              opacity={0.5}
            />
          )}
          <XAxis
            dataKey={xAxisDataKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          {showTooltip && <Tooltip content={<CustomTooltip lines={lines} />} />}
          {showLegend && <Legend />}
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type={line.type || "monotone"}
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || 2}
              name={line.name}
              dot={{ fill: line.stroke, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: line.stroke }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default LineChart;
