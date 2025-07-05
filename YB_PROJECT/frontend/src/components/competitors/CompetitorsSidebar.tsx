import { memo } from "react";
import { CompetitorSearchDropdown } from "../ui/dropdowns";

interface Competitor {
  id: string;
  name: string;
  channelName: string;
  subscribers: string;
  avatar: string;
  isSelected: boolean;
}

interface CompetitorsSidebarProps {
  competitors: Competitor[];
  searchableCompetitors: Omit<Competitor, "isSelected">[];
  filteredCompetitors: Competitor[];
  includeMyChannel: boolean;
  isSearchDropdownOpen: boolean;
  onToggleCompetitor: (competitorId: string) => void;
  onToggleSelectAll: () => void;
  onAddCompetitor: (competitor: Omit<Competitor, "isSelected">) => void;
  onCancelSearch: () => void;
  onToggleIncludeMyChannel: (value: boolean) => void;
  onToggleSearchDropdown: () => void;
}

const CompetitorsSidebar = memo(function CompetitorsSidebar({
  competitors,
  searchableCompetitors,
  filteredCompetitors,
  includeMyChannel,
  isSearchDropdownOpen,
  onToggleCompetitor,
  onToggleSelectAll,
  onAddCompetitor,
  onCancelSearch,
  onToggleIncludeMyChannel,
  onToggleSearchDropdown,
}: CompetitorsSidebarProps) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-xl font-semibold text-white mb-6">Add competitors</h2>

      {/* Competitor Search Dropdown */}
      <div className="mb-6">
        <CompetitorSearchDropdown
          competitors={searchableCompetitors}
          onSelectCompetitor={onAddCompetitor}
          onCancel={onCancelSearch}
          placeholder="Search competitors..."
          isOpen={isSearchDropdownOpen}
          onToggle={onToggleSearchDropdown}
        />
      </div>

      {/* Include My Channel Toggle */}
      <div className="flex items-center justify-between mb-6 p-3 bg-gray-700/30 rounded-lg">
        <span className="text-white font-medium">Include my channel</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={includeMyChannel}
            onChange={(e) => onToggleIncludeMyChannel(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Select All Toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">Select all</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={competitors.every((comp) => comp.isSelected)}
            onChange={onToggleSelectAll}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Competitors List */}
      <div className="space-y-3">
        {filteredCompetitors.map((competitor) => (
          <div
            key={competitor.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/30 transition-colors"
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={competitor.isSelected}
                onChange={() => onToggleCompetitor(competitor.id)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <img
              src={competitor.avatar}
              alt={competitor.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm truncate">
                {competitor.name}
              </h3>
              <p className="text-gray-400 text-xs truncate">
                {competitor.subscribers}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CompetitorsSidebar;
export type { Competitor };
