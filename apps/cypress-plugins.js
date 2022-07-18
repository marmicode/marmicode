module.exports = (on, config) => {
  /* Setup Percy. */
  on('task', require('@percy/cypress/task'));

  return config;
};
