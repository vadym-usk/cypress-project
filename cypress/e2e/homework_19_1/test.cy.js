import { qautoHomePage } from '../../pages/qautoHomePage';
import { registrationPopup } from '../../pages/registrationPopupPage';

describe('Homework_19_1', () => {
    beforeEach(() => {
        const user = Cypress.env('user');
        const timestamp = Date.now();
        const uniqueEmail = user.email.replace('@', `+${timestamp}@`);
        Cypress.env('uniqueEmail', uniqueEmail);

        cy.visit('/');
    })

    it('Check registration popup with empty fields', function () {
        qautoHomePage
            .clickSignUpButton();
        registrationPopup.verifyRegistrationPopup()
        registrationPopup.getName().clear();
        registrationPopup.getLastName().clear();
        registrationPopup.getEmail().clear();
        registrationPopup.getPassword().clear();
        registrationPopup.getReEnterPassword().clear();
        registrationPopup.clickTitle()

        cy.contains('p', 'Name required');
        cy.contains('p', 'Last name required');
        cy.contains('p', 'Email required');
        cy.contains('p', 'Password required');
        cy.contains('p', 'Re-enter password required');

        registrationPopup.getRegisterButton().should('be.disabled')
        registrationPopup.getName().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getLastName().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getEmail().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getPassword().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getReEnterPassword().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with wrong data', function () {
        qautoHomePage
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

        registrationPopup.getRegisterButton().should('be.disabled')
        registrationPopup.getName().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getLastName().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getEmail().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getPassword().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getReEnterPassword().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with wrong length for Name, Last Name and Password fields', function () {
        qautoHomePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup()
            .enterName('t')
            .enterLastName('testLastNametestLastN')
            .enterEmail(Cypress.env('uniqueEmail'))
            .enterPassword('1Gsd1Gsd1Gsd1Gsd')
            .reEnterPassword('1Gsd1Gsd1Gsd1Gsd')
            .clickTitle()

        cy.contains('p', 'Name has to be from 2 to 20 characters long');
        cy.contains('p', 'Last name has to be from 2 to 20 characters long');
        cy.contains('p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        registrationPopup.getRegisterButton().should('be.disabled')
        registrationPopup.getName().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getLastName().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getPassword().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        registrationPopup.getReEnterPassword().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check registration popup with not matched passwords', function () {
        qautoHomePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup()
            .enterName(Cypress.env('user').name)
            .enterLastName(Cypress.env('user').lastName)
            .enterEmail(Cypress.env('uniqueEmail'))
            .enterPassword(Cypress.env('user').password)
            .reEnterPassword(Cypress.env('user').password + '1')
            .clickTitle()

        cy.contains('p', 'Passwords do not match');

        registrationPopup.getRegisterButton().should('be.disabled')
        registrationPopup.getReEnterPassword().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Check successfull registration', function () {
        qautoHomePage
            .clickSignUpButton();
        registrationPopup
            .verifyRegistrationPopup()
            .enterName(Cypress.env('user').name)
            .enterLastName(Cypress.env('user').lastName)
            .enterEmail(Cypress.env('uniqueEmail'))
            .enterPassword(Cypress.env('user').password)
            .reEnterPassword(Cypress.env('user').password)
            .clickRegisterButton();

        cy.url().should('include', '/panel/garage');

        cy.resetSession();
        cy.login(Cypress.env('uniqueEmail'), Cypress.env('user').password);
        cy.url().should('include', '/panel/garage');
    });
});