class GaragePage {
    static url = '/panel/garage';

    elements = {
        garageTitle: () => cy.get('h1'),
        addCarButton: () => cy.get("button").contains('Add car'),
        carSection: () => cy.get('.car'),

        addCarPopup: {
            addCarTitle: () => cy.get('h4.modal-title'),
            brandInputField: () => cy.get('#addCarBrand'),
            modelInputField: () => cy.get('#addCarModel'),
            mileageInputField: () => cy.get('#addCarMileage'),
            addButton: () => cy.get("button[type='button']").contains('Add')
        },

        carEditButton: () => cy.get('button.car_edit'),

        editCarPopup: {
            removeCarButton: () => cy.get("button[type='button']").contains('Remove car'),
            removeCarPopup: {
                removeButton: () => cy.get("button[type='button']").contains('Remove')
            }
        },

        addFuelExpenseButton: () => cy.get("button").contains('Add fuel expense'),

        addAnExpensePopup: {
            addAnExpenseTitle: () => cy.get('h4.modal-title'),
            vehicleInputField: () => cy.get('#addExpenseCar'),
            reportDateField: () => cy.get('#addExpenseDate'),
            mileageInputField: () => cy.get('#addExpenseMileage'),
            numberOfLitersInputField: () => cy.get('#addExpenseLiters'),
            totalCostInputField: () => cy.get('#addExpenseTotalCost'),
            addButton: () => cy.get("button[type='button']").contains('Add')
        }
    };

    visit() {
        cy.visit('/' + GaragePage.url);
        return this;
    }

    assertGaragePage() {
        this.elements.garageTitle().should('have.text', 'Garage');
        cy.url().should('include', GaragePage.url);
        return this;
    }

    clickAddCarButton() {
        this.elements.addCarButton().click();
        return this;
    }

    enterMileage(mileage) {
        this.elements.addCarPopup.mileageInputField().clear().type(mileage);
        return this;
    }

    clickAddCarPopupAddButton() {
        this.elements.addCarPopup.addButton().click();
        return this;
    }

    clickAddFuelExpenseButton() {
        this.elements.addFuelExpenseButton().click();
        return this;
    }

    assertAddAnExpenseTitle() {
        this.elements.addAnExpensePopup.addAnExpenseTitle().should('have.text', 'Add an expense');
        return this;
    }

    enterExpenseMileage(ExpenseMileage) {
        this.elements.addAnExpensePopup.mileageInputField().clear().type(ExpenseMileage);
        return this;
    }

    enterNumberOfLiters(numberOfLiters) {
        this.elements.addAnExpensePopup.numberOfLitersInputField().clear().type(numberOfLiters);
        return this;
    }

    enterTotalCost(totalCost) {
        this.elements.addAnExpensePopup.totalCostInputField().clear().type(totalCost);
        return this;
    }

    clickAddAnExpensePopupAddButton() {
        this.elements.addAnExpensePopup.addButton().click();
        return this;
    }

    removeCar() {
        cy.visit(GaragePage.url);
        this.elements.carEditButton().click();
        this.elements.editCarPopup.removeCarButton().click();
        this.elements.editCarPopup.removeCarPopup.removeButton().filter((_, el) => el.textContent.trim() === 'Remove').click();
    }
}

export const garagePage = new GaragePage();