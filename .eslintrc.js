module.exports = {
  extends: [
    'eslint:recommended',
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        '@typescript-eslint/no-use-before-define': ['error'],
        'max-len': ['error', { code: 120 }],
        'newline-before-return': 'error',
        'react/jsx-indent-props': ['error', 2],
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'react-hooks/exhaustive-deps': 'warn',
        'import/no-duplicates': 'error',
        'no-console': 'warn',
        semi: 'error',
        'space-infix-ops': 'warn',
        'space-unary-ops': 'warn',
      },
    },
  ],
};
