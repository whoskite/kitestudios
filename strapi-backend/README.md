# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

# Strapi Backend for KITE Studios

This is the Strapi CMS backend for the KITE Studios website.

## Database Configuration

This project is configured to use:
- **SQLite** for local development
- **PostgreSQL** for production deployment on Railway

This dual configuration makes local development easier while ensuring the production environment is robust and scalable.

### Local Development (SQLite)

SQLite is a file-based database that doesn't require any additional setup. The database file is stored at `.tmp/data.db` in the Strapi backend directory.

### Production (PostgreSQL)

For production, the application will use PostgreSQL provided by Railway. The configuration for this is in the `.env.production` file, which uses environment variables that will be automatically provided by Railway.

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run develop
   ```

3. Access the admin panel at http://localhost:1337/admin

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
3. Link your local project to Railway:
   ```
   railway link
   ```
4. Deploy your project:
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

You'll need to set these additional environment variables in the Railway dashboard:

- `APP_KEYS` - Comma-separated random strings
- `API_TOKEN_SALT` - Random string
- `ADMIN_JWT_SECRET` - Random string
- `TRANSFER_TOKEN_SALT` - Random string
- `JWT_SECRET` - Random string

You can generate random strings using:
```
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

## API Documentation

Once deployed, you can access the API documentation at:
- https://your-railway-url.railway.app/documentation/v1.0.0

## Admin Panel

The admin panel will be available at:
- https://your-railway-url.railway.app/admin
