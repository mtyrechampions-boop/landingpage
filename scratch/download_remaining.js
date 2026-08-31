import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images', 'partners');

const alts = [
  { name: 'bmw', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bmw.svg' },
  { name: 'rolls-royce', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/rollsroyce.svg' },
  { name: 'jaguar', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jaguar.svg' },
  { name: 'mini', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mini.svg' },
  { name: 'aston-martin', url: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/astonmartin.svg' }
];

async function main() {
  for (const item of alts) {
    try {
      const res = await fetch(item.url);
      if (res.ok) {
        let text = await res.text();
        text = text.replace('<svg ', '<svg width="100" height="100" fill="#1e293b" ');
        text = text.replace(/<path\s+(?![^>]*fill=)/g, '<path fill="#1e293b" ');
        fs.writeFileSync(path.join(dir, item.name + '.svg'), text);
        console.log('OK:', item.name, text.length);
      } else {
        console.log('FAIL:', item.name, res.status);
      }
    } catch(e) {
      console.log('ERR:', item.name, e.message);
    }
  }
}

main();
