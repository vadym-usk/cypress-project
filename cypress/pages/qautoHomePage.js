import qautoHomepageFixtures from '../fixtures/qautoHomepageFixtures.json';

class QautoHomePage {
    getHeaderLogo() {
        return cy.get(qautoHomepageFixtures.Header.logo);
    }

    getHeaderHomeButton() {
        return cy.get(qautoHomepageFixtures.Header.buttons.homeButton);
    }

    getHeaderAboutButton() {
        return cy.get(qautoHomepageFixtures.Header.buttons.aboutButton);
    }

    getHeaderContactsButton() {
        return cy.get(qautoHomepageFixtures.Header.buttons.contactsButton);
    }

    getHeaderLoginButton() {
        return cy.get(qautoHomepageFixtures.Header.buttons.guestLoginButton);
    }

    getHeaderSignInButton() {
        return cy.get(qautoHomepageFixtures.Header.buttons.signInButton);
    }

    getHeaderSignUpButton() {
        return cy.get(qautoHomepageFixtures.Header.buttons.signUpButton);
    }

    clickSignUpButton() {
        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).click();
        return this;
    }

    clickSignInButton() {
        cy.get(qautoHomepageFixtures.Footer.socialLinks.facebook).click();
        return this;
    }

    getFooterFacebookLink() {
        return cy.get(qautoHomepageFixtures.Footer.socialLinks.telegram);
    }

    getFooterTelegramLink() {
        return cy.get(qautoHomepageFixtures.Footer.socialLinks.youtube);
    }

    getFooterYoutubeLink() {
        return cy.get(qautoHomepageFixtures.Footer.socialLinks.youtube);
    }

    getFooterInstagramLink() {
        return cy.get(qautoHomepageFixtures.Footer.socialLinks.instagram);
    }

    getFooterLinkedinLink() {
        return cy.get(qautoHomepageFixtures.Footer.socialLinks.linkedin);
    }

    getFooterHillelContact() {
        return cy.get(qautoHomepageFixtures.Footer.contacts.hillel);
    }

    getFooterEmailContact() {
        return cy.get(qautoHomepageFixtures.Footer.contacts.email);
    }

    getFooterLogo() {
        return cy.get(qautoHomepageFixtures.Footer.logo);
    }
}

export const qautoHomePage = new QautoHomePage();