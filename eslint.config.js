import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores: ['node_modules', 'dist', 'coverage'], // <-- use 'ignores' instead of 'ignorePatterns'
    languageOptions: {
      globals: {
        ...globals.node, // 👈 Node.js globals (require, exports, etc.)
        ...globals.browser, // 👈 Optional, if you still need browser support too
      },
    },
    rules: {
      semi: ['error', 'always'],
      'space-before-function-paren': 'off',
    },
  },
]);
