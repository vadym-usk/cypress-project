class HomePage {
    elements = {
        header: {
            logo: () => cy.get('a.header_logo'),
            buttons: {
                homeButton: () => cy.get("a[class*='header-link']").contains('Home'),
                aboutButton: () => cy.get("button[class*='header-link']").contains('About'),
                contactsButton: () => cy.get("button[class*='header-link']").contains('Contacts'),
                guestLoginButton: () => cy.get("button[class*='header-link']").contains('Guest log in'),
                signUpButton: () => cy.get("button[class*='descriptor_btn']").contains('Sign up'),
                signInButton: () => cy.get("button[class*='header_signin']").contains('Sign In')
            }
        },

        footer: {
            socialLinks: {
                facebook: () => cy.get("a.socials_link[href*='facebook']"),
                telegram: () => cy.get("a.socials_link[href*='t.me']"),
                youtube: () => cy.get("a.socials_link[href*='youtube']"),
                instagram: () => cy.get("a.socials_link[href*='instagram']"),
                linkedin: () => cy.get("a.socials_link[href*='linkedin']")
            },
            contacts: {
                hillel: () => cy.get("a[class*='contacts'][href='https://ithillel.ua']"),
                email: () => cy.get("a[class*='contacts'][href='mailto:developer@ithillel.ua']")
            },
            logo: () => cy.get("a[class='footer_logo'][href='/']")
        }
    };

    clickSignUpButton() {
        this.elements.header.buttons.signUpButton().click();
        return this;
    }

    clickSignInButton() {
        this.elements.header.buttons.signInButton().click();
        return this;
    }
}

export const homePage = new HomePage();