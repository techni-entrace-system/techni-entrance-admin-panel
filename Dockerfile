# -----------------------------
# 1) Builder image
# -----------------------------
FROM node:20-alpine AS builder

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build React app (ssr: false)
RUN pnpm build

# -----------------------------
# 2) Runner image (Node.js)
# -----------------------------
FROM node:20-alpine

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy build output and server.js
COPY --from=builder /app/build/client ./build/client
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
