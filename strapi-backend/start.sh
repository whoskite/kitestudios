#!/bin/bash

# Print environment for debugging (excluding sensitive values)
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_CLIENT: $DATABASE_CLIENT"
echo "HOST: $HOST"
echo "PORT: $PORT"
echo "DATABASE_URL is set: $(if [ -n "$DATABASE_URL" ]; then echo "Yes"; else echo "No"; fi)"
echo "APP_KEYS is set: $(if [ -n "$APP_KEYS" ]; then echo "Yes"; else echo "No"; fi)"
echo "API_TOKEN_SALT is set: $(if [ -n "$API_TOKEN_SALT" ]; then echo "Yes"; else echo "No"; fi)"
echo "ADMIN_JWT_SECRET is set: $(if [ -n "$ADMIN_JWT_SECRET" ]; then echo "Yes"; else echo "No"; fi)"
echo "TRANSFER_TOKEN_SALT is set: $(if [ -n "$TRANSFER_TOKEN_SALT" ]; then echo "Yes"; else echo "No"; fi)"
echo "JWT_SECRET is set: $(if [ -n "$JWT_SECRET" ]; then echo "Yes"; else echo "No"; fi)"

# Create a simple health check endpoint
mkdir -p public
echo '{"status":"ok"}' > public/health.json

# Start the health check server in the background
node server.js &
HEALTH_SERVER_PID=$!

# Give the health check server a moment to start
sleep 2

# Start Strapi
NODE_ENV=production npm start

# If Strapi exits, kill the health check server
kill $HEALTH_SERVER_PID 