const path = require('node:path');
const { includeIgnoreFile } = require('@eslint/compat');
const osdConfig = require('@elastic/eslint-config-kibana');

module.exports = [
  includeIgnoreFile(path.resolve(__dirname, '.gitignore')),
  ...osdConfig,
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    rules: {
      '@osd/eslint/require-license-header': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'off',
    },
  },
];
