import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images', 'partners');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

for (const file of files) {
  const p = path.join(dir, file);
  let svg = fs.readFileSync(p, 'utf8');

  // ensure xmlns attribute exists
  if (!svg.includes('xmlns=')) {
    svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  }
  // ensure viewBox attribute exists
  if (!svg.includes('viewBox=')) {
    svg = svg.replace('<svg ', '<svg viewBox="0 0 24 24" ');
  }
  // ensure width/height aren't hardcoded to small values
  svg = svg.replace(/width="[0-9]+"/g, 'width="100%"');
  svg = svg.replace(/height="[0-9]+"/g, 'height="100%"');

  fs.writeFileSync(p, svg);
  console.log('Validated:', file);
}
