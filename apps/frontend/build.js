const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
  <title>TSBI Dev - testing Environment</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f0f2f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #2c3e50; }
    .status { padding: 10px; background: #e8f5e9; border-left: 4px solid #4caf50; margin: 20px 0; }
    .api-result { background: #f5f5f5; padding: 15px; border-radius: 4px; font-family: monospace; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 TSBI Development Environment Swarn v2.0</h1>
    <div class="status">✅ Frontend deployed successfully</div>
    <h2>API Status:</h2>
    <div id="api-status">Loading...</div>
  </div>
  <script>
    // Use the proxy path that Traefik will route
    fetch('/api/health')
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(data => {
        document.getElementById('api-status').innerHTML = 
          '<div class="api-result">✅ Backend: ' + JSON.stringify(data, null, 2) + '</div>';
      })
      .catch(err => {
        document.getElementById('api-status').innerHTML = 
          '<div class="api-result">❌ Backend Error: ' + err.message + '</div>';
        console.error('API Error:', err);
      });
  </script>
</body>
</html>`;

fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
console.log('✅ Build completed');