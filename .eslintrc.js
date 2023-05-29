module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        'array-bracket-spacing': ['error', 'never'],
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],
        'no-multi-spaces': ['error'],
        'no-unused-vars': ['error', {
            'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false,
            'argsIgnorePattern': '^_',
            'varsIgnorePattern': '^_',
            'caughtErrorsIgnorePattern': '^_'
        }],
        'object-curly-spacing': ['error', 'always'],
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'react/prop-types': ['off'],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-var-requires': 0
    }
}
