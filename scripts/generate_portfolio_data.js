const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '..', 'public', 'portfolio');
const targetFile = path.join(__dirname, '..', 'lib', 'portfolio-data.ts');

// Ensure lib folder exists
const libDir = path.dirname(targetFile);
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

function cleanTitle(filename, folderName) {
  // Strip extension
  let base = path.parse(filename).name;

  // Clean social media prefix / suffixes
  base = base.replace(/kitestudios\d*_/gi, '');
  base = base.replace(/SaveClip\.App_/gi, '');
  base = base.replace(/SnapInsta\.to_/gi, '');
  
  // Clean hash-like strings (UUIDs or md5/sha patterns)
  base = base.replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, '');
  base = base.replace(/[a-f0-9]{24}/gi, '');
  base = base.replace(/_rw_\d+/gi, '');
  base = base.replace(/-\d+/gi, '');

  // Strip generic suffixes
  base = base.replace(/_Enhanced-NR/gi, '');
  
  // Replace symbols with spaces
  base = base.replace(/[_\-\.]+/g, ' ').trim();

  // If title is empty or too generic, generate one based on folder
  if (!base || base.length < 2 || /^\d+$/.test(base)) {
    return `${folderName.toUpperCase()} SHOT`;
  }

  // Capitalize words
  return base
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function scanAndBuildData() {
  const items = [];
  
  function recurse(dir, project = '', subcategory = '') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const nextProject = project || file;
        const nextSub = project ? file : '';
        recurse(fullPath, nextProject, nextSub);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.webp', '.mp4'].includes(ext)) {
          continue;
        }

        const relativePath = path.relative(path.join(__dirname, '..', 'public'), fullPath).replace(/\\/g, '/');
        const type = ext === '.mp4' ? 'video' : 'photo';
        
        // Setup realistic professional metadata
        let metadata = {
          camera: "Leica M11",
          lens: "50mm Summilux-M f/1.4",
          aperture: "f/2.0",
          shutter: "1/200s",
          iso: "64",
          location: "LOS ANGELES, CA",
          date: "OCTOBER 2025"
        };

        let category = "Editorial / Creative";
        let displayProject = project;

        // Custom profiles by directory
        const lowerProject = project.toLowerCase();
        const lowerSub = subcategory.toLowerCase();

        if (lowerProject.includes('ecommerce')) {
          category = "Product / E-commerce";
          displayProject = "Ecommerce";
          metadata = {
            camera: "Phase One XF 150MP",
            lens: "Schneider Kreuznach 80mm f/2.8",
            aperture: "f/8.0",
            shutter: "1/125s",
            iso: "50",
            location: "KITE STUDIOS - STUDIO C",
            date: "MARCH 2026"
          };
        } else if (lowerProject.includes('fashion')) {
          category = "Fashion / Editorial";
          displayProject = "Fashion";
          metadata = {
            camera: "Leica M11",
            lens: "Summilux-M 50mm f/1.4",
            aperture: "f/1.8",
            shutter: "1/250s",
            iso: "64",
            location: "PARIS STUDIO B",
            date: "DECEMBER 2025"
          };
        } else if (lowerProject.includes('genki prints')) {
          displayProject = "Genki Prints";
          if (lowerSub.includes('event')) {
            category = "Event / Documentary";
            metadata = {
              camera: "Sony FX6 Cinema",
              lens: "FE 24-70mm f/2.8 GM II",
              aperture: "f/2.8",
              shutter: "1/120s",
              iso: "800",
              location: "COMIC-CON, SAN DIEGO",
              date: "JULY 2025"
            };
          } else {
            category = "Product / Macro";
            metadata = {
              camera: "Sony A7R V",
              lens: "FE 90mm f/2.8 Macro G OSS",
              aperture: "f/5.6",
              shutter: "1/100s",
              iso: "100",
              location: "KITE STUDIOS - SUITE 1",
              date: "NOVEMBER 2025"
            };
          }
        } else if (lowerProject.includes('glyf studio')) {
          displayProject = "GLYF STUDIO";
          if (lowerSub.includes('ecommerce')) {
            category = "Product / Apparel";
            metadata = {
              camera: "Fujifilm GFX 100S",
              lens: "GF 120mm f/4 Macro R LM",
              aperture: "f/8.0",
              shutter: "1/125s",
              iso: "100",
              location: "GLYF HQ, TOKYO",
              date: "JANUARY 2026"
            };
          } else if (lowerSub.includes('lookbook')) {
            category = "Fashion / Lookbook";
            metadata = {
              camera: "Leica SL2",
              lens: "Vario-Elmarit-SL 24-70mm f/2.8",
              aperture: "f/2.8",
              shutter: "1/250s",
              iso: "200",
              location: "SHIBUYA ARCHIVES, TOKYO",
              date: "OCTOBER 2025"
            };
          } else {
            category = "Campaign / Brand Film";
            metadata = {
              camera: "RED V-Raptor 8K",
              lens: "Cooke Anamorphic /i 2x",
              aperture: "T2.3",
              shutter: "180 deg",
              iso: "800",
              location: "GLYF HARAJUKU STAGE",
              date: "NOVEMBER 2025"
            };
          }
        } else if (lowerProject.includes('kevora')) {
          category = "Product / Skincare";
          displayProject = "Kevora";
          metadata = {
            camera: "Phase One IQ4 150MP",
            lens: "Schneider Kreuznach 120mm f/4 Macro",
            aperture: "f/11",
            shutter: "1/160s",
            iso: "50",
            location: "COPENHAGEN DESIGN LAB",
            date: "FEBRUARY 2026"
          };
        } else if (lowerProject.includes('platini jeans')) {
          displayProject = "Platini Jeans";
          if (lowerSub.includes('ecommerce')) {
            category = "Product / E-commerce";
            metadata = {
              camera: "Sony A7R V",
              lens: "FE 24-70mm f/2.8 GM II",
              aperture: "f/5.6",
              shutter: "1/125s",
              iso: "100",
              location: "DOWNTOWN LA STUDIO",
              date: "AUGUST 2025"
            };
          } else {
            category = "Lifestyle / Editorial";
            metadata = {
              camera: "Leica M11",
              lens: "Summilux-M 35mm f/1.4 ASPH",
              aperture: "f/1.4",
              shutter: "1/500s",
              iso: "64",
              location: "ARTS DISTRICT, LOS ANGELES",
              date: "SEPTEMBER 2025"
            };
          }
        } else if (lowerProject.includes('products')) {
          category = "Product / Denim";
          displayProject = "Products";
          metadata = {
            camera: "Hasselblad X2D 100C",
            lens: "XCD 90mm f/2.5",
            aperture: "f/8.0",
            shutter: "1/125s",
            iso: "64",
            location: "KITE STUDIOS - SUITE 2",
            date: "OCTOBER 2025"
          };
        } else if (lowerProject.includes('quinceanera')) {
          category = "Event / Cinematic";
          displayProject = "Quinceanera";
          metadata = {
            camera: "Sony FX3 Cinema",
            lens: "FE 50mm f/1.2 GM",
            aperture: "f/1.2",
            shutter: "1/240s",
            iso: "320",
            location: "THE PLAZA HOTEL, LA",
            date: "APRIL 2025"
          };
        } else if (lowerProject.includes('tdm')) {
          category = "Commercial / Fashion";
          displayProject = "TDM";
          metadata = {
            camera: "ARRI Alexa Mini LF",
            lens: "Angenieux Optimo Ultra 12x",
            aperture: "T2.0",
            shutter: "172.8 deg",
            iso: "800",
            location: "REDROOM STAGE, LA",
            date: "MAY 2025"
          };
        } else if (lowerProject.includes('toandme')) {
          category = "Editorial / Brand";
          displayProject = "TOANDME";
          metadata = {
            camera: "Leica SL2",
            lens: "Summicron-SL 50mm f/2 ASPH",
            aperture: "f/2.0",
            shutter: "1/200s",
            iso: "200",
            location: "MALIBU COAST, CALIFORNIA",
            date: "JUNE 2025"
          };
        }

        const title = cleanTitle(file, displayProject);
        const uniqueId = `${type}-${displayProject.toLowerCase().replace(/\s+/g, '-')}-${path.parse(file).name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

        items.push({
          id: uniqueId,
          type,
          title,
          category,
          project: displayProject,
          src: `/${relativePath}`,
          ...(type === 'video' ? { videoUrl: `/${relativePath}` } : {}),
          metadata
        });
      }
    }
  }

  recurse(portfolioDir);

  // Group and sort to show a nice initial mix
  // Sort: Videos first, then interleave projects to make it beautiful
  const sortedItems = items.sort((a, b) => {
    if (a.type === 'video' && b.type !== 'video') return -1;
    if (a.type !== 'video' && b.type === 'video') return 1;
    return a.project.localeCompare(b.project);
  });

  const directories = fs.readdirSync(portfolioDir).filter(file => {
    return fs.statSync(path.join(portfolioDir, file)).isDirectory();
  });

  const normalizedDirs = directories.map(dir => {
    const lower = dir.toLowerCase();
    if (lower === 'glyf studio') return 'GLYF STUDIO';
    if (lower === 'toandme') return 'TOANDME';
    if (lower === 'tdm') return 'TDM';
    if (lower === 'platini jeans') return 'Platini Jeans';
    if (lower === 'genki prints') return 'Genki Prints';
    if (lower === 'kevora') return 'Kevora';
    if (lower === 'fashion') return 'Fashion';
    if (lower === 'ecommerce') return 'Ecommerce';
    if (lower === 'products') return 'Products';
    if (lower === 'quinceanera') return 'Quinceanera';
    return dir;
  });

  const uniqueProjectsList = Array.from(new Set(normalizedDirs));

  const tsContent = `// Automatically generated by scripts/generate_portfolio_data.js
// DO NOT EDIT DIRECTLY

export interface MediaItem {
  id: string;
  type: "photo" | "video";
  title: string;
  category: string;
  project: string;
  src: string;
  videoUrl?: string;
  metadata: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
    focalLength?: string;
    location: string;
    date: string;
  };
}

export const portfolioItems: MediaItem[] = ${JSON.stringify(sortedItems, null, 2)};

export const projectsList = ${JSON.stringify(uniqueProjectsList, null, 2)} as const;
`;

  fs.writeFileSync(targetFile, tsContent);
  console.log(`Generated ${sortedItems.length} portfolio items into ${targetFile}`);
}

scanAndBuildData();
