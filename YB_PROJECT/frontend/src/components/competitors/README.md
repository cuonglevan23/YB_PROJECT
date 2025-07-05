# Competitors Page - Component Architecture

Trang Competitors đã được refactor thành các component con để dễ quản lý và tái sử dụng hơn.

## 🏗️ Cấu trúc Component

### 📁 `/components/competitors/`

#### 1. **TopVideosSection.tsx**

- Hiển thị bảng top videos từ competitors
- Props: `videos: TopVideo[]`
- Tính năng: Hover effects, responsive table

#### 2. **ComparePerformanceSection.tsx**

- Section so sánh performance với chart
- Props: metric selection, data type, chart data
- Tính năng: Sidebar metrics, chart controls, legend

#### 3. **ChannelStatsSection.tsx**

- Bảng thống kê kênh
- Props: `channelStats: ChannelStat[]`
- Tính năng: Color-coded growth indicators

#### 4. **CompetitorsSidebar.tsx**

- Sidebar quản lý competitors
- Tính năng: Search dropdown, toggles, competitor list
- Props: Các event handlers và state management

#### 5. **index.ts**

- Export tất cả components và types
- Central point cho imports

### 📁 `/hooks/`

#### **useCompetitorChartData.ts**

- Custom hook quản lý chart data
- Input: competitors, selectedMetric, selectedDataType
- Output: chartData, chartLines
- Tính năng: Memoized data generation

## 🎯 Lợi ích của việc Refactor

### ✅ **Separation of Concerns**

- Mỗi component có trách nhiệm riêng biệt
- Dễ test và maintain
- Code dễ đọc hơn

### ✅ **Reusability**

- Components có thể tái sử dụng ở các trang khác
- Props interface rõ ràng
- Type safety với TypeScript

### ✅ **Maintainability**

- Thay đổi một phần không ảnh hưởng đến phần khác
- Easy debugging
- Cấu trúc folder rõ ràng

### ✅ **Performance**

- Memoized components với `memo()`
- Custom hook với `useMemo()`
- Reduced re-renders

## 📋 Props Interface

### TopVideo

```tsx
interface TopVideo {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  views: number;
  outlierScore: string;
  viewsPerHour: number;
  uploadTime: string;
}
```

### Competitor

```tsx
interface Competitor {
  id: string;
  name: string;
  channelName: string;
  subscribers: string;
  avatar: string;
  isSelected: boolean;
}
```

### ChannelStat

```tsx
interface ChannelStat {
  id: string;
  name: string;
  avatar: string;
  totalVideos: string;
  thisWeek: number;
  vsLastWeek: string;
  thisMonth: number;
  vsLastMonth: string;
}
```

## 🔧 Cách sử dụng

```tsx
import {
  TopVideosSection,
  ComparePerformanceSection,
  ChannelStatsSection,
  CompetitorsSidebar,
} from "../components/competitors";
import { useCompetitorChartData } from "../hooks";

function CompetitorsPage() {
  // State management...

  const { chartData, chartLines } = useCompetitorChartData({
    competitors,
    selectedMetric,
    selectedDataType,
  });

  return (
    <div>
      <TopVideosSection videos={topVideos} />

      <ComparePerformanceSection
        selectedMetric={selectedMetric}
        onMetricChange={setSelectedMetric}
        chartData={chartData}
        chartLines={chartLines}
        // ... other props
      />

      <ChannelStatsSection channelStats={channelStats} />

      <CompetitorsSidebar
        competitors={competitors}
        onToggleCompetitor={toggleCompetitor}
        // ... other props
      />
    </div>
  );
}
```

## 🚀 Next Steps

1. **Add Unit Tests** cho từng component
2. **Storybook** cho component documentation
3. **Error Boundaries** cho error handling
4. **Loading States** cho async operations
5. **Accessibility** improvements

## 📂 File Structure

```
src/
├── components/
│   └── competitors/
│       ├── TopVideosSection.tsx
│       ├── ComparePerformanceSection.tsx
│       ├── ChannelStatsSection.tsx
│       ├── CompetitorsSidebar.tsx
│       └── index.ts
├── hooks/
│   ├── useCompetitorChartData.ts
│   └── index.ts
└── pages/
    └── CompetitorsPage.tsx (refactored)
```

Cấu trúc này giúp code dễ maintain, test và scale hơn!
