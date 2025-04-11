const { defineConfig } = require("cypress");
require('dotenv').config();
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const qautoFixtures = require('./cypress/fixtures/qautoFixtures.json');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
    env: {
      baseUrl: process.env.CYPRESS_BASE_URL,
      email: process.env.CYPRESS_USER_EMAIL,
      password: process.env.CYPRESS_USER_PASSWORD,
      testData: qautoFixtures,
      allure: true,
      allureResultsPath: 'allure-results'
    },
    watchForFileChanges: false,
    retries: 0,
    defaultCommandTimeout: 10000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    screenshotOnRunFailure: true,
    video: false
  }
});