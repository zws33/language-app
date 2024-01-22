FROM node:20.5.1-bookworm-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start"] 
