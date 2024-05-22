module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react-refresh'],
    globals: {
        process: 'readonly',
        REACT_APP_PUBLIC_BACKEND_DOMAIN: 'readonly',
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        'no-unused-vars': ['warn', {varsIgnorePattern: '^React$'}],
        'prettier/prettier': 'warn', // Added for Prettier integration
    },
};
