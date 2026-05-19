import config from '../../../src/dev/jest/config';

export default {
  ...config,
  roots: ['<rootDir>/plugins/bitergia-analytics-plugin'],
  testMatch: ['**/test/api/*.test.{ts,tsx,js,jsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/plugins/bitergia-analytics-plugin/build/',
    '<rootDir>/plugins/bitergia-analytics-plugin/node_modules/',
  ],
  collectCoverageFrom: [
    '<rootDir>/plugins/bitergia-analytics-plugin/test/**/*.{ts,tsx}',
    '!<rootDir>/plugins/bitergia-analytics-plugin/test/*.ts'
  ],
  clearMocks: true,
};
