import { memo } from "react";
import { RangeSlider, FilterDropdown } from "../ui/filters";
import { Button } from "../ui/buttons";

interface OutlierFilters {
  outlierScore: [number, number];
  views: [number, number];
  subscribers: [number, number];
  viewsPerHour: [number, number];
  videoLength: [number, number];
  publishingDate: string;
}

interface AdvancedFiltersProps {
  filters: OutlierFilters;
  onFiltersChange: (filters: OutlierFilters) => void;
  onApply: () => void;
  onReset: () => void;
  className?: string;
}

const PUBLISHING_DATE_OPTIONS = [
  { value: "any", label: "All Time" },
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_3_months", label: "Last 3 Months" },
  { value: "last_6_months", label: "Last 6 Months" },
  { value: "last_year", label: "Last Year" },
  { value: "all_time", label: "All Time" },
];

export const AdvancedFilters = memo(function AdvancedFilters({
  filters,
  onFiltersChange,
  onApply,
  onReset,
  className = "",
}: AdvancedFiltersProps) {
  const updateFilter = <K extends keyof OutlierFilters>(
    key: K,
    value: OutlierFilters[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const formatViews = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const formatSubscribers = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const formatDuration = (value: number) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg p-6 space-y-6 border border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Outlier Score */}
        <RangeSlider
          label="Outlier Score"
          min={0}
          max={100}
          value={filters.outlierScore}
          onChange={(value) => updateFilter("outlierScore", value)}
          step={1}
          unit=""
        />

        {/* Views */}
        <RangeSlider
          label="Views"
          min={0}
          max={10000000}
          value={filters.views}
          onChange={(value) => updateFilter("views", value)}
          step={10000}
          formatValue={formatViews}
        />

        {/* Subscribers */}
        <RangeSlider
          label="Subscribers"
          min={0}
          max={10000000}
          value={filters.subscribers}
          onChange={(value) => updateFilter("subscribers", value)}
          step={10000}
          formatValue={formatSubscribers}
        />

        {/* Views Per Hour */}
        <RangeSlider
          label="Views Per Hour"
          min={0}
          max={100000}
          value={filters.viewsPerHour}
          onChange={(value) => updateFilter("viewsPerHour", value)}
          step={100}
          formatValue={formatViews}
        />

        {/* Video Length */}
        <RangeSlider
          label="Video Length"
          min={0}
          max={3600}
          value={filters.videoLength}
          onChange={(value) => updateFilter("videoLength", value)}
          step={60}
          formatValue={formatDuration}
        />

        {/* Publishing Date */}
        <FilterDropdown
          label="Publishing Date"
          value={filters.publishingDate}
          options={PUBLISHING_DATE_OPTIONS}
          onChange={(value) => updateFilter("publishingDate", value)}
          placeholder="Select time period"
        />
      </div>

      {/* Apply Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onApply}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Apply
        </Button>
      </div>
    </div>
  );
});
