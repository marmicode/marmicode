const {
  getPreprocessorConfig,
} = require('@jscutlery/cypress-harness/preprocessor-config');
const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    ...getPreprocessorConfig(),
  },
});
