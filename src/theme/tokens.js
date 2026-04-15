/**
 * Design tokens for light/dark themes.
 * Components use useTheme() + tokens for easy theme switching.
 * Add dark values when implementing dark theme.
 */
export const themeTokens = {
  light: {
    bg: "#f5f5f5",
    bgCard: "#fff",
    bgHeader: "#fff",
    text: "#111",
    textMuted: "#666",
    textSubtle: "#999",
    border: "#ebebeb",
    primary: "#DA1A35",
    headerBg: "#fff",
    headerText: "#111",
    headerBorder: "transparent",
  },
  dark: {
    // Placeholder for dark theme – implement when ready
    bg: "#0f0f0f",
    bgCard: "#1a1a1a",
    bgHeader: "#1a1a1a",
    text: "#fff",
    textMuted: "#b0b0b0",
    textSubtle: "#888",
    border: "#333",
    primary: "#DA1A35",
    headerBg: "#1a1a1a",
    headerText: "#fff",
    headerBorder: "#333",
  },
};
