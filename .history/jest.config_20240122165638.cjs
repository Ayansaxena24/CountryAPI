// jest.config.js
module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "\\.(jpg|jpeg|png|gif|webp|svg|ico|ttf|woff|woff2|eot)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts',
  import { TextEncoder, TextDecoder } from 'util';
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecode],
  coverageReporters: ['lcov', 'text', 'html'],
};