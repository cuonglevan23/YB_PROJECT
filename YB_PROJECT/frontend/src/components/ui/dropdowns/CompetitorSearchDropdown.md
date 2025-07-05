# CompetitorSearchDropdown Component

Một dropdown tìm kiếm competitors có thể tái sử dụng với chức năng cancel để hủy tìm kiếm.

## Tính năng

- ✅ Tìm kiếm theo tên channel và tên competitor
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Click outside để đóng dropdown
- ✅ Nút Cancel để hủy tìm kiếm
- ✅ Avatar và thông tin subscribers
- ✅ Responsive design
- ✅ Dark theme ready
- ✅ TypeScript support
- ✅ Accessible

## Cách sử dụng

```tsx
import { CompetitorSearchDropdown } from "../components/ui/dropdowns";

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  const competitors = [
    {
      id: "1",
      name: "Thầy Giáo Ba",
      channelName: "Thầy Giáo Ba",
      subscribers: "406 N subs",
      avatar: "/path/to/avatar.jpg",
    },
    // ... more competitors
  ];

  const handleSelectCompetitor = (competitor) => {
    console.log("Selected:", competitor);
    // Add competitor to your list
  };

  const handleCancel = () => {
    console.log("Search cancelled");
    // Reset search or other cleanup
  };

  return (
    <CompetitorSearchDropdown
      competitors={competitors}
      onSelectCompetitor={handleSelectCompetitor}
      onCancel={handleCancel}
      placeholder="Search competitors..."
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    />
  );
}
```

## Props

| Prop                 | Type                               | Required | Default                   | Mô tả                             |
| -------------------- | ---------------------------------- | -------- | ------------------------- | --------------------------------- |
| `competitors`        | `Competitor[]`                     | ✅       | -                         | Danh sách competitors để tìm kiếm |
| `onSelectCompetitor` | `(competitor: Competitor) => void` | ✅       | -                         | Callback khi chọn competitor      |
| `onCancel`           | `() => void`                       | ✅       | -                         | Callback khi nhấn Cancel          |
| `placeholder`        | `string`                           | ❌       | `"Search competitors..."` | Placeholder cho input tìm kiếm    |
| `isOpen`             | `boolean`                          | ✅       | -                         | Trạng thái mở/đóng dropdown       |
| `onToggle`           | `() => void`                       | ✅       | -                         | Callback để toggle dropdown       |

## Interface

```tsx
interface Competitor {
  id: string;
  name: string;
  channelName: string;
  subscribers: string;
  avatar: string;
}
```

## Keyboard Shortcuts

- **Arrow Down/Up**: Điều hướng trong danh sách
- **Enter**: Chọn competitor đang focus
- **Escape**: Đóng dropdown và hủy tìm kiếm
- **Click Outside**: Đóng dropdown

## Styling

Component sử dụng Tailwind CSS với theme tối:

- Dropdown: `bg-gray-800` với border `border-gray-700`
- Input: `bg-gray-700` với focus ring `focus:ring-blue-500`
- Hover: `hover:bg-gray-700` cho các item
- Focus: Highlight bằng `bg-gray-700`

## Ví dụ với Mock Data

```tsx
const searchableCompetitors = [
  {
    id: "1",
    name: "Pháp thoại Thầy Pháp Hoa",
    channelName: "Pháp thoại Thầy Pháp Hoa",
    subscribers: "1.7 Tr subscribers",
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "2",
    name: "Văn đáp Thầy Thích Pháp Hoa",
    channelName: "Văn đáp Thầy Thích Pháp Hoa",
    subscribers: "1.6 Tr subscribers",
    avatar: "/api/placeholder/40/40",
  },
  // ... more competitors
];
```

## Tùy chỉnh

Bạn có thể tùy chỉnh component bằng cách:

1. **Thay đổi placeholder**: Truyền prop `placeholder`
2. **Custom styling**: Override Tailwind classes
3. **Custom logic**: Xử lý trong `onSelectCompetitor` và `onCancel`
4. **Filter logic**: Component tự động filter theo name và channelName

## Notes

- Component tự động focus vào input khi dropdown mở
- Tìm kiếm case-insensitive cho cả name và channelName
- Dropdown tự động đóng khi chọn competitor hoặc click outside
- Cancel button luôn hiển thị ở footer của dropdown
