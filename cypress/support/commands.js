import { loginPopup } from '../pages/loginPopup';
import { homePage } from '../pages/homePage';

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

Cypress.Commands.add('addCarExpense', (carId) => {
  const today = new Date().toISOString().split('T')[0];

  cy.request({
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
    expect(response.body.data.userId).to.equal(Cypress.env('testData').user.userId);

    return cy.request({
      method: 'POST',
      url: '/api/expenses',
      body: {
        carId: Cypress.env('carId'),
        reportedAt: today,
        mileage: Cypress.env('testData').car.mileage + 1,
        liters: Cypress.env('testData').car.liters,
        totalCost: Cypress.env('testData').car.totalCost,
        forceMileage: false
      },
    });
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('ok');
    expect(response.body.data.carId).to.equal(carId);
    expect(response.body.data.reportedAt).to.equal(today);
    expect(response.body.data.liters).to.equal(Cypress.env('testData').car.liters);
    expect(response.body.data.id).to.be.a('number');
    expect(response.body.data.mileage).to.equal(Cypress.env('testData').car.mileage + 1);
    expect(response.body.data.totalCost).to.equal(Cypress.env('testData').car.totalCost);
  });
});