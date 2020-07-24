module.exports = {
  name: 'shared-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shared-utils',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
