# PostgreSQL Migration Guide for Strapi

This guide explains how to migrate your Strapi data from SQLite to PostgreSQL on Railway.

## Prerequisites

- Your Strapi application is deployed on Railway
- You have a PostgreSQL service set up on Railway
- Your Strapi service is connected to the PostgreSQL service

## Step 1: Configure Environment Variables

Make sure your Strapi service has the correct environment variables set in Railway:

```
DATABASE_CLIENT=postgres
DATABASE_URL=${{ Postgres.DATABASE_URL }}
DATABASE_SSL=true
```

Also ensure all your Strapi secret keys are set (copy these from your local `.env` file):

```
ADMIN_JWT_SECRET=your_actual_secret
API_TOKEN_SALT=your_actual_salt
APP_KEYS=your_actual_keys
TRANSFER_TOKEN_SALT=your_actual_salt
JWT_SECRET=your_jwt_secret
```

## Step 2: Export Data from SQLite

### Option 1: Using Strapi Admin Panel (Recommended for small datasets)

1. Run your Strapi application locally (with SQLite)
2. Go to Settings > Import/Export Content
3. Click "Export" to download your data as JSON

### Option 2: Using the Export Script (For larger datasets)

1. Run the export script locally:
   ```
   cd strapi-backend
   NODE_ENV=development node scripts/migrate-to-postgres.js
   ```
2. This will export your data to the `data/export` directory

## Step 3: Import Data to PostgreSQL

### Option 1: Using Strapi Admin Panel

1. Access your deployed Strapi admin panel on Railway
2. Go to Settings > Import/Export Content
3. Upload the JSON file you exported

### Option 2: Using the Import Script

1. Copy the exported data to your production environment
2. Run the import script:
   ```
   cd strapi-backend
   NODE_ENV=production node scripts/import-to-postgres.js
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**: Make sure your PostgreSQL service is running and connected to your Strapi service.

2. **Missing Environment Variables**: Double-check that all required environment variables are set correctly.

3. **Import Errors**: If you encounter errors during import, try importing smaller batches of data or use the Strapi admin panel import feature.

## Verifying the Migration

After migrating your data, verify that everything is working correctly:

1. Check that all your content types are available in the Strapi admin panel
2. Verify that all your data has been imported correctly
3. Test your API endpoints to ensure they return the expected data

## Local Development

For local development, you can continue to use SQLite as configured in your `.env` file. This makes development easier as it doesn't require a separate database server.

When you deploy to Railway, the application will automatically use PostgreSQL as configured in the environment variables. 