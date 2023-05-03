/* eslint-disable */
export default {
  displayName: 'tools-build-github-workflows',
  preset: '../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/tools/build-github-workflows',
};
