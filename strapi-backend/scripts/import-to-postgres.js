/**
 * This script helps import data to PostgreSQL
 * 
 * Usage:
 * 1. Make sure your Strapi is configured to use PostgreSQL
 * 2. Run this script: NODE_ENV=production node scripts/import-to-postgres.js
 * 3. The script will import data from the data/export directory
 */

const fs = require('fs');
const path = require('path');

async function importData() {
  try {
    // Make sure the export directory exists
    const exportDir = path.resolve(__dirname, '../data/export');
    if (!fs.existsSync(exportDir)) {
      console.error(`Export directory not found: ${exportDir}`);
      process.exit(1);
    }

    console.log('Starting Strapi in import mode...');
    
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
    
    console.log(`Found ${contentTypes.length} content types to import`);
    
    // Import each content type
    for (const contentType of contentTypes) {
      try {
        const filePath = path.join(exportDir, `${contentType.collectionName}.json`);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
          console.log(`No data file found for ${contentType.info.displayName}, skipping...`);
          continue;
        }
        
        console.log(`Importing ${contentType.info.displayName}...`);
        
        // Read data from file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (!data || !data.length) {
          console.log(`No data found for ${contentType.info.displayName}, skipping...`);
          continue;
        }
        
        // Get the service for this content type
        const service = strapi.service(contentType.uid);
        
        // Import each entry
        let importedCount = 0;
        for (const entry of data) {
          try {
            // Remove any fields that might cause issues
            const cleanEntry = { ...entry };
            delete cleanEntry.id;
            delete cleanEntry.created_at;
            delete cleanEntry.updated_at;
            delete cleanEntry.created_by;
            delete cleanEntry.updated_by;
            
            // Create the entry
            await service.create({ data: cleanEntry });
            importedCount++;
          } catch (entryError) {
            console.error(`Error importing entry for ${contentType.info.displayName}:`, entryError);
          }
        }
        
        console.log(`Imported ${importedCount} entries for ${contentType.info.displayName}`);
      } catch (error) {
        console.error(`Error importing ${contentType.info.displayName}:`, error);
      }
    }
    
    console.log('Import completed successfully!');
    
    // Exit gracefully
    await strapi.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

importData(); 