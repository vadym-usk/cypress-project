import './commands';
import '@shelex/cypress-allure-plugin';

before(() => {
    if (Cypress.Allure) {
      const browser = Cypress.browser.name;
      Cypress.Allure.reporter.getInterface().addParameter('Browser', browser);
    }
  });