# ManageKeywordsModal Component

Component modal tái sử dụng để quản lý keywords, cho phép người dùng thêm/xóa keywords và xem gợi ý.

## Features

- ✅ Hiển thị keywords đã thêm với khả năng xóa
- ✅ Search để thêm keywords mới
- ✅ Hiển thị suggested keywords có thể thêm
- ✅ Refresh suggestions
- ✅ Save/Cancel actions
- ✅ Responsive design
- ✅ Keyboard navigation (ESC to close)
- ✅ Click outside to close

## Props

| Prop                   | Type                             | Default                | Description                      |
| ---------------------- | -------------------------------- | ---------------------- | -------------------------------- |
| `isOpen`               | `boolean`                        | -                      | Trạng thái mở/đóng modal         |
| `onClose`              | `() => void`                     | -                      | Callback khi đóng modal          |
| `title`                | `string?`                        | `"Manage my keywords"` | Tiêu đề modal                    |
| `addedKeywords`        | `Keyword[]?`                     | `[]`                   | Danh sách keywords đã thêm       |
| `suggestedKeywords`    | `Keyword[]?`                     | `[]`                   | Danh sách keywords gợi ý         |
| `onAddKeyword`         | `(keyword: Keyword) => void?`    | -                      | Callback khi thêm keyword        |
| `onRemoveKeyword`      | `(keywordId: string) => void?`   | -                      | Callback khi xóa keyword         |
| `onSave`               | `(keywords: Keyword[]) => void?` | -                      | Callback khi save                |
| `onRefreshSuggestions` | `() => void?`                    | -                      | Callback khi refresh suggestions |

## Keyword Interface

```typescript
interface Keyword {
  id: string;
  text: string;
  isRemovable?: boolean;
}
```

## Usage Examples

### Sử dụng với hook useManageKeywordsModal

```tsx
import { ManageKeywordsModal } from "@/components/ui/modals";
import { useManageKeywordsModal } from "@/hooks";

function MyComponent() {
  const {
    isOpen,
    addedKeywords,
    suggestedKeywords,
    openModal,
    closeModal,
    addKeyword,
    removeKeyword,
    saveKeywords,
    refreshSuggestions,
  } = useManageKeywordsModal(initialKeywords, initialSuggestions);

  return (
    <>
      <button onClick={openModal}>Manage Keywords</button>

      <ManageKeywordsModal
        isOpen={isOpen}
        onClose={closeModal}
        addedKeywords={addedKeywords}
        suggestedKeywords={suggestedKeywords}
        onAddKeyword={addKeyword}
        onRemoveKeyword={removeKeyword}
        onSave={saveKeywords}
        onRefreshSuggestions={refreshSuggestions}
      />
    </>
  );
}
```

### Sử dụng standalone

```tsx
import { ManageKeywordsModal } from "@/components/ui/modals";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState([]);

  const handleSave = (newKeywords) => {
    setKeywords(newKeywords);
    setIsOpen(false);
  };

  return (
    <ManageKeywordsModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      addedKeywords={keywords}
      onSave={handleSave}
    />
  );
}
```

## Integration

Component này đã được tích hợp sẵn vào:

- `KeywordDataTable` component (nút Manage)
- Có thể sử dụng độc lập trong bất kỳ component nào cần quản lý keywords

## Hook: useManageKeywordsModal

Hook hỗ trợ việc quản lý state cho ManageKeywordsModal.

### Parameters

- `initialKeywords: Keyword[]` - Keywords ban đầu
- `initialSuggestions: Keyword[]` - Suggestions ban đầu

### Returns

- `isOpen: boolean` - Trạng thái modal
- `addedKeywords: Keyword[]` - Keywords đã thêm
- `suggestedKeywords: Keyword[]` - Keywords gợi ý
- `openModal: () => void` - Mở modal
- `closeModal: () => void` - Đóng modal
- `addKeyword: (keyword: Keyword) => void` - Thêm keyword
- `removeKeyword: (keywordId: string) => void` - Xóa keyword
- `saveKeywords: (keywords: Keyword[]) => void` - Lưu keywords
- `refreshSuggestions: () => void` - Refresh suggestions

## Styling

Component sử dụng Tailwind CSS với theme tối (dark theme):

- Background: `bg-gray-800`
- Text: `text-white`, `text-gray-400`
- Buttons: `bg-blue-600`, `hover:bg-blue-700`
- Borders: `border-gray-700`

## Accessibility

- ✅ Focus management
- ✅ Keyboard navigation (ESC key)
- ✅ ARIA labels cho buttons
- ✅ Color contrast standards
- ✅ Responsive design
