import qautoHomepageFixtures from '../../fixtures/qautoHomepageFixtures.json';
import registrationPopupFixtures from '../../fixtures/registrationPopupFixtures.json';

describe('Homework_19_1', () => {
    beforeEach(() => {
        const user = Cypress.env('user');
        const timestamp = Date.now();
        const uniqueEmail = user.email.replace('@', `+${timestamp}@`);
        Cypress.env('uniqueEmail', uniqueEmail);

        cy.visit('/');
    })

    it('Check registration popup with empty fields', function () {
        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).contains('Sign up').click();
        cy.get(registrationPopupFixtures.nameInputField).clear();
        cy.get(registrationPopupFixtures.lastNameInputField).clear();
        cy.get(registrationPopupFixtures.emailInputField).clear();
        cy.get(registrationPopupFixtures.passwordInputField).clear();
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).clear();
        cy.get(registrationPopupFixtures.registrationTitle).click();

        cy.contains('p', 'Name required');
        cy.contains('p', 'Last name required');
        cy.contains('p', 'Email required');
        cy.contains('p', 'Password required');
        cy.contains('p', 'Re-enter password required');

        cy.get(registrationPopupFixtures.registerButton).should('be.disabled');
        cy.get(registrationPopupFixtures.nameInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.lastNameInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.emailInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.passwordInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with wrong data', function () {
        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).contains('Sign up').click();
        cy.get(registrationPopupFixtures.nameInputField).clear().type(' фылаорыкуадка');
        cy.get(registrationPopupFixtures.lastNameInputField).clear().type('флвоы аикуло ');
        cy.get(registrationPopupFixtures.emailInputField).clear().type('testemail.com');
        cy.get(registrationPopupFixtures.passwordInputField).clear().type('test');
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).clear().type('test');
        cy.get(registrationPopupFixtures.registrationTitle).click();

        cy.contains('p', 'Name is invalid');
        cy.contains('p', 'Last name is invalid');
        cy.contains('p', 'Email is incorrect');
        cy.contains('p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        cy.get(registrationPopupFixtures.registerButton).should('be.disabled');
        cy.get(registrationPopupFixtures.nameInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.lastNameInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.emailInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.passwordInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with wrong length for Name, Last Name and Password fields', function () {
        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).contains('Sign up').click();
        cy.get(registrationPopupFixtures.nameInputField).clear().type('t');
        cy.get(registrationPopupFixtures.lastNameInputField).clear().type('testLastNametestLastN');
        cy.get(registrationPopupFixtures.emailInputField).clear().type(Cypress.env('uniqueEmail'));
        cy.get(registrationPopupFixtures.passwordInputField).clear().type('1Gsd1Gsd1Gsd1Gsd');
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).clear().type('1Gsd1Gsd1Gsd1Gsd');
        cy.get(registrationPopupFixtures.registrationTitle).click();

        cy.contains('p', 'Name has to be from 2 to 20 characters long');
        cy.contains('p', 'Last name has to be from 2 to 20 characters long');
        cy.contains('p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        cy.get(registrationPopupFixtures.registerButton).should('be.disabled');
        cy.get(registrationPopupFixtures.nameInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.lastNameInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.passwordInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with not matched passwords', function () {
        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).contains('Sign up').click();
        cy.get(registrationPopupFixtures.nameInputField).clear().type(Cypress.env('user').name);
        cy.get(registrationPopupFixtures.lastNameInputField).clear().type(Cypress.env('user').lastName);
        cy.get(registrationPopupFixtures.emailInputField).clear().type(Cypress.env('uniqueEmail'));
        cy.get(registrationPopupFixtures.passwordInputField).clear().type(Cypress.env('user').password, { sensitive: true });
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).clear().type(Cypress.env('user').password + '1', { sensitive: true });
        cy.get(registrationPopupFixtures.registrationTitle).click();

        cy.contains('p', 'Passwords do not match');

        cy.get(registrationPopupFixtures.registerButton).should('be.disabled');
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check successfull registration', function () {
        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).contains('Sign up').click();
        cy.get(registrationPopupFixtures.registrationTitle).should('have.text', 'Registration');
        cy.get(registrationPopupFixtures.nameInputField).clear().type(Cypress.env('user').name);
        cy.get(registrationPopupFixtures.lastNameInputField).clear().type(Cypress.env('user').lastName);
        cy.get(registrationPopupFixtures.emailInputField).clear().type(Cypress.env('uniqueEmail'));
        cy.get(registrationPopupFixtures.passwordInputField).clear().type(Cypress.env('user').password, { sensitive: true });
        cy.get(registrationPopupFixtures.reEnterPasswordInputField).clear().type(Cypress.env('user').password, { sensitive: true });
        cy.get(registrationPopupFixtures.registerButton).click();

        cy.url().should('include', '/panel/garage');

        cy.login(Cypress.env('uniqueEmail'), Cypress.env('user').password);
    });
});