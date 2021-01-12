const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', preprocessTypescript(config));
  on('task', require('@percy/cypress/task'));
};
