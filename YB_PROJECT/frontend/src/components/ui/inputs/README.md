# Search Dropdown Components

This directory contains reusable search dropdown components that can be used throughout the application.

## Components Overview

### 1. UniversalSearchDropdown

The base component that provides all search dropdown functionality.

### 2. KeywordSearchDropdown

Specialized for keyword searches with add functionality.

### 3. VideoSearchDropdown

Specialized for video searches with video-specific data.

### 4. SearchBar

Basic search bar component (legacy).

## Usage Examples

### KeywordSearchDropdown in Modal

```tsx
<KeywordSearchDropdown
  placeholder="Search keywords to add..."
  value={searchQuery}
  onChange={setSearchQuery}
  onSelect={(result) => {
    handleAddKeyword(result);
    setSearchQuery("");
  }}
  searchResults={searchResults}
  showAddIcon={true}
/>
```

### UniversalSearchDropdown in Main Pages

```tsx
<UniversalSearchDropdown
  placeholder="Search anything..."
  value={searchQuery}
  onChange={setSearchQuery}
  onSelect={(result) => handleSelection(result)}
  searchResults={suggestions}
  showCategories={true}
/>
```

### VideoSearchDropdown

```tsx
<VideoSearchDropdown
  placeholder="Search videos..."
  value={searchQuery}
  onChange={setSearchQuery}
  onSelect={(video) => playVideo(video)}
  searchResults={videoResults}
/>
```

## Migration from Old SearchBar

### Before:

```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
      placeholder="Search..."
      onSearchClick={handleSearch}
    />
  );
}
```

## Props

| Prop               | Type                      | Default       | Mô tả                                         |
| ------------------ | ------------------------- | ------------- | --------------------------------------------- |
| `value`            | `string`                  | -             | Giá trị hiện tại của input (required)         |
| `onChange`         | `(value: string) => void` | -             | Callback khi giá trị thay đổi (required)      |
| `placeholder`      | `string`                  | `"Search..."` | Text placeholder cho input                    |
| `onSearchClick`    | `() => void`              | -             | Callback khi click nút search hoặc nhấn Enter |
| `className`        | `string`                  | `""`          | CSS class tùy chỉnh cho container             |
| `showSearchButton` | `boolean`                 | `true`        | Hiển thị/ẩn nút search                        |
| `size`             | `"sm" \| "md" \| "lg"`    | `"md"`        | Kích thước của thanh tìm kiếm                 |

## Kích thước

### Small (`sm`)

- Chiều cao: 40px
- Phù hợp cho sidebar, dropdown, hoặc không gian hẹp

### Medium (`md`) - Default

- Chiều cao: 48px
- Phù hợp cho hầu hết các trường hợp sử dụng

### Large (`lg`)

- Chiều cao: 56px
- Phù hợp cho header chính, landing page

## Ví dụ sử dụng

### Thanh tìm kiếm cơ bản

```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Tìm kiếm videos..."
/>
```

### Thanh tìm kiếm với callback search

```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Tìm kiếm..."
  onSearchClick={() => performSearch(searchQuery)}
/>
```

### Thanh tìm kiếm kích thước lớn

```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Tìm kiếm..."
  size="lg"
/>
```

### Thanh tìm kiếm không có nút search

```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Tìm kiếm..."
  showSearchButton={false}
/>
```

### Thanh tìm kiếm với CSS tùy chỉnh

```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Tìm kiếm..."
  className="mb-4 max-w-md"
/>
```

## Tính năng

- ✅ Responsive design
- ✅ Keyboard support (Enter để search)
- ✅ 3 kích thước khác nhau
- ✅ Tùy chọn hiển thị/ẩn nút search
- ✅ Icon search tích hợp
- ✅ Hover và focus effects
- ✅ Dark theme ready
- ✅ TypeScript support
- ✅ Accessible

## Styling

Component sử dụng Tailwind CSS với theme tối mặc định:

- Background: `bg-gray-800`
- Border: `border-gray-700`
- Text: `text-white`
- Placeholder: `placeholder-gray-400`
- Focus ring: `focus:ring-blue-500`

Bạn có thể tùy chỉnh thêm bằng cách truyền `className` prop.
