import { memo } from "react";
import {
  QuickActionsSection,
  OptimizeVideoSection,
  DailyVideoIdeasSection,
  StartFromIdeasSection,
  SearchKeywordSection,
  KeywordOpportunitiesSection,
  DailyTasksSection,
  GrowthPlanSection,
  ToolsGrid,
  ChannelStatsWidget,
  GoalProgressWidget,
  MonetizationWidget,
  SubscribersOverviewWidget,
  CompetitorsWidget,
  GrowthPlanProgressWidget,
} from "../dashboard";

const DashboardContainer = memo(function DashboardContainer() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Today</h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Content - 3 columns */}
          <div className="xl:col-span-3 space-y-8">
            {/* Quick Actions Section */}
            <QuickActionsSection />

            {/* Optimize Video Section */}
            <OptimizeVideoSection />

            {/* Daily Video Ideas */}
            <DailyVideoIdeasSection />

            {/* Start From Ideas Section */}
            <StartFromIdeasSection />

            {/* Search Keyword Section */}
            <SearchKeywordSection />

            {/* Keyword Opportunities Section */}
            <KeywordOpportunitiesSection />

            {/* Daily Tasks Section */}
            <DailyTasksSection />

            {/* Growth Plan Section */}
            <GrowthPlanSection />
          </div>

          {/* Right Sidebar - Tools and Stats */}
          <div className="xl:col-span-1 space-y-6">
            {/* Tools Section */}
            <ToolsGrid />

            {/* Channel Stats */}
            <ChannelStatsWidget />

            {/* Goal Progress */}
            <GoalProgressWidget />

            {/* Monetization */}
            <MonetizationWidget />

            {/* Subscribers Overview */}
            <SubscribersOverviewWidget />

            {/* Competitors */}
            <CompetitorsWidget />

            {/* Growth Plan Progress */}
            <GrowthPlanProgressWidget />
          </div>
        </div>
      </div>
    </div>
  );
});

export default DashboardContainer;
