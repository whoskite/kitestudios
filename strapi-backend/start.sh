#!/bin/bash

# Print environment for debugging (excluding sensitive values)
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_CLIENT: $DATABASE_CLIENT"
echo "HOST: $HOST"
echo "PORT: $PORT"

# Start Strapi
npm start 