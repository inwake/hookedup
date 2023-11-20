const eslint = require('eslint')
const eslintJs = require('@eslint/js')
const reactNative = require('eslint-plugin-react-native')
const react = require('eslint-plugin-react')
const security = require('eslint-plugin-security')
const xss = require('eslint-plugin-xss')

const reactRecommended = require('eslint-plugin-react/configs/recommended')
const reactNativeAll = require('eslint-plugin-react-native').rulesConfig

const globals = require('eslint-plugin-react-native').environments['react-native'].globals


module.exports = [{
  // ...reactRecommendedPatched,
  ...eslintJs.configs.recommended,
  plugins: {eslint, react, 'react-native': reactNative, security, xss},
  files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
  ignores: ["node_modules/*", "**/*.config.js"],
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    parserOptions: {
      ecmaFeatures: {jsx: true}},
    globals: globals
  },
  'settings': {
    'react': {'version': 'detect'}
  },
  rules: {
    ...reactRecommended.rules,
    ...reactNativeAll,
    ...security.configs.recommended.rules,
    ...xss.configs.recommended.rules,
    'indent': [
      'error',
      2,
      {MemberExpression: 'off',
        SwitchCase: 1,
        flatTernaryExpressions: false}
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-tabs': ['error', {allowIndentationTabs: false}],
    'no-mixed-spaces-and-tabs': ['error', true],
    'no-multiple-empty-lines': ['error'],
    'func-style': ['error', 'declaration'],
    'semi': [
      'error',
      'never'
    ],
    'no-extra-semi': 'error',
    'semi-spacing': [
      'error',
      {before: false, after: true}
    ],
    'quotes': [
      'error',
      'single',
      {allowTemplateLiterals: true}
    ],
    'no-trailing-spaces': ['error'],
    'comma-dangle': [
      'error',
      'never'
    ],
    'block-spacing': [
      'error',
      'never'
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'object-curly-spacing': [
      'error',
      'never'
    ],
    'array-bracket-spacing': [
      'error',
      'never'
    ],
    'computed-property-spacing': [
      'error',
      'never'
    ],
    'func-call-spacing': [
      'error',
      'never'
    ],
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'space-before-blocks': [
      'error',
      'always'
    ],
    'keyword-spacing': [
      'error', {
        before: true,
        after: true
      }
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'object-curly-newline': [
      'error',
      {'consistent': true}
    ],
    'array-bracket-newline': [
      'error',
      'consistent'
    ],
    'no-unused-vars': [
      'warn',
      {
        caughtErrors: 'all',
        vars: 'local',
        ignoreRestSiblings: true
      }
    ],
    'no-console': [
      'warn', {allow: ['info', 'warn', 'error']}
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {maximum: 1}
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0
  }
}]
