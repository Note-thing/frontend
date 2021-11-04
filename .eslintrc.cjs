module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', 'jest'],
    rules: {
        indent: ['warn', 4, { SwitchCase: 1 }],
        'react/prop-types': 'warn',
        'no-unused-vars': ['warn'],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/no-unescaped-entities': 'warn',
        'react/jsx-wrap-multilines': [
            'warn',
            { declaration: false, assignment: false }
        ],
        'comma-dangle': ['warn', 'never'],
        'react/jsx-props-no-spreading': 'warn',
        'consistent-return': 'warn',
        'react/destructuring-assignment': 'warn',
        'jsx-a11y/anchor-is-valid': 'warn',
        'react/no-array-index-key': 'warn',
        'import/prefer-default-export': 'warn',
        'no-shadow': 'warn'
    }
};
