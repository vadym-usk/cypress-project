class RegistrationPopup {
    elements = {
        registrationTitle: () => cy.get('h4.modal-title'),
        nameInputField: () => cy.get('#signupName'),
        lastNameInputField: () => cy.get('#signupLastName'),
        emailInputField: () => cy.get('#signupEmail'),
        passwordInputField: () => cy.get('#signupPassword'),
        reEnterPasswordInputField: () => cy.get('#signupRepeatPassword'),
        registerButton: () => cy.get("button[type='button']").contains('Register')
    };

    verifyRegistrationPopup() {
        this.elements.registrationTitle().should('have.text', 'Registration');
        return this;
    }

    enterName(name) {
        this.elements.nameInputField().clear().type(name);
        return this;
    }

    enterLastName(lastName) {
        this.elements.lastNameInputField().clear().type(lastName);
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

    reEnterPassword(password) {
        this.elements.reEnterPasswordInputField().clear().type(password, { sensitive: true });
        return this;
    }

    clickTitle() {
        this.elements.registrationTitle().click();
        return this;
    }

    clickRegisterButton() {
        this.elements.registerButton().click();
        return this;
    }
}

export const registrationPopup = new RegistrationPopup();