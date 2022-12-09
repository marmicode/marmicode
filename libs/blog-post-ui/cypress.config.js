const { defineConfig } = require('cypress');
const { nxComponentTestingPreset } = require('@nrwl/angular/plugins/component-testing');

module.exports =  defineConfig({
  component: nxComponentTestingPreset(__filename)
});
