FROM node:latest AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm ci
    
FROM dependencies AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . ./
RUN npm run build
RUN npx prisma generate

FROM build as prod

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "run", "start"]

FROM build as dev

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "run", "start:dev"]