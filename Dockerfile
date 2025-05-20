# === Stage 1: Build React Frontend ===
FROM node:18 AS build-frontend
WORKDIR /app/client

# Install frontend dependencies and build
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# === Stage 2: Build Production Server ===
FROM node:18
WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Copy frontend build folder from previous stage to correct path
COPY --from=build-frontend /app/client/build ./client/build

# Set environment variables (optional: replace with actual values in production)
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port used by the Express app
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
