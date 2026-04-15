import { createContext, useContext, useEffect, useState } from 'react';

const themeTokens = {
  light: {
    bg: '#ffffff',
    bgCard: '#f6f7f8',
    bgHeader: '#ffffff',
    text: '#111',
    textMuted: '#777',
    textSubtle: '#999',
    border: '#e8e8e8',
    primary: '#DA1A35',
    headerBg: '#ffffff',
    headerText: '#111',
  },
  dark: {
    bg: '#0b0b0b',
    bgCard: '#1c1c1e',
    bgHeader: '#0b0b0b',
    text: '#ffffff',
    textMuted: '#9b9b9b',
    textSubtle: '#6f6f6f',
    border: '#2a2a2a',
    primary: '#DA1A35',
    headerBg: '#0b0b0b',
    headerText: '#ffffff',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem('theme') || 'system';
    setThemeMode(storedMode);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialResolved =
      storedMode === 'system' ? (prefersDark ? 'dark' : 'light') : storedMode;
    setResolvedTheme(initialResolved);
    applyTheme(initialResolved);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (themeMode !== 'system') return;
      const next = e.matches ? 'dark' : 'light';
      setResolvedTheme(next);
      applyTheme(next);
    };
    if (media.addEventListener) {
      media.addEventListener('change', handleChange);
    } else {
      media.addListener(handleChange);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, [themeMode]);

  const applyTheme = (themeName) => {
    const html = document.documentElement;
    if (themeName === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const setTheme = (mode) => {
    const nextMode = mode || 'system';
    setThemeMode(nextMode);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextResolved =
      nextMode === 'system' ? (prefersDark ? 'dark' : 'light') : nextMode;
    setResolvedTheme(nextResolved);
    applyTheme(nextResolved);
    localStorage.setItem('theme', nextMode);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const value = {
    theme: themeMode,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    mounted,
    /** Design tokens - use for colors, backgrounds, etc. */
    tokens: themeTokens[resolvedTheme] || themeTokens.light,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
