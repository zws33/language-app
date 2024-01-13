FROM node as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine as prod
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

FROM node as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm","run","dev" ]