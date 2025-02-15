import { garagePage } from '../../pages/garagePage';
import { fuelExpensesPage } from '../../pages/fuelExpensesPage';

describe('Homework_20_1', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Add car to garage and fuel expenses', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));
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