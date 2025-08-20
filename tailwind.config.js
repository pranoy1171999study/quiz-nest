const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],

  theme: {
    /**
     * se this for normal switch
     */
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#1E40AF',
          light: '#60A5FA',
          dark: '#1E3A8A',
          foreground: '#ffffff',  // text color on primary bg
        },
        secondary: {
          DEFAULT: '#D97706',
          light: '#FBBF24',
          dark: '#92400E',
          foreground: '#ffffff',
        },

        // Backgrounds
        background: {
          DEFAULT: '#f9fafb',
          light: '#ffffff',
          dark: '#111827',
          muted: '#f3f4f6',
          subtle: '#e5e7eb',
        },

        // Surface (Cards, Panels)
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1f2937',
          border: '#e5e7eb',
          shadow: '#0000001a',
        },

        // Text
        text: {
          DEFAULT: '#111827',
          muted: '#6b7280',
          light: '#f9fafb',
          dark: '#1f2937',
          link: '#2563eb',
          inverse: '#ffffff',
          error: '#dc2626',
          success: '#16a34a',
          warning: '#f59e0b',
          info: '#3b82f6',
        },

        // Status & Alerts
        success: {
          DEFAULT: '#16a34a',
          bg: '#d1fae5',
          text: '#065f46',
        },
        warning: {
          DEFAULT: '#f59e0b',
          bg: '#fef3c7',
          text: '#92400e',
        },
        danger: {
          DEFAULT: '#dc2626',
          bg: '#fee2e2',
          text: '#7f1d1d',
        },
        info: {
          DEFAULT: '#3b82f6',
          bg: '#dbeafe',
          text: '#1e3a8a',
        },

        // Grayscale for utility spacing
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      }

    }
  },

  plugins: [
    //use for quiz
  ],
};
