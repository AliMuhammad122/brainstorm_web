import { useTheme } from '../context/ThemeContext';

/**
 * Reusable AuthInput component for login/signup forms
 * @param {string} type - Input type (text, email, password)
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {boolean} required - Is field required
 * @param {React.ReactNode} icon - Optional icon element
 */
export default function AuthInput({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required = false,
  icon,
  error,
}) {
  const { isDark } = useTheme();

  return (
    <div>
      {label && (
        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-heading'}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 rounded-lg outline-none transition-colors ${
            isDark
              ? `bg-gray-800 text-white placeholder-gray-500 border ${
                  error ? 'border-red-500' : 'border-gray-700'
                } focus:border-red-500`
              : `bg-gray-100 text-heading placeholder-gray-500 border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:border-red-500`
          }`}
        />
        {icon && (
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
