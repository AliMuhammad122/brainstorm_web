import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable AuthLayout component for auth pages
 * Provides consistent styling and banner across login, signup, forgot password pages
 */
export default function AuthLayout({ children, className = '' }) {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${isDark ? 'bg-black' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-sm rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-black' : 'bg-white'} ${className}`}>
        {/* Header Banner */}
        <div className="relative w-full h-48 bg-gradient-to-r from-red-500 to-red-600">
          <Image
            src="/assets/icons/image.svg"
            alt="Auth Banner"
            fill
            className="object-cover"
          />
          {/* Decorative SVG Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 10,10 L 10,90 Q 20,50 10,10"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 30,10 L 30,90 Q 40,50 30,10"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 50,10 L 50,90 Q 60,50 50,10"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 70,10 L 70,90 Q 80,50 70,10"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 90,10 L 90,90 Q 100,50 90,10"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Form Content */}
        <div className={`px-6 md:px-8 py-8 ${isDark ? 'bg-black' : 'bg-white'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
