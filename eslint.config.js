import js from '@eslint/js'
import reactQuery from '@tanstack/eslint-plugin-query'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.stylisticTypeChecked,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactX.configs['recommended-typescript'],
      reactQuery.configs['flat/recommended'],
      reactDom.configs.recommended,
      reactRefresh.configs.vite,
      prettierPluginRecommended
    ],
    plugins: {
      'better-tailwindcss': betterTailwindcss
    },
    rules: {
      'prettier/prettier': 'off',
      ...betterTailwindcss.configs.recommended.rules,
      'better-tailwindcss/enforce-consistent-class-order': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off'
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/assets/styles/globals.css'
      }
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
])
