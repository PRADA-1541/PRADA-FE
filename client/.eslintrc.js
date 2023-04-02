module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['react'],
  rules: {
    'arrow-body-style': 'on',
  },
};
