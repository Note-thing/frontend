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
    plugins: ['react', 'jest', 'only-warn'],
    rules: {
        indent: ['warn', 4, { SwitchCase: 1 }],
        'react/prop-types': [0],
        'react/no-unescaped-entities': [0],
        'react/jsx-props-no-spreading': [0],
        'no-unused-vars': ['warn'],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-wrap-multilines': [
            'warn',
            { declaration: false, assignment: false }
        ],
        'comma-dangle': ['warn', 'never']
    }
};
