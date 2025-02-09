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
    cy.get(loginPopupFixtures.passwordInputField).clear().type(password);
    cy.get(loginPopupFixtures.loginButton).click();
});