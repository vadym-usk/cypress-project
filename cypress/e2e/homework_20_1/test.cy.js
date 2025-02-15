import { garagePage } from '../../pages/garagePage';
import { fuelExpensesPage } from '../../pages/fuelExpensesPage';

describe('Homework_20_1', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Add new car to the garage', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        garagePage
            .assertGaragePage()
            .clickAddCarButton()
            .enterMileage(Cypress.env('testData').car.mileage)
            .clickAddCarPopupAddButton();
        garagePage.elements.addFuelExpenseButton().should('be.visible');
        garagePage.elements.carSection().should('be.visible');
    });

    it('Add fuel expenses for the existing car from the Garage page', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        garagePage
            .visit()
            .clickAddFuelExpenseButton()
            .assertAddAnExpenseTitle()
            .enterExpenseMileage(Cypress.env('testData').car.mileage)
            .enterNumberOfLiters(Cypress.env('testData').car.liters)
            .enterTotalCost(Cypress.env('testData').car.totalCost)
            .clickAddAnExpensePopupAddButton();
        fuelExpensesPage
            .visit()
            .assertFuelExpensesPage();
        fuelExpensesPage.elements.fuelExpensesTable().should('be.visible');
    });

    after(() => {
        garagePage.removeCar();
    });
});