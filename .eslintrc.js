// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    "plugin:vue/recommended",
    "prettier"
  ],
  // required to lint *.vue files
  plugins: [
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "eol-last": ["error", "always"],
    "vue/multi-word-component-names": "off",
    "vue/html-indent": ["error", "space"],
    "vue/html-quotes": ["error", "double"],
    "vue/max-attributes-per-line": "off"
  }
}
