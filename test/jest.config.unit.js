import config from '../../../src/dev/jest/config';

export default {
  ...config,
  roots: ['<rootDir>/plugins/bitergia-analytics-plugin'],
  testMatch: ['**/public/**/*.test.{ts,tsx,js,jsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/plugins/bitergia-analytics-plugin/build/',
    '<rootDir>/plugins/bitergia-analytics-plugin/node_modules/',
  ],
  collectCoverageFrom: [
    '<rootDir>/plugins/bitergia-analytics-plugin/public/**/*.{ts,tsx}',
    '!<rootDir>/plugins/bitergia-analytics-plugin/public/tests/*.test.{ts,tsx}',
    '!<rootDir>/plugins/bitergia-analytics-plugin/public/*.ts'
  ],
  clearMocks: true,
  coverageReporters: ['lcov', 'text', 'cobertura'],
};
