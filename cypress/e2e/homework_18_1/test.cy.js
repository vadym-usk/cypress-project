import { qautoHomePage } from '../../pages/qautoHomePage';

describe('Homework_18_1', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Check all header buttons', function () {
        qautoHomePage.getHeaderLogo().should('be.visible');
        qautoHomePage.getHeaderHomeButton().contains('Home').should('be.visible');
        qautoHomePage.getHeaderAboutButton().contains('About').should('be.visible');
        qautoHomePage.getHeaderContactsButton().contains('Contacts').should('be.visible');
        qautoHomePage.getHeaderLoginButton().contains('Guest log in').should('be.visible');
        qautoHomePage.getHeaderSignInButton().contains('Sign In').should('be.visible');
        qautoHomePage.getHeaderSignUpButton().contains('Sign up').should('be.visible');
    });

    it('Check all footer buttons and links', function () {
        qautoHomePage.getFooterFacebookLink().should('be.visible');
        qautoHomePage.getFooterTelegramLink().should('be.visible');
        qautoHomePage.getFooterYoutubeLink().should('be.visible');
        qautoHomePage.getFooterInstagramLink().should('be.visible');
        qautoHomePage.getFooterLinkedinLink().should('be.visible');
        qautoHomePage.getFooterHillelContact().should('be.visible');
        qautoHomePage.getFooterEmailContact().should('be.visible');
        qautoHomePage.getFooterLogo().should('be.visible');
    });
});