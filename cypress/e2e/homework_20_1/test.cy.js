import { garagePage } from '../../pages/garagePage';
import { fuelExpensesPage } from '../../pages/fuelExpensesPage';

describe('Homework_20_1', () => {
    beforeEach(() => {
        const user = Cypress.env('user');
        cy.visit('/');
    })

    it.only('Add car to garage and fuel expenses for https://qauto.forstudy.space/', function () {
        cy.login('test-email+1@gmail.com', 'Secretpass123');
        garagePage
            .assertGaragePage()
            .clickAddCarButton()
            .enterMileage('14567')
            .clickAddCarPopupAddButton();
        garagePage.elements.addFuelExpenseButton().should('be.visible');
        garagePage.elements.carSection().should('be.visible');
        garagePage
            .clickAddFuelExpenseButton()
            .assertAddAnExpenseTitle()
            .enterExpenseMileage('14590')
            .enterNumberOfLiters('5')
            .enterTotalCost(20000)
            .clickAddAnExpensePopupAddButton();
        fuelExpensesPage
            .visit()
            .assertFuelExpensesPage();
        fuelExpensesPage.elements.fuelExpensesTable().should('be.visible');
    });

    it('Add car to garage and fuel expenses for https://qauto2.forstudy.space/', function () {
        cy.login('test-email+2@gmail.com', 'Secretpass123');
        garagePage
            .assertGaragePage()
            .clickAddCarButton()
            .enterMileage('14567')
            .clickAddCarPopupAddButton();
        garagePage.elements.addFuelExpenseButton().should('be.visible');
        garagePage.elements.carSection().should('be.visible');
        garagePage
            .clickAddFuelExpenseButton()
            .assertAddAnExpenseTitle()
            .enterExpenseMileage('14590')
            .enterNumberOfLiters('5')
            .enterTotalCost(20000)
            .clickAddAnExpensePopupAddButton();
        fuelExpensesPage
            .visit()
            .assertFuelExpensesPage();
        fuelExpensesPage.elements.fuelExpensesTable().should('be.visible');
    });

    afterEach(() => {
        garagePage.removeCar();
    });

});