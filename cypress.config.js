const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
    watchForFileChanges: false,
    retries: 0,
    defaultCommandTimeout: 10000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    screenshotOnRunFailure: true,
    video: false,
    setupNodeEvents(on, config) { }
  }
});
