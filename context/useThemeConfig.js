import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from '../theme';

/**
 * Hook to get the current theme colors based on the active theme
 * @returns {Object} Current theme colors object
 */
export const useThemeColors = () => {
  const { isDark } = useTheme();
  return isDark ? darkTheme.colors : lightTheme.colors;
};

/**
 * Hook to get all theme data (colors and fonts)
 * @returns {Object} Current full theme object
 */
export const useCurrentTheme = () => {
  const { isDark } = useTheme();
  return isDark ? darkTheme : lightTheme;
};

/**
 * Get theme colors for static contexts (outside of React components)
 * Returns light theme by default
 * @param {boolean} isDark - Whether to get dark theme
 * @returns {Object} Theme colors
 */
export const getThemeColors = (isDark = false) => {
  return isDark ? darkTheme.colors : lightTheme.colors;
};

/**
 * Get a specific color from the theme
 * @param {string} colorName - Name of the color (e.g., 'primary', 'background')
 * @param {boolean} isDark - Whether to get dark theme color
 * @returns {string} Hex color code
 */
export const getThemeColor = (colorName, isDark = false) => {
  const theme = isDark ? darkTheme : lightTheme;
  return theme.colors[colorName] || null;
};
