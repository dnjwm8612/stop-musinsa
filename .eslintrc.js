module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 0,
    'linebreak-style': 0,
    'max-len': 0,
    'new-cap': 0,
    'space-infix-ops': 1,
  },
};
