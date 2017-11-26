module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': [ 'error', 4 ],
        'semi': [ 'error', 'always' ],
        'brace-style': [ 'error', 'stroustrup' ],
        'no-undef': 'error',
        'no-trailing-spaces': [ 'error', { skipBlankLines: true } ]
    }
};
