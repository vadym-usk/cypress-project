describe('Homework_18_1', () => {
    beforeEach(() => {
        Cypress.config('baseUrl', 'https://guest:welcome2qauto@qauto.forstudy.space');
        cy.visit('/');
        cy.fixture('qautoHomepageFixtures').as('selector');
    })

    it('Check all header buttons', function () {
        cy.get(this.selector.Header.logo).should('be.visible');
        cy.get(this.selector.Header.buttons.homeButton).contains('Home').should('be.visible');
        cy.get(this.selector.Header.buttons.aboutButton).contains('About').should('be.visible');
        cy.get(this.selector.Header.buttons.contactsButton).contains('Contacts').should('be.visible');
        cy.get(this.selector.Header.buttons.guestLoginButton).contains('Guest log in').should('be.visible');
        cy.get(this.selector.Header.buttons.signInButton).contains('Sign In').should('be.visible');
        cy.get(this.selector.Header.buttons.signUpButton).contains('Sign up').should('be.visible');
    });

    it('Check all footer buttons and links', function () {
        cy.get(this.selector.Footer.socialLinks.facebook).should('be.visible');
        cy.get(this.selector.Footer.socialLinks.telegram).should('be.visible');
        cy.get(this.selector.Footer.socialLinks.youtube).should('be.visible');
        cy.get(this.selector.Footer.socialLinks.instagram).should('be.visible');
        cy.get(this.selector.Footer.socialLinks.linkedin).should('be.visible');
        cy.get(this.selector.Footer.contacts.hillel).should('be.visible');
        cy.get(this.selector.Footer.contacts.email).should('be.visible');
        cy.get(this.selector.Footer.logo).should('be.visible');
    });
});