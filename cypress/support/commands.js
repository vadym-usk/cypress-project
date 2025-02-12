import { loginPopupPage } from '../pages/loginPopupPage';
import { qautoHomePage } from '../pages/qautoHomePage';

Cypress.Commands.add('resetSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  cy.reload();
});

Cypress.Commands.add('login', (email, password) => {
  qautoHomePage
    .clickSignInButton();
  loginPopupPage
    .verifyLoginPopup()
    .enterEmail(email)
    .enterPassword(password)
    .clickLoginButton();
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