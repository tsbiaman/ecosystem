const express = require('express');
const cors = require('cors');
const app = express();

// Allow CORS from your domain
app.use(cors({
  origin: ['https://dev.tsbi.fun', 'http://localhost:3000'],
  credentials: true
}));

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
