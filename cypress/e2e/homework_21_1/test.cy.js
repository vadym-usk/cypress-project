import { garagePage } from '../../pages/garagePage';
import { fuelExpensesPage } from '../../pages/fuelExpensesPage';

describe('Homework_21_1', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Add new car to the garage', function () {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        garagePage.addCarAndSaveId(Cypress.env('testData').car.mileage);
        garagePage.elements.addFuelExpenseButton().should('be.visible');
        garagePage.elements.carSection().should('be.visible');

        cy.request({
            method: 'POST',
            url: 'api/auth/signin',
            body: {
                email: Cypress.env('email'),
                password: Cypress.env('password'),
                remember: false
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('ok');
            expect(response.body.data.userId).to.equal(Cypress.env('testData').user.userId);

            return cy.request({
                method: 'GET',
                url: '/api/cars'
            });
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('ok');
            expect(response.body.data[0].id).to.equal(Cypress.env('carId'));
            expect(response.body.data[0].mileage).to.equal(Cypress.env('testData').car.mileage);
        });
    });

    it('Add new expense for the existing car', function () {
        cy.addCarExpense(
            Cypress.env('testData').user.userId,
            Cypress.env('carId'),
            Cypress.env('testData').car.mileage + 1,
            Cypress.env('testData').car.liters,
            Cypress.env('testData').car.totalCost
        ).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('ok');
            expect(response.body.data.carId).to.equal(Cypress.env('carId'));
            expect(response.body.data.reportedAt).to.equal(new Date().toISOString().split('T')[0]);
            expect(response.body.data.liters).to.equal(Cypress.env('testData').car.liters);
            expect(response.body.data.id).to.be.a('number');
            expect(response.body.data.mileage).to.equal(Cypress.env('testData').car.mileage + 1);
            expect(response.body.data.totalCost).to.equal(Cypress.env('testData').car.totalCost);
        });
    });

    after(() => {
        garagePage.removeCar();
    });
});