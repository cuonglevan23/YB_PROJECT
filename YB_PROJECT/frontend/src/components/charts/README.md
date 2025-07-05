# Chart Components

Bộ sưu tập các component biểu đồ có thể tái sử dụng được xây dựng trên thư viện Recharts với thiết kế tối và responsive.

## Cài đặt

```bash
pnpm add recharts
```

## Components

### LineChart

Component biểu đồ đường với nhiều tùy chọn tùy chỉnh.

#### Cách sử dụng

```tsx
import { LineChart } from "../components/charts";
import type { LineChartData, LineChartLine } from "../components/charts";

const data: LineChartData[] = [
  { name: "Jan", views: 400, subscribers: 240 },
  { name: "Feb", views: 300, subscribers: 139 },
  { name: "Mar", views: 200, subscribers: 980 },
];

const lines: LineChartLine[] = [
  { dataKey: "views", stroke: "#3B82F6", name: "Views" },
  { dataKey: "subscribers", stroke: "#10B981", name: "Subscribers" },
];

<LineChart
  data={data}
  lines={lines}
  height={400}
  showGrid={true}
  showTooltip={true}
/>;
```

#### Props

| Prop              | Type              | Default  | Mô tả                                       |
| ----------------- | ----------------- | -------- | ------------------------------------------- |
| `data`            | `LineChartData[]` | -        | Dữ liệu cho biểu đồ (required)              |
| `lines`           | `LineChartLine[]` | -        | Cấu hình các đường trong biểu đồ (required) |
| `height`          | `number`          | `400`    | Chiều cao của biểu đồ                       |
| `showGrid`        | `boolean`         | `true`   | Hiển thị lưới                               |
| `showTooltip`     | `boolean`         | `true`   | Hiển thị tooltip                            |
| `showLegend`      | `boolean`         | `false`  | Hiển thị legend                             |
| `xAxisDataKey`    | `string`          | `"name"` | Key cho trục X                              |
| `className`       | `string`          | `""`     | CSS class tùy chỉnh                         |
| `strokeDasharray` | `string`          | `"3 3"`  | Pattern cho lưới                            |

#### Types

```typescript
interface LineChartData {
  name: string;
  [key: string]: string | number;
}

interface LineChartLine {
  dataKey: string;
  stroke: string;
  strokeWidth?: number;
  name?: string;
  type?: "monotone" | "linear" | "step";
}
```

### BarChart

Component biểu đồ cột với nhiều tùy chọn tùy chỉnh.

#### Cách sử dụng

```tsx
import { BarChart } from "../components/charts";
import type { BarChartData, BarChartBar } from "../components/charts";

const data: BarChartData[] = [
  { name: "Jan", views: 400, subscribers: 240 },
  { name: "Feb", views: 300, subscribers: 139 },
  { name: "Mar", views: 200, subscribers: 980 },
];

const bars: BarChartBar[] = [
  { dataKey: "views", fill: "#3B82F6", name: "Views" },
  { dataKey: "subscribers", fill: "#10B981", name: "Subscribers" },
];

<BarChart
  data={data}
  bars={bars}
  height={400}
  showGrid={true}
  showTooltip={true}
/>;
```

#### Props

| Prop              | Type             | Default  | Mô tả                                     |
| ----------------- | ---------------- | -------- | ----------------------------------------- |
| `data`            | `BarChartData[]` | -        | Dữ liệu cho biểu đồ (required)            |
| `bars`            | `BarChartBar[]`  | -        | Cấu hình các cột trong biểu đồ (required) |
| `height`          | `number`         | `400`    | Chiều cao của biểu đồ                     |
| `showGrid`        | `boolean`        | `true`   | Hiển thị lưới                             |
| `showTooltip`     | `boolean`        | `true`   | Hiển thị tooltip                          |
| `showLegend`      | `boolean`        | `false`  | Hiển thị legend                           |
| `xAxisDataKey`    | `string`         | `"name"` | Key cho trục X                            |
| `className`       | `string`         | `""`     | CSS class tùy chỉnh                       |
| `strokeDasharray` | `string`         | `"3 3"`  | Pattern cho lưới                          |

#### Types

```typescript
interface BarChartData {
  name: string;
  [key: string]: string | number;
}

interface BarChartBar {
  dataKey: string;
  fill: string;
  name?: string;
  radius?: number | [number, number, number, number];
}
```

## Tính năng

- ✅ Responsive design
- ✅ Dark theme optimized
- ✅ Customizable colors
- ✅ Interactive tooltips
- ✅ Grid lines
- ✅ TypeScript support
- ✅ Recharts powered
- ✅ Multiple data series support

## Ví dụ nâng cao

### Biểu đồ đường nhiều màu

```tsx
const lines: LineChartLine[] = [
  {
    dataKey: "revenue",
    stroke: "#3B82F6",
    strokeWidth: 3,
    name: "Revenue",
    type: "monotone",
  },
  {
    dataKey: "profit",
    stroke: "#10B981",
    strokeWidth: 2,
    name: "Profit",
    type: "linear",
  },
];
```

### Biểu đồ cột với góc bo tròn

```tsx
const bars: BarChartBar[] = [
  {
    dataKey: "sales",
    fill: "#3B82F6",
    name: "Sales",
    radius: [4, 4, 0, 0],
  },
];
```

### Tùy chỉnh styling

```tsx
<LineChart
  data={data}
  lines={lines}
  height={500}
  className="my-custom-chart"
  strokeDasharray="5 5"
  showLegend={true}
/>
```

## Sử dụng trong dự án

Các component này được thiết kế để sử dụng trong:

- **Dashboard**: Hiển thị metrics tổng quan
- **Analytics**: Phân tích dữ liệu chi tiết
- **Reports**: Báo cáo định kỳ
- **Competitors**: So sánh hiệu suất

Tất cả đều tối ưu cho dark theme và responsive trên mọi thiết bị.
