module.exports = {
  name: 'resource-feature-search',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/resource-feature-search',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
