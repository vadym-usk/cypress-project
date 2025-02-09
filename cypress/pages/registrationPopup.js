import qautoHomepageFixtures from '../fixtures/qautoHomepageFixtures.json';
import registrationPopupFixtures from '../fixtures/registrationPopupFixtures.json';

class Registration {
    signUpUser(name, lastName, email, password) {
        const timestamp = Date.now();
        const uniqueEmail = Cypress.env('user').email.replace('@', `+${timestamp}@`);

        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).contains('Sign up').click();
        cy.get(registrationPopupFixtures.nameInputField).clear().type(Cypress.env('user').name);
        cy.get(registrationPopupFixtures.lastNameInputField).clear().type(Cypress.env('user').lastName);
        cy.get(registrationPopupFixtures.emailInputField).clear().type(uniqueEmail);
        cy.get(registrationPopupFixtures.passwordInputField).clear().type(Cypress.env('user').password);
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).clear().type(Cypress.env('user').password);
        cy.get(registrationPopupFixtures.registerButton).click();
    }
}

export const registration = new Registration();