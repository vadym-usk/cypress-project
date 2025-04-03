FROM cypress/browsers
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "cy:run:test:chrome"]