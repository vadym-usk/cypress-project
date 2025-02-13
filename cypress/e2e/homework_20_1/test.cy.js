import { homePage } from '../../pages/homePage';
import { garagePage } from '../../pages/garagePage';

describe('Homework_20_1', () => {
    beforeEach(() => {
        const user = Cypress.env('user');
        cy.visit('/');
    })

    it.only('Add car to garage and fuel expenses for https://qauto.forstudy.space/', function () {
        cy.login('test-email+1@gmail.com', 'Secretpass123');

        garagePage
            .assertGarageTitle()
            .clickAddCarButton()
            .enterMileage('14567')
            .clickAddCarPopupAddButton();

        //garagePage.elements.addFuelExpenseButton().should('be.visible');
        //garagePage.elements.carSectionElement().should('be.visible');

        garagePage
            .clickAddFuelExpenseButton()
            .assertAddAnExpenseTitle()
            .enterExpenseMileage('14590')
            .enterNumberOfLiters('5')
            .enterTotalCost(20000)
            .clickAddAnExpensePopupAddButton();

        //here
    });

    it('Add car to garage and fuel expenses for https://qauto2.forstudy.space/', function () {
        homePage
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

    afterEach(() => {
        garagePage.removeCar();
    });

});