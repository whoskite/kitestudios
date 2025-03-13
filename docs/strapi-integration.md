# Strapi CMS Integration

This document provides instructions on how to set up and use Strapi CMS with the KITE Studios Next.js project.

## Setup

### Local Development

1. Navigate to the Strapi backend directory:
   ```
   cd strapi-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Strapi development server:
   ```
   npm run develop
   ```

4. Access the Strapi admin panel at http://localhost:1337/admin

5. Create your first admin user when prompted

6. Start creating content types and adding content

### Database Configuration

For local development, Strapi is configured to use SQLite, which is a file-based database that doesn't require any additional setup. The database file is stored at `.tmp/data.db` in the Strapi backend directory.

For production deployment on Railway, Strapi will use PostgreSQL, which is more robust and scalable for production use.

### Setting Up Content Types

1. In the Strapi admin panel, go to "Content-Type Builder"
2. Click "Create new collection type"
3. Define your fields (e.g., title, content, image, etc.)
4. Save and publish your content type
5. Go to "Settings" > "Roles & Permissions" > "Public" and enable the appropriate permissions for your content types

## Deployment on Railway

### Prerequisites

1. Create a Railway account at https://railway.app/
2. Install the Railway CLI:
   ```
   npm install -g @railway/cli
   ```
3. Login to Railway:
   ```
   railway login
   ```

### Steps to Deploy

1. Create a new project on Railway
2. Add a PostgreSQL database to your project
3. Navigate to the Strapi backend directory:
   ```
   cd strapi-backend
   ```
4. Generate secure random strings for environment variables:
   ```
   npm run generate-secrets
   ```
   Copy the output values to use in the next step.

5. Set up the required environment variables in the Railway dashboard:
   - `APP_KEYS` - Comma-separated random strings
   - `API_TOKEN_SALT` - Random string
   - `ADMIN_JWT_SECRET` - Random string
   - `TRANSFER_TOKEN_SALT` - Random string
   - `JWT_SECRET` - Random string

6. Link your local project to Railway:
   ```
   railway link
   ```
7. Deploy your project:
   ```
   railway up
   ```

### Environment Variables

The following environment variables will be automatically provided by Railway for the PostgreSQL database:

- `DATABASE_URL`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_NAME`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`

You'll need to set the additional environment variables listed in the deployment steps above. These can be generated using the provided script:

```
npm run generate-secrets
```

## Using Strapi in the Next.js Frontend

### Configuration

1. Update the `.env.local` file with your Strapi URL and API token:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   STRAPI_API_TOKEN=your-api-token
   ```

2. For production, update with your Railway URL:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=https://your-railway-app.railway.app
   STRAPI_API_TOKEN=your-api-token
   ```

### Fetching Data

Use the utility functions in `lib/strapi.ts` to fetch data from Strapi:

```typescript
import { fetchAPI } from '@/lib/strapi';

// Example: Fetch articles
const articles = await fetchAPI('/articles', {
  populate: '*',
  sort: ['publishedAt:desc'],
  pagination: {
    page: 1,
    pageSize: 10,
  },
});
```

### API Routes

The project includes API routes to proxy requests to Strapi:

- GET: `/api/strapi/[...path]`
- POST: `/api/strapi/[...path]`

Example usage:
```typescript
// Fetch data from the proxy API route
const response = await fetch('/api/strapi/articles?populate=*');
const data = await response.json();
```

## Creating API Tokens in Strapi

1. In the Strapi admin panel, go to "Settings" > "API Tokens"
2. Click "Create new API Token"
3. Fill in the details:
   - Name: e.g., "Next.js Frontend"
   - Description: e.g., "Token for the Next.js frontend"
   - Token duration: Choose an appropriate duration or set to unlimited
   - Token type: Choose "Full access" or "Custom"
4. If you chose "Custom", select the appropriate permissions
5. Click "Save"
6. Copy the generated token and add it to your `.env.local` file as `STRAPI_API_TOKEN`

## Testing the Integration

1. Start both the Next.js and Strapi servers:
   ```
   # In the main project directory
   npm run dev
   
   # In another terminal, in the strapi-backend directory
   npm run develop
   ```

2. Visit http://localhost:3000/strapi-test to see the test page

## Troubleshooting

### CORS Issues

If you encounter CORS issues, update the Strapi configuration:

1. In the Strapi admin panel, go to "Settings" > "Global Settings" > "CORS"
2. Add your frontend URL to the allowed origins (e.g., http://localhost:3000)
3. Save the changes

### Database Connection Issues

If you have issues connecting to the PostgreSQL database on Railway:

1. Check that the environment variables are correctly set
2. Ensure that the `DATABASE_SSL` is set to `true`
3. Check the Railway logs for any error messages

### Switching Between Development and Production

The Strapi backend is configured to use:
- SQLite for local development (via `.env`)
- PostgreSQL for production on Railway (via `.env.production`)

This separation makes development easier while ensuring the production environment matches your deployment target. 