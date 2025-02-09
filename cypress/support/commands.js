import qautoHomepageFixtures from '../fixtures/qautoHomepageFixtures.json';
import loginPopupFixtures from '../fixtures/loginPopupFixtures.json';

Cypress.Commands.add('resetSession', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
    cy.reload();
});

Cypress.Commands.add('login', (email, password) => {
    cy.resetSession();
    cy.get(qautoHomepageFixtures.Header.buttons.signInButton).contains('Sign In').click();
    cy.get(loginPopupFixtures.loginTitle).should('have.text', 'Log in');
    cy.get(loginPopupFixtures.emailInputField).clear().type(email);
    cy.get(loginPopupFixtures.passwordInputField).clear().type(password, { sensitive: true });
    cy.get(loginPopupFixtures.loginButton).click();
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      // turn off original log
      options.log = false
      // create our own log with masked message
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      })
    }
  
    return originalFn(element, text, options)
  })