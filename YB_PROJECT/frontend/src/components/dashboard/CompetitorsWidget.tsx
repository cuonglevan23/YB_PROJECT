import { memo } from "react";
import { Card } from "../ui";

const CompetitorsWidget = memo(function CompetitorsWidget() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Competitors</h2>
      <Card className="p-6">
        <div className="mb-4">
          <select className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 w-full">
            <option>7 Day Views</option>
            <option>30 Day Views</option>
            <option>90 Day Views</option>
          </select>
        </div>

        <div className="text-center py-8">
          <div className="text-gray-400 text-sm mb-4">No Competitors</div>
        </div>

        <div className="space-y-2">
          <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm">
            Add a competitor
          </button>
          <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm">
            View All
          </button>
        </div>
      </Card>
    </div>
  );
});

export default CompetitorsWidget;
