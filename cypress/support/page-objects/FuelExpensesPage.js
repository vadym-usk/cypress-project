export default class FuelExpensesPage {
    static url = '/panel/expenses';

    elements = {
        fuelExpensesTitle: () => cy.get('h1'),
        fuelExpensesSection: () => cy.get('.panel-page'),
        fuelExpensesTable: {
            fuelExpensesTable: () => cy.get('table.expenses_table'),
            fuelExpensesDate: () => cy.get('td').eq(0),
            fuelExpensesMileage: () => cy.get('td').eq(1),
            fuelExpensesLitersUsed: () => cy.get('td').eq(2),
            fuelExpensesTotalCost: () => cy.get('td').eq(3)
        }
    };

    visit() {
        cy.visit(FuelExpensesPage.url);
        return this;
    }

    assertFuelExpensesPage() {
        this.elements.fuelExpensesTitle().should('have.text', 'Fuel expenses');
        cy.url().should('include', FuelExpensesPage.url);
        return this;
    }
}