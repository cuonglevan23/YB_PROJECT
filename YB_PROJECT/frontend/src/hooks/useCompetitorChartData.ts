import { useMemo } from "react";
import type { LineChartData, LineChartLine } from "../components/charts";
import type { Competitor } from "../components/competitors";

interface UseCompetitorChartDataProps {
  competitors: Competitor[];
  selectedMetric: string;
  selectedDataType: string;
}

export const useCompetitorChartData = ({
  competitors,
  selectedMetric,
  selectedDataType,
}: UseCompetitorChartDataProps) => {
  // Function to generate chart data based on selected metric and data type
  const chartData = useMemo((): LineChartData[] => {
    const dates = [
      "05/01/25", "05/02/25", "05/03/25", "05/04/25", 
      "05/05/25", "05/06/25", "05/07/25"
    ];

    return dates.map((date, index) => {
      const baseData: LineChartData = { name: date };
      
      competitors.forEach(competitor => {
        let value = 0;
        
        switch (selectedMetric) {
          case "Views":
            if (selectedDataType === "Total") {
              value = competitor.name === "Thầy Giáo Ba" ? 81 : 0;
            } else if (selectedDataType === "Daily") {
              value = competitor.name === "Thầy Giáo Ba" ? Math.floor(Math.random() * 50) + 20 : 0;
            } else if (selectedDataType === "Cumulative") {
              value = competitor.name === "Thầy Giáo Ba" ? (index + 1) * 12 : 0;
            }
            break;
            
          case "Subscribers":
            if (selectedDataType === "Total") {
              value = competitor.name === "Thầy Giáo Ba" ? 406000 : 41;
            } else if (selectedDataType === "Daily") {
              value = competitor.name === "Thầy Giáo Ba" ? Math.floor(Math.random() * 100) + 50 : 0;
            } else if (selectedDataType === "Cumulative") {
              value = competitor.name === "Thầy Giáo Ba" ? (index + 1) * 200 : index;
            }
            break;
            
          case "Public videos":
            if (selectedDataType === "Total") {
              value = competitor.name === "Thầy Giáo Ba" ? 2600 : 19;
            } else if (selectedDataType === "Daily") {
              value = competitor.name === "Thầy Giáo Ba" ? Math.floor(Math.random() * 3) : 0;
            } else if (selectedDataType === "Cumulative") {
              value = competitor.name === "Thầy Giáo Ba" ? (index + 1) * 5 : index * 0.5;
            }
            break;
            
          case "Average daily views":
            value = competitor.name === "Thầy Giáo Ba" ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 5);
            break;
            
          case "Average subscribers/day":
            value = competitor.name === "Thầy Giáo Ba" ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 3);
            break;
            
          case "Average public videos/day":
            value = competitor.name === "Thầy Giáo Ba" ? Math.random() * 2 : Math.random() * 0.5;
            break;
            
          default:
            value = 0;
        }
        
        baseData[competitor.name] = value;
      });
      
      return baseData;
    });
  }, [competitors, selectedMetric, selectedDataType]);

  const chartLines = useMemo((): LineChartLine[] => {
    return competitors
      .filter(comp => comp.isSelected)
      .map((competitor, index) => ({
        dataKey: competitor.name,
        stroke: ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"][index % 4],
        strokeWidth: 2,
        name: competitor.name,
        avatar: competitor.avatar,
      }));
  }, [competitors]);

  return { chartData, chartLines };
};
