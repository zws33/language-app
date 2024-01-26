module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:import/recommended',
  ],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-extraneous-import': [
      'error',
      {
        allowModules: ['kysely-codegen'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { includeInternal: true, includeTypes: true }],
  },
  ignorePatterns: ['.eslintrc.*'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
