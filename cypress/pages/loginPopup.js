class LoginPopup {
    elements = {
        loginTitle: () => cy.get('h4.modal-title'),
        emailInputField: () => cy.get('#signinEmail'),
        passwordInputField: () => cy.get('#signinPassword'),
        loginButton: () => cy.get('button[type="button"]:contains("Login")')
    }

    verifyLoginPopup() {
        this.elements.loginTitle().should('have.text', 'Log in');
        return this;
    }

    enterEmail(email) {
        this.elements.emailInputField().clear().type(email);
        return this;
    }

    enterPassword(password) {
        this.elements.passwordInputField().clear().type(password, { sensitive: true });
        return this;
    }

    clickLoginButton() {
        this.elements.loginButton().click();
        return this;
    }
}

export const loginPopup = new LoginPopup();