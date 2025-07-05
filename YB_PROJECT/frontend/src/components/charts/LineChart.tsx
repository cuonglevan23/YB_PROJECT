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
      <div className="bg-black border border-gray-700 rounded-lg p-4 shadow-2xl">
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
    <div className={`w-full bg-black rounded-lg p-4 ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray={strokeDasharray}
              stroke="#1F2937"
              opacity={0.8}
            />
          )}
          <XAxis
            dataKey={xAxisDataKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#D1D5DB", fontSize: 12 }}
            className="text-gray-300"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#D1D5DB", fontSize: 12 }}
            className="text-gray-300"
          />
          {showTooltip && <Tooltip content={<CustomTooltip lines={lines} />} />}
          {showLegend && <Legend />}
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type={line.type || "monotone"}
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || 3}
              name={line.name}
              dot={{ fill: line.stroke, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: line.stroke, strokeWidth: 2 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default LineChart;
