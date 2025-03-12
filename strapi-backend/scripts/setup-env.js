/**
 * This script is for reference only and should be run manually in Railway's dashboard.
 * It shows the environment variables that need to be set for Strapi to work properly.
 * 
 * Note: We use SQLite for local development and PostgreSQL for production.
 */

console.log(`
Required environment variables for Strapi on Railway:

# Database (Production - PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_URL=\${{ Postgres.DATABASE_URL }}
DATABASE_SSL=true

# Copy these from your local .env file
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
APP_KEYS=key1,key2,key3,key4
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret

# Optional: Set NODE_ENV to production
NODE_ENV=production
`);

console.log(`
Instructions:
1. Go to your Railway project dashboard
2. Navigate to your Strapi service
3. Go to the Variables tab
4. Add the above environment variables
5. Make sure to replace the secret values with your actual secrets from your local .env file
6. Note: Your local development will continue to use SQLite as configured in .env
`); 