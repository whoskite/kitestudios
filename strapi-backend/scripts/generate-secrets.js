/**
 * This script generates secure random strings for Strapi environment variables
 * Run with: node scripts/generate-secrets.js
 */

const crypto = require('crypto');

// Function to generate a random string
function generateRandomString() {
  return crypto.randomBytes(16).toString('base64');
}

// Generate multiple random strings for APP_KEYS
function generateAppKeys(count = 4) {
  const keys = [];
  for (let i = 0; i < count; i++) {
    keys.push(generateRandomString());
  }
  return keys.join(',');
}

console.log('\n=== Strapi Environment Variables ===\n');
console.log(`APP_KEYS=${generateAppKeys()}`);
console.log(`API_TOKEN_SALT=${generateRandomString()}`);
console.log(`ADMIN_JWT_SECRET=${generateRandomString()}`);
console.log(`TRANSFER_TOKEN_SALT=${generateRandomString()}`);
console.log(`JWT_SECRET=${generateRandomString()}`);
console.log('\nCopy these values to your Railway environment variables.\n'); 