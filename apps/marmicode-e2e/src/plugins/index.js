const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');

module.exports = (on, config) => {
  /* @hack this is still needed because @jscutlery/cypress-harness
   * needs @angular/cdk/testing and it produces the following error:
   *   Can't resolve '@angular/cdk/testing':
   *   Field 'browser' doesn't contain a valid alias configuration
   *   using description file: node_modules/@angular/cdk/package.json (relative path: ./testing) 
   * It seems that the default webpack config doesn't support Angular Package Format. */
  on('file:preprocessor', preprocessTypescript(config));

  require('../../../cypress-plugins')(on, config);

  return config;
};
