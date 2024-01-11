FROM node:latest AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm ci
    
FROM node:latest AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:latest as deploy

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "run", "start"]