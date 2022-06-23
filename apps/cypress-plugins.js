const webpackPreprocessor = require('@cypress/webpack-batteries-included-preprocessor');
module.exports = (on, config) => {

  /* Setup Percy. */
  on('task', require('@percy/cypress/task'));

  /* @hack fix error. */
  on('file:preprocessor', getWebpackPreprocessor());

  return config;
};

function getWebpackPreprocessor() {
  const webpackOptions = webpackPreprocessor.defaultOptions.webpackOptions;

  webpackOptions.module.rules.unshift({
    test: /[/\\]@angular[/\\].+\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
    use: {
      loader: 'babel-loader',
      options: {
        plugins: ['@angular/compiler-cli/linker/babel'],
        compact: false,
        cacheDirectory: true,
      },
    },
  });

  return webpackPreprocessor({
    webpackOptions: webpackOptions,
    typescript: require.resolve('typescript'),
  });
}
