# backend/Dockerfile
FROM node:22 AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

RUN npm install
RUN npm run build

FROM node:22-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000
ENV BACKEND_PORT=3000

EXPOSE 3000

CMD ["node", "dist/main.js"]
