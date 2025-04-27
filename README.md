# Cypress Test Automation

![CI](https://github.com/vadym-usk/cypress-project/actions/workflows/main.yml/badge.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Cypress](https://img.shields.io/badge/Cypress-14.2.1-blue)
[![Dockerized](https://img.shields.io/badge/Docker-Supported-blue?logo=docker)](https://hub.docker.com/)
![License: None](https://img.shields.io/badge/license-none-lightgrey)

Demostration of automated UI and API testing for the project using https://www.cypress.io/.  
Tests run in Docker containers and in CI via GitHub Actions with Allure reporting support.  
Supports cross-browser testing (Electron, Chrome, Firefox).

---

## 🚀 Features

- ✅ UI and API test automation with Cypress
- 🐳 Docker-based test execution
- 🚀 Parallel testing in browsers
- 📊 Allure Report integration
- 🔁 CI pipeline using GitHub Actions
- 🔐 Environment variable support via `.env`

---

## ⚙️ Installation

```bash
git clone https://github.com/vadym-usk/cypress-project.git
cd cypress-project
npm install
```

---

## 🛠 Environment Setup
#### Copy .env.example and create your own .env file:
```bash
cp .env.example .env
```

#### Create your environment values .env:
```bash
CYPRESS_BASE_URL=https://example.com
CYPRESS_USER_EMAIL=test@email.com
CYPRESS_USER_PASSWORD=password
```
⚠️ .env is included in .gitignore, .dockerignore and should never be committed.

---

## 🚀 Running Tests Locally
#### Run all tests in Electron (default):
```bash
npx cypress run
```

#### Run in Chrome:
```bash
npx cypress run --browser chrome
```

#### Run in Firefox:
```bash
npx cypress run --browser firefox
```

---

## 🐳 Running in Docker
#### Build the image:
```bash
docker build -t cypress-tests .
```

#### Run tests:
```bash
docker run --rm \
  -e CYPRESS_BROWSER=chrome \
  -e CYPRESS_BASE_URL=https://example.com \
  -e CYPRESS_USER_EMAIL=test@email.com \
  -e CYPRESS_USER_PASSWORD=password \
  -v $PWD/allure-results:/app/allure-results \
  cypress-tests npx cypress run --browser chrome
```

---

## 📊 Allure Report
After running tests:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 🔄 CI/CD with GitHub Actions
This project is configured to run tests on every push or pull request to the main branch.

#### Highlights:
- Uses matrix strategy to run tests in parallel (electron)
- Different users per browser to avoid login/session conflicts
- Test results are stored in separate Allure folders
- Reports are zipped and uploaded as build artifacts

---

## 🧬 Secrets in CI
You’ll need to define the following secrets in your GitHub repository:

```bash
CYPRESS_BASE_URL

CYPRESS_USER_EMAIL_ELECTRON
CYPRESS_USER_PASSWORD_ELECTRON

CYPRESS_USER_EMAIL_CHROME
CYPRESS_USER_PASSWORD_CHROME
```
These are injected into Docker containers during Cypress test runs.

---

## 🧱 Project Structure
```bash
.
├── .github/
│    └── workflows/
│        └── main.yml
├── cypress/
│   └── fixtures/
│   └── support/
│       └── page-objects/
│           └── GaragePage.js
│   └── tests/
│       └── e2e/
│           └── garage/
│               └── garage.cy.js
│   └── support/
├── .dockerignore
├── .env.example
├── .gitignore
├── cypress.config.js
├── Dockerfile
└── README.md
```

---

## 📁 Artifacts
After each CI run:
- Individual Allure reports are saved per browser: allure-report-{{browser}}
- All reports are archived as: allure-reports-zip for easy download

---

## 👤 Author
**Vadym** – [@vadym-usk](https://github.com/vadym-usk)

---

## 📝 License
No license. All rights reserved.
