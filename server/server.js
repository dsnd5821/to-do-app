// === server/server.js ===
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const os = require('os');
const todoRoutes = require('./routes/todos');
const fs = require('fs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// === Middleware ===
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// === API Routes ===
app.use('/api/todos', todoRoutes);

// === Root Route ===
app.get('/', (req, res) => {
  res.send('✅ Backend API is running. Use /api/todos to interact.');
});

// === Serve Frontend (Production Only) ===
const clientPath = path.join(__dirname, '../client/build');
if (process.env.NODE_ENV === 'production' && fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

// === Utility to Get Local IP Address ===
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// === Start Server Listening on 0.0.0.0 ===
app.listen(port, '0.0.0.0', () => {
  const localIP = getLocalIPAddress();
  console.log(`🚀 Server running at:
  → http://localhost:${port}
  → http://${localIP}:${port} (LAN access, use this on your phone)`);
});
