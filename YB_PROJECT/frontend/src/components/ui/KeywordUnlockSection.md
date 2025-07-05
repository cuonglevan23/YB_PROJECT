# KeywordUnlockSection Component

Component tái sử dụng cho các section "unlock/boost" liên quan đến keywords với nhiều variant khác nhau.

## Props

| Prop         | Type                                         | Default               | Description                                  |
| ------------ | -------------------------------------------- | --------------------- | -------------------------------------------- |
| `title`      | `string?`                                    | Depends on variant    | Tiêu đề của section                          |
| `subtitle`   | `string?`                                    | Depends on variant    | Mô tả phụ (optional)                         |
| `buttonText` | `string`                                     | `"Unlock With Boost"` | Text của button                              |
| `icon`       | `React.ComponentType?`                       | Depends on variant    | Icon tùy chỉnh                               |
| `className`  | `string`                                     | `""`                  | CSS classes bổ sung                          |
| `variant`    | `"default" \| "trending" \| "opportunities"` | `"default"`           | Variant định nghĩa style và content mặc định |

## Variants

### `default`

- **Title**: "Get more keyword insights for your channel"
- **Subtitle**: "Access premium keyword data and analytics"
- **Icon**: `AiOutlineRocket`

### `opportunities`

- **Title**: "Get more top keyword opportunities for your channel"
- **Subtitle**: "Unlock advanced keyword research and competitor analysis"
- **Icon**: `AiOutlineRocket`

### `trending`

- **Title**: "Get access to more trending keywords"
- **Subtitle**: "Discover rising keywords and trending topics in your niche"
- **Icon**: `AiOutlineRise`

## Usage Examples

### Sử dụng với variant opportunities

```tsx
import { KeywordUnlockSection } from "@/components/ui";

<KeywordUnlockSection variant="opportunities" className="mt-6" />;
```

### Sử dụng với variant trending

```tsx
<KeywordUnlockSection variant="trending" className="mt-4" />
```

### Sử dụng với props tùy chỉnh

```tsx
import { AiOutlineSearch } from "react-icons/ai";

<KeywordUnlockSection
  title="Custom title"
  subtitle="Custom subtitle"
  buttonText="Get Premium"
  icon={AiOutlineSearch}
  className="my-8"
/>;
```

### Sử dụng variant default

```tsx
<KeywordUnlockSection />
```

## Features

- 🎨 3 variants được định nghĩa sẵn cho các use case khác nhau
- 🔧 Hoàn toàn customizable với props
- 📱 Responsive design
- 🎯 Consistent với design system
- ♿ Accessible với proper button states
- 🚀 Performance optimized với React.memo

## Integration

Component này được thiết kế để sử dụng trong:

- Keyword pages (KeywordsPage)
- Research pages (ResearchPage)
- Dashboard sections
- Analytics reports
- Bất kỳ nơi nào cần CTA để upgrade/unlock features

## Technical Details

- Component được wrap với `React.memo` để optimize performance
- Sử dụng TypeScript với proper type definitions
- Icon được import từ `react-icons/ai`
- CSS sử dụng Tailwind classes
- Follows compound component pattern với variants
