module.exports = {
  env: {
    browser: true,
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
    'prettier',
    'react-hooks'
  ],
  rules: {
     // aponta todas as regras que ele não bater com o codigo como um erro
     'prettier/prettier': 'error',
     // permiti que escreva codigo jsx em arquivo com extensão .js
     'react/jsx-filename-extension': [
       'warn',
       { extensions: ['.jsx', '.js'] }
     ],
     // destiva a regra que quando tem apenas 1 export dentro do arquivo ser um export default
     'import/prefer-default-export': 'off',
     // desativa a obrigatoriedade do state ficar no constructor
     'react/state-in-constructor': 'off',
     // permitir que use console.tron
     'no-console': ["error", {allow: ["tron"]}],
     // permitir que altere parametro recebido na função
     'no-param-reassign': 'off',

     'react-hooks/rules-of-hooks': 'error',
     'react-hooks/exhaustive-deps': 'warn'
  },
};
