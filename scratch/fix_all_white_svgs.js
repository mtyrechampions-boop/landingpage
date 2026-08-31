import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images', 'partners');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

for (const f of files) {
  const p = path.join(dir, f);
  let svg = fs.readFileSync(p, 'utf8');

  // Replace white fills with dark slate #1e293b
  svg = svg.replace(/fill="#ffffff"/gi, 'fill="#1e293b"');
  svg = svg.replace(/fill="#fff"/gi, 'fill="#1e293b"');
  svg = svg.replace(/fill="white"/gi, 'fill="#1e293b"');
  svg = svg.replace(/fill: #ffffff/gi, 'fill: #1e293b');
  svg = svg.replace(/fill:#ffffff/gi, 'fill:#1e293b');
  svg = svg.replace(/fill:#fff/gi, 'fill:#1e293b');
  svg = svg.replace(/fill:white/gi, 'fill:#1e293b');

  // Also handle stroke if white
  svg = svg.replace(/stroke="#ffffff"/gi, 'stroke="#1e293b"');
  svg = svg.replace(/stroke="#fff"/gi, 'stroke="#1e293b"');

  fs.writeFileSync(p, svg);
  console.log('Fixed color for:', f);
}
