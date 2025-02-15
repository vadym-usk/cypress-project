import { garagePage } from '../../pages/garagePage';
import { fuelExpensesPage } from '../../pages/fuelExpensesPage';

describe('Homework_20_1', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Add new car to the garage', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        
        garagePage.addCarAndSaveId('14567');
        
        garagePage.elements.addFuelExpenseButton().should('be.visible');
        garagePage.elements.carSection().should('be.visible');
    });

    it.skip('Add fuel expenses to the existing car from the Garage page', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        garagePage
            .visit()
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

    after(() => {
        //garagePage.removeCar();
    });
});