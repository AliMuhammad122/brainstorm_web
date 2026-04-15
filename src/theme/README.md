# Theme System

Light/dark theming for screens. Structure is ready for dark theme implementation.

## Usage

```jsx
import { useTheme } from '../context/ThemeContext';

function MyScreen() {
  const { theme, tokens, isDark, toggleTheme } = useTheme();

  return (
    <div style={{ background: tokens.bg, color: tokens.text }}>
      <h1 style={{ color: tokens.headerText }}>Title</h1>
    </div>
  );
}
```

## Tokens (`src/theme/tokens.js`)

- `bg`, `bgCard`, `bgHeader` – backgrounds
- `text`, `textMuted`, `textSubtle` – text colors
- `border`, `primary` – UI colors
- `headerBg`, `headerText` – header styling

## Toggle Theme

- **Drawer**: Open hamburger → "Light/Dark theme" row
- Programmatic: `const { setTheme } = useTheme(); setTheme('dark');`

## Dark Theme

`themeTokens.dark` has placeholders. Fill with final values when implementing.
