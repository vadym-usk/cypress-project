import registrationPopupFixtures from '../fixtures/registrationPopupFixtures.json';

class RegistrationPopup {
    verifyRegistrationPopup() {
        cy.get(registrationPopupFixtures.registrationTitle).should('have.text', 'Registration');
        return this;
    }

    getName() {
        return cy.get(registrationPopupFixtures.nameInputField);
    }

    enterName(name) {
        cy.get(registrationPopupFixtures.nameInputField).clear().type(name);
        return this;
    }

    getLastName() {
        return cy.get(registrationPopupFixtures.lastNameInputField);
    }

    enterLastName(lastName) {
        cy.get(registrationPopupFixtures.lastNameInputField).clear().type(lastName);
        return this;
    }

    getEmail() {
        return cy.get(registrationPopupFixtures.emailInputField);
    }

    enterEmail(email) {
        cy.get(registrationPopupFixtures.emailInputField).clear().type(email);
        return this;
    }

    getPassword() {
        return cy.get(registrationPopupFixtures.passwordInputField);
    }

    enterPassword(password) {
        cy.get(registrationPopupFixtures.passwordInputField).clear().type(password, { sensitive: true });
        return this;
    }

    getReEnterPassword() {
        return cy.get(registrationPopupFixtures.reEnterPasswordInputField);
    }

    reEnterPassword(password) {
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).clear().type(password, { sensitive: true });
        return this;
    }

    clickTitle() {
        cy.get(registrationPopupFixtures.registrationTitle).click();
        return this;
    }

    getRegisterButton() {
        return cy.get(registrationPopupFixtures.registerButton);
    }

    clickRegisterButton() {
        cy.get(registrationPopupFixtures.registerButton).click();
        return this;
    }
}

export const registrationPopup = new RegistrationPopup();