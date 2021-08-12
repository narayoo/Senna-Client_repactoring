module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "commonjs":true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi" : ["warn", "always"],
        "quotes" : ["warn", "double"],
        "no-unsued-vars" : "off"
    }
};
