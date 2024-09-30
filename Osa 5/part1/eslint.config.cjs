/** @type {import('eslint').Linter.FlatConfig} */
const { defineConfig } = require('eslint-define-config')
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        window: true,
        document: true,
        Promise: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    env: {
      'vitest-globals/env': true, // Added vitest-globals environment here
    },
    ignores: ['node_modules', 'dist', 'vite.config.js'],
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 0,
    },
  },
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
  },
])
