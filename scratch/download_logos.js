import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images', 'partners');

async function main() {
  const keys = ['cib:lexus', 'logos:lexus', 'fluent-emoji-high-contrast:automobile', 'ph:car-bold'];
  for (const k of keys) {
    const url = `https://api.iconify.design/${k}.svg`;
    try {
      const res = await fetch(url);
      console.log(url, res.status);
      if (res.ok) {
        let text = await res.text();
        if (!text.includes('fill=')) {
          text = text.replace('<svg ', '<svg fill="#1e293b" ');
        }
        fs.writeFileSync(path.join(dir, 'lexus.svg'), text);
        console.log('SAVED lexus.svg using', k);
        break;
      }
    } catch(e) {
      console.log(e.message);
    }
  }
}

main();
