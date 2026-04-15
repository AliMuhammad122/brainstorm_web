/**
 * Theme utility functions for consistent theming across the app
 */

import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from '../theme';

/**
 * Get responsive Tailwind classes based on theme
 * @param {string} lightClass - Tailwind class for light mode
 * @param {string} darkClass - Tailwind class for dark mode
 * @returns {function} Hook that returns combined classes
 */
export const useThemeClass = (lightClass, darkClass) => {
  const { isDark } = useTheme();
  return isDark ? darkClass : lightClass;
};

/**
 * Combine multiple light/dark class pairs
 * @param {Array<[string, string]>} classPairs - Array of [lightClass, darkClass] pairs
 * @returns {function} Hook that returns combined classes
 */
export const useThemeClasses = (classPairs) => {
  const { isDark } = useTheme();
  return classPairs.map(([light, dark]) => (isDark ? dark : light)).join(' ');
};

/**
 * Preset theme-aware background classes
 */
export const themeClasses = {
  background: {
    primary: 'bg-white dark:bg-slate-900',
    secondary: 'bg-gray-50 dark:bg-slate-800',
    accent: 'bg-blue-50 dark:bg-blue-950',
  },
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
  },
  border: {
    primary: 'border-gray-200 dark:border-gray-700',
    secondary: 'border-gray-300 dark:border-gray-600',
  },
  hover: {
    light: 'hover:bg-gray-100 dark:hover:bg-slate-700',
    dark: 'hover:bg-gray-200 dark:hover:bg-slate-600',
  },
};

/**
 * Get theme-aware style object
 * @param {Object} lightStyles - Styles for light mode
 * @param {Object} darkStyles - Styles for dark mode
 * @returns {function} Hook that returns combined styles
 */
export const useThemedStyles = (lightStyles, darkStyles) => {
  const { isDark } = useTheme();
  return isDark ? { ...lightStyles, ...darkStyles } : lightStyles;
};

/**
 * Create a styled component with theme support
 * @param {string} lightBg - Light mode background
 * @param {string} lightText - Light mode text color
 * @param {string} darkBg - Dark mode background
 * @param {string} darkText - Dark mode text color
 * @returns {string} Tailwind classes
 */
export const createThemedButton = (
  lightBg = 'bg-blue-500',
  lightText = 'text-white',
  darkBg = 'dark:bg-blue-600',
  darkText = 'dark:text-white'
) => {
  return `${lightBg} ${lightText} ${darkBg} ${darkText} transition-colors duration-200`;
};

/**
 * Animation/transition utilities for theme changes
 */
export const themeTransition = 'transition-colors duration-200 ease-in-out';
export const themeTransitionFast = 'transition-colors duration-100 ease-in-out';
export const themeTransitionSlow = 'transition-colors duration-500 ease-in-out';

/**
 * Box shadow utilities that adapt to theme
 */
export const themeShadows = {
  sm: 'shadow-sm dark:shadow-slate-900/50',
  md: 'shadow-md dark:shadow-slate-900/50',
  lg: 'shadow-lg dark:shadow-slate-900/50',
  xl: 'shadow-xl dark:shadow-slate-900/50',
};
