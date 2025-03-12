# Railway Setup Guide for Strapi

This guide explains how to set up your Strapi application on Railway with PostgreSQL.

## Environment Variables

In Railway, you need to set the following environment variables for your Strapi service:

### Database Configuration
```
DATABASE_CLIENT=postgres
DATABASE_URL=${{ Postgres.DATABASE_URL }}
DATABASE_SSL=true
```

### Strapi Secrets
Copy these from your local `.env` file:
```
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
APP_KEYS=key1,key2,key3,key4
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
```

### Other Settings
```
NODE_ENV=production
PORT=1338
HOST=0.0.0.0
```

## Steps to Configure Railway

1. Go to your Railway project dashboard
2. Navigate to your Strapi service
3. Go to the Variables tab
4. Add the environment variables listed above
5. Make sure to replace the secret values with your actual secrets from your local `.env` file
6. For the `DATABASE_URL`, use the Railway variable reference: `${{ Postgres.DATABASE_URL }}`

## Connecting to PostgreSQL

1. In your Railway project, make sure you have a PostgreSQL service
2. Connect your Strapi service to the PostgreSQL service
3. Railway will automatically set up the connection between them

## Troubleshooting

If your deployment fails with a health check error:

1. Check the logs to see what's happening
2. Make sure all environment variables are set correctly
3. Verify that your PostgreSQL service is running
4. Try redeploying the application

### Common Issues

1. **Health Check Failure**: We've added a custom health check endpoint at `/health.json` to help with this issue.

2. **Database Connection Issues**: Make sure your PostgreSQL service is running and connected to your Strapi service.

3. **Missing Environment Variables**: Double-check that all required environment variables are set correctly.

## Local Development

For local development, we use SQLite as configured in the `.env` file. This makes development easier as it doesn't require a separate database server.

When you deploy to Railway, the application will automatically use PostgreSQL as configured in the environment variables. 