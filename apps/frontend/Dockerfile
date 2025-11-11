FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
COPY package*.json ./
COPY build.js ./
RUN npm install
COPY . .
RUN npm run build && chown -R nodejs:nodejs /app/dist
USER nodejs
EXPOSE 80
CMD ["npm", "start"]
