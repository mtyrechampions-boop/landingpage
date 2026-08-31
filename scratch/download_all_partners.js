import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images', 'partners');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const sources = [
  { name: 'ford', ext: 'svg', url: 'https://www.vectorlogo.zone/logos/ford/ford-icon.svg' },
  { name: 'volkswagen', ext: 'png', url: 'https://uploads.vw-mms.de/system/production/images/vwn/030/145/images/7a0d84d3b718c9a621100e43e581278433114c82/DB2019AL01950_web_1600.jpg?1649155356' },
  { name: 'toyota', ext: 'svg', url: 'https://www.vectorlogo.zone/logos/toyota/toyota-icon.svg' },
  { name: 'renault', ext: 'png', url: 'https://w7.pngwing.com/pngs/270/984/png-transparent-renault-5-renault-16-renault-4-car-renault-logo-angle-text-rectangle-thumbnail.png' },
  { name: 'peugeot', ext: 'png', url: 'https://www.stellantis.com/content/dam/stellantis-corporate/brands/peugeot/peugeot.png' },
  { name: 'skoda', ext: 'png', url: 'https://cdn.skoda-storyboard.com/2023/07/Skoda_Wordmark_RGB_Emerald_Green_e2c8d407-1440x473.png' },
  { name: 'seat', ext: 'svg', url: 'https://www.seat.co.uk/content/dam/countries/gb/seat-website/global-header/global-navigation/seat-logo/seat-s-logo.svg' },
  { name: 'bmw', ext: 'svg', url: 'https://api.iconify.design/cib:bmw.svg' },
  { name: 'mercedes', ext: 'svg', url: 'https://api.iconify.design/simple-icons:mercedes.svg' },
  { name: 'porsche', ext: 'webp', local: 'public/images/porsche.webp' },
  { name: 'lexus', ext: 'svg', local: 'public/images/partners/lexus.svg' },
  { name: 'bentley', ext: 'svg', url: 'https://www.vectorlogo.zone/logos/bentley/bentley-icon.svg' },
  { name: 'rolls-royce', ext: 'svg', url: 'https://api.iconify.design/cib:rolls-royce.svg' },
  { name: 'jaguar', ext: 'svg', url: 'https://api.iconify.design/cib:jaguar.svg' },
  { name: 'mini', ext: 'svg', url: 'https://api.iconify.design/cib:mini.svg' },
  { name: 'aston-martin', ext: 'svg', url: 'https://api.iconify.design/cib:aston-martin.svg' }
];

async function main() {
  for (const item of sources) {
    const filename = `${item.name}.${item.ext}`;
    const dest = path.join(dir, filename);

    if (item.local) {
      const srcPath = path.join(process.cwd(), item.local);
      if (fs.existsSync(srcPath) && srcPath !== dest) {
        fs.copyFileSync(srcPath, dest);
        console.log('Copied local:', filename);
      } else {
        console.log('Local exists:', filename);
      }
      continue;
    }

    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buffer);
        console.log('Downloaded:', filename, 'size:', buffer.length);
      } else {
        console.log('Failed:', filename, res.status);
      }
    } catch(e) {
      console.log('Error:', filename, e.message);
    }
  }
}

main();
