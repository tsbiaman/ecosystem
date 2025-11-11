FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER nodejs
EXPOSE 80
CMD ["npm", "start"]
