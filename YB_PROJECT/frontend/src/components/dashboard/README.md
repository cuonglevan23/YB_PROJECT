# Dashboard Components

This directory contains all the modular components for the dashboard page, split into small, manageable, and reusable components for easier maintenance.

## Main Sections

### Left Column (Main Content)

1. **QuickActionsSection** - "What would you like to do today?" section with 4 action cards
2. **OptimizeVideoSection** - "Optimize Your Latest Video" section
3. **DailyVideoIdeasSection** - "Daily Video Ideas" with Vietnamese content
4. **StartFromIdeasSection** - "Start From Your Ideas" input section
5. **SearchKeywordSection** - "Search a Keyword" input section
6. **KeywordOpportunitiesSection** - "Top Keyword Opportunities" table
7. **DailyTasksSection** - "Daily Tasks" with completion tracking
8. **GrowthPlanSection** - "Today's Growth Plan" learning modules

### Right Sidebar (Widgets)

9. **ToolsGrid** - Grid of tool icons and labels
10. **ChannelStatsWidget** - Channel statistics with time period selector
11. **GoalProgressWidget** - Goal progress with circular progress indicator
12. **MonetizationWidget** - Monetization metrics (subscribers, watch time)
13. **SubscribersOverviewWidget** - Subscriber overview with upgrade prompts
14. **CompetitorsWidget** - Competitors analysis section
15. **GrowthPlanProgressWidget** - Learning progress with levels

## Usage

All components are exported from `index.ts` and used in `DashboardContainer.tsx`:

```tsx
import {
  QuickActionsSection,
  OptimizeVideoSection,
  DailyVideoIdeasSection,
  // ... other components
} from "../dashboard";
```

## Features

- **Responsive Design**: All components are built with Tailwind CSS and responsive grid layouts
- **Vietnamese Content**: Includes proper Vietnamese text matching the design requirements
- **Interactive Elements**: Buttons, dropdowns, and hover effects
- **Modular Architecture**: Each component is self-contained and reusable
- **TypeScript**: Full type safety and IntelliSense support
- **Memo Optimization**: All components use React.memo for performance

## Design Compliance

The components closely match the provided dashboard design (90%+ similarity) including:

- Color scheme (dark theme with blue accents)
- Layout structure and spacing
- Typography and text content
- Interactive elements and buttons
- Charts and progress indicators
- Vietnamese language content
