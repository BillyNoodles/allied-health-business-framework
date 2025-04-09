import nextPlugin from '@next/eslint-plugin-next'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next': nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Temporarily disable rules causing issues in development
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'react/no-unescaped-entities': 'warn',
      '@next/next/no-assign-module-variable': 'warn',
      'prefer-const': 'warn',
      
      // Core ESLint rules
      'no-console': 'warn',
      'no-debugger': 'warn',
      
      // React specific rules
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
    },
  },
]
