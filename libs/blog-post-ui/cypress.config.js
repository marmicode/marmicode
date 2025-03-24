const { defineConfig } = require('cypress');
const {
  nxComponentTestingPreset,
} = require('@nx/angular/plugins/component-testing');

module.exports = defineConfig({
  component: nxComponentTestingPreset(__filename),
});
