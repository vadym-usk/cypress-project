import qautoHomepageFixtures from '../fixtures/qautoHomepageFixtures.json';

class QautoHomePage {
    clickSignUpButton(){
        cy.get(qautoHomepageFixtures.Header.buttons.signUpButton).click();
        return this;
    }

    clickSignInButton(){
        cy.get(qautoHomepageFixtures.Header.buttons.signInButton).click();
        return this;
    }
}

export const qautoHomePage = new QautoHomePage();