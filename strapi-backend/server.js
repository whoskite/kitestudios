// This file is used to help with health checks
// It will be run by the start.sh script

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple health check server
const server = http.createServer((req, res) => {
  if (req.url === '/health.json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  // For all other requests, respond with a simple message
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Strapi is starting up. Please wait...');
});

// Start the server on the specified port
const PORT = process.env.PORT || 1338;
server.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
});

// This script is meant to be used alongside Strapi
// It provides a health check endpoint while Strapi is starting up 