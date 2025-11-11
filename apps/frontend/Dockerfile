FROM node:18-alpine

# Install Python and HTTP server
RUN apk add --no-cache python3 py3-pip

WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

COPY package*.json ./
COPY build.js ./
RUN npm install

COPY . .
RUN npm run build && chown -R nodejs:nodejs /app/dist

USER nodejs
EXPOSE 8080
WORKDIR /app/dist

# Use Python's http.server directly
CMD ["python3", "-m", "http.server", "8080"]