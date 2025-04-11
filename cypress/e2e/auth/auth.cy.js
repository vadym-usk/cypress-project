import { homePage } from '../../pages/homePage';
import { registrationPopup } from '../../pages/registrationPopup';

beforeEach(function () {
    const timestamp = Date.now();
    this.uniqueEmail = Cypress.env('email').replace('@', `${timestamp}@`);
    cy.visit('/');
})

describe('Auth - Positive', () => {
    it('Check successfull registration', function () {
        homePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup()
            .enterName(Cypress.env('testData').user.name)
            .enterLastName(Cypress.env('testData').user.lastName)
            .enterEmail(this.uniqueEmail)
            .enterPassword(Cypress.env('password'))
            .reEnterPassword(Cypress.env('password'))
            .clickRegisterButton();

        cy.url().should('include', '/panel/garage');

        cy.resetSession();
        cy.login(this.uniqueEmail, Cypress.env('password'));
    });
});

describe('Auth - Negative', () => {
    it('Check registration popup with empty fields', function () {
        homePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup();
        registrationPopup.elements.nameInputField().clear();
        registrationPopup.elements.lastNameInputField().clear();
        registrationPopup.elements.emailInputField().clear();
        registrationPopup.elements.passwordInputField().clear();
        registrationPopup.elements.reEnterPasswordInputField().clear();
        registrationPopup
            .clickTitle()

        cy.contains('p', 'Name required');
        cy.contains('p', 'Last name required');
        cy.contains('p', 'Email required');
        cy.contains('p', 'Password required');
        cy.contains('p', 'Re-enter password required');

        registrationPopup.elements.registerButton().should('be.disabled')
        registrationPopup.elements.nameInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.lastNameInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.emailInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.passwordInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.reEnterPasswordInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with wrong data', function () {
        homePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup()
            .enterName(' фылаорыкуадка')
            .enterLastName('флвоы аикуло ')
            .enterEmail('testemail.com')
            .enterPassword('test')
            .reEnterPassword('test')
            .clickTitle()

        cy.contains('p', 'Name is invalid');
        cy.contains('p', 'Last name is invalid');
        cy.contains('p', 'Email is incorrect');
        cy.contains('p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        registrationPopup.elements.registerButton().should('be.disabled')
        registrationPopup.elements.nameInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.lastNameInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.emailInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.passwordInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.reEnterPasswordInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with wrong length for Name, Last Name and Password fields', function () {
        homePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup()
            .enterName('t')
            .enterLastName('testLastNametestLastN')
            .enterEmail(this.uniqueEmail)
            .enterPassword('1Gsd1Gsd1Gsd1Gsd')
            .reEnterPassword('1Gsd1Gsd1Gsd1Gsd')
            .clickTitle()

        cy.contains('p', 'Name has to be from 2 to 20 characters long');
        cy.contains('p', 'Last name has to be from 2 to 20 characters long');
        cy.contains('p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        registrationPopup.elements.registerButton().should('be.disabled')
        registrationPopup.elements.nameInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.lastNameInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.passwordInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.elements.reEnterPasswordInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with dismatched passwords', function () {
        homePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup()
            .enterName(Cypress.env('testData').user.name)
            .enterLastName(Cypress.env('testData').user.lastName)
            .enterEmail(this.uniqueEmail)
            .enterPassword(Cypress.env('email'))
            .reEnterPassword(Cypress.env('password') + '1')
            .clickTitle();

        cy.contains('p', 'Passwords do not match');

        registrationPopup.elements.registerButton().should('be.disabled')
        registrationPopup.elements.reEnterPasswordInputField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
});