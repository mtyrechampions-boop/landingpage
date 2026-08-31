import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images', 'partners');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

for (const file of files) {
  const p = path.join(dir, file);
  let svg = fs.readFileSync(p, 'utf8');

  // Replace width="100%" / height="100%" or 1em with fixed numeric dimensions
  svg = svg.replace(/width="[^"]*"/g, 'width="100"');
  svg = svg.replace(/height="[^"]*"/g, 'height="100"');

  // Ensure svg has viewBox
  if (!svg.includes('viewBox=')) {
    svg = svg.replace('<svg ', '<svg viewBox="0 0 24 24" ');
  }

  // Ensure path has fill="#1e293b" or fill="currentColor"
  if (!svg.includes('fill=')) {
    svg = svg.replace('<svg ', '<svg fill="#1e293b" ');
  }
  svg = svg.replace(/<path\s+(?![^>]*fill=)/g, '<path fill="#1e293b" ');

  fs.writeFileSync(p, svg);
  console.log('Fixed intrinsic dimensions for:', file);
}
