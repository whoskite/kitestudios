/**
 * This script helps migrate data from SQLite to PostgreSQL
 * 
 * Usage:
 * 1. Run your Strapi locally with SQLite
 * 2. Run this script: NODE_ENV=development node scripts/migrate-to-postgres.js
 * 3. The script will export your data to the data/export directory
 * 4. Then you can import this data to your PostgreSQL database
 */

const fs = require('fs');
const path = require('path');

async function exportData() {
  try {
    // Make sure the export directory exists
    const exportDir = path.resolve(__dirname, '../data/export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    console.log('Starting Strapi in export mode...');
    
    // Load Strapi instance
    const strapi = await require('@strapi/strapi').load();
    
    // Get all content types
    const contentTypes = Object.keys(strapi.contentTypes)
      .filter(key => key.startsWith('api::'))
      .map(key => {
        const contentType = strapi.contentTypes[key];
        return {
          uid: key,
          kind: contentType.kind,
          collectionName: contentType.collectionName,
          info: contentType.info
        };
      });
    
    console.log(`Found ${contentTypes.length} content types to export`);
    
    // Export each content type
    for (const contentType of contentTypes) {
      try {
        console.log(`Exporting ${contentType.info.displayName}...`);
        
        // Get the service for this content type
        const service = strapi.service(contentType.uid);
        
        // Find all entries
        const entries = await service.find({ 
          pagination: { limit: -1 },
          populate: 'deep'
        });
        
        // Save to file
        const filePath = path.join(exportDir, `${contentType.collectionName}.json`);
        fs.writeFileSync(
          filePath, 
          JSON.stringify(entries.results || entries, null, 2)
        );
        
        console.log(`Exported ${entries.results ? entries.results.length : entries.length} entries to ${filePath}`);
      } catch (error) {
        console.error(`Error exporting ${contentType.info.displayName}:`, error);
      }
    }
    
    console.log('Export completed successfully!');
    console.log(`Data exported to: ${exportDir}`);
    console.log('You can now import this data to your PostgreSQL database');
    
    // Exit gracefully
    await strapi.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  }
}

exportData(); 