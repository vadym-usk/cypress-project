FROM cypress/browsers
WORKDIR /app
RUN apt-get update && \
    apt-get install -y default-jre && \
    npm install -g allure-commandline
COPY package*.json ./
RUN npm ci
COPY . .
CMD npx cypress run --browser chrome && allure generate allure-results --clean -o allure-report