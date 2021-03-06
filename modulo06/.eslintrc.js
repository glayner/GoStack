module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    // aponta todas as regras que ele não bater com o codigo como um erro
    'prettier/prettier': 'error',
    // permiti que escreva codigo jsx em arquivo com extensão .js
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] }
    ],
    // destiva a regra que quando tem apenas 1 exoport dentro do arquivo ser um export default
    'import/prefer-default-export': 'off',
    // desativa a obrigatoriedade do state ficar no constructor
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off'
  },
};
