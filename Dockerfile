FROM node:20 as builder
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20 as runner
WORKDIR /app

# Use production node environment by default.

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Expose the port that the application listens on.
EXPOSE 5000
CMD ["node", "dist/src/main.js"]