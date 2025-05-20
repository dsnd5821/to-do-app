FROM node:18

WORKDIR /app

COPY server ./server
COPY client ./client

RUN cd server && npm install
RUN cd client && npm install && npm run build

# Serve frontend using Express backend
WORKDIR /app/server
ENV NODE_ENV=production
CMD ["node", "server.js"]

EXPOSE 3000