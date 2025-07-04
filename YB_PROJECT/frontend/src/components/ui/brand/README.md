# Brand Components

This folder contains reusable brand components for the YB Project application.

## Components

### Logo

A complete logo component that includes both icon and text.

```tsx
import { Logo } from "../components/ui/brand";

<Logo
  variant="light" // 'light' | 'dark'
  size="md" // 'sm' | 'md' | 'lg'
  showText={true} // boolean
  to="/" // navigation path
  animated={true} // enable/disable animations
/>;
```

### LogoIcon

Just the icon part of the logo, useful for compact spaces.

```tsx
import { LogoIcon } from "../components/ui/brand";

<LogoIcon
  size="md" // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  to="/" // navigation path
  animated={true} // enable/disable animations
/>;
```

### LogoText

Just the text part of the logo.

```tsx
import { LogoText } from "../components/ui/brand";

<LogoText
  variant="light" // 'light' | 'dark'
  size="md" // 'sm' | 'md' | 'lg' | 'xl'
  to="/" // navigation path
/>;
```

## Features

- **Responsive**: All components are responsive and work on all screen sizes
- **Clickable**: All components support navigation via the `to` prop
- **Customizable**: Multiple size and variant options
- **Animated**: Optional animations for enhanced user experience
- **Accessible**: Proper semantic HTML and keyboard navigation

## Usage Examples

### Header Logo

```tsx
<Logo variant="light" size="sm" showText={true} to="/" />
```

### Login Page Logo

```tsx
<div className="flex flex-col items-center space-y-4">
  <LogoIcon size="xl" to="/" animated={true} />
  <LogoText variant="light" size="lg" to="/" />
</div>
```

### Sidebar Logo

```tsx
<LogoIcon size="md" to="/" animated={false} />
```
