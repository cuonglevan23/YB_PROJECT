import { memo } from "react";

interface ResearchFiltersPanelProps {
  isVisible: boolean;
  outlierScore: number;
  views: number;
  subscribers: number;
  viewsPerHour: number;
  videoLength: number;
  publishingDate: string;
  onOutlierScoreChange: (value: number) => void;
  onViewsChange: (value: number) => void;
  onSubscribersChange: (value: number) => void;
  onViewsPerHourChange: (value: number) => void;
  onVideoLengthChange: (value: number) => void;
  onPublishingDateChange: (value: string) => void;
  onResetAll: () => void;
}

export const ResearchFiltersPanel = memo(function ResearchFiltersPanel({
  isVisible,
  outlierScore,
  views,
  subscribers,
  viewsPerHour,
  videoLength,
  publishingDate,
  onOutlierScoreChange,
  onViewsChange,
  onSubscribersChange,
  onViewsPerHourChange,
  onVideoLengthChange,
  onPublishingDateChange,
  onResetAll,
}: ResearchFiltersPanelProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Outlier Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-medium">Outlier Score</label>
            <button
              onClick={() => onOutlierScoreChange(0)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Reset
            </button>
          </div>
          <div className="text-gray-400 text-sm mb-3">Range (0-100x)</div>
          <div className="relative mb-2">
            <input
              type="range"
              min="0"
              max="100"
              value={outlierScore}
              onChange={(e) => onOutlierScoreChange(parseInt(e.target.value))}
              className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{outlierScore}</span>
            <span>100+</span>
          </div>
        </div>

        {/* Views */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-medium">Views</label>
            <button
              onClick={() => onViewsChange(0)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Reset
            </button>
          </div>
          <div className="text-gray-400 text-sm mb-3">Range (0-10M+)</div>
          <div className="relative mb-2">
            <input
              type="range"
              min="0"
              max="10"
              value={views}
              onChange={(e) => onViewsChange(parseInt(e.target.value))}
              className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{views}</span>
            <span>10 Tr+</span>
          </div>
        </div>

        {/* Subscribers */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-medium">Subscribers</label>
            <button
              onClick={() => onSubscribersChange(0)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Reset
            </button>
          </div>
          <div className="text-gray-400 text-sm mb-3">Range (0-10M+)</div>
          <div className="relative mb-2">
            <input
              type="range"
              min="0"
              max="10"
              value={subscribers}
              onChange={(e) => onSubscribersChange(parseInt(e.target.value))}
              className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{subscribers}</span>
            <span>10 Tr+</span>
          </div>
        </div>

        {/* Views Per Hour */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-medium">Views Per Hour</label>
            <button
              onClick={() => onViewsPerHourChange(0)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Reset
            </button>
          </div>
          <div className="text-gray-400 text-sm mb-3">Range (0-1000+)</div>
          <div className="relative mb-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={viewsPerHour}
              onChange={(e) => onViewsPerHourChange(parseInt(e.target.value))}
              className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{viewsPerHour}</span>
            <span>1 N+</span>
          </div>
        </div>

        {/* Video Length */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-medium">Video Length</label>
            <button
              onClick={() => onVideoLengthChange(0)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Reset
            </button>
          </div>
          <div className="text-gray-400 text-sm mb-3">Range (0-60+ mins)</div>
          <div className="relative mb-2">
            <input
              type="range"
              min="0"
              max="60"
              value={videoLength}
              onChange={(e) => onVideoLengthChange(parseInt(e.target.value))}
              className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{videoLength}</span>
            <span>60+</span>
          </div>
        </div>

        {/* Publishing Date */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-medium">Publishing Date</label>
            <button
              onClick={() => onPublishingDateChange("All Time")}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Reset
            </button>
          </div>
          <div className="text-gray-400 text-sm mb-3"></div>
          <div className="relative">
            <select
              value={publishingDate}
              onChange={(e) => onPublishingDateChange(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="All Time">All Time</option>
              <option value="Last 24 hours">Last 24 hours</option>
              <option value="Last week">Last week</option>
              <option value="Last month">Last month</option>
              <option value="Last year">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onResetAll}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Reset All
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
});
