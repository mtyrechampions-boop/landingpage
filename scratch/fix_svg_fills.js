import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images', 'partners');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Make sure paths have explicit fill attribute
  content = content.replace(/<path\s+(?![^>]*fill=)/g, '<path fill="#1e293b" ');
  
  // Make sure g tags have fill if path doesn't
  content = content.replace(/<g\s+(?![^>]*fill=)/g, '<g fill="#1e293b" ');

  fs.writeFileSync(filePath, content);
  console.log('Fixed SVG fill for:', file);
}
