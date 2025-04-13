import './commands';
import '@shelex/cypress-allure-plugin';

beforeEach(() => {
  const browserName = Cypress.browser.name;
  cy.allure().tag(`browser: ${browserName}`);
});