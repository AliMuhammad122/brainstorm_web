import { useTheme } from '../context/ThemeContext';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

/**
 * ThemeToggle Component
 * Provides a button to switch between light and dark themes
 * @param {Object} props - Component props
 * @param {string} props.className - Optional CSS classes
 * @returns {JSX.Element} Theme toggle button
 */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors duration-200 ${
        isDark
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${className}`}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <BsSunFill size={20} />
      ) : (
        <BsMoonFill size={20} />
      )}
    </button>
  );
}
