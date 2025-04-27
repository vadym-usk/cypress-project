import GaragePage from '../../../support/page-objects/GaragePage';
import FuelExpensesPage from '../../../support/page-objects/FuelExpensesPage';

const garagePage = new GaragePage();
const fuelExpensesPage = new FuelExpensesPage();
let currentDateFormatted;

beforeEach(() => {
    const today = new Date();
    currentDateFormatted = today.toLocaleDateString('ru-RU'); // "DD.MM.YYYY"
    cy.visit('/');
})

describe('Garage - Positive', () => {
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
            .enterExpenseMileage(Cypress.env('testData').car.mileage + 1)
            .enterNumberOfLiters(Cypress.env('testData').car.liters)
            .enterTotalCost(Cypress.env('testData').car.totalCost)
            .clickAddAnExpensePopupAddButton();
        fuelExpensesPage
            .visit()
            .assertFuelExpensesPage();
        fuelExpensesPage.elements.fuelExpensesSection().should('be.visible');
    });

    it('Check expense for the existing car', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        garagePage.assertGaragePage();
        garagePage.elements.carSection().should('be.visible');
        garagePage.elements.carTable.carLogo().should('have.attr', 'src').and('include', 'audi.png');
        garagePage.elements.carTable.carName().should('contain', Cypress.env('testData').car.carName);
        garagePage.elements.carTable.carMileageDate().should('contain', currentDateFormatted);
        fuelExpensesPage
            .visit()
            .assertFuelExpensesPage()
        fuelExpensesPage.elements.fuelExpensesSection().should('be.visible');
        fuelExpensesPage.elements.fuelExpensesTable.fuelExpensesTable().should('be.visible');
        fuelExpensesPage.elements.fuelExpensesTable.fuelExpensesDate().contains(currentDateFormatted).should('be.visible');
        fuelExpensesPage.elements.fuelExpensesTable.fuelExpensesMileage().should('contain', Cypress.env('testData').car.mileage + 1);
        fuelExpensesPage.elements.fuelExpensesTable.fuelExpensesLitersUsed().should('contain', Cypress.env('testData').car.liters);
        fuelExpensesPage.elements.fuelExpensesTable.fuelExpensesTotalCost().should('contain', Cypress.env('testData').car.totalCost);
    });
});

after(() => {
    garagePage.removeCar();
});