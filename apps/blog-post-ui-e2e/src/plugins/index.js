const {
  angularPreprocessor,
} = require('@jscutlery/cypress-angular-preprocessor');

module.exports = (on, config) => {
  require('../../../cypress-plugins')(on, config);
  on('file:preprocessor', angularPreprocessor(config));
};
