const { startAngularDevServer } = require('@jscutlery/cypress-angular');

module.exports = (on, config) => {

  require('../../../cypress-plugins')(on, config);

  on('dev-server:start', (options) =>
    startAngularDevServer({
      config,
      options,
      /* Fixes "src/components/...spec.ts not in files or includes" error. */
      tsConfig: 'tsconfig.e2e.json',
      webpackConfig: {
        node: {
          /* Fixes "global is not defined" error. */
          global: true,
        },
      },
    })
  );
};
