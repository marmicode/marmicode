module.exports = {
  name: 'marmicode',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/marmicode',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
