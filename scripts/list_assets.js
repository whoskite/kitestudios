const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '..', 'public', 'portfolio');

function scanDirectory(dir) {
  const result = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      result.push({
        name: item,
        type: 'directory',
        children: scanDirectory(fullPath)
      });
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.mp4'].includes(ext)) {
        result.push({
          name: item,
          type: 'file',
          extension: ext,
          size: stat.size,
          relativePath: path.relative(path.join(__dirname, '..', 'public'), fullPath).replace(/\\/g, '/')
        });
      }
    }
  }
  return result;
}

const assets = scanDirectory(portfolioDir);
fs.writeFileSync(
  path.join(__dirname, 'portfolio_assets.json'),
  JSON.stringify(assets, null, 2)
);
console.log('Successfully scanned and wrote portfolio_assets.json');
