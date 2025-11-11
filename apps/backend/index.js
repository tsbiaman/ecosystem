const express = require('express');
const cors = require('cors');
const fs = require('fs');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;

const app = express();

// Read Redis password from Docker secret
const redisPassword = fs.readFileSync(process.env.REDIS_PASSWORD_FILE || '', 'utf8').trim();

const client = redis.createClient({
  url: process.env.REDIS_URL,
  password: redisPassword
});

client.on('error', (err) => console.error('Redis Error:', err));
client.connect().catch(console.error);

// Session middleware
app.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);

// Allow CORS from your domain
app.use(cors({
  origin: ['https://dev.tsbi.fun', 'http://localhost:3000'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from TSBI Development Backend!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from TSBI Development Backend!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'backend' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
