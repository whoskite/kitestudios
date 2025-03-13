# KITESTUDIOS Website

![KITESTUDIOS](https://github.com/user-attachments/assets/749b9861-4586-4dc6-a4dc-b050856d2853)

## Overview

The official website for KITESTUDIOS, showcasing our projects, philosophy, and creative approach to building in public. The site features a modern, industrial design aesthetic with a unique "future mode" toggle.

## Features

- Modern, responsive design with industrial aesthetics
- "Future mode" toggle for an alternative AI-enhanced design
- Dynamic content managed through Strapi Headless CMS
- Hub resources section for tutorials, tools, and documentation
- Articles section with categories
- Dark/light mode support

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **CMS**: Strapi Headless CMS (deployed on Railway)
- **Database**: PostgreSQL (on Railway)
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL database (we're using Railway)

### Frontend Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kitestudios-website.git
   cd kitestudios-website
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with your environment variables:
   ```
   NEXT_PUBLIC_STRAPI_URL=your_railway_strapi_url
   STRAPI_API_TOKEN=your_strapi_api_token
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Strapi Backend Setup

We've already deployed Strapi on Railway, but you can also run it locally for development:

1. Navigate to the Strapi backend directory:
   ```
   cd strapi-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your Railway PostgreSQL connection details:
   ```
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your_app_keys
   API_TOKEN_SALT=your_api_token_salt
   ADMIN_JWT_SECRET=your_admin_jwt_secret
   JWT_SECRET=your_jwt_secret
   
   # Database connection to Railway
   DATABASE_CLIENT=postgres
   DATABASE_URL=your_railway_postgres_url
   DATABASE_SSL=true
   
   # If you prefer to specify connection details separately
   # DATABASE_HOST=your_railway_postgres_host
   # DATABASE_PORT=your_railway_postgres_port
   # DATABASE_NAME=your_railway_postgres_database_name
   # DATABASE_USERNAME=your_railway_postgres_username
   # DATABASE_PASSWORD=your_railway_postgres_password
   ```

4. Start the Strapi development server:
   ```
   npm run develop
   ```

5. Access the Strapi admin panel at `http://localhost:1337/admin`

6. Seed sample resources:
   ```
   npm run seed:resources
   ```

## Content Management

### Hub Resources

The Hub Resources section is powered by the Strapi CMS. To add or edit resources:

1. Log in to the Strapi admin panel
2. Navigate to Content Manager > Resources
3. Create a new resource with:
   - Title
   - Description (Markdown supported)
   - Link (optional)
   - Category (Tutorial, Tool, Documentation, Guide, Template, Other)
   - Featured (boolean)
   - Image (optional)
4. Publish the resource

## Deployment

The website is deployed on Vercel, while the Strapi backend is hosted on Railway.

## License

All rights reserved © 2024 KITESTUDIOS

