# Step 1: Build frontend
FROM node:18 AS build-frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Step 2: Build backend
FROM node:18
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
COPY --from=build-frontend /app/client/build ./client/build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
