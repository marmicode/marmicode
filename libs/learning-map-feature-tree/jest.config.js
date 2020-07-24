module.exports = {
  name: 'learning-map-feature-tree',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/learning-map-feature-tree',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
