module.exports = {
    "parse": "babel-eslint",
    "extends": [
        "airbnb",
        "plugin:prettier/recommended"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "plugins": ["prettier"],
    "rules": {
        "indent": ["error", 2],
        semi: 0,
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
            }
        ],
        'no-useless-escape': 2,
        "prettier/prettier": "error"
    }
}