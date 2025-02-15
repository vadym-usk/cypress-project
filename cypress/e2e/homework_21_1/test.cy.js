import { garagePage } from '../../pages/garagePage';
import { fuelExpensesPage } from '../../pages/fuelExpensesPage';

describe('Homework_21_1', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Add new car to the garage', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));

        garagePage.addCarAndSaveId(Cypress.env('testData').car.carMileage);

        garagePage.elements.addFuelExpenseButton().should('be.visible');
        garagePage.elements.carSection().should('be.visible');

        cy.request({
            method: 'POST',
            url: 'api/auth/signin',
            body: {
                email: Cypress.env('email'),
                password: Cypress.env('password'),
                "remember": false
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data.userId).to.equal(Cypress.env('testData').user.userId);

            return cy.request({
                method: 'GET',
                url: '/api/cars'
            });
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data[0].id).to.equal(Cypress.env('carId'));
            expect(response.body.data[0].mileage).to.equal(Cypress.env('testData').car.carMileage);
        });
    });

    after(() => {
        garagePage.removeCar();
    });
});