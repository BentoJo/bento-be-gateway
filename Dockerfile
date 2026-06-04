# ---- Builder: install full deps and compile TypeScript -> dist ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install ALL deps (incl. dev) for the Nest build.
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runner: production-only image ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# curl is used by the HEALTHCHECK below (alpine has no curl by default).
RUN apk add --no-cache curl

# Production dependencies only.
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Compiled output.
COPY --from=builder /app/dist ./dist

# The gRPC clients load .proto files at runtime via join(process.cwd(), 'src/shared/proto/...').
# process.cwd() is /app (WORKDIR), so the protos MUST live at /app/src/shared/proto.
# This service has NO drizzle/db — only the proto tree is needed from src.
COPY --from=builder /app/src/shared/proto ./src/shared/proto

# Run as a non-root user (node user ships with the base image).
RUN chown -R node:node /app
USER node

# HTTP API port (mapped on the host by compose).
EXPOSE 5000

# Hit the gateway's HTTP health route (global prefix /api/v1 + GET /auth/health).
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT:-5000}/api/v1/auth/health" || exit 1

CMD ["node", "dist/src/main.js"]
