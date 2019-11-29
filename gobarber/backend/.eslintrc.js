module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins:['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",   //desabilita obrigatoriedade de this. nas classes/metodos
    "no-param-reassign": "off",       // permite que receba um parametro e faça alterações com ele
    "camelcase": "off",              // permite que tenha variaveis não camelcase
    "no-unused-vars": ["error",{"argsIgnorePattern": "next"}] // permite que declare a variavel next sem usa-la
  },
};
