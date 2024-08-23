import eslintImport from 'eslint-plugin-import';
import eslintTs from '@typescript-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin-js';
import tsParser from '@typescript-eslint/parser';
import styleisticTs from '@stylistic/eslint-plugin-ts';

export default [
	{
		files: [
			`**/*.js`,
			`**/*.cjs`,
			`**/*.mjs`,
			`**/*.jsx`,
			`**/*.ts`,
			`**/*.tsx`,
		],
		ignores: [`node_modules`, `dist`],
		languageOptions: {
			parser: tsParser,
		},
		plugins: {
			'import': eslintImport,
			'@typescript-eslint': eslintTs,
			'@stylistic': stylistic,
			'@stylistic/ts': styleisticTs,
		},
		rules: {
			'@stylistic/indent': [
				`error`,
				`tab`,
				{
					SwitchCase: 1,
					VariableDeclarator: 1,
				},
			],
			'@stylistic/arrow-spacing': [
				`error`,
				{
					before: true,
					after: true,
				},
			],
			'@stylistic/comma-dangle': [
				`error`,
				{
					objects: `only-multiline`,
					arrays: `only-multiline`,
					imports: `never`,
					exports: `never`,
					functions: `never`,
				},
			],
			'no-var': `error`,
			'no-unused-vars': 1,
			'one-var': [`error`, `never`],
			'@stylistic/quotes': [`error`, `backtick`],
			'no-param-reassign': 0,
			'class-methods-use-this': 0,
			'import/order': [
				`error`,
				{
					groups: [
						`builtin`,
						`external`,
						`internal`,
						`parent`,
						`sibling`,
						`index`,
						`object`,
						`type`,
					],
				},
			],
			'@typescript-eslint/consistent-type-imports': [
				`error`,
				{
					prefer: `type-imports`,
					fixStyle: `separate-type-imports`,
				},
			],
			'@stylistic/brace-style': [`error`, `stroustrup`],
		},
	},
];
