import { loginPopup } from '../pages/loginPopup';
import { homePage } from '../pages/homePage';

Cypress.Commands.add('resetSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  cy.reload();
});

Cypress.Commands.add('login', (email, password) => {
  homePage
    .clickSignInButton();
  loginPopup
    .verifyLoginPopup()
    .enterEmail(email)
    .enterPassword(password)
    .clickLoginButton();
  cy.url().should('include', '/panel/garage');
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})