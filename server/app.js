const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/src')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
};

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
