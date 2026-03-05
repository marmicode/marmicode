/* eslint-disable */
export default {
  preset: '../jest.preset.js',
  coverageDirectory: '../../coverage/apps/marmicode',

  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  globals: {},
  displayName: 'marmicode',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/__mocks__/image-stub.js',
  },
  testMatch: ['**/*.jest.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.(html|svg)$',

        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
