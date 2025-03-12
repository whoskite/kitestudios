/**
 * This script exports data from your Strapi SQLite database
 * 
 * Usage:
 * 1. Run your Strapi locally with SQLite
 * 2. Run this script: NODE_ENV=development node scripts/export-data.js
 * 3. The script will export your data to the data/export directory
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
    
    // Define the content types to export
    const contentTypesToExport = [
      { uid: 'api::about.about', name: 'About' },
      { uid: 'api::article.article', name: 'Article' },
      { uid: 'api::author.author', name: 'Author' },
      { uid: 'api::category.category', name: 'Category' },
      { uid: 'api::global.global', name: 'Global' }
    ];
    
    console.log(`Found ${contentTypesToExport.length} content types to export`);
    
    // Export each content type
    for (const contentType of contentTypesToExport) {
      try {
        console.log(`Exporting ${contentType.name}...`);
        
        // Get the service for this content type
        const service = strapi.service(contentType.uid);
        
        // Find all entries
        const entries = await service.find({ 
          pagination: { limit: -1 },
          populate: 'deep'
        });
        
        // Save to file
        const filePath = path.join(exportDir, `${contentType.name.toLowerCase()}.json`);
        fs.writeFileSync(
          filePath, 
          JSON.stringify(entries.results || entries, null, 2)
        );
        
        console.log(`Exported ${entries.results ? entries.results.length : entries.length} entries to ${filePath}`);
      } catch (error) {
        console.error(`Error exporting ${contentType.name}:`, error);
      }
    }
    
    // Export media files
    try {
      console.log('Exporting media files...');
      
      // Get all uploads
      const uploads = await strapi.plugins.upload.services.upload.findMany({});
      
      // Save to file
      const filePath = path.join(exportDir, 'uploads.json');
      fs.writeFileSync(filePath, JSON.stringify(uploads, null, 2));
      
      console.log(`Exported ${uploads.length} media files to ${filePath}`);
      
      // Copy actual files
      const uploadsDir = path.resolve(__dirname, '../public/uploads');
      const exportUploadsDir = path.join(exportDir, 'uploads');
      
      if (fs.existsSync(uploadsDir)) {
        if (!fs.existsSync(exportUploadsDir)) {
          fs.mkdirSync(exportUploadsDir, { recursive: true });
        }
        
        // Copy the uploads directory
        fs.cpSync(uploadsDir, exportUploadsDir, { recursive: true });
        console.log(`Copied upload files to ${exportUploadsDir}`);
      }
    } catch (error) {
      console.error('Error exporting media files:', error);
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