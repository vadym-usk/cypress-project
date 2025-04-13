import './commands';
import '@shelex/cypress-allure-plugin';

before(() => {
  const browser = Cypress.browser?.name || 'unknown';
  cy.allure().parameter('Browser', browser);
});