# Setting Up Resources in Strapi CMS

This guide explains how to set up the "Resource" content type in Strapi CMS to populate the Hub Resources section of the KITE Studios website.

## Creating the Resource Content Type

1. Start your Strapi server:
   ```
   cd strapi-backend
   npm run develop
   ```

2. Access the Strapi admin panel at http://localhost:1337/admin

3. Go to "Content-Type Builder" in the left sidebar

4. Click "Create new collection type"

5. Enter the following information:
   - Display name: `Resource`
   - API ID: `resource` (this should be filled automatically)

6. Click "Continue"

7. Add the following fields:

   | Field Name    | Type                | Options                                                |
   |---------------|---------------------|--------------------------------------------------------|
   | Title         | Text (Short text)   | Required field                                         |
   | Description   | Text (Long text)    | Required field                                         |
   | Content       | Rich Text           | Optional                                               |
   | Author        | Text (Short text)   | Required field                                         |
   | Type          | Enumeration         | Values: `DOCUMENT`, `VIDEO`, `CODE`, `MEDIA`, `OTHER`  |
   | Slug          | UID                 | Attached to field: Title                               |
   | Published     | Date (Date & time)  | Required field                                         |

8. Click "Save" to create the content type

## Setting Permissions

1. Go to "Settings" > "Roles & Permissions" in the left sidebar

2. Click on the "Public" role

3. In the "Permissions" tab, find your new "Resource" content type

4. Check the following permissions:
   - Find
   - FindOne
   - Find by slug

5. Click "Save"

## Adding Sample Resources

1. Go to "Content Manager" in the left sidebar

2. Click on "Resource" in the collection types

3. Click "Create new entry"

4. Add the following sample resources:

### Resource 1:
- Title: Hello World
- Description: A simple Hello World document created in the Hub Dashboard.
- Content: (Add some sample content)
- Author: KITESTUDIOS Team
- Type: DOCUMENT
- Published: 2024-05-15

### Resource 2:
- Title: KITESTUDIOS Design System Overview
- Description: Comprehensive documentation of our design system including typography, colors, and components.
- Content: (Add some sample content about design systems)
- Author: Thomas Kite
- Type: DOCUMENT
- Published: 2024-04-15

5. Click "Save" and then "Publish" for each resource

## Viewing the Resources in the Frontend

1. Start your Next.js development server:
   ```
   npm run dev
   ```

2. Visit http://localhost:3000/hub to see your resources in the Hub page

3. Click on a resource to view its details

## Customizing the Resource Display

If you want to customize how resources are displayed in the Hub, you can modify the following files:

- `components/HubResources.tsx` - Controls how resources are displayed in the grid view
- `app/resource/[slug]/page.tsx` - Controls how individual resources are displayed

## Troubleshooting

If your resources are not appearing in the Hub:

1. Check that the Strapi server is running
2. Verify that you've set the correct permissions for the Public role
3. Make sure you've published the resources (not just saved them as drafts)
4. Check the browser console for any errors
5. Verify that the environment variables are set correctly in `.env.local` 