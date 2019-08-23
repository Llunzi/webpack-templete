module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['prettier'],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      modules: true,
      jsx: true,
      forOf: true,
      blockBindings: true,
      arrowFunctions: true,
      classes: true,
      defaultParams: true,
      destructuring: true,
      generators: true,
      restParams: true,
      spread: true,
      superInFunctions: true,
      templateStrings: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "no-undef": "off"
  }
}
