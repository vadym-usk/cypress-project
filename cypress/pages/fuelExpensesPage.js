class FuelExpensesPage {
    static url = '/panel/expenses';

    elements = {
        fuelExpensesTitle: () => cy.get('h1'),
        fuelExpensesTable: () => cy.get('.panel-page')
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

export const fuelExpensesPage = new FuelExpensesPage();