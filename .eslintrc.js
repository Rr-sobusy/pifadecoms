const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreOnInitialization: true,
      },
    ],
    'import/newline-after-import': 'error',
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true, // personal style
          pascalCase: true,
        },
      },
    ],

    // Deactivated
    '@typescript-eslint/dot-notation': 'off', // paths are used with a dot notation
    '@typescript-eslint/no-misused-promises': 'off', // onClick with async fails
    '@typescript-eslint/no-non-null-assertion': 'off', // sometimes compiler is unable to detect
    '@typescript-eslint/no-unnecessary-condition': 'off', // remove when no static data is used
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // sometimes we need to check for empty strings
    '@typescript-eslint/require-await': 'off', // Server Actions require async flag always
    'import/no-default-export': 'off', // Next.js components must be exported as default
    'import/no-extraneous-dependencies': 'off', // conflict with sort-imports plugin
    'import/order': 'off', // using custom sort plugin
    'no-nested-ternary': 'off', // personal style
    'no-redeclare': 'off', // conflict with TypeScript function overloads
    'react/jsx-fragments': 'off', // personal style
    'react/prop-types': 'off', // TypeScript is used for type checking
    '@next/next/no-img-element': 'off', // temporary disabled
    '@typescript-eslint/no-confusing-void-expression' : 'off',
    '@typescript-eslint/no-shadow' : 'off',
    'import/newline-after-import' : 'off',
    'import/named' : 'off',
    '@typescript-eslint/no-unsafe-assignment' : 'off',
    '@typescript-eslint/no-shadow' : 'off',
    '@typescript-eslint/naming-convention' : 'off',
    '@typescript-eslint/no-floating-promises' : 'off',
    '@typescript-eslint/restrict-template-expressions' : 'off',
    'react/no-unescaped-entities' : 'off',
    '@typescript-eslint/restrict-plus-operands' : 'off',
    ' @typescript-eslint/no-inferrable-types' : 'off',
    'no-constant-binary-expression' : 'off',
    ' @typescript-eslint/prefer-optional-chain' : 'off',
    'no-console' : 'off',
    ' @typescript-eslint/consistent-type-definitions' : 'off',
    ' @typescript-eslint/no-unnecessary-template-expression' : 'off',
  },
};
