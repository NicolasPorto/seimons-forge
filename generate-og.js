import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function buildDots() {
  const dots = [];
  const cols = 11, rows = 10;
  const startX = 748, startY = 65;
  const gapX = 42, gapY = 50;
  const cx = startX + (cols / 2) * gapX;
  const cy = startY + (rows / 2) * gapY;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * gapX;
      const y = startY + r * gapY;
      const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
      const maxDist = 260;
      const opacity = Math.max(0.04, 0.45 * (1 - dist / maxDist));
      const radius = dist < 80 ? 3 : dist < 160 ? 2.5 : 2;
      dots.push(
        `<circle cx="${x}" cy="${y}" r="${radius}" fill="#f97316" opacity="${opacity.toFixed(2)}"/>`
      );
    }
  }
  return dots.join('\n    ');
}

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur">
      <feGaussianBlur stdDeviation="70"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#080808"/>

  <!-- Glow blob -->
  <ellipse cx="430" cy="360" rx="340" ry="260" fill="#f97316" opacity="0.07" filter="url(#blur)"/>

  <!-- Top orange bar -->
  <rect x="0" y="0" width="1200" height="4" fill="#f97316"/>

  <!-- Outer border -->
  <rect x="1" y="5" width="1198" height="624" fill="none" stroke="#1e1e1e" stroke-width="1.5"/>

  <!-- Vertical divider -->
  <line x1="700" y1="40" x2="700" y2="590" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,10"/>

  <!-- Dot grid (right panel) -->
  ${buildDots()}

  <!-- Badge pill -->
  <rect x="80" y="148" width="295" height="32" rx="16" fill="#111111" stroke="#2a2a2a" stroke-width="1"/>
  <text x="228" y="169" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700"
        fill="#f97316" text-anchor="middle" letter-spacing="2.5">FABRICA DE SOFTWARE</text>

  <!-- Headline line 1 -->
  <text x="80" y="278"
        font-family="Arial Black, Arial, Helvetica, sans-serif"
        font-size="82" font-weight="900" fill="#ffffff" letter-spacing="-2">Sua dor</text>

  <!-- Headline line 2 (orange) -->
  <text x="80" y="376"
        font-family="Arial Black, Arial, Helvetica, sans-serif"
        font-size="82" font-weight="900" fill="#f97316" letter-spacing="-2">vira produto.</text>

  <!-- Accent line under headline -->
  <rect x="80" y="404" width="140" height="3" rx="1.5" fill="#f97316" opacity="0.5"/>

  <!-- Tags line -->
  <text x="80" y="454"
        font-family="Arial, Helvetica, sans-serif"
        font-size="17" fill="#4a4a4a" letter-spacing="0.5">Automacoes  /  Micro SaaS  /  Plataformas  /  Integracoes</text>

  <!-- Bottom tagline -->
  <circle cx="80" cy="515" r="3.5" fill="#f97316" opacity="0.6"/>
  <text x="97" y="521"
        font-family="Arial, Helvetica, sans-serif"
        font-size="15" fill="#3d3d3d">Sua dor. Nossa missao. Produto real.</text>

  <!-- URL -->
  <text x="80" y="578"
        font-family="Arial, Helvetica, sans-serif"
        font-size="15" font-weight="600" fill="#2e2e2e" letter-spacing="0.5">seimons.com.br</text>

</svg>`;

const outputPath = join(__dirname, 'public', 'og-image.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(() => console.log('og-image.png gerado em public/og-image.png'))
  .catch(err => {
    console.error('Erro ao gerar imagem:', err.message);
    process.exit(1);
  });
