import { memo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface BarChartData {
  name: string;
  [key: string]: string | number;
}

export interface BarChartBar {
  dataKey: string;
  fill: string;
  name?: string;
  radius?: number | [number, number, number, number];
}

interface BarChartProps {
  data: BarChartData[];
  bars: BarChartBar[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisDataKey?: string;
  className?: string;
  strokeDasharray?: string;
}

const BarChart = memo(function BarChart({
  data,
  bars,
  height = 400,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  xAxisDataKey = "name",
  className = "",
  strokeDasharray = "3 3",
}: BarChartProps) {
  return (
    <div className={`w-full bg-black rounded-lg p-4 ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
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
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#000000",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              labelStyle={{ color: "#F9FAFB" }}
            />
          )}
          {showLegend && <Legend />}
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.fill}
              name={bar.name}
              radius={bar.radius || 0}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default BarChart;
