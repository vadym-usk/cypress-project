import loginPopupFixtures from '../fixtures/loginPopupFixtures.json';

class LoginPopupPage {
    verifyLoginPopup(){
        cy.get(loginPopupFixtures.loginTitle).should('have.text', 'Log in');
        return this;
    }

    enterEmail(email) {
        cy.get(loginPopupFixtures.emailInputField).clear().type(email);
        return this;
    }

    enterPassword(password) {
        cy.get(loginPopupFixtures.passwordInputField).clear().type(password, { sensitive: true });
        return this;
    }

    clickLoginButton() {
        cy.get(loginPopupFixtures.loginButton).click();
        return this;
    }
}

export const loginPopupPage = new LoginPopupPage();