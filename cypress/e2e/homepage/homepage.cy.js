import { homePage } from '../../pages/homePage';

beforeEach(() => {
    cy.visit('/');
})

describe('Homepage - Positive', () => {
    it('Check all header buttons', function () {
        homePage.elements.header.logo().should('be.visible')
        homePage.elements.header.buttons.homeButton().contains('Home').should('be.visible')
        homePage.elements.header.buttons.aboutButton().contains('About').should('be.visible')
        homePage.elements.header.buttons.contactsButton().contains('Contacts').should('be.visible')
        homePage.elements.header.buttons.guestLoginButton().contains('Guest log in').should('be.visible')
        homePage.elements.header.buttons.signUpButton().contains('Sign up').should('be.visible')
        homePage.elements.header.buttons.signInButton().contains('Sign In').should('be.visible');
    });

    it('Check all footer buttons and links', function () {
        homePage.elements.footer.socialLinks.facebook().should('be.visible')
        homePage.elements.footer.socialLinks.telegram().should('be.visible')
        homePage.elements.footer.socialLinks.youtube().should('be.visible')
        homePage.elements.footer.socialLinks.instagram().should('be.visible')
        homePage.elements.footer.socialLinks.linkedin().should('be.visible')
        homePage.elements.footer.contacts.hillel().should('be.visible')
        homePage.elements.footer.contacts.email().should('be.visible')
        homePage.elements.footer.logo().should('be.visible');
    });
});