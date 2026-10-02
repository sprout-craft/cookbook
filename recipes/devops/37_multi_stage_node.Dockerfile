# Sprout Craft Engineering Cookbook
# Recipe #37: Hardened Multi-Stage Dockerfile for Node.js Services

# Stage 1: Dependency resolution and compilation
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && npm prune --production

# Stage 2: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER appuser
EXPOSE 3000
ENV PORT=3000

CMD ["node", "dist/index.js"]
