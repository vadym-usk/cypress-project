import LoginPopup from '../support/page-objects/LoginPopup';
import HomePage from '../support/page-objects/HomePage';

const loginPopup = new LoginPopup();
const homePage = new HomePage();

Cypress.Commands.add('resetSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  cy.reload();
});

Cypress.Commands.add('login', (email, password) => {
  homePage
    .clickSignInButton();
  loginPopup
    .verifyLoginPopup()
    .enterEmail(email)
    .enterPassword(password)
    .clickLoginButton();
  cy.url().should('include', '/panel/garage');
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})

Cypress.Commands.add('addCarExpense', (userId, carId, carMileage, carLiters, carTotalCost) => {
  return cy.request({
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
    expect(response.body.data.userId).to.equal(userId);

    return cy.request({
      method: 'POST',
      url: '/api/expenses',
      body: {
        carId: carId,
        reportedAt: new Date().toISOString().split('T')[0],
        mileage: carMileage,
        liters: carLiters,
        totalCost: carTotalCost,
        forceMileage: false
      },
    });
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('ok');
  });
});