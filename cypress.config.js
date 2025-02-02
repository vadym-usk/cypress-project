const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://example.com",
    watchForFileChanges: false,
    retries: 2,
    defaultCommandTimeout: 10000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    screenshotOnRunFailure: true,
    video: false,
    setupNodeEvents(on, config) {}
  }
});
