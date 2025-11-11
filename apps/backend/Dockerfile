FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
COPY package*.json ./
RUN npm install --omit=dev  # Changed from npm ci
COPY . .
USER nodejs
EXPOSE 3000
CMD ["npm", "start"]
