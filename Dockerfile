FROM cypress/browsers
WORKDIR /app
COPY package*.json ./
RUN apt-get update && \
    apt-get install -y default-jre && \
    npm install -g allure-commandline
COPY . .
CMD ["npx", "cypress", "run", "--browser", "chrome"]