module.exports = {root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-native/all'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', 'react-native'],
	'overrides': [
		{
			'files': ['*.ts', '*.tsx'],
			'plugins': ['@typescript-eslint'],
			'extends': [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended'
			],
			'parser': '@typescript-eslint/parser',
			parserOptions: {
				project: ['./tsconfig.json']
			}
		}
	],
	rules: {'indent': [
		'error',
		'tab'
	],
	'linebreak-style': [
		'error',
		'unix'
	],
	// 'no-tabs': ['error', {allowIndentationTabs: false}],
	'no-mixed-spaces-and-tabs': ['error', true],
	'no-multiple-empty-lines': ['error'],
	'func-style': ['error', 'declaration'],
	'semi': [
		'error',
		'never',
		{beforeStatementContinuationChars: 'always'}
	],
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
	'space-before-blocks': [
		'error',
		'always'
	],
	'keyword-spacing': [
		'error',
		{before: true,
			after: true}
	],
	'comma-spacing': [
		'error',
		{before: false,
			after: true}
	],
	'object-curly-newline': [
		'error',
		{consistent: true}
	],
	'array-bracket-newline': [
		'error',
		'consistent'
	],
	'no-unused-vars': [
		'warn',
		{caughtErrors: 'all',
			vars: 'local',
			ignoreRestSiblings: true}
	],
	'no-console': [
		'warn', {allow: ['info', 'warn', 'error']}
	],
	'react/react-in-jsx-scope': 'off',
	'react/prop-types': 0}}
