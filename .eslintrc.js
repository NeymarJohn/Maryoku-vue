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
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error",
    semi: ["error", "always"],
    "eol-last": ["error", "always"],
    "vue/max-attributes-per-line": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-indent": ["error", "tab"],
    "vue/html-quotes": ["error", "double"],
    "vue/attributes-order": ["error", "always"]

  }
}
